const my_connection = require('../../config/Db.js');
const connection_promise = my_connection.promise();

const resParam = {
    code: 0,
    data: [],
    pageInfo: {}
}

// 개인별 예약현황
const getReservationOne = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const name = req.body.name;
    const selectReservationQuery = `
        select concat( t1.gFirstName,t1.gLastName ) as '이름',
            concat( t1.gAddress,' ', t1.gAddress2) as '주소',  
            t1.gCellularNumber as '핸드폰', t1.geMailAddress as '이메일',
            IF( t1.gGender = 'M' , '남자' , '여자') as '성별',
            t2.bDateFrom, t2.bDateTo, t2.bRoomCount,
            t3.bsStatus,  t5.rtRoomType, t4.rbRate, t6.rRoomNumber, t6.rDesription
        from tblguests t1, tblbookings t2, tblbookingstatus t3, tblroomtypes t5, tblroomsbooked t4
        left outer join tblrooms t6 on t6.rRoomsID = t4.rbRoomID 
        where t1.gGuestID = t2.bGuestID
        and t3.bsBookingStatusID = t2.bBookingStatusID 
        and t2.bBookingID = t4.rbBookingID
        and t4.rbRoomType = t5.rtRoomTypeID 
        and (t1.gCellularNumber = ? or t1.geMailAddress = ? or concat(t1.gFirstName,t1.gLastName ) like ? + '%')
        and (t2.bDateFrom > cast(? as datetime) or t2.bDateTo > cast(? as datetime))
    `;
    console.log(name);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.cellularnumber,req.body.mailaddress, name, req.body.reservationday, req.body.reservationday]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

// 전체 예약현황
const getReservationList = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const selectReservationQuery = `
        select concat( t1.gFirstName,t1.gLastName ) as '이름',
            concat( t1.gAddress,' ', t1.gAddress2) as '주소',  
            t1.gCellularNumber as '핸드폰', t1.geMailAddress as '이메일',
            IF( t1.gGender = 'M' , '남자' , '여자') as '성별',
            t2.bDateFrom, t2.bDateTo, t2.bRoomCount,
            t3.bsStatus,  t5.rtRoomType, t4.rbRate, t6.rRoomNumber, t6.rDesription
        from tblguests t1, tblbookings t2, tblbookingstatus t3, tblroomtypes t5, tblroomsbooked t4
        left outer join tblrooms t6 on t6.rRoomsID = t4.rbRoomID 
        where t1.gGuestID = t2.bGuestID
        and t3.bsBookingStatusID = t2.bBookingStatusID 
        and t2.bBookingID = t4.rbBookingID
        and t4.rbRoomType = t5.rtRoomTypeID 
        and (t2.bDateFrom > cast(? as datetime) or t2.bDateTo > cast(? as datetime))
    `;
    console.log(req.body.reservationday);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.reservationday, req.body.reservationday]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

// 기간당 지정 방타입 수량
const getReservationTypeCount = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const selectReservationQuery = `
        SELECT  rt.rtRoomTypeID, rt.rtRoomType, COUNT(r.rRoomsID) -  (SELECT COALESCE(SUM(b.bRoomCount),0)
        FROM tblBookings b
        LEFT JOIN tblroomsbooked rb on b.bBookingID = rb.rbBookingID 
        WHERE ((cast(concat(?, ' 15:00:00') as datetime) BETWEEN b.bDateFrom AND b.bDateTo)
            OR (cast(concat(?, ' 10:00:00') as datetime) BETWEEN b.bDateFrom AND b.bDateTo)
            OR (b.bDateFrom BETWEEN cast(concat(?, ' 15:00:00') as datetime) AND cast(concat(?, ' 10:00:00') as datetime)))
            AND rb.rbRoomType = rt.rtRoomTypeID
        ) AS AvailableRooms
        FROM tblroomtypes rt
        LEFT JOIN tblrooms r ON rt.rtRoomTypeID = r.rRoomTypeID AND rRoomStatusID = 1
        where rt.rtRoomTypeID = ? -- 4, 5, 7, 8
        GROUP BY rt.rtRoomType  
        ORDER BY rt.rtRoomTypeID
    `;
    //console.log(req.body);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.DateTo, req.body.DateFrom,req.body.DateTo, req.body.DateFrom,req.body.RoomTypeID ]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

// 기간당 방별 수량
const getReservationTypeList = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const selectReservationQuery = `
        SELECT  rt.rtRoomTypeID, rt.rtRoomType, COUNT(r.rRoomsID) as room, (SELECT COALESCE(SUM(b.bRoomCount),0)
        FROM tblBookings b
        LEFT JOIN tblroomsbooked rb on b.bBookingID = rb.rbBookingID 
        where ((cast(concat('2023-12-02', ' 15:00:00') as datetime) BETWEEN b.bDateFrom AND b.bDateTo)
        or (cast(concat('2023-12-02', ' 10:00:00') as datetime) BETWEEN b.bDateFrom AND b.bDateTo)
        or (b.bDateFrom BETWEEN cast(concat('2023-12-02', ' 15:00:00') as datetime) AND cast(concat('2023-12-02', ' 10:00:00') as datetime)))
        and rb.rbRoomType = rt.rtRoomTypeID )  AS reservation
        FROM tblroomtypes rt
        LEFT JOIN tblrooms r ON rt.rtRoomTypeID = r.rRoomTypeID AND rRoomStatusID = 1 -- <= 예약가능
        GROUP BY rt.rtRoomType  
        ORDER BY rt.rtRoomTypeID
    `;
    //console.log(req.body.DateTo);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.DateTo, req.body.DateFrom,req.body.DateTo, req.body.DateFrom ]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

// 지정타입의 금액확인
const getRate = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const selectReservationQuery = `
        select distinct t3.rtRoomType, t2.rRate, t2.rFromDate, t2.rToDate, t2.rRateTypeID, t4.rtRateType, t4.rtDescription 
            from tblrooms t1, tblrates t2, tblroomtypes t3, tblratetypes t4 
            where t3.rtRoomTypeID = ?
            and t1.rRoomTypeID = t3.rtRoomTypeID
            and t1.rRoomsID = t2.rRoomID 
            and t2.rRateTypeID = t4.rtRateTypeID 
            and t2.rFromDate < cast(concat(?, ' 15:00:00') as datetime)
            and t2.rToDate > cast(concat(?, ' 10:00:00') as datetime)
            and t1.rHotelID = (select t.hHotelID from tblhotels t where t.hMain = true)
    `;
    console.log(req.body.DateTo);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.RoomTypeID, req.body.DateFrom,req.body.DateTo ]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

// 설정된 미배실 현황
const getNotRoomList = async  (req, res, dic) => {
    // 전체 날짜별 전체 예약현황
    const selectReservationQuery = `
        select t1.rRoomsID, t1.rFloor, t1.rRoomNumber, t1.rRoomTypeID,
        (select t2.rtRoomType from tblroomtypes t2 where t2.rtRoomTypeID = t1.rRoomTypeID) as RoomType,
        t4.bDateFrom, t4.bDateTo,t4.bBookingStatusID
        from tblrooms t1
        left join tblroomsbooked t3
        on t1.rRoomsID = t3.rbRoomID  
        left join tblbookings t4 
        on t3.rbBookingID = t4.bBookingID 
        where t1.rHotelID  = (select t.hHotelID from tblhotels t where t.hMain = true)
        and t1.rRoomTypeID like concat(?, '%' ) 
        and (t4.bDateFrom > cast(concat(?, ' 15:00:00') as datetime) or t4.bDateFrom is null
            or t4.bDateTo < cast(concat(?, ' 10:00:00') as datetime) or t4.bDateTo is null)  
        and (t4.bBookingStatusID <> 1 or t4.bBookingStatusID is null)
        and t3.rbRoomID is null
    `;
    console.log(req.body.DateTo);
    const [rows1, fields1] = await connection_promise.query(selectReservationQuery,[req.body.RoomTypeID, req.body.DateFrom,req.body.DateTo ]).catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const totalbooking = async (req, res, dic) => {
    var querydata = {};
    querydata.FromDate = req.body.FromDate;
    querydata.ToDate = req.body.ToDate;
    querydata.RoomType = req.body.RoomType;
    delete req.body.FromDate;
    delete req.body.ToDate;
    delete req.body.RoomType; 
    let insertguestid = 0; 
    let insertbookingid = 0;
    let insertrate = 0;
    var buffer = {};
    console.log(req.body);
    console.log(querydata.FromDate, ', ',querydata.ToDate, ', ', querydata.RoomType);
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblGuests WHERE geMailAddress = ?',[req.body.geMailAddress]).catch(err => {
        throw err;
    });
    if (rows3.COUNT == 0){
        const [rows3, fields3] = await connection_promise.query('INSERT INTO tblGuests SET ?',[req.body]).catch(err => {
            console.log('ERROR APPEAR *********');
            throw err;
        })
        insertguestid = rows3.insertId;
        console.log('**************************',insertguestid);
    }
    if(insertguestid == 0){
        const [[rows3], fields3] = await connection_promise.query('SELECT gGuestID FROM tblGuests WHERE geMailAddress = ?',[req.body.geMailAddress]).catch(err => {
            throw err;
        });        
        insertguestid = rows3.gGuestID;
    }
    // 조회가 안될때 처리
    if(insertguestid == 0) {return res.status(404)};
    buffer = {};
    buffer.bHotelID = '1';
    buffer.bGuestID = insertguestid;
    buffer.bReservationAgentID = null;
    buffer.bDateFrom = querydata.FromDate;
    buffer.bDateTo = querydata.ToDate;
    buffer.bRoomCount = '1';
    buffer.bBookingStatusID = '2';
    console.log(buffer);
    const [rows4, fields4] = await connection_promise.query('INSERT INTO tblbookings SET ?',[buffer]).catch(err => {
        throw err;
    })  
    insertbookingid = rows4.insertId;
    if(insertbookingid == 0){
        const [rows2, fields2] = await connection_promise.query('SELECT bBookingID FROM tblbookings WHERE bGuestID = ? and bDateFrom = ? and bDateTo = ?',[buffer.bGuestID, buffer.bDateFrom, buffer.bDateTo]).catch(err => {
            throw err;
        })
        insertbookingid = rows2.bBookingID;
    }
    if(insertbookingid == 0) {return res.status(404);}

    const selectReservationQuery = `
        select distinct t3.rtRoomType, t2.rRate, t2.rFromDate, t2.rToDate, t2.rRateTypeID, t4.rtRateType, t4.rtDescription 
            from tblrooms t1, tblrates t2, tblroomtypes t3, tblratetypes t4 
            where t3.rtRoomTypeID = ?
            and t1.rRoomTypeID = t3.rtRoomTypeID
            and t1.rRoomsID = t2.rRoomID 
            and t2.rRateTypeID = t4.rtRateTypeID 
            and t2.rFromDate < cast(concat(?, ' 15:00:00') as datetime)
            and t2.rToDate > cast(concat(?, ' 10:00:00') as datetime)
            and t1.rHotelID = (select t.hHotelID from tblhotels t where t.hMain = true)
    `;
    const [[rows5], fields5] = await connection_promise.query(selectReservationQuery,[querydata.RoomType, querydata.FromDate,querydata.ToDate]).catch(err => {
        throw err;
    })
    console.log(rows5);
    console.log(rows5.rRate);
    insertrate = rows5.rRate;
    if(insertrate == 0) res.status(405);
    buffer = {};
    buffer.rbBookingID = insertbookingid;
    buffer.rbRoomID = null;
    buffer.rbRate = insertrate;
    buffer.rbRoomType = querydata.RoomType;
    console.log(buffer);
    const [rows1, fields1] = await connection_promise.query('INSERT INTO tblroomsbooked SET ?',[buffer]).catch(err => {
        throw err;
        
    })
    res.status(200).json(rows1)    
}

module.exports = {
    getReservationOne,
    getReservationList,
    getReservationTypeCount,
    getReservationTypeList,
    getRate,
    getNotRoomList,
    totalbooking,
}
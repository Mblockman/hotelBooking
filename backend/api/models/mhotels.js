const my_connection = require('../../config/Db.js');
const connection_promise = my_connection.promise();

const resParam = {
    code: 0,
    data: [],
    pageInfo: {}
}
/**
 * 호텔정보 처리
 */
const getHotelsList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblhotels WHERE hMain = true').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getHotelsID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblhotels WHERE hHotelID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createHotels = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblhotels WHERE hMainPhoneNumber = ?',[req.body.hMainPhoneNumber]).catch(err => {
        throw err;
    })
    if (rows3.COUNT == 0){
        console.log(req.body);
        const [rows3, fields3] = await connection_promise.query('INSERT INTO tblhotels SET ?',[req.body]).catch(err => {
            throw err;
        })
    }
    res.status(200).json(rows3)    
}

const updateHotel  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblhotels WHERE hHotelID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    if (rows3.COUNT != 0){
        console.log(req.body);
        const [rows3, fields3] = await connection_promise.query('UPDATE tblhotels SET ? WHERE hHotelID = ? ',[req.body, req.params.id]).catch(err => {
            throw err; 
        })
    }
    res.status(200).json(rows3)    
}

const deleteHotel  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('DELETE FROM tblhotels WHERE hHotelID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

module.exports = {
    getHotelsList,
    getHotelsID,
    createHotels,
    updateHotel,
    deleteHotel,
}
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
const getBookingList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblbookings').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getBookingID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblbookings WHERE bBookingID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createBooking = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('INSERT INTO tblbookings SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateBooking  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblbookings SET ? WHERE bBookingID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteBooking  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblbookings WHERE bBookingID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

module.exports = {
    getBookingList,
    getBookingID,
    createBooking,
    updateBooking,
    deleteBooking,
}
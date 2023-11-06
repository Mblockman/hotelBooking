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
const getBookedList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblroomsbooked').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getBookedID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblroomsbooked WHERE rbRoomBookedID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createBooked = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblroomsbooked SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateBooked  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblroomsbooked SET ? WHERE rbRoomBookedID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteBooked  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblroomsbooked WHERE rbRoomBookedID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

module.exports = {
    getBookedList,
    getBookedID,
    createBooked,
    updateBooked,
    deleteBooked,
}
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
const getRoomTypesList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblRoomtypes').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getRoomTypesID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblRoomtypes WHERE rtRoomTypeID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createRoomTypes = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblroomtypes SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateRoomTypes  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblRoomtypes SET ? WHERE rtRoomTypeID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteRoomTypes  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblRoomtypes WHERE rtRoomTypeID = ?',[req.params.id]).catch(err => {
        throw err;
    })

    res.status(200).json(rows3)    
}

module.exports = {
    getRoomTypesList,
    getRoomTypesID,
    createRoomTypes,
    updateRoomTypes,
    deleteRoomTypes,
}
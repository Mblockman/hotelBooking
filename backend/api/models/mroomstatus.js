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
const getRoomStatusList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblroomstatus').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getRoomStatusID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblroomstatus WHERE rsRoomStatusID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createRoomStatus = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblroomstatus SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateRoomStatus  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblroomstatus SET ? WHERE rsRoomStatusID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteRoomStatus  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblroomstatus WHERE rsRoomStatusID = ?',[req.params.id]).catch(err => {
        throw err;
    })

    res.status(200).json(rows3)    
}

module.exports = {
    getRoomStatusList,
    getRoomStatusID,
    createRoomStatus,
    updateRoomStatus,
    deleteRoomStatus,
}
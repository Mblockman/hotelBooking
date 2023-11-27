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
const getRoomsList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblrooms').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getRoomsID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblrooms WHERE rRoomsID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createRooms = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblrooms SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateRooms  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblrooms SET ? WHERE rRoomsID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteRooms  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblrooms WHERE rRoomsID = ?',[req.params.id]).catch(err => {
        throw err;
    })

    res.status(200).json(rows3)    
}

module.exports = {
    getRoomsList,
    getRoomsID,
    createRooms,
    updateRooms,
    deleteRooms,
}
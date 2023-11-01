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
const getRatesList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblrates').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getRatesID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblrates WHERE rRateID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createRates = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblrates SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateRates  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblrates SET ? WHERE rRateID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteRates  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('DELETE FROM tblrates WHERE rRateID = ?',[req.params.id]).catch(err => {
        throw err;
    })

    res.status(200).json(rows3)    
}

module.exports = {
    getRatesList,
    getRatesID,
    createRates,
    updateRates,
    deleteRates,
}
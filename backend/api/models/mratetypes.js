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
const getRateTypesList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblratetypes').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getRateTypesID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblratetypes WHERE rtRateTypeID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createRateTypes = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('INSERT INTO tblratetypes SET ?',[req.body]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const updateRateTypes  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('UPDATE tblratetypes SET ? WHERE rtRateTypeID = ? ',[req.body, req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

const deleteRateTypes  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('DELETE FROM tblratetypes WHERE rtRateTypeID = ?',[req.params.id]).catch(err => {
        throw err;
    })

    res.status(200).json(rows3)    
}

module.exports = {
    getRateTypesList,
    getRateTypesID,
    createRateTypes,
    updateRateTypes,
    deleteRateTypes,
}
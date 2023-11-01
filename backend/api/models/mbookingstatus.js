const my_connection = require('../../config/Db.js');
const connection_promise = my_connection.promise();

const resParam = {
    code: 0,
    data: [],
    pageInfo: {}
}
/**
 * 예약상태 처리
 */
const getBookingstatusList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblbookingstatus').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getBookingstatusID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblbookingstatus WHERE bsBookingStatusID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const createBookingstatus = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblbookingstatus WHERE bsStatus = ?',[req.body.bsStatus]).catch(err => {
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

const updateBookingstatus  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblbookingstatus WHERE bsBookingStatusID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    if (rows3.COUNT != 0){
        console.log(req.body);
        const [rows3, fields3] = await connection_promise.query('UPDATE tblbookingstatus SET ? WHERE bsBookingStatusID = ? ',[req.body, req.params.id]).catch(err => {
            throw err; 
        })
    }
    res.status(200).json(rows3)    
}

const deleteBookingstatus  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('DELETE FROM tblbookingstatus WHERE bsBookingStatusID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

module.exports = {
    getBookingstatusList,
    getBookingstatusID,
    createBookingstatus,
    updateBookingstatus,
    deleteBookingstatus,
}
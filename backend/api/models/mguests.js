const my_connection = require('../../config/Db.js');
const connection_promise = my_connection.promise();

let insertID=0;
const resParam = {
    code: 0,
    data: [],
    pageInfo: {}
}
/**
 * 호텔정보 처리
 */
const getGuestsList = async  (req, res, dic) => {
    const [rows1, fields1] = await connection_promise.query('SELECT * FROM tblGuests').catch(err => {
        throw err;
    })
    //resParam.data = rows1;
    //res.status(200).json(resParam);
    res.status(200).json(rows1)
}

const getGuestsID = async (req, res, dic) => {
    const [rows2, fields2] = await connection_promise.query('SELECT * FROM tblGuests WHERE gGuestID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows2)    
}

const getGuestsEmail = async (req, res, dic) => {
    //console.log(req.params.email);
    const [rows2, fields2] = await connection_promise.query('SELECT gGuestID FROM tblGuests WHERE geMailAddress = ?',[req.params.email]).catch(err => {
        throw err;
        
    })
    //insertID = rows2.getGuestsID;
    //console.log("--------------");
    //console.log("--------------");
    res.status(200).json(rows2)    
}

const createGuests = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblGuests WHERE geMailAddress = ?',[req.body.geMailAddress]).catch(err => {
        throw err;
    });
    //console.log(rows3);
    if (rows3.COUNT == 0){
        //console.log(req.body);
        const [rows3, fields3] = await connection_promise.query('INSERT INTO tblGuests SET ?',[req.body]).catch(err => {
            throw err;
        })
    }
    console.log("--------------");
    console.log(res);
    res.status(200).json(rows3)    
}

const updateGuests  = async (req, res, dic) => {
    const [[rows3], fields3] = await connection_promise.query('SELECT count(*) as COUNT FROM tblGuests WHERE gGuestID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    if (rows3.COUNT != 0){
        console.log(req.body);
        const [rows3, fields3] = await connection_promise.query('UPDATE tblGuests SET ? WHERE gGuestID = ? ',[req.body, req.params.id]).catch(err => {
            throw err; 
        })
    }
    res.status(200).json(rows3)    
}

const deleteGuests  = async (req, res, dic) => {
    const [rows3, fields3] = await connection_promise.query('DELETE FROM tblGuests WHERE gGuestID = ?',[req.params.id]).catch(err => {
        throw err;
    })
    res.status(200).json(rows3)    
}

module.exports = {
    getGuestsList,
    getGuestsID,
    getGuestsEmail,
    createGuests,
    updateGuests,
    deleteGuests,
    insertID,
}
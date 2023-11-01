const express = require('express');
const app = express();
const port = 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const hotelRouter = require('./api/routers/rhotels.js'); // 호텔정보
const bookingstatusRouter = require('./api/routers/rbookingstatus.js'); // 호텔정보
const guestsRouter = require('./api/routers/rguests.js'); // 예약자정보
const bookedRouter = require('./api/routers/rbooked.js'); // 예약연결정보
const bookingRouter = require('./api/routers/rbooking.js'); // 예약정보
const roomsRouter = require('./api/routers/rrooms.js'); // 예약정보
const ratesRouter = require('./api/routers/rrates.js'); // 정보
const ratetypesRouter = require('./api/routers/rratetypes.js'); // 정보
const roomtypesRouter = require('./api/routers/rroomtypes.js'); // 정보
const roomstatusRouter = require('./api/routers/rroomstatus.js'); // 정보
const selectedRouter = require('./api/routers/rselected.js'); // 정보

app.all("*",function(req,res,next){
    //도메인 간 교차가 허용되는 도메인 이름을 설정합니다. *는 모든 도메인 이름이 도메인 간 교차가 허용됨을 의미합니다
    res.header("Access-Control-Allow-Origin","*");
    //허용되는 헤더 유형
    res.header("Access-Control-Allow-Headers","content-type");
    //도메인 간 허용 요청 방법
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //옵션에서 빠른 종료를 요청하도록 허용
    else
        next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/hotels', hotelRouter);
app.use('/api/bookingstatus', bookingstatusRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/booked', bookedRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/rates', ratesRouter);
app.use('/api/ratetypes', ratetypesRouter);
app.use('/api/roomtypes', roomtypesRouter);
app.use('/api/roomstatus', roomstatusRouter);
app.use('/api/selected', selectedRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

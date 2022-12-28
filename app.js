const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorController = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const attendanceRouter = require('./routes/attendancesRoutes');
const qrCodeRouter = require('./routes/qrcodeRoutes');
const courseRouter = require('./routes/coursesRoutes');
const facultyRouter = require('./routes/facultiesRoutes');
const AppError = require('./utils/AppError');

const app = express();
// app.enable('trust proxy');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/attendances', attendanceRouter);
app.use('/api/v1/qrcodes', qrCodeRouter);
app.use('/api/v1/faculties', facultyRouter);

//------MIDDLE-WARE FOR UNHANDLED ROUTES-------------//
app.all('*', (req, res, next) => {
  next(
    new AppError(`Oops could not find ${req.originalUrl} on this server.`, 404)
  );
});

//------GLOBAL ERROR HANDLING MIDDLEWARE-------------//
app.use(errorController);

module.exports = app;

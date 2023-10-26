const { AsyncTask } = require('toad-scheduler');
const pool = require('./../Model/database');

exports.updateLectureHallsQRCodesTask = new AsyncTask(
  'simple task',
  () => {
    const currTime = new Date(Date.now())
      .toISOString()
      .replace('Z', '')
      .split('T')
      .join(' ');
    return pool
      .query(`CALL lockLectureHallQRcodes(?)`, [currTime])
      .then((res) => {
        if (res[0].affectedRows >= 1) {
          console.log(
            `${res[0].affectedRows} lecture hall QR code(s) locked.✅ @${currTime}`
          );
        } else {
          console.log(`No Update happened. @${currTime}`);
        }
      });
  },
  (err) => {
    console.log('TASK ERROR:❗', err);
  }
);

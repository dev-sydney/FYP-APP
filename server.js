const app = require('./app');
const { SimpleIntervalJob, ToadScheduler } = require('toad-scheduler');
const { updateLectureHallsQRCodesTask } = require('./utils/scheduleUpdate');

const scheduler = new ToadScheduler();
const job = new SimpleIntervalJob(
  { seconds: 60 },
  updateLectureHallsQRCodesTask
);
scheduler.addSimpleIntervalJob(job);

app.listen(process.env.PORT, () => {
  console.log(`Listening to request on port: ${process.env.PORT} ✅✅✅`);
});

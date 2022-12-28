const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Listening to request on port: ${process.env.PORT} ✅✅✅`);
});

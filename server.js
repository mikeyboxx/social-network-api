const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// start up server once the mongo db connection is established
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server has started... Listening on http://localhost:${PORT}/`);
    console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));
  });
});

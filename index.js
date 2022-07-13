const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const auditRoutes = require('./routes/audit.routes')
module.exports = app;
app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use('/apm/v1/audit',auditRoutes);
const PORT = process.env.NODEJS_NODEJSPORT || 3005;
  app.listen(PORT, function () {
    console.log('App is running at PORT' + PORT);
  });
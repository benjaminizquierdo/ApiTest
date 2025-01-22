const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const apiV2Routes = require('./routes/apiV2');
const apiV1Routes = require('./routes/apiV1');

app.use(bodyParser.json());
app.use('/apiV1', apiV1Routes);
app.use('/apiV2', apiV2Routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
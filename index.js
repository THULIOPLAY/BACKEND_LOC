const bodyParser = require('body-parser');
const express = require('express');
const MercadoPago = require('mercadopago');
const cors = require('cors');
const path = require('path');

const router = require("./routes/routes");
const app = express();

MercadoPago.configure({
  sendbox: true,
  access_token: "TEST-2567635039397568-110405-054fc51c3f54adcc6c306d6537314aaf-633126625"

})

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/files', express.static(path.join(__dirname, '/tmp/uploads')));

app.use('/api', router);

app.listen(3000, function() {
  console.log('Servidor Web rodando na porta 3000')
});


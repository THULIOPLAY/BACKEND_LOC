const  express = require('express');
const  AWS = require('aws-sdk');

// Função para envio da mensagem
async function sendSMS({ sns}) {
  // Definições sobre o tipo de mensagem
  await this.sns.setSMSAttributes({
    attributes: {
      DefaultSMSType: 'Promotional'
    }
  }).promise();

  // Envio da mensagem
  sns.publish({
    Message: "OI AMIGO",
    PhoneNumber:"+5562996753127", 
  }).promise();
}

AWS.config.update({
  region: 'us-east-1',
  accessKeyId:"AKIA5GVCAVJSEQAE4WMI",
  secretAccessKey: "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",
});

const sns = new AWS.SNS({apiVersion: '2010-03-31'});

// Criação da API
const app = express();
app.use(express.json());
app.post('/send-sms', (req, res) => {
  const { PhoneNumber, Message } = req.body;
  sendSMS({ sns});
  return res
    .status(201)
    .end();
});

app.listen(process.env.PORT || 3000);
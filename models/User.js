var knex = require('../database/connection');
var bcrypt = require('bcrypt');
var hash = require('crypto');
var nodemailer = require('nodemailer');
var AWS = require('aws-sdk');
var Nexmo = require('nexmo');
const { andWhere } = require('../database/connection');
var messagebird = require('messagebird')('GekLBm5pGWJGxzBBCNbdMPwaz');

const credentials = {
    id: 'AKIA5GVCAVJSEQAE4WMI',
    secret: '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'
}


class User {
    async creatUser(
        name,
        last_name,
        telephone,
        cpf,
        birth_date,
        email,
        password
    ) {

        try {

            var hash = await bcrypt.hash(password, 10);

            var result = await knex.insert({
                name,
                last_name,
                telephone,
                cpf,
                birth_date,
                email,
                password: hash,
                status: 1,

            }).table('users');
            return result;

        } catch (error) {
            console.log(error);
        }

    }

    async findEmail(email) {
        try {
            var result = await knex.select('*').from('users').where({ email: email });
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error + " FOOI ESSE O ERRO CARAI");
            return false;
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select("*").where({ email: email }).table("users");

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async DocsUser(filename) {
        try {
            await knex.insert({
                id_user: 96,
                filename,
            }).table('docs');
        } catch (error) {
            console.log(error);
        }
    }

    async UserDetalhes(id) {
        try {
            var result = await knex.select("name", "last_name", "telephone").where({ id: id }).table("users");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async EnvEmail(email) {

        try {

            var cod_email = hash.randomBytes(6).toString('hex');

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.umbler.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "thulioxavier@experuser.life", // generated ethereal user
                    pass: "1000Gr@us", // generated ethereal password
                },
            });

            let int = await transporter.sendMail({
                from: '"Thulio" <thulioxavier@experuser.life>',
                to: email,
                subject: "Código De confirmação de E-mail: AEIO APP",
                text: "Seu código é: " + cod_email,
            });

            await knex("users").where({ email: email }).update({ cod_email: cod_email });
            return (int);

        } catch (error) {
            console.log(error);
        }

    }

    async SelecUser(id) {
        try {

            var result = await knex.select("name", "last_name", "telephone", "cpf", "email", "status_cel", "status_email").where({ id: id }).table("users");
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async ValEmail(email, cod_email) {

        try {
            await knex("users").select("*").where({ email: email }).andWhere({ cod_email: cod_email }).update({ status_email: 1 });
            return true;
        } catch (error) {
            console.log(error);
        }
    }


    async VerifyCel(telephone) {

        try {

            var cod_cel = hash.randomBytes(3).toString('hex');

            var params = {
                'originator': 'MessageBird',
                'recipients': [
                    '+55'+telephone,
                ],
                'body': 'Use'+ ' ' +cod_cel + ' ' + 'para verificar sua conta no AEIO APP',
            };

            messagebird.messages.create(params, function (err, response) {
                if (err) {
                    return console.log(err);
                }
                console.log(response);
            });

            return true;

        } catch (error) {
            console.log(error);
        }


    }


}

module.exports = new User();
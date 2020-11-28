const User = require('../models/User');
const validarCpf = require('validar-cpf');
const Tools = require('../models/Tool');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const { use } = require('../routes/routes');

const secret = "asdjkasdj_kqiouensdaslkdn7@#$*@jksjh";

class UserController {

    async index(req, res) { }

    async createUser(req, res) {
        var {
            name,
            last_name,
            telephone,
            cpf,
            birth_date,
            email,
            password
        } = req.body;


        if (validarCpf(cpf) == false) {
            res.status(400);
            res.json({ error: "CPF INFORMADO NÃO É VALIDO" });
            return;
        }

        if (email == undefined) {
            res.status(400);
            res.json({ error: "O e-mail não foi informado" });
            return;
        }

        var emailExists = await User.findEmail(email);

        console.log(emailExists);
        if (emailExists) {
            res.status(406);
            res.json("Email já esta cadastrado");
            return;
        }

        var _id = await User.creatUser(
            name,
            last_name,
            telephone,
            cpf,
            birth_date,
            email,
            password
        );


        res.status(200);
        // console.log(saida);
        res.json({ _email: email, _password: password, _id_user: _id[0] });

    }

    async listToolsUser(req, res) {
        var id_user = req.params.id_user;

        var tool = await Tools.listToolsUser(id_user);

        res.json(tool);
    }

    async loginUser(req, res) {
        var { email, password } = req.body

        var user = await User.findByEmail(email);

        if (user != undefined) {
            var result = await bcrypt.compare(password, user.password);
            // res.json({Status: result});
            if (result) {
                var token = jwt.sign({ email: user.email, id: user.id, status: user.status }, secret);

                res.status(200);
                res.json({ token: token, iduser: user.id });

            } else {
                res.status(406);
                res.json({ error: "Senha Invalida" });
            }
        } else {
            res.json({ Status: false });
        }
    }

    async DocsUser(req, res) {

        var filename = req.file.filename;

        await User.DocsUser(filename);

        return res.json({ up: "OK" });
    }

    
    async userDetalhes(req, res) {
        var id = req.params.id;

        var result = await User.UserDetalhes(id);

        res.status(200);
        res.json(result);
    }

    async envEmail(req, res){
        var email = req.body.email;

        await User.EnvEmail(email);

        res.status(200);

        res.json("Enviado");
    }

    async verifyCel(req, res){
        var telephone = req.body.telephone;

        var resu =  await User.VerifyCel(telephone);

        res.status(200);

        if (resu == true) {
        res.json("Enviado");
            
        }else{
        res.json("não foi");

        }

    }

    async selectUser(req, res){

        var id = req.params.id;

        var result = await User.SelecUser(id);

        res.status(200);
        res.json(result);
    }

    async valEmail(req, res){

        var {email, cod_email} = req.body;

        await User.ValEmail(email, cod_email);

        res.status(200);
        res.json("valid");
    }


}

module.exports = new UserController();
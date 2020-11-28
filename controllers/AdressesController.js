const Adresses = require('../models/Adresses');

class AdressesController {

    async createAddress(req, res) {
        var {
            cep,
            cidade,
            uf,
            bairro,
            rua,
            ql,
            num,
            complemento,
            title,
        } = req.body;
        var id_user = req.headers.user_id;

        await Adresses.CreateAddress(
            cep,
            cidade,
            uf,
            bairro,
            rua,
            ql,
            num,
            complemento,
            id_user,
            title
        );

        res.status(200);
        res.json("OK");
        
    }

    async listAddress(req, res){

        var id_user = req.params.id_user;

        var result = await Adresses.ListAddress(id_user);

        res.status(200);
        res.json(result);
    }


    
}

module.exports = new AdressesController();

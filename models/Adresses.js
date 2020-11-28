var knex = require('../database/connection');
var hash = require('crypto');
var slugify = require('slugify');

class Adresses {
    async CreateAddress(
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
    ) {
        try {
            await knex.insert({
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
            }).table("adresses");
            return true;

        } catch (error) {
            console.log(error);
        }
    }

    async ListAddress(id_user){
        try {
            var result = await knex.select("*").where({id_user: id_user}).table("adresses");
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Adresses();
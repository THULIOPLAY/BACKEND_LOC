var knex = require('../database/connection');
var hash = require('crypto');
var slugify = require('slugify');
const MercadoPago = require("mercadopago");
const { v4: uuidv4 } = require('uuid');

class Solicitation {

    async CreateSolicitation(
        id_tool,
        id_user_tool,
        qtd_day,
        price_end,
        date_start,
        date_end,
        status,
        id_user
    ) {
        try {
            var barcodigo = hash.randomBytes(6).toString('hex');

            await knex.insert({
                id_tool,
                id_user_tool,
                qtd_day,
                price_end,
                date_start,
                date_end,
                status,
                id_user,
                barcodigo: barcodigo + id_user_tool
            }).table('solicitation');

        } catch (error) {
            console.log(error);
        }
    }

    async listSolicitationUser(id_user) {
        try {
            var result = await knex.select("*").where({ id_user_tool: id_user }).table("solicitation");
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async listSolicitationUserStatus(id_user, status) {
        try {
            var result = await knex.select("*").where({ id_user: id_user }).where({ status: status }).table("solicitation");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async SolicitationUpdStatus(id, status) {
        try {
            await knex('solicitation').where({ id: id }).update({ status: status });
        } catch (error) {
            console.log(error);
        }
    }

    async SolicitacaoCart(id_user_tool) {
        try {
            var status = "Aceito";
            var result = await knex.sum({ saldo:"price_end"}).where({ status: status }).andWhere({ id_user_tool: id_user_tool }).groupBy("id_user_tool").table("solicitation");
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = new Solicitation();
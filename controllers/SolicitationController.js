const Solicitation = require('../models/Solicitation');
const MercadoPago = require("mercadopago");
const { v4: uuidv4 } = require('uuid');



MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-2567635039397568-110405-054fc51c3f54adcc6c306d6537314aaf-633126625",
});


class SolicitationController {
    async createSolicitation(req, res) {
        var {
            id_tool,
            id_user_tool,
            qtd_day,
            price_end,
            date_start,
            date_end,
            status
        } = req.body;
        var id_user = req.headers.user_id;

        await Solicitation.CreateSolicitation(
            id_tool,
            id_user_tool,
            qtd_day,
            price_end,
            date_start,
            date_end,
            status,
            id_user
        );

        res.status(200);
        res.json("OK");
    }

    async listSolicitationUser(req, res) {
        var id_user = req.params.id_user;

        var result = await Solicitation.listSolicitationUser(id_user);

        res.status(200);
        res.json(result);

    }

    async listSolicitationUserStatus(req, res) {
        var id_user = req.params.id_user;
        var status = req.params.status;

        var result = await Solicitation.listSolicitationUserStatus(id_user, status);

        res.status(200);
        res.json(result);
    }

    async solicitationUpdStatus(req, res) {
        var status = req.body.status;
        var id = req.params.id;

        await Solicitation.SolicitationUpdStatus(id, status);

        res.status(200);
        res.json("UPD OK");
    }

    async solicitacaoCart(req, res) {
        var { id_user_tool } = req.body;

        var result = await Solicitation.SolicitacaoCart(id_user_tool);

        res.status(200);
        res.json(result);
    }

    async pagSolitation(req, res) {

        var id = "" + Date.now();
        var emailDoPagador = "victordevtb@outlook.com";
    
        var dados = {
            items: [
                 {
                    id: id,
                    title: "2x video games;3x camisas",
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat(160)
                }
            ],
            payer:{
                email: emailDoPagador
            },
            external_reference: id
        }

        try {
            var pagamento = await MercadoPago.preferences.create(dados);
            //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
           return res.redirect(`${pagamento.body.init_point}`);
        } catch (err) {
            res.json(err.message);
        }


    }
}

module.exports = new SolicitationController();
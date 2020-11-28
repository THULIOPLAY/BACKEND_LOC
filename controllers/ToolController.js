const Tools = require('../models/Tool');

class ToolsController {
    async index(req, res) { }

    async createTools(req, res) {
        var {
            title,
            brand,
            breakdowns,
            description,
            redomendation,
            id_category,
            id_adresses,
            price,
            charge,
            availability,
            filename
        } = req.body;
        var id_user = req.headers.user_id;
        // var filename = req.file.filename;


        await Tools.CreateTools(
            title,
            brand,
            breakdowns,
            description,
            redomendation,
            id_category,
            id_adresses,
            price,
            charge,
            availability,
            id_user,
            filename
        );

        res.status(200);
        res.json("OK!");
    }

    async listTool(req, res) {

        var id = req.params.id;

        var tool = await Tools.listTool(id);

        res.json(tool)
    }

    async listTools(req, res) {

        var cidade = req.body.cidade;

        var tools = await Tools.listTools(cidade);
        res.status(200);
        res.json(tools);
    }

    async delTool(req, res) {
        var id = req.params.id;

        await Tools.DelTool(id);

        res.json("Deletado!");
    }

    async sherTools(req, res) {
        var bus = req.body.bus;

        var tools = await Tools.SherTools(bus);

        res.status(200);
        res.json(tools);
    }

    async listToolsCategories(req, res) {
        var idCategory = req.params.idCategory;

        var result = await Tools.ListToolsCategories(idCategory);

        res.status(200);
        res.json(result);
    }

    async listSugestao(req, res){
        var string = req.body.string;

        var result = await Tools.ListSugestao(string);

        res.status(200);
        res.json(result);
    }
}

module.exports = new ToolsController();
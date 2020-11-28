const Category = require('../models/Category');


class CategoryController{
    async index(req, res){}

    async createCategory(req, res){
        var {
            title
        } = req.body;

        if(title ==  undefined) {
            res.status(400);
            res.json({ error: "Titulo da Categoria não informado" });
            return;
        }

        await Category.createCategory(title);
        
        res.status(200);
        res.json("OK!");
    }

    async listCategories(req, res){
        
        var categories =  await Category.listeCategories();

        res.status(200);
        res.json(categories);
    }
}


module.exports =  new CategoryController();
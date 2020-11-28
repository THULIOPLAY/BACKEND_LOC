var knex = require('../database/connection');
var hash = require('crypto');
var slugify = require('slugify');
const { from, innerJoin } = require('../database/connection');

class Tools {
    // create tools
    async CreateTools(
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
    ) {
        try {

            var bar_code = hash.randomBytes(6).toString('hex');
            var re = /[\s,\.,:;\(\)\-']/;
            var tags = title.split(re);
            var slug = await slugify(title);
            var valor =  parseFloat(price);
            console.log(tags.toString());
            await knex.insert({
                title,
                brand,
                breakdowns,
                description,
                redomendation,
                id_category,
                id_adresses,
                id_user,
                price: valor,
                charge,
                availability,
                bar_code,
                status: 1,
                slug: slug,
                filename,
                tags: tags.toString(),

            }).table('tools');


        } catch (error) {
            console.log(error);
        }
    }
    //all tools
    async listTools(cidade) {

        try {
            var result = await knex.select(
                "tools.id", 
                "tools.title",
                "tools.brand",
                "tools.breakdowns",
                "tools.description",
                "tools.redomendation",
                "tools.id_category",
                "tools.id_user",
                "tools.price",
                "tools.charge",
                "tools.availability",
                "tools.bar_code",
                "tools.status",
                "tools.slug",
                "tools.filename",
                "tools.tags",
                "adresses.cidade",
                "adresses.bairro"
                
            ).from("tools").innerJoin("adresses", "tools.id_adresses", "=", "adresses.id").where("adresses.cidade", "like", `%${cidade}%`).table("tools");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    //a tools
    async listTool(id) {
        try {
            var result = await knex.select(
                "tools.id", 
                "tools.title",
                "tools.brand",
                "tools.breakdowns",
                "tools.description",
                "tools.redomendation",
                "tools.id_category",
                "tools.id_user",
                "tools.price",
                "tools.charge",
                "tools.availability",
                "tools.bar_code",
                "tools.status",
                "tools.slug",
                "tools.filename",
                "tools.tags",
                "users.name",
                "users.last_name"
                ).from("tools").innerJoin("users", "tools.id_user", "=", "users.id").where("tools.id", `${id}`).table("tools");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // all tools user
    async listToolsUser(id_user) {
        try {
            var result = await knex.select("*").where({ id_user: id_user }).table("tools");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async DelTool(id) {
        try {
            await knex('tools').where({ id, id }).del();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async SherTools(bus) {
        try {
            var busca = bus.trim();
            busca = busca.replace(/\s{2,}/g, ' ');
            var result = await knex.select("*").where('title', 'like', `%${busca}%`).orWhere('description', 'like', `%${busca}%`).orWhere('brand', 'like', `%${busca}%`).table("tools");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async ListToolsCategories(idCategory) {
        try {
            var result = await knex.select("*").where({ id_category: idCategory }).table("tools");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async ListSugestao(string) {
        try {
            var re = /[\s,\.,:;\(\)\-']/;
            var str = string.split(re)
            console.log(str[0]);
            var result = await knex.select("*").where('title', 'like', `%${str[0]}%`).limit(8).table("tools");
            return result;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new Tools();
var knex = require('../database/connection');
var slugify = require('slugify');
const { json } = require('body-parser');
class Category {
    async createCategory(title) {
        try {
            var slug = await slugify(title);

            await knex.insert({ 
                title, 
                slug: slug 
            }).table('categories');

        } catch (error) {
            console.log(error);
        }
    }

    async listeCategories(){
        try {
            var result = await knex.select("*").table("categories");
             return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = new Category();
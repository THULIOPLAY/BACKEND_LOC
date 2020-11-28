class HomeController{

    async index(req, res){
        res.send("OLA MUNDO");
    }

}

module.exports = new HomeController();
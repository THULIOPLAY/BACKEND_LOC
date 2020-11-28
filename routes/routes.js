var express = require("express");
var multer = require("multer");
var multerConfig = require('../config/multer');
var app = express();
var router = express.Router();

var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ToolController = require("../controllers/ToolController");
var CategoryController = require("../controllers/CategoryController");
var SolicitationController = require("../controllers/SolicitationController");
var AdressesController = require("../controllers/AdressesController");

router.get('/', HomeController.index);
router.post('/user', UserController.createUser);
router.get('/user/:id', UserController.userDetalhes);
router.post('/user/enemail', UserController.envEmail);
router.post('/user/docs', multer(multerConfig).single("avatar"), UserController.DocsUser);
router.get('/user/perfil/:id', UserController.selectUser);
router.post('/user/valemail/', UserController.valEmail);
router.post('/user/envcel/', UserController.verifyCel);

router.post('/login', UserController.loginUser);
router.get('/user/tool/:id_user', UserController.listToolsUser);


// router.post('/tool', ToolController.createTools);
router.post('/tool', multer(multerConfig).single("avatar"), ToolController.createTools);
router.post('/tool/ct', ToolController.listTools);
router.get('/tool/:id', ToolController.listTool);
router.delete('/tool/user/del/:id', ToolController.delTool);
router.post('/tool/user/bus', ToolController.sherTools);
router.get('/tool/category/:idCategory', ToolController.listToolsCategories);
router.post('/tool/sugestao', ToolController.listSugestao);


//rotas de endereços
router.post('/user/adresses', AdressesController.createAddress);
router.get('/user/adresses/:id_user', AdressesController.listAddress);
//routes categories
router.post('/admin/category', CategoryController.createCategory);
router.get('/category/list', CategoryController.listCategories);
// router.put('/admin/category/:id', CategoryController.aditCategory);
// router.delete('/admin/category/', CategoryController.createCategory);


router.post('/user/solicitation/new', SolicitationController.createSolicitation);
router.get('/user/solicitation/listUser/:id_user', SolicitationController.listSolicitationUser);
router.get('/user/solicitation/status/:id_user/:status', SolicitationController.listSolicitationUserStatus);
router.put('/user/solicitation/status/:id', SolicitationController.solicitationUpdStatus);
router.post('/user/solicitation/carteira', SolicitationController.solicitacaoCart);
//adasd///asdasd/a///asdasdasdasdasdasd
router.get('/user/solicitation/pagamento/', SolicitationController.pagSolitation);

module.exports = router;
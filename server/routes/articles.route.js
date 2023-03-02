const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const { addArticleValidator } = require('../middleware/validation');

const auth = require('../middleware/auth');


router.post('/',auth('createAny','articles'),addArticleValidator, articlesController.createArticle)

//admin get article(draft and public)
router.route('/article/:id')
.get(auth('readAny','articles'),articlesController.getArticleById)
.patch(auth('updateAny','articles'),articlesController.updateArticleById)
.delete(auth('deleteAny','articles'),articlesController.deleteArticleById)

//user get article(public)
router.route('/users/article/:id')
.get(articlesController.getUsersArticleById)

//get all articles and load more
router.route('/all')
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles)

//pagination

router.post('/admin/paginate',auth('readAny','articles'),articlesController.adminPaginate)

module.exports = router;
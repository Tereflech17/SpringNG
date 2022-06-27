const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isLoggedIn } = require('../middleware/index');
const { articleIndex, 
        articleNew, 
        articleCreate, 
        articleEdit, 
        articleUpdate, 
        articleDestroy 
    } = require('../controllers/article');

router.get('/details', asyncErrorHandler(articleIndex));

router.get('/new', articleNew);

router.post('/', asyncErrorHandler(articleCreate));

router.get('/details/:id/edit', asyncErrorHandler(articleEdit));

router.put('/details/:id', isLoggedIn, asyncErrorHandler(articleUpdate));

router.delete('/details/:id', isLoggedIn, asyncErrorHandler(articleDestroy))

module.exports = router;
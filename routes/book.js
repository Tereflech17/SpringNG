const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isLoggedIn } = require('../middleware/index');
const {  bookNew, 
         bookIndex, 
         bookCreate, 
         bookEdit, 
         bookUpdate,
         bookDestroy  
        } = require('../controllers/book');


router.get('/details', asyncErrorHandler(bookIndex))

/* GET book new /book/new */
router.get('/new', bookNew);

router.post('/', asyncErrorHandler(bookCreate));

router.get('/details/:id/edit', asyncErrorHandler(bookEdit));

router.put('/details/:id', isLoggedIn, asyncErrorHandler(bookUpdate));

router.delete('/details/:id', isLoggedIn, asyncErrorHandler(bookDestroy));

module.exports = router;
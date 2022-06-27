const Author = require('../models/user/author');
const Book = require('../models/book');


module.exports = {
    // Book Index
    async bookIndex(req, res, next){
        let author = await Author.findOne({}).where("userID").equals(req.user._id);
        let books = await Book.find({}).where("authorID").equals(author._id);
        res.render('book/index', { books });
    },

    // Book new
    bookNew(req, res, next){
        res.render('book/new');
    },

    // Book create
    async bookCreate(req, res, next){
        //get info about about. The author ID will be used to reference the book author ID field
        let author = await Author.findOne().where("userID").equals(req.user._id);

        console.log("author object====> ", author);
        
        //create new book
        req.body.book.authorID = author._id;
        let book = await Book.create(req.body.book);
       
        //assign book to author
        author.books.push(book);
         
        //save author's book
        await author.save();

        //redirect to TODO
        req.session.success = 'New book information added successfully!';
        res.redirect('/profile');

    },

    async bookEdit(req, res, next) {
        let book = await Book.findById(req.params.id)

        console.log("book===> ", book);
        res.render('book/edit', { book });
    },

    async bookUpdate(req, res, next) {
        //find book by id
        await Book.findByIdAndUpdate(req.params.id, req.body.book);
        req.session.success = 'Book updated successfully!';
        res.redirect('/author/book/details');
    },

    async bookDestroy(req, res, next){
        let author = await Author.findOne({}).where("userID").equals(req.user._id);
        await Author.findByIdAndUpdate(author._id, { 
            $pull: { books: req.params.id} 
        });
        await Book.findByIdAndRemove(req.params.id);
        req.session.success = 'Book deleted successfully!';
        res.redirect('/author/book/details');
    }
}
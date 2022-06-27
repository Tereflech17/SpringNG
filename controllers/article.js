const Author = require('../models/user/author');
const Article = require('../models/article');


module.exports = {
    // articles index
    async articleIndex(req, res, next) {
        let author =  await Author.findOne({}).where("userID").equals(req.user._id);

        console.log("author for article ===> ", author);
        let articles = await Article.find({}).where("authorID").equals(author._id);

        console.log("articles =====> ", articles);
        res.render('article/index', { articles });
    },

    // article new
    articleNew(req, res, next) {
        res.render('article/new');
    },

    async articleCreate(req, res, next) {
        let author  = await Author.findOne().where("userID").equals(req.user._id);

        req.body.article.authorID = author._id;
        let article = await Article.create(req.body.article);

        author.articles.push(article);

        await author.save();

        //redirect to TODO
        req.session.success = 'New article information added successfully!';
        res.redirect('/profile');
    },

    async articleEdit(req, res, next){
        let article =  await Article.findById(req.params.id);
        res.render('article/edit', { article });
    },

    async articleUpdate(req, res, next){
        // find article info by id and update info accordingly
        await Article.findByIdAndUpdate(req.params.id, req.body.article);
        req.session.success = 'Article updated successfully!';
        res.redirect('/author/article/details')


    },

    async articleDestroy(req, res, next){
        let author = await Author.findOne({}).where("userID").equals(req.user._id);
        await Author.findByIdAndUpdate(author._id, { 
            $pull: { articles: req.params.id} 
        });
        await Article.findByIdAndRemove(req.params.id);
        req.session.success = 'Article deleted successfully!';
        res.redirect('/author/article/details');
    }
}
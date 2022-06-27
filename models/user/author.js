const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('../book');
const Article = require('../article');

const AuthorSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    biography: String,
    location: String, 
    website: String,
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
           
    ],
    linkedin: String,
    twitter: String,
    instagram: String,
})

AuthorSchema.pre('remove', async function() {
    await Book.remove({
        _id: {
            $in: this.books
        }
    });
});

AuthorSchema.pre('remove', async function() {
    await Article.remove({
        _id: {
            $in: this.articles
        }
    });
});

module.exports = mongoose.model('Author', AuthorSchema);
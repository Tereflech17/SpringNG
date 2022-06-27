const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    articleTitle: String,
    publishingYear: String,
    articleDescription: String,
    authorID: { 
            type: Schema.Types.ObjectId,
            ref: 'Author'
        }
})


module.exports = mongoose.model('Article', ArticleSchema);
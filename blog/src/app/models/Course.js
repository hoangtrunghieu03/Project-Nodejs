const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);

const Course = new Schema(
    {
        name: { type: String, required: true },
        title: { type: String },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        comments: [CommentSchema],
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course);

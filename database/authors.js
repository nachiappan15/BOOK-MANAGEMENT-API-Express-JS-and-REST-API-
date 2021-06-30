const mongoose = require("mongoose");

// author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// author model
const Authormodel = mongoose.model( "authors",AuthorSchema);

module.export = Authormodel;
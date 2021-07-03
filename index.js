// getting express
const express = require("express");
const app =  express();
// body parser

const {json} = require("body-parser")//getting json only

app.use(json({bodyParser : true}));

// run server

app.listen(3000 , console.log("----------SERVER  is RUNNING----------"));



//getting env
require('dotenv').config();

// database connection
// getting mongoose for mango DB
const mongoose = require('mongoose');

//creating connecion
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("----------Connection Established----------");
});
// getting the modals
const BookModel = require("./database/book");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publication");



/*
    Route           /
    Data Required   ALL
    Body            none
    Description     to display all the details as it is the home page
    Access          public  
    Parameter       NONE    
    Method          GET
*/
// app.get("/", (req, res) => {
//     return res.json(database);
// });
//-------------------------------BOOKS-------------------------------


    //-------------------------------GET-------------------------------
/*
    Route           /books
    Data Required   books
    Body            none
    Description     to display all the books 
    Access          public  
    Parameter       NONE   
    Method          GET
*/

app.get("/books" , async (req,res) => {
    return res.json({books : await BookModel.find()});
})

/*
    Route           /books/isbn/:isbn
    Data Required   books
    Body            none
    Description     to display the specific book based on isbn
    Access          public  
    Parameter       isbn   
    Method          GET
*/
app.get("/books/isbn/:isbn" , async(req,res)=>{
    const parameter = req.params.isbn;
    const result  = await BookModel.findOne({ISBN : parameter});
    // error handling
    if(!result){
        return res.json({ERROR : `the details book of given ISBN ${parameter} is not available`});
    }
    return res.json({BOOK : result});
})

/*
    Route           /books/c/:category
    Data Required   books
    Body            none
    Description     to display the specific book based on category
    Access          public  
    Parameter       category   
    Method          GET
*/
app.get("/books/c/:category" , async(req,res)=>{
    const parameter = req.params.category;
    const result = await BookModel.findOne({category : parameter});

    //error handling
    if(!result){
        return res.json({ERROR : `the details book of given category ${parameter} is not available`});
    }
    return res.json({BOOK : result});

});

/*
    Route           /books/a/:author
    Data Required   books
    Body            none
    Description     to display the specific book based on author
    Access          public  
    Parameter       author   
    Method          GET
*/
app.get("/books/a/:author" , async(req,res)=>{
    const parameter = parseInt(req.params.author);
    const result = await BookModel.findOne({authors : parameter});

    //error handling
    if(!result){
        return res.json({ERROR : `the details book of given author ${parameter} is not available`});
    }
    return res.json({BOOK : result});

});
    //-------------------------------POST-------------------------------
/*
    Route           /books/new
    Data Required   books
    body            newBook
    Description     to add a new book 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/
app.post("/books/new" , async (req,res) => {
    const { newBook } = req.body;
    // pushing to database
    BookModel.create(newBook);
    return res.json({
        MESSAGE : "BOOK DETAILS ADDED"
    });
});

    //-------------------------------PUT-------------------------------
/*
    Route           /books/update/title/:isbn
    Data Required   books
    Body            newTitle
    Description     to update the book detials (title only for now)
    Access          public  
    Parameter       isbn   
    Method          PUT
*/
app.put("/books/update/title/:isbn", async (req,res)=>{
    const parameter = req.params.isbn;
    const {newTitle} = req.body;
    await BookModel.findOneAndUpdate(
        {ISBN : parameter},
        {title : newTitle},{new:true});
    return res.json({MESSAGE : "The title is updated"});
});
/*
    Route           /books/update/author/:isbn
    Data Required   books , authors
    Body            newAuthor
    Description     to update the book details for auhtor simultaneously mutate authors object
    Access          public  
    Parameter       isbn   
    Method          PUT
*/
app.put("/books/update/author/:isbn" , async(req,res)=>{
    const parameter = req.params.isbn;
    const {newAuthor} = req.body;
    await BookModel.findOneAndUpdate(
        {ISBN : parameter}, 
        {$push:{
            authors  :newAuthor
        }},{new:  true}
    );
    await AuthorModel.findOneAndUpdate(
        {id : newAuthor},
        {$addToSet: {books  : parameter}},
        {new: true}
    );
    return res.json({MESSAGE : "Author Updated"});
})
    //-------------------------------DELETE-------------------------------
/*
    Route           /book/delete/:isbn
    Data Required   books 
    Body            none
    Description     to delete a book
    Access          public  
    Parameter       isbn   
    Method          DELETE
*/
app.delete("/book/delete/:isbn" , async (req,res)=>{
    const parameter = req.params.isbn;
    await BookModel.findOneAndDelete({ISBN : parameter});
    return res.json({MESSAGE : "BOOK DELETED"});
})
/*
    Route           /book/delete/author/:isbn
    Data Required   books 
    Description     to delete an author from a book nad mutate the authors data
    Access          public  
    req.body        deleteAuthor (author id)
    Parameter       isbn
    Method          DELETE
*/
app.delete("/book/delete/author/:isbn" ,async (req,res)=>{
    const parameter = req.params.isbn;
    const {deleteAuthor} = req.body;
    // deleting in BOOK database
    await BookModel.findOneAndUpdate(
        {ISBN : parameter},{$pull: {authors:deleteAuthor}},{new:true}
    );
    //deleting in Author database
    await AuthorModel.findOneAndUpdate(
        {id: deleteAuthor} , {$pull : {books : parameter}} , {new:true}
    );
    return res.json({MESSAGE : "Author Deleted"});
})



//-------------------------------AUTHORS-------------------------------

    //-------------------------------GET-------------------------------

/*
    Route           /authors
    Data Required   authors
    Body            none
    Description     to display all the authors detailes 
    Access          public  
    Parameter       NONE   
    Method          GET
*/
app.get("/authors", async(req, res) => {

    return res.json({ AUTHORS: await Authormodel.find()});
});
/*
    Route           /authors/name/:name
    Data Required   authors
    Body            none
    Description     to display a specific of  author based on author name
    Access          public  
    Parameter       name   
    Method          GET
*/
app.get("/authors/name/:name" ,async(req,res) => {
    const parameter = req.params.name;
    return res.json( await AuthorModel.findOne({name : parameter}));

});
/*
    Route           /authors/isbn/:isbn
    Data Required   authors
    Body            none
    Description     to display a list of  author based on isbn of book
    Access          public  
    Parameter       isbn   
    Method          GET
 */
    app.get("/authors/isbn/:isbn" ,async(req,res) => {
        const parameter = req.params.isbn;
        return res.json(await AuthorModel.findOne({books : parameter}));
    });
    //-------------------------------POST-------------------------------
/*
    Route           /authors/new
    Data Required   authors 
    Body            newAuthor
    Description     to update the authors detailes 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/
app.post("/authors/new" , async(req,res) => {
    const {newAuthor} = req.body;
    await AuthorModel.create(newAuthor).then(() => {
        return res.json({MESSAGE : "Author ADDED"});
    });
});

    //-------------------------------PUT-------------------------------
/*
    Route           /authors/update/name/:id
    Data Required   authors 
    Body            newName
    Description     to update Author name using id 
    Access          public  
    Parameter       id
    Method          PUT
*/
app.put("/authors/update/name/:id" ,async (req,res) =>{
    const parameter =  req.params.id;
    const {newName} = req.body;
    await AuthorModel.findOneAndUpdate(
        {id : parameter},
        {name : newName},
        {new: true}
    ).then(()=>{return res.json({ MESSAGE : "Name updated"})})
});
    //-------------------------------DELETE-------------------------------
/*
    Route           /authors/delete/:id
    Data Required   authors 
    Description     to Delete an author
    Access          public  
    Parameter       id  
    Method          DELETE
*/
app.delete("/authors/delete/:id" ,async(req,res)=>{
    const parameter = req.params.id;
    await AuthorModel.findOneAndDelete({id : parameter});
    //mutating in Book database
    await BookModel.findOneAndUpdate(
        {authors : parameter} , {$pull:{authors : parameter}} ,{new:true}
    );
    return res.json({MESSAGE : "Author Deleted"});
})





//-------------------------------PUBLICATIONS-------------------------------
    //-------------------------------GET-------------------------------
/*
    Route           /pub
    Data Required   publications
    Body            none
    Description     to display all the publications 
    Access          public  
    Parameter       NONE   
    Method          GET
*/
app.get("/pub" , async (req,res) =>{
    return res.json(await PublicationModel.find() );
})
/*
    Route           /pub/name/:name
    Data Required   publications
    Body            none
    Description     to display a specific publications 
    Access          public  
    Parameter       name   
    Method          GET
*/
app.get("/pub/name/:name" , async (req,res) =>{
    const parameter = req.params.name;
    const result = await PublicationModel.findOne({name: parameter});
    if(!result){
        return res.json({ERROR : `the Publication details of given name ${parameter}  is not available`});
    }
    return res.json({PUBLICATION : result});
});
/*
    Route           /pub/isbn/:isbn
    Data Required   publications
    Body            none
    Description     to display a list of  publications based on isbn of book
    Access          public  
    Parameter       isbn   
    Method          GET
 */
app.get("/pub/isbn/:isbn" ,async(req,res) => {
    const parameter = req.params.isbn;
    const result = await PublicationModel.findOne({books  : parameter});
    console.log(result);
    if(!result){
        return res.json({ERROR : `the Publications details for the specified book ${parameter} is not available`});
    }
    return res.json({PUBLICATION : result});
})

    //-------------------------------POST-------------------------------
/*
    Route           /pub/new
    Data Required   publications 
    Body            newPublication
    Description     to add new publication detailes 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/
app.post("/pub/new" , async(req,res) => {
    const {newPublication} = req.body;
    await PublicationModel.create(newPublication).then(() => {
        return res.json({MESSAGE : "Publication ADDED"});
    });
});
    //-------------------------------PUT-------------------------------

/*
    Route           /pub/update/name/:id
    Data Required   publications 
    Body            newName
    Description     to update publication name using id  
    Access          public  
    Parameter       id   
    Method          PUT
*/
app.put("/pub/update/name/:id" ,async (req,res) =>{
    const parameter =  req.params.id;
    const {newName} = req.body;
    await PublicationModel.findOneAndUpdate(
        {id : parameter},
        {name : newName},
        {new: true}
    ).then(()=>{return res.json({ MESSAGE : "Name updated"})})
});
/*
    Route           /pub/update/book/:id
    Data Required   publications ,Book
    Body            newBook
    Description     to update/add new book to an publication
    Access          public  
    Parameter       id   
    Method          PUT
*/
app.put("/pub/update/book/:id" , async(req,res)=>{ 
    const parameter =  parseInt(req.params.id);
    console.log(parameter);
    const {newBook} = req.body;
    console.log(newBook)
    await PublicationModel.findOneAndUpdate(
        {id : parameter},
        {$addToSet :{books: newBook}},{new : true}
    );
    await BookModel.findOneAndUpdate(
        {ISBN : newBook},{publication : parameter} , {new: true}
    );
    return res.json(
        {MESSAGE : "Publication updated"}
    );
});
    //-------------------------------DELETE-------------------------------
/*
    Route           /pub/delete/:id
    Data Required   authors 
    Body            none
    Description     to delete a publication
    Access          public  
    Parameter       id  
    Method          DELETE
*/
app.delete("/pub/delete/:id",async (req, res) => {
   const parameter = req.params.id;
   await PublicationModel.findOneAndDelete({id : parameter});
   await BookModel.findOneAndUpdate({publication : parameter} , {publication : 0}, {new : true});
   return res.json({MESSAGE : "Publication Deleted"});
});
/*
    Route           /pub/delete/book/:id
    Data Required   authors 
    Body            none
    Description     to delete a book from a publication
    req.body        isbn of book
    Access          public  
    Parameter       id  
    Method          DELETE
*/
app.delete("/pub/delete/book/:id" ,async (req,res)=>{
    const parameter = req.params.id;
    const {deleteBook} = req.body
    await PublicationModel.findOneAndUpdate(
        {id: parameter} , {$pull: {books : deleteBook} }, {new : true}
    );
    await BookModel.findOneAndUpdate(
        {ISBN : deleteBook} , {publication : 0} ,{new: true}
    );
    return res.json({MESSAGE : "Book Deleted in Publication"});

})
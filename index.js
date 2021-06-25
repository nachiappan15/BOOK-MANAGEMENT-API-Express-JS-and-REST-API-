// getting express
const { json } = require("body-parser");
const express = require("express");

//initializing express
const app = express();

// use json()
app.use(json({ bodyParser: true }));

// access database
const database = require("./database/index");



/*
    Route           /
    Data Required   ALL
    Description     to display all the details as it is the home page
    Access          public  
    Parameter       NONE    
    Method          GET
*/
app.get("/", (req, res) => {
    return res.json(database);
});

/*
    Route           /books
    Data Required   books
    Description     to display all the books 
    Access          public  
    Parameter       NONE   
    Method          GET
*/
app.get("/books", (req, res) => {
    return res.json({ BOOKS: database.books });
});

//    -------------     BOOKS      ----------------
/*
    Route           /books/isbn
    Data Required   books
    Description     to display the specific book based on isbn
    Access          public  
    Parameter       isbn   
    Method          GET
*/
app.get("/books/isbn/:isbn", (req, res) => {

    const parameter = req.params.isbn;//storing the paramter
    const result = database.books.filter(book => book.ISBN === parameter);//filtering values from database

    // error handling
    if (result.length === 0) {
        return res.json({ error: `no book is available based on the given isbn ${parameter}` });
    }

    return res.json({ BOOK: result });

});

/*
    Route           /books/c
    Data Required   books
    Description     to display the specific book based on category
    Access          public  
    Parameter       category   
    Method          GET
*/
app.get("/books/c/:category", (req, res) => {

    const parameter = req.params.category;//storing the paramter
    const result = database.books.filter(book => book.category.includes(parameter));//filtering values from database

    if (result.length === 0) {
        return res.json({ error: `no book is available based on the given category ${parameter}` });
    }
    return res.json({ BOOK: result });
});

/*
    Route           /books/a
    Data Required   books
    Description     to display the specific book based on author
    Access          public  
    Parameter       author   
    Method          GET
*/
app.get("/books/a/:author", (req, res) => {
    const parameter = req.params.author;//storing parameter
    // the value of author is of type number
    const result = database.books.filter(book => book.authors.includes(Number(parameter)));//filtering result from database
    // error handling
    if (result.length === 0) {
        return res.json({ error: `No books is available based on the  given author ${parameter}` })
    }
    return res.json({ BOOK: result });
});

//    -------------     AUTHORS      ----------------
/*
    Route           /authors
    Data Required   authors
    Description     to display all the authors detailes 
    Access          public  
    Parameter       NONE   
    Method          GET
*/
app.get("/authors", (req, res) => {
    return res.json({ AUTHORS : database.authors });
});

/*
    Route           /authors/name
    Data Required   authors
    Description     to display a specific of  author based on author name
    Access          public  
    Parameter       name   
    Method          GET
*/
app.get("/authors/name/:name", (req, res) => {
    const parameter = req.params.name//getting parameter
    const result = database.authors.filter(author => author.name.includes(parameter));
    // error handling
    if (result.length === 0) {
        res.json({ error: `No author is found for the name ${parameter}` });
    }
    return res.json({ AUTHORS: result });
});

/*
    Route           /authors/isbn
    Data Required   authors
    Description     to display a list of  author based on isbn of book
    Access          public  
    Parameter       isbn   
    Method          GET
 */
app.get("/authors/isbn/:isbn", (req, res) => {
    const parameter = req.params.isbn//getting parameter
    const result = database.authors.filter(author => author.books.includes(parameter));
    // error handling
    if (result.length === 0) {
        res.json({ error: `No author is found for the isbn ${parameter}` });
    }
    return res.json({ AUTHORS: result });
});


//    -------------     PUBLICATIONS      ----------------
/*
    Route           /pub
    Data Required   publications
    Description     to display all the publications 
    Access          public  
    Parameter       NONE   
    Method          GET
*/
app.get("/pub", (req, res) => {
    return res.json({ PUBLICATIONS : database.publications });
});

/*
    Route           /pub/name
    Data Required   publications
    Description     to display a specific publications 
    Access          public  
    Parameter       name   
    Method          GET
*/
app.get("/pub/name/:name" , (req,res) => {
    const parameter = req.params.name;//getting parameter
    const result  = database.publications.filter(p => p.name === parameter);//filtering data from database
    // error handling
    if(result.length === 0){
        return res.json({ error : `No publications available for the given data ${parameter}`});
    }
    return res.json( { PUBLICATIONS : result});

});

/*
    Route           /pub/isbn
    Data Required   publications
    Description     to display a list of  publications based on isbn of book
    Access          public  
    Parameter       isbn   
    Method          GET
 */
    app.get("/pub/isbn/:isbn", (req, res) => {
        const parameter = req.params.isbn//getting parameter
        const result = database.publications.filter(p => p.books.includes(parameter));
        // error handling
        if (result.length === 0) {
            res.json({ error: `No publications is found for the isbn ${parameter}` });
        }
        return res.json({ PUBLICATIONS: result });
    });




// listen to port 3000
app.listen(3000, console.log("🚀----------SERVER STARTED-----------🚀"));

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

//    -------------     BOOKS      ----------------
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

/*
    Route           /books/new
    Data Required   books
    Description     to add a new book 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/
app.post("/books/new", (req, res) => {
    const addable = req.body.newBooK;
    database.books.push(addable);
    return res.json({ BOOKS: database.books, MESSAGE: "books updated" });
});

/*
    Route           /books/update/title/:isbn
    Data Required   books
    Description     to update the book detials (title only for now)
    Access          public  
    Parameter       isbn   
    Method          PUT
*/
app.put("/books/update/title/:isbn" , (req,res) => {
    const parameter = req.params.isbn;
    const updateble = req.body.newTitle;
    database.books.forEach( book => {
        if(book.ISBN === parameter){
            book.title = updateble;
        }
    })
    return res.json( {BOOK : database.books , MESSAGE : "title updated"} );

});

/*
    Route           /books/update/author/:isbn
    Data Required   books
    Description     to update the book details for auhtor simultaneously mutate authors object
    Access          public  
    Parameter       isbn   
    Method          PUT
*/
app.put("/books/update/author/:isbn" , (req,res) => {
    const parameter = req.params.isbn;
    const updatable = req.body.newAuthor;
    console.log(updatable);
    // changing value in book
    database.books.forEach(i => {//getting the correct book
        if(i.ISBN === parameter){
            i.authors.push(updatable);
        }
    });
    // changing value of author in Authors
    database.authors.forEach(i => {
        if(i.id === updatable){
            i.books.push(parameter);
        }
    })

    return res.json( 
        {BOOKS : database.books ,
        AUTHORS : database.authors,
    MESSAGE : "BOOKS and AUTHORS are updated"} );

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
    return res.json({ AUTHORS: database.authors });
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

/*
    Route           /authors/new
    Data Required   authors 
    Description     to update the authors detailes 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/
app.post("/authors/new", (req, res) => {
    const addable = req.body.newAuthor;//getting required data from req.body
    database.authors.push(addable);
    return res.json({ AUTHORS: database.authors, MESSAGE: "Authors updated" });

});


/*
    Route           /authors/update/name/:id
    Data Required   authors 
    Description     to update Author name using id 
    Access          public  
    Parameter       id
    Method          PUT
*/
app.put( "/authors/update/name/:id", (req,res) => {
    const parameter = req.params.id;
    const { newName} = req.body;
    database.authors.forEach(author => {
        if(author.id == parameter){
            author.name = newName;
            return res.json( { AUTHORS : database.authors , MESSAGE : "author name updated" });
        }
        
    });
    
    return res.json( { Error : `The given ID ${parameter} is not available`});

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
    return res.json({ PUBLICATIONS: database.publications });
});

/*
    Route           /pub/name
    Data Required   publications
    Description     to display a specific publications 
    Access          public  
    Parameter       name   
    Method          GET
*/
app.get("/pub/name/:name", (req, res) => {
    const parameter = req.params.name;//getting parameter
    const result = database.publications.filter(p => p.name === parameter);//filtering data from database
    // error handling
    if (result.length === 0) {
        return res.json({ error: `No publications available for the given data ${parameter}` });
    }
    return res.json({ PUBLICATIONS: result });

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

/*
    Route           /pub/new
    Data Required   publications 
    Description     to add new publication detailes 
    Access          public  
    Parameter       NONE   (values added in req.body)
    Method          POST
*/

app.post("/pub/new" , (req,res) =>{
    const addable = req.body.newPublication;
    database.publications.push(addable);
    return res.json( { PUBLICATIONS : database.publications , MESSAGE : "publications updated" });
});


/*
    Route           /pub/update/name/:id
    Data Required   publications 
    Description     to update publication name using id  
    Access          public  
    Parameter       id   
    Method          PUT
*/

app.put( "/pub/update/name/:id", (req,res) => {
    const parameter = Number(req.params.id);
    const {newName} = req.body;
    database.publications.forEach(pub => {
        if(pub.id === parameter){
            pub.name = newName;
            return res.json( { PUBLICATIONS : database.publications , MESSAGE : "Publication Name changed" } );
        }
        
    })
    return res.json( { Error : `No publications available for the id ${parameter}` } );
});

/*
    Route           /pub/update/book/:id
    Data Required   publications 
    Description     to update/add new book to an publication
    Access          public  
    Parameter       id   
    Method          PUT
*/
app.put( "/pub/update/book/:id", (req,res) => {
    const parameter = Number(req.params.id);
    const {newBook} = req.body;
    // adding book isbn in publications
    database.publications.forEach(pub => {
        if(pub.id === parameter){
            pub.books.push(newBook);
        }
        
    })
    // mutating the books data
    database.books.forEach( book => {
        if(book.ISBN ==newBook){
            book.publication = parameter;
        } 
    });
    return res.json( { BOOKs : database.books , PUBLICATIONS : database.publications , MESSAGE : "publications data updated"} );
});


// listen to port 3000
app.listen(3000, console.log("🚀----------SERVER STARTED-----------🚀"));

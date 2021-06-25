// Database for books


const books = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
        ISBN: "12345TWO",
        title: "Getting started with PYTHON",
        authors: [1, 2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "python"],
        publication: 1,
      },
      {
        ISBN: "12345THREE",
        title: "Getting started with C",
        authors: [1, 3],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "C"],
        publication: 1,
      },
  ];
  
  const authors = [
    {
      id: 1,
      name: "Pavan",
      books: ["12345ONE" ,"12345THREE"],
    },
    {
      id: 2,
      name: "Deepak",
      books: ["12345ONE"],
    },
    {
        id: 3,
        name: "Karthick",
        books: ["12345THREE"],
      },
  ];
  
  const publications = [
    {
      id: 1,
      name: "chakra",
      books: ["12345ONE" , "12345THREE"],
    },
    {
        id: 2,
        name: "Zen",
        books: ["12345TWO"],
      },
  ];
  
// exporting database
module.exports = {books,authors,publications};

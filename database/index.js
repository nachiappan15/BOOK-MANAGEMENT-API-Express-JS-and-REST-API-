// Database for books


let books = [
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
    publication: 2,
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

let authors = [
  {
    id: 1,
    name: "Pavan",
    books: ["12345ONE","12345TWO", "12345THREE"],
  },
  {
    id: 2,
    name: "Deepak",
    books: ["12345TWO"],
  },
  {
    id: 3,
    name: "Karthick",
    books: ["12345THREE"],
  },
];

let publications = [
  {
    id: 1,
    name: "chakra",
    books: ["12345ONE", "12345THREE"],
  },
  {
    id: 2,
    name: "Zen",
    books: ["12345TWO"],
  },
];

// exporting database
module.exports = { books, authors, publications };

// create variable to hold db connection
// db will store the connected database object
let db;

// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
// request variable will act as an event listener for the database
/* the open() method takes 2 parameters.
1. name of the database to create
2. the version of the database */
const request = indexedDB.open('pizza_hunt', 1);
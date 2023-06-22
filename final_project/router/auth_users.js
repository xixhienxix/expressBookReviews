const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require('express-session')

let users = [];

const isValid = (username)=>{ //returns boolean
 if (username!=''){
     return true
 }else{
     return false
     }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    for(let i=0;i<users.length;i++){
        if(username==users[i].username & password==users[i].password){
            return true
        }else 
        {
            return false
        }
    }
}

// Return List of Users
regd_users.get('/',function (req, res) {
    return res.status(300).json(users);
});

//only registered users can login
regd_users.get("/login", (req,res) => {
    const user_id = req.query.username;
    const password = req.query.password;

    const valido = authenticatedUser(user_id,password)

    if(valido){
        if (!user_id) {
            return res.status(404).json({message: "Body Empty"});
        }
        let accessToken = jwt.sign({
            data: user_id
          }, 'access', { expiresIn: 60 * 60 });
          req.session.authorization = {
            accessToken
        }
        return res.status(200).send("Customer Succesfully logged in");
          }else{
        return res.status(300).json({message: "invalid username or password"});
          }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn
    let reviews = []

  reviews.push({ "User" : users[0].username,
                 "Review" :  "Awsome Books, very intriging on each chapter"})
  
  for(let i=0;i<books.length;i++){
    if(isbn==books[i].isbn){
        book[i].reviews = reviews
    }
   }

  return res.status(300).json({message: "The review for this book with ISNB : "+req.params.isbn+ " has been added/updated"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn

  for(let i=0;i<books.length;i++){
    if(isbn==books[i].isbn){
        book[i].reviews = {}
    }
   }

  return res.status(300).json({message: "Review for the ISNB : "+req.params.isbn+ " posted by the user: "+users[0].username+ " was deleted. "});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
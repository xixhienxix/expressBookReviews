const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {

  const user_id = req.query.username;
  const password = req.query.password;

  let validMessage
  let userExistMsg = ""
  
  for(let i=0; i<users.length;i++){
    if(users[i].username==user_id){
      userExistMsg = "User :"+user_id+" Already Exist, use another usernme!"
    }
  }

  users.push({"username":user_id,"password":password})

  if(!req.query.username){
    res.status(200).json("UserName Was nos Provided");
  } else if
  (!req.query.password){
    res.status(200).json("Password Was nos Provided");
  }   

  if(isValid)
  {
    validMessage = "Valid username"
  }else if(!isValid){
    validMessage = "Invalid Username"
  }



  if(userExistMsg!=""){
    res.status(200).send(userExistMsg)
  }else{
    res.status(200).send(user_id+" is "+validMessage + " - User: "+user_id+ " is register Succesfully");
  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        resolve(books)
        })
    
    myPromise.then((successMessage) => {
        if(successMessage){
            return res.status(300).json(books);
        }else{
            return res.status(300).json({message:"Promise cant retrive the book list"});
        }
    })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn
  const bookISBN = books[isbn]

  let isbnPromise = new Promise((resolve,reject)=>{
      resolve(bookISBN),
      reject("No Books Isbn Found")
  })

  isbnPromise.then((success)=>{
      if(success==bookISBN){
        return res.status(300).json(bookISBN);
      }else 
      {
          return res.status(300).json({message:"No ISBN Found"})
      }
  })

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var result = [];

    for(var i in books)
        if([books[i].author]==req.params.author)
    {
    result.push([books[i]])
    }

    let authorPromise = new Promise((resolve,reject)=>{
        resolve(result)
    })
    authorPromise.then((success)=>{
        if(success==result){
            return res.status(300).json(result);
        }else
        {
            return res.status(300).json({message:"no author found"})
        }
    })

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var result = [];

    for(var i in books)
        if([books[i].title]==req.params.title)
    {
    result.push([books[i]])
    }

    let titlePromise = new Promise((resolve,reject)=>{
        resolve(result)
    })

    titlePromise.then((success)=>{
        if(success==result){
            return res.status(300).json(result);
        }else
        {
            return res.status(300).json({message:"no tittle found"});
        }
    })

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    var result = [];

    for(var i in books)
        if([books[i].isbn]==req.params.isbn)
    {
    result.push([books[i].review])
    }

    return res.status(300).json(result);
});

module.exports.general = public_users;


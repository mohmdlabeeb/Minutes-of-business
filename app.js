//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is an application to note down minutes of business in any an easy way and to keep it organised. Please don't share this link as this is private.";

const app = express();

let postArray=[];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  res.render("home",{content:homeStartingContent, post:postArray,option:0});
});

app.get('/rm',function(req,res){
  res.render("home",{content:homeStartingContent, post:postArray,option:1});
})

app.get('/compose',function(req,res){
  res.render("compose");
 
})

app.post('/compose',function(req,res){
  const post= {
    title: req.body.title,
    postBody: req.body.post
  };
  postArray.push(post);
  res.redirect('/');
});

app.get('/posts/:topic',function(req,res){
  postArray.forEach(function(element){

  const urlTopic = req.params.topic;
  const titleTopic = element.title;
  const titlebody = element.postBody;

  const urlTopicLowered = _.lowerCase(urlTopic);
  const titleTopicLowered = _.lowerCase(titleTopic);

  if(urlTopicLowered==titleTopicLowered)
  {
    res.render("post.ejs",{heading:titleTopic, titleB: titlebody});
  }
  else
  {
    console.log("not found");
  }
  });
  
  
});

app.get('/remove/:topic',function(req,res){
  postArray.forEach(function(element){

  const urlTopic = req.params.topic;
  const titleTopic = element.title;
  const titlebody = element.postBody;

  const urlTopicLowered = _.lowerCase(urlTopic);
  const titleTopicLowered = _.lowerCase(titleTopic);

  if(urlTopicLowered==titleTopicLowered)
  {
    const arrayIndex = postArray.indexOf(element);
    if(arrayIndex>-1)
    {
      postArray.splice(arrayIndex,1);
    }
    res.redirect('/');
  }
  else
  {
    console.log("not found");
  }
  });


});





app.listen(3000, function() {
  console.log("Server started on port 5000");
});

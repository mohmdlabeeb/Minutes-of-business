//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is an application to note down minutes of business in an easy way and to keep it organised. Please don't share this link as this is private.";
const removePage = "BE CAREFUL, THIS PROCESS CANNOT BE UNDONE"
const app = express();

let postArray = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render("home", { content: homeStartingContent, head:"Home",post: postArray, option: 0 });
});

app.get('/rm', function (req, res) {
  res.render("home", { content: removePage, head:"Remove",post: postArray, option: 1 });
})

app.get('/compose', function (req, res) {
  res.render("compose");

})

app.post('/compose', function (req, res) {
  const post = {
    date: req.body.Date,
    Topic: req.body.Topic,
    Attendees: req.body.Attendees,
    Topic: req.body.Topic,
    Decision: req.body.Decision,
    nweek: req.body.nweek,
    meet: req.body.meet,
    post: req.body.post

  };
  postArray.push(post);
  res.redirect('/');
});

app.get('/posts/:topic', function (req, res) {
  postArray.forEach(function (element) {

    const urlTopic = req.params.topic;
    const titleTopic = element.Topic;
    const titledate = element.date;
    const attendees = element.Attendees;
    const topic = element.Topic;
    const decision = element.Decision;
    const nweek = element.nweek;
    const meet = element.meet;
    const post = element.post;

    const urlTopicLowered = _.lowerCase(urlTopic);
    const titleTopicLowered = _.lowerCase(titleTopic);

    if (urlTopicLowered == titleTopicLowered) {
      res.render("post.ejs", { date: titledate, topic:topic, attendees: attendees, decision: decision, nweek: nweek, meet: meet, post: post });
    }
    else {
      console.log("not found");
    }
  });


});

app.get('/remove/:topic', function (req, res) {
  postArray.forEach(function (element) {

    const urlTopic = req.params.topic;
    const titleTopic = element.Topic;
    const titlebody = element.postBody;

    const urlTopicLowered = _.lowerCase(urlTopic);
    const titleTopicLowered = _.lowerCase(titleTopic);

    if (urlTopicLowered == titleTopicLowered) {
      const arrayIndex = postArray.indexOf(element);
      if (arrayIndex > -1) {
        postArray.splice(arrayIndex, 1);
      }
      res.redirect('/');
    }
    else {
      console.log("not found");
    }
  });


});





app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});

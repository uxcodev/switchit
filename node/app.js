const path = require("path");
const dotenv = require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require('./controllers/error');
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const app = express();

// const leadRoutes = require("./routes/leads");
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const leadRoutes = require("./routes/leads");
const offerRoutes = require("./routes/offers");
const importRoutes = require("./routes/imports");
const campaignRoutes = require("./routes/campaigns");
const filtersetRoutes = require("./routes/filtersets");
const chatRoutes = require("./routes/chat");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PACTH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/leads", leadRoutes);
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/leads", leadRoutes);
app.use("/offers", offerRoutes);
app.use("/imports", importRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/filtersets", filtersetRoutes);
app.use("/chat", chatRoutes);

app.use(errorController.get404);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
});


// console.log(process.env.MONGO_DB)
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pn3wxtf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(result => {
    const listner = app.listen(process.env.PORT || 3000, function () {
      console.log('Server is listening on port ' + listner.address().port);
    });

  }).catch(err => {
    // console.log(err)
  })
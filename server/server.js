const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(passport.initialize());
app.use(passport.session());


app.use((err,req,res,next)=>{
  if(err){
    console.log(err);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use('/auth' , require('./auth/auth'))
const port =process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
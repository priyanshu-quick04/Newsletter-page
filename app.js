
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

})

app.post("/",function(req,res){
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;
  //
  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);

  const data = {

    members:[
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url="https://us21.api.mailchimp.com/3.0/lists/d942b5769e";
  const options={
    method: "POST",
    auth: "priyanshu:b662541353e2bb6be8d8e2af92996e26-us21"
  }

  const request = https.request(url, options, function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
    const chechCode=response.statusCode;
    if(chechCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})




app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})


// API Key
// b662541353e2bb6be8d8e2af92996e26-us21

// list id
// d942b5769e

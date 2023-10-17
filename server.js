//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

// Create a server to listen at port 8080
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

//Step 1: Create a new user variable
var user = {
    "user6": {
        "company": "Company A",
        "Name":"Jane Smith",
        "Position":"Cashier",
        "Location":"Washington DC",
        "id":1
      },
} 

//The addUser endpoint
app.post('/addUser', function(req, res){
    //Step 2: read existing users
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append user variable to list
        data["user6"] = user["user6"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

// Endpoint to get all employees by company name
app.get('/:companyName', function (req, res) {
    const companyName = req.params.companyName;

    // First retrieve existing user list
    fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
        if (err) {
            res.status(500).send('Error reading users.json');
            return;
        }

        const users = JSON.parse(data);

        // Filter employees based on company name
        const employeesByCompany = Object.values(users).filter(user => user.company === companyName);

        if (employeesByCompany.length > 0) {
            console.log(employeesByCompany);
            res.json(employeesByCompany);
        } else {          
        }
    });
});

  //Code to delete a user by id
  var id = 3;
  app.delete('/deleteUser', function (req, res) {
     // First retrieve existing users
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + 3];
         
        console.log( data );
        res.end( JSON.stringify(data));
     });
  })
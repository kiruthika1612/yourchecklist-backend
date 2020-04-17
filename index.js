var express = require('express')
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sansusa27",
    database: "ycdb"
});

var app = express()
app.use(cors())
app.use(bodyParser.json())

con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});


app.get('/sample', (req, res) => {

    res.send('Sending back response! Hi susa...');

})



app.post('/signup', (req, res) => {

    var customer = req.body;
    console.log(customer);
    var sql = "insert into Customers(LastName, FirstName, Email, Pwd, DOB,  Streetno, Streetname, Complement ,City,Province,Country ,Postalcode) values('" + customer.lastName + "','" + customer.firstName + "','" + customer.email + "','" + customer.password + "','" + customer.dob + "','" + customer.streetno + "','" + customer.streetname + "','" + customer.complement + "','" + customer.city + "','" + customer.province + "','" + customer.country + "','" + customer.postalCode + "')";
    con.query(sql, function (err, result) {
        if (err) {
            var response = { message: 'Failed to sign up! Please retry..', statusCode: 400 }
        } else {
            console.log("1 record inserted");
            res.status(200)
            var response = { message: 'Cusotmer Signed up Succesfully', statusCode: 200 }
        }
        res.send(response)

    });


});

app.post('/authenticateCustomer', (req, res) => {
    var customer = req.body;
    console.log(customer);
    var email = customer.email;
    var password = customer.password;
    var sql = "SELECT * FROM CUSTOMERS WHERE Email = ? AND pwd = ?";

    con.query(sql, [email, password], function (err, result, fields) {
        if (err) {
            console.log("Error here while executing select user query")
            var responsePayload = { error: "Error occured while Authenticating", status: false };
            res.status(403);
            res.send(responsePayload)
        } else {
            console.log("records being fetched");
            if (result.length > 0) {
                var responsePayload = { message: "Authentication Successfull", customerId: result[0].Cid, customerName: result[0].FirstName + " " + result[0].LastName, status: true };

                res.status(200);
                res.send(responsePayload)
            } else {
                var responsePayload = { message: "Authentication Failed. Email Id/Password is Incorrect", status: false };
                res.status(400);
                res.send(responsePayload)
            }
        }
    });

});

app.listen(3000)
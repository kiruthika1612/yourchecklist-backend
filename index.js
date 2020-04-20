var express = require('express')
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RamMala@2708",
    database: "ycdb"
});

var app = express()
//since we  are using two ports
app.use(cors())
//using json format
app.use(bodyParser.json())

con.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

//sample test
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
                var responsePayload = { message: "Authentication Successfull", customerId: result[0].Cid, customerName: result[0].FirstName + result[0].LastName, status: true };

                res.status(200);
                res.send(responsePayload)
            } else {
                var responsePayload = { message: "Authentication Failed. Email Id/Password is Incorrect", status: false };
                res.status(200);
                res.send(responsePayload)
            }
        }
    });

});


// customer purchase products
app.post('/buy', (req, res) => {

    var customer_product = req.body;
    console.log(customer_product);
    var sql = "insert into customer_products(cid,pid) values (" + customer_product.cid + ",'" + customer_product.pid + "')";
    con.query(sql, function (err, result) {
        if (err) {
            var response = { message: 'Failed to purchase product! Please retry..', statusCode: 400 }
        } else {
            res.status(200)
            var response = { message: 'Product purchased successfully', statusCode: 200 }
        }
        res.send(response)

    });
});

// customer retrive products
app.post('/getmyproducts', (req, res) => {

    var customer_product = req.body;
    var cid = customer_product.cid;
    console.log(customer_product);

    var sql = "select p.pid,p.productName,p.productImageUrl from products p join customer_products cp on p.pid = cp.pid where cp.cid = ?";
    con.query(sql, [cid], function (err, result) {
        if (err) {
            var response = { message: 'Failed Retrieve products Please retry..', statusCode: 400 }
            res.send(response)
        } else {
            res.status(200)
            var response = { products: result, totalItems: result.length }
            res.send(response)
        }

    });
});

app.get('/getUserDetails/:cid', (req, res) => {
    var cid = req.params.cid;

    var sql = "select LastName, FirstName, Email, DOB,  Streetno, Streetname, Complement ,City,Province,Country ,Postalcode from customers where Cid = ?";
    con.query(sql, [cid], function (err, result) {
        if (err) {
            var response = { message: 'Failed Retrieve customer details.. Please retry..', statusCode: 400 }
            res.send(response)
        } else {
            res.status(200)
            res.send(result[0])
        }

    });
});

app.listen(3000)
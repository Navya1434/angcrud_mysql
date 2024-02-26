const express = require('express');
const bodyparser = require ('body-parser');
const cors = require('cors');
const mysql =require('mysql2');

const app = express();

app.use(cors());

app.use(bodyparser.json());

//Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NewPassword',
    database: 'appdatahub',
    port: 3306
});


//Check Database Connection
db.connect(err=>{
    if(err){console.log(err, 'db err');}
    console.log('Database connected...');
});



//Get all data
app.get('/emp',(req, res)=>{
    let qr = `select * from emp`;
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, 'errs');
        }

        if(result.length>0){
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });
});

//Get single data
app.get('/emp/:empid', (req, res)=>{
    let gID = req.params.empid;
    let qr = `select * from emp where empid = ${gID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        if(result.length>0){
            res.send({
                message: 'Single user data',
                data: result
            });
        }
        else {
            res.send({
                message: 'data not found'
            });
        }
    })
});


//Create data
app.post('/emp',(req, res)=>{
    console.log(req.body, 'createdata');

    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let addr = req.body.address;
    let cty = req.body.city;

    let qr = `insert into emp(firstname, lastname, email, mobile, address, city) values ('${fname}', '${lname}', '${eMail}', '${mb}' '${addr}', '${cty}' )`;

    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    })
});


//Update single data
app.put('/emp/:empid', (req, res)=>{
    let qID = req.params.empid;

    console.log(req.body, 'update data');
    

    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let addr = req.body.address;
    let cty = req.body.city;

    let qr = `update emp set firstname = '${fname}', lastname = '${lname}', email = '${eMail}', mobile = '${mb}', address = '${addr}', city = '${cty}' where empid=${qID}`;

    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'data updated',
        });
    })

});



//Delete single data
app.delete('/emp/:empid', (req, res)=>{
    let qID = req.params.empid;
    let qr = `delete from user where id = ${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'data deleted'
        });
    })
});


app.listen(3000,()=>{
    console.log('Server running..');
});


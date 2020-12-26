  
var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyparser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

require('dotenv').config();
const mongo_user = process.env.MONGO_USER;
const mongo_key = process.env.MONGO_KEY;
const token_secret = process.env.TOKEN_SECRET;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${mongo_user}:${mongo_key}@listycluster.smbcu.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

const client = new MongoClient(uri, { useNewUrlParser: true });

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

client.connect(err => {
    if(err){
        console.log(err);
    }
    console.log("Connected to MongoDB");
    collection = client.db("Listy-DB").collection("Listy-Collection");
});

app.post('/api/login', (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;

    collection.findOne({email: email}, (err, result) => {
        if(err) throw err;
        if(result === null){
            res.send({status: "Invalid Email"});
            return;
        }
        if(bcrypt.compareSync(pass, result.password)){
            let payload = { subject: result._id }
            let token = jwt.sign(payload, `${token_secret}`);
            res.status(200).send({token});
        } else{
            res.send({status: "Invalid Password"});
        }
    });
});
app.post('/api/register', async (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    let name = req.body.username;
    console.log(email);
    console.log(pass);
    console.log(name);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    let user = {
        email: email,
        password: hashedPassword,
        username: name
    }
    collection.insertOne(user, (err, result) => {
        if(err){
            console.log(err);
            res.send({status: 400});
            return;
        }
        let payload = { subject: user._id };
        let token = jwt.sign(payload, `${token_secret}`);
        res.status(200).send({token});
    });
});
app.post('/api/checkExistingUser', (req, res) => {
    let email = req.body.email;
    collection.findOne({email: email}, (err, result) => {
        if(err){
            console.log(err);
            res.send({status: 400});
            return;
        }
        if(result === null){
            res.send({status: 404});
        } else{
            res.send({status: 200});
        }
    });
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
client.close();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
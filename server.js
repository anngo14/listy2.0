  
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
function verifyToken(req, res, next) {
    console.log("verify");
    if(!req.headers.authorization){
        return res.status(401).send({status: "Unauthorized" });
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(token === 'null'){
        return res.status(401).send({status: "Unauthorized" });
    }
    let payload = jwt.verify(token, `${token_secret}`);
    if(!payload){
        return res.status(401).send({status: "Unauthorized" });
    }
    req.userId = payload.subject;
    next();
} 
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

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    let user = {
        email: email,
        password: hashedPassword,
        username: name,
        avatar: 0,
        lists: [],
        selected: {}
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
app.post('/api/getUsername', (req, res) => {
    let email = req.body.email;
    collection.findOne({email: email}, { projection: { _id: 0, username: 1 }}, (err, result) => {
        if(err) throw err;
        res.send({result});
    });
});
app.post('/api/getAvatar', (req, res) => {
    let email = req.body.email;
    collection.findOne({email: email}, { projection: { _id: 0, avatar: 1 }}, (err, result) => {
        if(err) throw err;
        res.send({result});
    });
})
app.post('/api/getLists', (req, res) => {
    let email = req.body.email;
    collection.findOne({email: email}, { projection: { _id: 0, lists: 1 }}, (err, result) => {
        if(err) throw err;
        res.send({result});
    });
});
app.post('/api/addList', (req, res) => {
    let email = req.body.email;
    let list = req.body.list;
    collection.updateOne({email: email}, 
        {
            $push: {
                lists: {
                    id: list.id,
                    title: list.title,
                    list: list.list,
                    complete: list.complete
                }
            }
        })
        .catch((err) => {
            if(err) console.log(err);
        });
    res.send({status: 200});
});
app.post('/api/getSelected', (req, res) => {
    let email = req.body.email;
    collection.findOne({email: email}, { projection: { _id: 0, selected: 1 }}, (err, result) => {
        if(err) throw err;
        res.send({result});
    });
});
app.post('/api/updateSelected', (req, res) => {
    let email = req.body.email;
    let list = req.body.list;
    collection.updateOne({email: email}, 
        {
            $set: {
                selected: {
                    id: list.id,
                    title: list.title,
                    list: list.list,
                    complete: list.complete
                }
            }
        })
        .catch((err) => {
            if(err) console.log(err);
        });
    res.send({status: 200});
});
app.post('/api/deleteList', (req, res) => {
    let email = req.body.email;
    let id = req.body.id;
    collection.updateOne({email: email}, 
        {
            $pull: {
                lists: { id: id }
            }
        })
        .catch((err) => {
            if(err) console.log(err);
        });
    res.send({status: 200});
});
app.post('/api/updateList', (req, res) => {
    let email = req.body.email;
    let list = req.body.list;
    collection.updateOne({email: email},
        {
            $set: {
                lists: list
            }
        })
        .catch((err) => {
            if(err) console.log(err);
        });
    res.send({status: 200});
});
app.post('/api/deleteAccount', (req, res) => {
    let email = req.body.email;
    collection.deleteOne({email: email}, (err, result) => {
        if(err) throw err;
        res.send({status: 200});
    })
});
app.post('/api/updateUser', (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    collection.updateOne({email: email}, {
        $set: {
            username: name
        }
    });
    res.send({status: 200});
});
app.post('/api/changePassword', async (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    collection.updateOne({email: email}, {
        $set: {
            password: hashedPassword
        }
    });
    res.send({status: 200});
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
client.close();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient

const url = `mongodb://127.0.0.1:27017/`
var db;
var todo;
const app = express();
const PORT = 5000;

//Creating database connection
MongoClient.connect(url, (err, client) => {
    if (err) return console.error(err);
    db = client.db('CRUD');
    todo = db.collection('todo');
    console.log(`Connected to Database`)
})

//to remove CORS error and allow accessibility to API from other IPs
app.use(cors({
    origin: "https://127.0.0.1:3000"
}))
//server can accept json in the body of a request
app.use(express.json())


app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`)
})

app.get('/todos', (req, res)=>{
    db.collection(todo).find().toArray()
        .then(results=>{
            res.send(results)
        })
        .catch(err=>console.error(err))
})

app.post('/todos', (req, res)=>{
    todo.insertOne(req.body)
        .then(result =>{
            console.log(result)
        })
        .catch(err=> console.error(err))
})

app.put('/todos', (req, res)=>{
    
})
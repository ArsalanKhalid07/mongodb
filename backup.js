const express  = require("express");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());
//db start
const connectionClient = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connectionClient);

const db = client.db("studentDb");
const student = db.collection("students");
// db end

//* request method start

//get
app.get("/student",(req,res,next) => {
    const {name} = req.query;
        student
        .find({name:name})
        .toArray()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err.message))
})

//put
app.put("/student",(req,res,next) =>{ 
    const {name} = req.query;
    const {dept} = req.body;
    student.updateMany({name},{$set: {dept:dept}})
    .then((data)=>{console.log(data);res.status(200).json({message: "student updated "})})
    .catch((err) => {res.status(500).json({ message: err.message})})

})


//delete 
app.delete("/student",(req,res,next) => {
    const {dept} = req.query;
    student
    .deleteMany({dept})
    .then(() => {res.status(200).json({message: "delete data"})})
    .catch((err)=> {res.status(500).json({message: err.message})})
})

//post 
app.post("/student",(req,res,next) => {
    student
    .insertMany(req.body)
    .then(()=> {
        res.status(201).send("student add successfully")
    })
    .catch((err) => {
        res.status(500).send(err.message);
    })
})

app.get("/",(req,res) => {
    res.send("aweiuwgqiu i2hh3i2")

})
// request method end 

//connection info start
app.listen(8000,() => {
    console.log("connected")
})
client.connect().then(()=>{console.log("database connected")}).catch((err) => {console.log(err)})
//connection info end
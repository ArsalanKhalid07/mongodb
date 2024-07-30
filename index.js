const express  = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


//************* connect database start*/
const connectionClient = "mongodb://localhost:27017/studentData";
mongoose
.connect(connectionClient)
.then(()=>{
    console.log("connected sucessfully...")
})
.catch((err)=>{
    console.log(err)
})
//************* connect database end*/





//************* scheme start*/
const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    dept: String,
})

const Student = mongoose.model("student",studentSchema);
//************* scheme end*/




//************* request method start*/
//post single
app.post("/student/single",async (req,res,next) => {
    try {
        const {name,email,age,dept} = req.body;
        const studentadd = new Student({name:name,email:email,age:age,dept:dept});
        await studentadd.save();
        res.status(200).json({message: "added"})

    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//post double
app.post("/student/multiple",async (req,res,next) => {
    try {   
       await Student.insertMany(req.body);
       res.status(200).json({message:"added sucessfully"})

    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//put single using query
app.put("/student/single" , async (req,res,next) => {
    try {
        const {email} = req.query;
        const {dept} = req.body;
       await Student.findOneAndUpdate({email},{dept});
       res.status(200).json({message:"update single "})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//put single using param
app.put("/student/single/:id" , async (req,res,next) => {
    try {
        const {id} = req.params;
        const {dept} = req.body;
    //    const student  = await Student.findById(id);
    const student = await Student.findOne({_id:id})
        student.dept = dept;
        await student.save();
       res.status(200).json({message:"update single "})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//put multi 
app.put("/student/multiple", async (req,res,next) => {
    try {
        const {dept} = req.query;
        const {age} = req.body;
        await Student.updateMany({dept},{age});
        res.status(500).json({message:"upadted "})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})


//get single
app.get("/student/single/:id", async (req,res,next) => {
   try {    
        const {id} = req.params;
       const data =  await Student.findOne({_id:id});
        res.status(200).json({data})
   }catch(err) {
    res.status(500).json({message:err.message})
   }
})

//get multi
app.get("/student/multiple", async (req,res,next) => {
    try {
        const {dept} = req.query;
        const data = await Student.find({dept});
        res.status(200).json({data})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})


//delete single
app.delete("/student/single/:studentDelete", async (req,res,next) => {
    try {
        const {studentDelete} = req.params;
         await Student.findByIdAndDelete(studentDelete);
         res.status(200).json({message: "deleted single"})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//delete many
app.delete("/student/multi", async (req,res,next) => {
    try {
        const {dept} = req.query;
         await Student.deleteMany({dept});
         res.status(200).json({message: "deleted many"})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//************* request method end*/



//connection info start
app.listen(8000,() => {
    console.log("connected 8000")
})

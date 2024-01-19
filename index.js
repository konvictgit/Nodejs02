const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8001;

app.use(express.urlencoded({extended:false}));

app.use((req,res,next) =>{
    console.log("Hello from middleware 1");
    next();
});

app.use((req,res,next) =>{
    console.log("Hello from middleware 2");
    res.end("two");
    
});

app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res)=>{
    res.json({status: "pending"});
})
.delete((req,res)=>{
    res.json({status: "pending"});
})



app.post(("/api/users"),(req,res)=>{

    const body = req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        res.json({status: "success", id: users.length });
    })
    
})

app.listen(PORT,()=> console.log("Server started"));



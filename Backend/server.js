var express = require('express');
var url= require('url');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var path= require('path');
const { json } = require('body-parser');
app.use(cors());
var dbo;
var urlmongo = "mongodb+srv://abinav:Abinav@!21@cluster0.bybzn.mongodb.net/todo?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongodb.connect(urlmongo, { useUnifiedTopology: true } , function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    dbo = db.db("todo");
});


app.post('/save', function(request,response){
    var params = request.body;
    console.log(params);
    dbo.collection("addtoDo").insertOne(params , function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(res);
    response.send(res);
  });
});
app.post('/saveOffice', function(request,response){
    var params = request.body;
    console.log(params);
    dbo.collection("addtoDoOffice").insertOne(params , function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(res);
    response.send(res);
  });
});
app.get('/get', function(request, response){
    dbo.collection("addtoDo").find({}).toArray(function(err, res) {
        if (err) throw err;
        for(let i = 0; i<res.length;i++){
            if(!("id" in res[i])){
                res[i].id=String(res[i]._id);
            }
        }
        let task=[];
        task=res.filter((data)=>(data.isDone == 'N'));
        res.forEach(element => {
            if(element.isDone == 'Y'){
                task.push(element);
            }
        });
        response.send(task);
        console.log(task);
      });
});
app.get('/getOffice', function(request, response){
    dbo.collection("addtoDoOffice").find({}).toArray(function(err, res) {
        if (err) throw err;
        for(let i = 0; i<res.length;i++){
            if(!("id" in res[i])){
                res[i].id=String(res[i]._id);
            }
        }
        let task=[];
        task=res.filter((data)=>(data.isDone == 'N'));
        res.forEach(element => {
            if(element.isDone == 'Y'){
                task.push(element);
            }
        });
        response.send(task);
        console.log(task);
      });
});
app.delete(`/delete/:id`, function(request , response){
    let param = JSON.parse(request.params.id);
    console.log("Coming inside Delete", request, "Completed",param);
    dbo.collection("addtoDo").deleteOne(param , function(err, res){
        if(err) throw err;
        response.send(res);
});
});
app.delete(`/deleteOffice/:id`, function(request , response){
    let param = JSON.parse(request.params.id);
    console.log("Coming inside Delete Office", request, "Completed office",param);
    dbo.collection("addtoDoOffice").deleteOne(param , function(err, res){
        if(err) throw err;
        debugger;
        response.send(res);
        console.log("Response delete", res);
});
});
app.patch('/update/:id', function(request,response){
    let param = {$set : request.body};
    console.log("Request.body",param,"Request------Params =",request.params);
    let myquery = JSON.parse(request.params.id);
    dbo.collection("addtoDo").updateOne(myquery, param, function(err, res) {
        if (err) throw err;
        response.send(res);
        console.log(res);
        console.log("document Updated");
    });
});
app.patch('/updateOffice/:id', function(request,response){
    let param = {$set : request.body};
    let myquery = JSON.parse(request.params.id);
    dbo.collection("addtoDoOffice").updateOne(myquery, param, function(err, res) {
        if (err) throw err;
        response.send(res);
        console.log(res);
        console.log("document Updated");
    });
});
app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  });
app.listen(process.env.PORT || 8080);
// Run the app by serving the static files
// in the dist directory

app.use('/',express.static(path.join(__dirname + '/../dist/todoApp')));
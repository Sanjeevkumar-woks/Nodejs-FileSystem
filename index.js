// importing fs,express,dotenv using require
const fs = require("fs");
const express = require("express");
require('dotenv').config();

//naming express functions as app
const app = express();

//setting up the port in .env
const port = process.env.PORT;

//Initial welcome page
app.get("/",(request, response)=>{
    response.send(`<h1>
    <h2 style="padding:40vh;text-align:center">Welcome To The File 📂 Manager
     <ol>
     <li>To Add a File go To <span style="color:red">"/getCurrentTimeInTextFile"</span></li>
     <br>
     <li>To Retrive all the files in the Directory go to <span style="color:red">"/getFilesList"</span></li>
     <br>
     <li>To Read the currenty added File go to <span style="color:red">"/readAddedFile"</span></li>
     </ol>
     </h2>
     </h1>`)
});

// getting current timestamp
const timeStamp = Date.now();
console.log(timeStamp);
//getting data,month,year,H(hour),M(minutes),S(seconds) from timestamp
const dateTime = new Date(timeStamp);
const date = dateTime.getDate();
const month = dateTime.getMonth();
const year = dateTime.getFullYear();
const H = dateTime.getHours();
const M = dateTime.getMinutes();
const S = dateTime.getSeconds();

//Adding individual values together to get required expression as (DD/MM/YYYY - H:M:S)
const DateAndTime = (("0"+date).slice(-2))+"/"+(("0"+month+1).slice(-2))+"/"+year+" - "+H+":"+M+":"+S;
console.log(DateAndTime);
//path to write the file
const path = `./backup/${timeStamp}.txt`;

//route path to perform write file function
app.get("/getCurrentTimeInTextFile",(request, response)=>{

    //writing file function
    fs.writeFile(path,(""+DateAndTime),(err)=>{

        //to show if there is error
        if(err){
            console.log(err);
        }
        //to show if the writing is completed successfully
        console.log("completed Writing");
    })
        //sending response in return to show in document
    response.send(`<h1 style="padding:15vh;text-align:center">File name 
                        "<span style="color:red">${timeStamp}.txt</span>" with content 
                        "<span style="color:red">${""+DateAndTime}</span>" is written in directory 
                        "<span style="color:red">./backup</span>"</h1>`);
});

//route path to perform readdir function
app.get("/getFilesList",(request, response)=>{

    // readdir function
    fs.readdir(`./backup`,(err,data)=>{
        if(err){
            console.log(err);
        }
        //to show if the Reading is completed successfully
        console.log("Reading Dir completed");
        //sending response in return to show in document
        response.send(`<h1 style="padding:10vh;text-align:center">Files List in the Dierectory
        </br>
        </br>
        <h2 style="padding:10vh;text-align:center;color:red">${data}</h2>
        </h1>`);
    })

        
    });
   

//route path to perform readFile function
    app.get("/readAddedFile",(request, response)=>{
        //readFile function
        fs.readFile(path,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
            }
            //to show if the Reading is completed successfully
            console.log("File Reading completed");
            //sending response in return to show in document
            response.send(`<p style="padding:15vh">
                ${data}
            </p>`);
        });
    });



     //to make express listen to the port
app.listen(port,()=>console.log("server started at",port));
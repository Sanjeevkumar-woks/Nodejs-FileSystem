const fs = require("fs");

const [,,PATH]=process.argv;


fs.readdir(PATH,(err,data)=>{
    if(err){
        console.log(err);
    }
    data.map((file)=>{
                        const type=file.split(".")
                        if(type[1]===undefined){
                            type[1]="Directory";
                        }
                        console.log(`${type[0]} is of type "${type[1]}"`);
    })
})
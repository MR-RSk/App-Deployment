const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const path = require("node:path");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
      cb(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname,"./client/build")));






let connectToMDB= async()=>{
    try{
    mongoose.connect(process.env.dbPath);
    console.log("successfully connected to MDB");

    }catch(err){
       console.log("unable to connect MDB");
    }
};


app.post("/signup",upload.array("profilePic"),async (req,res)=>{

    console.log(req.body);
    console.log(req.files);

    let userArr = await User.find().and({email:req.body.email});

    if(userArr.length > 0){
        res.json({status:"failure",msg:"user already exist"});
    }else{

      let hashedPassword = await bcrypt.hash(req.body.password,10);
        try{

            let newUser = new User({
                firstName    : req.body.firstName,
                lastName     : req.body.lastName,
                email        : req.body.email,
                password     : hashedPassword,
                mobileNumber : req.body.mobileNumber,
                profilePic   : req.files[0].path,
            });
            
              await newUser.save();
            
              res.json({status:"success",msg:"User created successfully"});
            
            }catch(err){
               console.log(err);
            }
            
            }});
        
            
  app.post ("/login",upload.none(),async(req,res)=>{
      console.log(req.body);
            
       let fetchedData = await User.find().and({email:req.body.email});
       console.log(fetchedData)
            
        if(fetchedData.length > 0){

          let passwordResult = await bcrypt.compare(req.body.password,fetchedData[0].password);

        if(passwordResult == true){

        let token = jwt.sign({email: req.body.email , password: req.body.password},"chupchaap");

        let dataToSend = {
                firstName    : fetchedData[0].firstName,
                lastName     : fetchedData[0].lastName,
                email        : fetchedData[0].email,
                mobileNumber : fetchedData[0].mobileNumber,
                profilePic   : fetchedData[0].profilePic,
                token        : token,
                        };
        console.log(dataToSend);                
        res.json({status:"success",data:dataToSend});
        }else{
        res.json({status:"failure",msg:"invalid password"})
        };
                      
        }else{
        res.json({status:"failure",msg:"User doesnot exist"})
        }
        });

  app.put("/updateprofile",upload.single("profilePic"),async(req,res)=>{

        console.log(req.body);

        try{
          if(req.body.firstName.length > 0){
            await User.updateMany({email: req.body.email},{firstName: req.body.firstName});
          }
  
          if(req.body.lastName.length > 0){
            await User.updateMany({email: req.body.email},{lastName: req.body.lastName});
          }
  
          if(req.body.mobileNumber.value > 0){
            await User.updateMany({email: req.body.email},{mobileNumber: req.body.mobileNumber});
          }
          
          if(req.body.password.length > 0){
            await User.updateMany({email: req.body.email},{password: req.body.password});
          }

          if(req.file && req.file.path){
            await User.updateMany({email: req.body.email},{profilePic: req.file.path});
          }
          res.json({status:"success",msg:"Updated successfully"});
          

        }catch{
          res.json({status:"failure", msg:"Try again,something went wrong",err:err});
        }
      });

      app.delete("/deleteprofile",async(req,res)=>{
        console.log(req.query.email);

        try{
          await User.deleteMany({email: req.query.email});
          res.json({status: "success" , msg: "Profile deleted"})

        }catch(err){
          res.json({status: "failure", msg: "unable to delete Profile", err: err});
        }
      });
        
  app.post("/validatetoken",upload.none(),async(req,res)=>{
    console.log(req.body.token);
 
    try{
    let decryptedObj = jwt.verify(req.body.token,"chupchaap");
    console.log(decryptedObj);

    let fetchedData = await User.find().and({email:decryptedObj.email});
    console.log(fetchedData);

    if(fetchedData.length > 0){

      if(fetchedData[0].password == decryptedObj.password){

      let dataToSend = {
              firstName    : fetchedData[0].firstName,
              lastName     : fetchedData[0].lastName,
              email        : fetchedData[0].email,
              mobileNumber : fetchedData[0].mobileNumber,
              profilePic   : fetchedData[0].profilePic,
                      };
      console.log(dataToSend);                
      res.json({status:"success",data:dataToSend});
      }else{
      res.json({status:"failure",msg:"invalid password"})
      };
                    
      }else{
      res.json({status:"failure",msg:"User doesnot exist"})
      }
    }catch{
      res.json({status:"failure",msg:"Invalid token"}); 
    }
      });
            
      

let userSchema = new mongoose.Schema({
    firstName    : String,
    lastName     : String,
    email        : String,
    password     : String,
    mobileNumber : Number,
    profilePic   : String, 
});
 
let User = new mongoose.model("user",userSchema);


app.listen(process.env.port,()=>{
    console.log(`Listening To Port ${process.env.port}`);
});

connectToMDB();
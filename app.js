const express =require ('express');
const multer = require ('multer');
const cors = require ('cors');

const port = 4300;
const app = express ();


var corsOption ={
    origin : "http://localhost:4200",
    optionsSuccessStatus:200,
}
app.use(cors(corsOption));

app.get ("/",(req,res)=>{
    res.send('welcome')
});
 
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });
   
    

    var upload = multer ({ storage: storage });

app.post("/file",upload.single("file"), function (req,res,next) {
    const file =req.file;
    if (file){
        res.json(req.file);
    }else throw "error";
    
});
app.post("/multiplefiles",upload.array("multiplefiles"), function (req,res,next) {
    const files = req.files;
    if (files){
        res.json(req.files);
    }else throw "error";
    
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
const express = require("express");
const app = express();
const port = 5000;
const fileUpload =require('express-fileupload')
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://yplodimages:94gNrY9n67LUWsEI@cluster0.oyjadrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('upload');
    const fileCollection = database.collection('images');

  app.post('/upload',async(req, res) =>{
    const file =req.files.file;
    const name = req.body.name;
    const email = req.body.email;
    console.log(file,name,email)
file.mv(`${__dirname}/doctors/${file.name}`,async(err) =>{
  if(err){
    consile.log(err)
    return res.status(500).send({msg:'Faild to uplod images'})
  }
 await fileCollection.insertOne({name,email,img:file.name})
.then(result =>{
  console.log(result)
})
  return res.send({name: file.name, path:`/${file.name}` })

})
  })
  app.get('/doctors', async(req, res) =>{
    const data = fileCollection.find({});
    const documents = await data.toArray();
    res.send(documents);

  })

    console.log('db is connected');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

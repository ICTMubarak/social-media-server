const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltjdg3f.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{

         const statusCollection = client.db('statusCollection').collection('Sstatus');
        
         app.post('/addstatus', async(req, res) =>{
             const status = req.body;
             console.log(status); 
             const result = await statusCollection.insertOne(status);
             res.send(result);
         });


      

        app.get('/allstatus', async(req, res)=>{
            const query = {};
            const cursor = statusCollection.find(query);
            const allStatus = await cursor.toArray();
            res.send(allStatus);

       }) 
        
    }

    finally{

    }

}

run().catch(err => console.log(err));


app.get('/',(req, res)=>{
    res.send('BDBook  server is running')
});




app.listen(port, ()=>{
    console.log(`BDBook server running in port=${port}`);
})

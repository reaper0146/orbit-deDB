const express=require('express');
const mysql = require('mysql');
const cors=require('cors');
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const Identities = require('orbit-db-identity-provider')
//const { Leth, Web3, Gateway} = require('lightstreams-js-sdk')

const app=express();
app.use(express.json())
app.use(cors())

var orbitDB

const initIPFSInstance = async () => {
    return await IPFS.create({ repo: "./path-for-js-ipfs-repo" });
  };


async function initIPFS(){
    const ipfsOptions = {
        EXPERIMENTAL: {
          pubsub: true
        }
      }
    
    const ipfs = await IPFS.create(ipfsOptions)  
        //const orbitdb = await OrbitDB.createInstance(ipfs);
      
        // Create / Open a database
        //const db = await orbitdb.keyvalue('test-db')
        //await db.load();
    
        //const db = orbitDB.keyvalue('test-db')
        //console.log(db.address.toString())
    
        //const identity = await Identities.createIdentity(options)
        //console.log(identity.toJSON())
    const db = await OrbitDB.createInstance(ipfs)//,  { identity: identity })
    orbitDB = db
        
        // Listen for updates from peers
        //db.events.on("replicated", address => {
        //  console.log(db.iterator({ limit: -1 }).collect());
        //});
      
        // Add an entry
        //const hash = await db.add("world");
        //console.log(hash);
      
        // Query
        //const result = db.iterator({ limit: -1 }).collect();
        //console.log(JSON.stringify(result, null, 2));
      //});
    
}

app.post('/ipfsInit', (req,res)=> {
    //initIPFS()
    initIPFS()

    /*db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], 
    (err,result) => {console.log(err);}
    );*/
})
async function ipfsAdd(i,n,a){
    
    const db = await orbitDB.docs('test-db')
    console.log(db.address.toString())
    //await db.put({'_id': 'QmBwesomeIpfsHash', name:'Jack', age: 20})
    //await db.put({'_id': 'QmCwesomeIpfsHash', name:'Aaron', age: 21})
    //await db.put({'_id': 'QmDwesomeIpfsHash', name:'John', age: 22})
    //await db.put({'_id': 'QmEwesomeIpfsHash', name:'Bob', age: 23})
    await db.put({'_id': i, name: n, age: a})
    //console.log("hello")
    
    const address = db.address.toString()
    console.log(address)
    await db.load()
    const value = db.query((doc) => doc.age >= 20)
        
    console.log(value)
}

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"LoginSystem"
})

app.post('/register', (req,res)=> {
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    console.log(password)
    //initIPFS()

    /*db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], 
    (err,result) => {console.log(err);}
    );*/
})

app.post('/ipfsAdd', (req,res)=> {

    const id = req.body.id
    const name = req.body.name
    const age = parseInt(req.body.age)
    console.log(id)
    console.log(name)
    console.log(age)
    console.log(typeof(id))
    console.log(typeof(name))
    console.log(typeof(age))
    ipfsAdd(id,name,age)

})

app.post('/login', (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username)
    console.log(password)

    db.query("SELECT * FROM users username = ? and password = ?", [username, password], 
    (err,result) => {
        if(err){
            console.log(err);
            res.send({err: err})

        }
            
        else{
            if (result.length>0){
                res.send(result);
            } else {
                res.send({message: "Wrong username or password"});
            }
        }
    }
    );
})

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})


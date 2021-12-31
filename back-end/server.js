const express=require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const cnctn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'contacts_db'
});


app.use(cors());
app.use(express.json());

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const phone=req.body.phone;
    const address=req.body.address;
    const email=req.body.email;

    cnctn.query('INSERT INTO contacts(name,phone,address,email) values(?,?,?,?)',[name,phone,address,email],
    (err,result)=>{
        if(err){
            res.send(err.message);
        }else{
            res.send(true);
        }
    }
    );
});

app.get('/read',(req,res)=>{
    cnctn.query('SELECT * FROM contacts order by id',
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            // console.log(result);
            res.send(result);
        }
    }
    );

});

app.put('/update',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const phone=req.body.phone;
    const address=req.body.address;
    const email=req.body.email;

    cnctn.query('UPDATE contacts set name=?,phone=?,address=?,email=? WHERE id=?',[name,phone,address,email,id],
    (err,result)=>{
        if(err){
            console.log(err.message);
            res.send(err.message);
        }else{
            console.log('updated to DB');
            res.send(true);
        }
    }
    );
});

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    
    cnctn.query('DELETE FROM contacts WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('deleted from DB');
            res.send('hello world');
        }
    }
    );
});

app.listen(3001,()=>{
    console.log('server started listening on port 3001');
});
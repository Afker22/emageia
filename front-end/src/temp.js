import React from 'react';
import Axios from 'axios';
import './App.css';
import {useState} from 'react';
// import {Card} from 'react-bootstrap';


function App() {
  const [name,setName]=useState("");
  const [age,setAge]=useState(0);
  const [country,setCountry]=useState("");
  const [position,setPosition]=useState("");
  const [wage,setWage]=useState(0);

  const [newname,setnewName]=useState("");
  const [newage,setnewAge]=useState(0);
  const [newcountry,setnewCountry]=useState("");
  const [newposition,setnewPosition]=useState("");
  const [newwage,setnewWage]=useState(0);
  


  const [empData,setempData]=useState([]);

  const addData=()=>{
    console.log(name+','+age+','+country+','+position+','+wage);
    Axios.post('http://localhost:3001/create',
    {
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    })
    .then(()=>{
      console.log('value added to db');
      setempData([...empData,{
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }])
    });

  }

  const showData=()=>{
    Axios.get('http://localhost:3001/read')
    .then((res)=>{
      // console.log(res);
      setempData(res.data);
    });

  }

  const updateData=(id)=>{
    console.log(newname+','+newage+','+newcountry+','+newposition+','+newwage);
    Axios.post('http://localhost:3001/update',
    {
      name:newname,
      age:newage,
      country:newcountry,
      position:newposition,
      wage:newwage,
      id:id
    })
    .then(()=>{
      console.log('value updated to db');
      setempData([...empData,{
        name:newname,
        age:newage,
        country:newcountry,
        position:newposition,
        wage:newwage
      }])
    });

  }
  return (
    <div className="App">
      <div className="information">
          Employee Record
          <label>name:</label>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>  
          <label>age:</label>
          <input type="number" onChange={(e)=>setAge(e.target.value)}/>  
          <label>country:</label>
          <input type="text" onChange={(e)=>setCountry(e.target.value)}/>  
          <label>position:</label>
          <input type="text" onChange={(e)=>setPosition(e.target.value)}/>  
          <label>wage (years):</label>
          <input type="number" onChange={(e)=>setWage(e.target.value)}/>
          <button onClick={addData}>Add to DB</button>
      </div>
      <hr style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor : '#000000'
      }}/>
      <div className='employees'>
        <button onClick={showData}>Show Employees</button>
        {
          empData.map((val,key)=>{
            return (
              <div className='employee'>
              <div id={key}>
                  <h3>Name : {val.name}</h3>
                  <h3>Age : {val.age}</h3>
                  <h3>Country : {val.country}</h3>
                  <h3>Position : {val.position}</h3>
                  <h3>Wage : {val.wage}</h3>
              </div>
              <div>
              <input type="text" onChange={(e)=>setnewName(e.target.value)}/>  
              <input type="number" onChange={(e)=>setnewAge(e.target.value)}/> 
              <input type="text" onChange={(e)=>setnewCountry(e.target.value)}/>
              <input type="text" onChange={(e)=>setnewPosition(e.target.value)}/>
              <input type="number" onChange={(e)=>setnewWage(e.target.value)}/>
              <button onClick={updateData({key})}>Update</button>
              </div>
              </div>)
          })
        }
      </div>

    </div>
  );
}


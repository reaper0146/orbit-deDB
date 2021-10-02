import logo from './logo.svg';
import react, { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [idReg, setId] = useState('')
  const [nameReg, setName] = useState('')
  const [ageReg, setAge] = useState('')

  const [ageFind, setAgeFind] = useState('')

  const[loginStatus, setLoginStatus]= useState("")


  const register = () => {
    Axios.post('http://localhost:5000/register', {
      username:usernameReg, password:passwordReg}).then((response) => {console.log(response.data);});

      
  };

  const login = () => {
    Axios.post('http://localhost:5000/login', {
      username:username, password:password}).then((response) => {
        if(response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  const orbitInit = () => {
    Axios.post('http://localhost:5000/orbitInit')
  };

  const orbitAdd = () => {
    Axios.post('http://localhost:5000/orbitAdd', {
      id:idReg, name:nameReg, age: ageReg}).then((response) => {
        if(response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };


  const query = () => {
    Axios.post('http://localhost:5000/query', {
      age:ageFind});
    };

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <button onClick = {orbitInit}>orbitDB Init</button><br/>
        </div>
        <div className='orbit'>
        <h1>Add Record</h1> <br/>
          <label>Id</label>
          <input type='text' onChange={(e) => {
            setId(e.target.value);
          }}/><br/>
          <label>Name</label>
          <input type='text' onChange={(e) => {
            setName(e.target.value);
          }}/><br/>
          <label>Age</label>
          <input type='number' onChange={(e) => {
            setAge(e.target.value);
          }}/><br/>
        <button onClick = {orbitAdd}>orbitDB ADD</button><br/>
        <input type='text' placeholder='age to search above' onChange={(e) => {
            setAgeFind(e.target.value);
          }}/><br/>
        <button onClick = {query}>Query above age</button><br/>
        </div>

        <div className="Registration">
          <h1>Registration</h1> <br/>
          <label>Username</label>
          <input type='text' onChange={(e) => {
            setUsernameReg(e.target.value);
          }}/><br/>
          <label>Password</label>
          <input type='text' onChange={(e) => {
            setPasswordReg(e.target.value);
          }}/><br/>
          <button onClick = {register}>Register</button><br/><br/>
        </div>
        
        <div className="login">
          <h1>Login</h1><br/>
          <input type='text' placeholder='Username' onChange={(e) => {
            setUsername(e.target.value);
          }} /><br/>
          <input type='password' placeholder='password' onChange={(e) => {
            setPassword(e.target.value);
          }}/><br/>
          <button onClick = {login}>Login</button><br/>
        </div>
        <h1>{loginStatus}</h1>
      </header>
    </div>
  );
}

export default App;

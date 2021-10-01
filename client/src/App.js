import logo from './logo.svg';
import react, { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <div className="App">
      <header className="App-header">
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

        <div className="Regislogintration">
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

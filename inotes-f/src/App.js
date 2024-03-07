import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState , useEffect} from "react";
import Alert from "./components/Alert";
import {useHistory} from 'react-router-dom'

function App() {
  const history = useHistory()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchUser()
    }
    else history.push('/login')
    // eslint-disable-next-line
  }, [])
  const fetchUser = async() =>{
    const resp = await fetch('http://localhost:5000/api/auth/getuser',{
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      } 
    });
    const json = await resp.json();
    setLoggedUser(json)
  }

  const [loggedUser, setLoggedUser] = useState({name:'',email:'',date:''});

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <NoteState>
      <Router>
      <NavigationBar loggedUser={loggedUser}/>
      <Alert alert={alert}/>
     <Container>
      <Switch>
        <Route exact path="/signup">
          <Signup showAlert={showAlert}/>
        </Route>
        <Route exact path="/login">
          <Login showAlert={showAlert}/>
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home showAlert={showAlert}/>
        </Route>
      </Switch>
      </Container> 
      </Router>
    </NoteState>
  );
}

export default App;

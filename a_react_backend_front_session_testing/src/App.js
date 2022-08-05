import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from 'react'
import request from './requests/Requests'
import Register from './pages/Register';
import Login from './pages/Login';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import Toolbar from './components/Toolbar'



function App() {
  const [sessionUser, setSessionUser] = useState()
  async function getSessionUser() {
      setSessionUser(await request.get('user'))
  }
  return (
    <div className="App">
      <BrowserRouter > 
      <Toolbar sessionUser={sessionUser} getSessionUser={getSessionUser}/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<IndexPage getSessionUser={getSessionUser} sessionUser={sessionUser} />}/>
        <Route path='/users/:userName' element={<ProfilePage getSessionUser={getSessionUser} sessionUser={sessionUser}/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

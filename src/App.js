import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {v4 as uuid, v4} from 'uuid';
import Room from './Room';

function App() {
  const navigate = useNavigate()

  const createRoom = () =>{
    const roomId = v4();
    navigate(`room/${roomId}`)
  }

  return (
  <div className="App">    
      <Routes>
        <Route path='room/:id' element={<Room/>}/> 
        <Route path='/' element={  <button onClick={()=>createRoom()}>Create room</button>}/>
      </Routes>
      
    </div>
  );
}

export default App;

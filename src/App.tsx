import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home'
import { MoviePlayer } from './components/ViewMovie'
import './App.css'

function App() {  
  return (
    <Routes>
      <Route path='/' element={<Navigate to={"/Home"} replace/>}/>
      <Route path='/Home' element={<Home/>} />
      <Route path='/movie/:id' element={<MoviePlayer/>}/>
    </Routes>
      
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { Game } from './pages/Game'

function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path='/game' element={<Game></Game>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App

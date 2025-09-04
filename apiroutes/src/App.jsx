import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'

function App() {

  return (
    <>
      {/* <nav style={{ padding: 22 }}>
        <Link to="/">Home</Link>
      </nav> */}


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/item/:id' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

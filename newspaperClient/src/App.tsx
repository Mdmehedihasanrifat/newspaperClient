
import { Outlet } from 'react-router-dom'
import './App.css'
// import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'

// import News from './components/News/News'


function App() {
  

  return (
    <> 
    <Navbar>

    </Navbar>
  
     <div className="container mx-auto mt-8">
        <Outlet></Outlet>
      </div>
    
    </>
  )
}

export default App

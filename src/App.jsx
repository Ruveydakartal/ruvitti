import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
import ROUTES from './Consts/Routes.js'
import Home from './Pages/Home/Home.jsx'
import InfiniteCanvas from './Pages/InfiniteCanvas/InfiniteCanvas.jsx'
import About from './Pages/About/About.jsx'

function App() {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.infiniteCanvas} element={<InfiniteCanvas />} />
        <Route path={ROUTES.about} element={<About />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

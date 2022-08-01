import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Container from './components/layout/container';

import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/Newproject';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container customClass= "min_height">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/company' element={<Company/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/newproject' element={<NewProject/>}  />
          <Route path='/project/:id' element={<Project/>}  />
        </Routes>
      </Container>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

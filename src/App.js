import './App.css';
import NavBar from './components/NavBar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import Blogs from './components/Blogs';
import Home from './components/Home';
import AddPost from './components/AddPost' 

function App() {
  return (
    <div className="App">
      <AuthState>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/blogs' element={<Blogs />} />
            <Route exact path='/addpost' element={<AddPost />}/>
          </Routes>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;

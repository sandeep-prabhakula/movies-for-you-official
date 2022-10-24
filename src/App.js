import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/home" element={<ProtectedRoute><Home postType="review"/></ProtectedRoute>}/>
            <Route exact path="/reviews" element={<ProtectedRoute><Home postType="review"/></ProtectedRoute>}/>
            <Route exact path="/suggestions" element={<ProtectedRoute><Home postType="suggestions"/></ProtectedRoute>}/>
            <Route exact path="/pre-release-business" element={<ProtectedRoute><Home postType="pre_release_business"/></ProtectedRoute>}/>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </>
  );
}

export default App;

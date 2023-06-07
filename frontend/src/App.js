import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostMedia from './pages/PostMedia';


function App() {
  return (
    <>
    <Router >
    <div style={{ backgroundColor: '#EBECF9', minHeight: '100vh' }}>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/post-media' element={<PostMedia/>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;

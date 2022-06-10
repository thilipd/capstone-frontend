import Login from './Login';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Register';
import Home from './Home';
import Createquery from './Createquery';
import FetchSinglequery from './FetchSinglequery';

function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} >
            <Route path='create-query' element={<Createquery />} />
            <Route path='query' element={<FetchSinglequery />} />
          </Route>
          <Route path='/signup' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

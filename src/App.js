import logo from './logo.svg';
import './App.css';
import { H1Tag, ImgStu, ImgVamsi, PTag } from './consts';
import { Navigation } from './Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Users } from './Users';
import { Protected } from './Protexted';
import { NotFound } from './Notfound';
import { Login } from './Login';
import { SignUp } from './Singup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navigation />
        </header>
        <main className='main'>
          <Routes>
            <Route element={<Protected />}>
              <Route path='/home' element={<Home />} />
              <Route path='/users' element={<Users />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </main>


      </div>
    </BrowserRouter>

  );
}

export default App;

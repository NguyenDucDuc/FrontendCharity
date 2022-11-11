import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddPost from './components/AddPost';
import AuctionDetail from './components/AuctionDetail';
import AuctionResult from './components/AuctionResult';
import Home from './components/Home';
import Login from './components/Login';
import Notification from './components/Notification';
import PostDetail from './components/PostDetail';
import PostUpdate from './components/PostUpdate';
import Register from './components/Register';
import Report from './components/Report';
import Stats from './components/Stats';
import Header from './layouts/Header';
import ProfileStats from './components/ProfileStats';
import Footer from './layouts/Footer';

export const notificationContext = createContext()

function App() {

  


  return (
    
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/posts/:postId' element={<PostDetail />}></Route>
          <Route path='/add-post' element={<AddPost />}></Route>
          <Route path='/notification' element={<Notification />} />
          <Route path='/posts/:postId/auction' element={<AuctionDetail />} />
          <Route path='/posts/:postId/auction-result' element={<AuctionResult />} />
          <Route path='/posts/:postId/post-update' element={<PostUpdate />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/posts/:postId/report' element={<Report />} />
          <Route path='/users/:userId' element={<ProfileStats />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;

import './App.scss';
import Header from './components/header/Header';
import AuthModals from './components/auth-modals/AuthModals';
import { React} from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import EditCar from './pages/EditCar';
import Customers from './pages/Customers';
import EditCustomers from './pages/EditCustomers';
import Rent from './pages/Rent';

function App() {
  return (
    <div className='App'>
      <Header/>
      <AuthModals/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit/:id" element={<EditCar />}></Route>
        <Route path='/customers' element={ <Customers />}></Route>
        <Route path='/customers/edit/:id' element={ <EditCustomers />}></Route>
        <Route path='/rent/:id' element={ <Rent />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import Category from './components/Category';
import Profile from './components/Profile';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Login from './components/Login';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import React from 'react';

function App() {

    return (
      <div>
        <main> 
        <Router>
          <Navbar/>
          
            <Switch>
                  <Route path='/' component={()=><HomeScreen/>}exact/>
                  <Route path='/category/:id' children={<Category/>} exact/>
                  <Route path='/product/:id' children={<Product/>} exact/>
                  <Route path='/login' component={()=><Login />}exact/>
                  <Route path='/seller-signup' component={()=><Seller/>} exact/>
                  <Route path='/buyer-signup/' component={()=><Buyer/>} exact/>
                  <Route path='/profile/' component={()=><Profile/>} exact/>
                  <Route path='/addproduct/' component={()=><AddProduct/>} exact/>
            </Switch>
          </Router>

        </main>
      </div>
    );


}

export default App;

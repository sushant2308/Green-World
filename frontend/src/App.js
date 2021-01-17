import './App.css';
import {Route,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import All from './components/All';
import Category from './components/Category';
import Profile from './components/Profile';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Login from './components/Login';
import Product from './components/Product';
import Form from './components/Form';
import React,{useState} from 'react';
function App() {
  const [Signed,SetSigned] = useState(false)
    return (
      <div>
        <main> 
          <Navbar sign={Signed} setsign={SetSigned}/>
          <Switch>
                  <Route path='/' component={()=><All setsign={SetSigned} />}exact/>
                  <Route path='/category/:id' component={Category} exact/>
                  <Route path='/product/:id' component={Product} exact/>
                  <Route path='/login' component={()=><Login sign={Signed} setsign={SetSigned} />}exact/>
                  <Route path='/seller-signup' component={Seller} exact/>
                  <Route path='/buyer-signup/' component={Buyer} exact/>
                  <Route path='/profile/' component={()=><Profile setsign={SetSigned} />} exact/>
                  <Route path='/addproduct/' component={Form} exact/>
            </Switch>
        </main>
      </div>
    );


}

export default App;

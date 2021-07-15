import React from 'react';
import {Link} from 'react-router-dom';
import { loginState,logout } from '../../features/userSlice'
import { useSelector,useDispatch } from 'react-redux'
function Navbar() {
  const isloggedin= useSelector(loginState)
  const dispatch= useDispatch();
  function loggedout(){
      localStorage.removeItem('token');
      dispatch(logout())
  }
    return (
        <div>
          <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
              <div className="container">
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <Link className="navbar-brand text-brand" to="/">GREEN-<span className="color-b">WORLD</span></Link>
                <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/category/Agriculture">Agriculture</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/category/Energy">Energy</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/category/Lifestyle">Lifestyle</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/category/Diet">Diet</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/category/Homeware">Homeware</Link>
                    </li>
                    {isloggedin ?
                          <li className="nav-item">
                          <Link className="nav-link" to="/profile">Account</Link>
                          </li>
                          :
                          <li className="nav-item dropdown">
                          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sign-Up
                          </Link>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/seller-signup">Signup as Seller</Link>
                            <Link className="dropdown-item" to="/buyer-signup">Signup as Buyer</Link>
                          </div>
                        </li>
                    }
                    {isloggedin ?
                          <li className="nav-item">
                          <Link className="nav-link" onClick={loggedout}>Logout</Link>
                          </li>
                          :
                          <li className="nav-item">
                          <Link className="nav-link" to="/login">Login</Link>
                          </li>
                    }


                  </ul>
                </div>
                
              </div>
            </nav>
        </div>
        
        
    );
}
export default Navbar;

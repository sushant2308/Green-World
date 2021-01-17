import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
function Profile({setsign}) {
    const [Data, setData] = useState({})
    if(localStorage.getItem('token')) setsign(true);
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          let token=localStorage.getItem('token')
          const res = await axios.get(`http://127.0.0.1:8000/api/me`,{
            headers: {
                'Authorization': `token ${token}`
              }
          });
         
          setData(res.data);
           
        }
        catch(err){

        }
    }

    fetchData();
  
    },[]);
    
    return (
        <div className="container" style={{marginTop:"8rem"}}>
            {Data.is_seller?
                <div className="container">
                        
                        <h1>Welcome to your merchant profile! <span className="color-b">{Data.name}</span></h1>
                        <section className="property-grid grid" style={{marginTop:"5rem"}}>
                            <div className="container">
                                <h3>Here are your added products      <Link to="/addproduct"><span className="color-b">Add More</span> </Link></h3>
                                <div className="row">
                                {
                                    Data.products ?
                                    Data.products.map((item,i) => (
                                        <div className="col-md-4" key={i}>
                                        <div className="card-box-a card-shadow">
                                        <div className="img-box-a">
                                            <img src={item.image}  className="img-a img-fluid" alt=""/>
                                        </div>
                                        <div className="card-overlay">
                                            <div className="card-overlay-a-content">
                                            <div className="card-header-a">
                                                <h2 className="card-title-a">
                                                <Link to={"/product/"+item.id}>{item.name}
                                                    </Link>
                                                </h2>
                                            </div>
                                            <div className="card-body-a">
                                                <div className="price-box d-flex">
                                                <span className="price-a">Price | Rs {item.price}</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    ))
                                    :<div></div>
                                }
                                </div>
                            </div>
                        </section>
                        
                </div>
                :
                <div className="container">
                        
                        <h1>Welcome to your customer profile! <span className="color-b">{Data.name}</span></h1>
                        <section className="property-grid grid" style={{marginTop:"5rem"}}>
                            <div className="container">
                                <h3>Here are your purchased products      <Link to="/"><span className="color-b">Buy More</span> </Link></h3>
                                <div className="row">
                                
                                
                                {
                                    Data.purchases ?
                                    Data.purchases.map((item,i) => (
                                        <div className="col-md-4" key={i}>
                                        <div className="card-box-a card-shadow">
                                        <div className="img-box-a">
                                            <img src={item.product.image}  className="img-a img-fluid" alt=""/>
                                        </div>
                                        <div className="card-overlay">
                                            <div className="card-overlay-a-content">
                                            <div className="card-header-a">
                                                <h2 className="card-title-a">
                                                <Link to={"/product/"+item.product.id}>{item.product.name}
                                                    </Link>
                                                </h2>
                                            </div>
                                            <div className="card-body-a">
                                                <div className="price-box d-flex">
                                                <span className="price-a">Price | Rs {item.product.price}</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    )):
                                    <div></div>

                                }
                                </div>
                            </div>
                        </section>
                </div>
            }
        </div>
        
        
    );
}
export default Profile;

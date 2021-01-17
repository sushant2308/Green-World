import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
function All({setsign}) {
    var img=require('./h.mp4');
    if(localStorage.getItem('token')) setsign(true);
    const [Data,setData] = useState([]);
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          let data=[]
          const res = await axios.get(`http://127.0.0.1:8000/api/allproducts`);
          for(const dataobj of res.data){
              data.push(dataobj);
            
          }
          setData(data);
           
        }
        catch(err){

        }
    }

    fetchData();
  
    },[]);
    console.log(Data);
    return (
      <div>
        <header>
          <div className="overlay"></div>
          <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
            <source src={img.default} type="video/mp4"/>
          </video>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div className="w-100 text-white">
              <div className="intro-body">
              <h1 className="intro-title mb-4 animate__zoomIn animate__animated"><span className="color-b">GREEN</span> WORLD</h1>
              <p className="intro-title-top">LETS GO GREEN TOGETHER!</p>
              </div>
              </div>
            </div>
          </div>
        </header>
        <section className="property-grid grid" style={{marginTop:"2rem"}}>
          <div className="container">
            <div className="row">
              {
                  Data.map((item,i) => (
                    <div className="col-md-4" key={i}>
                    <div className="card-box-a card-shadow">
                      <div className="img-box-a">
                        <img src={"http://127.0.0.1:8000"+item.image}  className="img-a img-fluid" alt=""/>
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
              }
            </div>
          </div>
      </section>
      </div>

      
        
    );
}
export default All;

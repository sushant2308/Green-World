import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
function EditProduct({ match}) {
    const id=match.params.id;
    const [name,setName]=useState('')
    const [brand,setBrand]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')
    const [redirect, setRedirect]=useState('')
    useEffect(() => {
        const fetchData = async ()=>{
        try {
         
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product_actions/${id}`);
         
          setName(res.data.name)
          setBrand(res.data.brand)
          setPrice(res.data.price)
          setCategory(res.data.category)
          setDescription(res.data.description)
           
        }
        catch(err){

        }
    }

    fetchData();
  
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('brand', brand);
        form_data.append('category', category);
        form_data.append('description', description);
        form_data.append('price', price);
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/product_actions/${id}/`;
        let token=localStorage.getItem('token')
        axios.put(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `token ${token}`
          }
        })
            .then(res => {
              console.log(res);
              setRedirect("/profile")
            })
            .catch(err => console.log(err))
    };
    const handleDelete = (e) => {
        e.preventDefault();
        console.log(this.state);
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/product_actions/${id}`;
        let token=localStorage.getItem('token')
        axios.delete(url,  {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `token ${token}`
          }
        })
         .then(res => {
              console.log(res);
              setRedirect("/profile")
            })
            .catch(err => console.log(err))
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div className="container-fluid" style={{marginTop:"1rem"}}>
        <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image4"></div>
            <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
                <div className="container">
                <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Add your product!</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="form-label-group">
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}className="form-control" placeholder="Enter your name" required/>
                        <label for="name">Enter Name of Product</label>
                        </div>
                        <div className="form-label-group">
                        <input type="text" id="brand" value={brand} onChange={e => setBrand(e.target.value)} className="form-control" placeholder="Email address" required />
                        <label for="brand">Enter Brand of Product</label>
                        </div>
    
                        <div className="form-label-group">
                        <select className="form-control" id="category"  value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Energy">Energy</option>
                            <option value="Lifestyle">LifeStyle</option>
                            <option value="Diet">Diet</option>
                            <option value="Homeware">Homeware</option>
                        </select>
                        </div>
                        <div className="form-label-group">
                        <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} className="form-control" placeholder="Enter your phone no" required />
                        <label for="price">Enter your Product's prices</label>
                        </div>
                        <div className="form-label-group">
                        <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="form-control" placeholder="Enter your Address" required />
                        <label for="description">Enter your Product's description</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Save</button>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" onClick={handleDelete}>Delete</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default EditProduct

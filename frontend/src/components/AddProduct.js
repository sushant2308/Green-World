import React,{Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class AddProduct extends Component {
    state = {
        name: '',
        brand: '',
        category: '',
        description:'',
        price:'',
        image:null,
      };
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('name', this.state.name);
        form_data.append('brand', this.state.brand);
        form_data.append('category', this.state.category);
        form_data.append('description', this.state.description);
        form_data.append('price', this.state.price);
        form_data.append('image', this.state.image, this.state.image.name);
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/product_add/`;
        let token=localStorage.getItem('token')
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `token ${token}`
          }
        })
            .then(res => {
              console.log(res);
              this.setState({ redirect: "/profile" });
            })
            .catch(err => console.log(err))
      };
    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
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
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-label-group">
                            <input type="text" id="name" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Enter your name" required/>
                            <label for="name">Enter Name of Product</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="brand" value={this.state.brand} onChange={this.handleChange} className="form-control" placeholder="Email address" required />
                            <label for="brand">Enter Brand of Product</label>
                            </div>
        
                            <div className="form-label-group">
                            <select className="form-control" id="category"  value={this.state.category} onChange={this.handleChange}>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Energy">Energy</option>
                                <option value="Lifestyle">LifeStyle</option>
                                <option value="Diet">Diet</option>
                                <option value="Homeware">Homeware</option>
                            </select>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="price" value={this.state.price} onChange={this.handleChange} className="form-control" placeholder="Enter your phone no" required />
                            <label for="price">Enter your Product's prices</label>
                            </div>
                            <div className="form-label-group">
                            <input type="text" id="description" value={this.state.description} onChange={this.handleChange} className="form-control" placeholder="Enter your Address" required />
                            <label for="description">Enter your Product's description</label>
                            </div>
                            <div className="form-label-group">
                            <input type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                            <label for="image">Upload Product's Image</label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Add</button>
        
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
            
        );
    }

}
export default AddProduct;

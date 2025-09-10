import './App.css';
import Homecontent from './pages/Homecontent';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Aboutcontent from './pages/Aboutcontent';
import Servicecontent from './pages/Servicecontent';
import Contactus from './pages/Contactus';
import Shopcontent from './pages/Shopcontent';
import Shopcontentproduct from './pages/Shopcontentproduct';
import Newdesign from './pages/Newdesign';
import Stockpage from './pages/Stockpage';
import Productdetail from './pages/Productdetail';
import CartContext from './pages/CartContext';
import Profile from './pages/Profile'
import Stockdetail from './pages/Stockdetail'
import Register from './pages/Register';
import { Stockcart } from './pages/Stockcart';
import Orders from './pages/Orders';
import Orderinfo from './pages/Orderinfo';
import UpdateProduct from './pages/UpdateProduct';


function App() {
  return (
    <div className="App">
     {/* <Router> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Homecontent />} />
        <Route path="/aboutus" element={<Aboutcontent />} />
        <Route path="/service" element={<Servicecontent />} />
        <Route path="/contactus" element={<Contactus />}/>
        <Route path="/shop" element={<Shopcontent/>}></Route>
        <Route path="/product" element={<Shopcontentproduct/>}></Route>
        <Route path="/productdetail/:id" element={<Productdetail />} />
        <Route path="/Stockdetail/:id" element={<Stockdetail></Stockdetail>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/newdesign' element={<Newdesign></Newdesign>}></Route>
        <Route path='/stock' element={<Stockpage></Stockpage>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path="/cart" element={<CartContext></CartContext>}></Route>
        <Route path='/stockcart' element={<Stockcart />} />
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/orders/:id' element={<Orderinfo></Orderinfo>}></Route>
        <Route path='/updateproduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
        
      </Routes>
    {/* </Router> */}
    </div>
  );
}

export default App;

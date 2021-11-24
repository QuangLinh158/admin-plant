import SideMenu from './SideMenu';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import { getAuth, signOut } from '@firebase/auth';
import IMG_3505 from '../assets/IMG_3505.jpeg'


import Users from '../screens/Users';
import News from '../screens/News';
import CategoriesProduct from '../screens/CategoriesProduct';
import Discount from '../screens/Discount';
//import Invoices from '../screens/Invoices';
import Statistic from '../screens/Statistic';
import InvoiceState from '../screens/InvoiceState';
import UnconfirmInvoice from '../screens/UnconfirmInvoice';
import ConfirmInvoice from '../screens/ConfirmInvoice';
import Delivering from '../screens/delivering';
import DeliverInvoice from '../screens/DeliverInvoice';
import CancelInvoice from '../screens/CancelInvoice';

import AddDiscount from '../screens/AddDiscount';
import EditDiscount from '../screens/EditDiscount';
import CateScreen from "../screens/products-creens/CategoriesProduct";
import AddCateScreen from "../screens/products-creens/category-screens/AddCateScreen";
import UpdateCateScreen from "../screens/products-creens/category-screens/UpdateCateScreen";
import ProductScreen from "../screens/products-creens/Products";
import AddProductScreen from "../screens/products-creens/product-screens/AddProductScreen";
import UpdateProductScreen from "../screens/products-creens/product-screens/UpdateProductScreen";
import Login from "../screens/Login";

const Dashboard = ({history}) => {

  const [inactive, setInactive] = useState(false);

  const logout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            history.push('/')
        })
        .catch((e) => alert(e.message))
}

useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        history.push('/')
    }
},[])

const auth = getAuth();
const user = auth.currentUser;


  return (
    <div className="App">
        
        <Router>
            <SideMenu onCollapse={ (inactive) => {
                setInactive(inactive);
            }}/>

            <div className={`container ${inactive ? "inactive" : ""}`}>
            <Switch>
              <Router exact path={'/khachhang'}>
                  <Users />
              </Router>
              <Router exact path={'/tintuc'}>
                  <News />
              </Router>
              {/*<Router exact path={'/loaisanpham'}>*/}
              {/*    <CategoriesProduct />*/}
              {/*</Router>*/}
              {/*<Router exact path={'/sanpham'}>*/}
              {/*    <Products />*/}
              {/*</Router>*/}
              {/* <Router exact path={'/hoadon'}>
                  <Invoices />
              </Router> */}
              <Router exact path={'/thongke'}>
                  <Statistic />
              </Router>
              <Router exact path={'/trangthaidon'}>
                  <InvoiceState />
              </Router>
              <Router exact path={'/trangthaidon/dxn'}>
                  <ConfirmInvoice />
              </Router>
              <Router exact path={'/trangthaidon/cxn'}>
                  <UnconfirmInvoice />
              </Router>
              <Router exact path={'/trangthaidon/dg'}>
                  <Delivering/>
              </Router>
              <Router exact path={'/trangthaidon/ddg'}>
                  <DeliverInvoice />
              </Router>
              <Router exact path={'/trangthaidon/ddh'}>
                  <CancelInvoice />
              </Router>


            </Switch>

                <Route path="/themkm" component={AddDiscount} />
                <Route path="/khuyenmai" component={Discount} />
                <Route path="/suakm/:id" component={EditDiscount} />

                <Route path="/loaisanpham" component={CateScreen} />
                <Route path="/themloai" component={AddCateScreen} />
                <Route path="/sualoai/:id" component={UpdateCateScreen} />

                <Route path="/sanpham" component={ProductScreen} />
                <Route path="/themsp" component={AddProductScreen} />
                <Route path="/suasp/:id" component={UpdateProductScreen} />




            </div>
            
            <div className={`side-menu-footer ${inactive ? "inactive" : ""}`}>
                <div className="avatar">
                    <img src={IMG_3505} alt="user"/>
                </div>
                <div className="user-info">
                    <h5>{user && user.displayName}</h5>
                    <div className="row">
                        <p>{ user && user.email}</p>
                        <i 
                            onClick={logout}
                            className="bi bi-box-arrow-right"
                        ></i>
                    </div>
                    
                </div>
            </div>
            
        </Router>
    </div>
  );
}

export default Dashboard;

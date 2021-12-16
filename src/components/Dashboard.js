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
import EditUnconfirmVoice from '../screens/EditUnconfirmVoice';

import ConfirmInvoice from '../screens/ConfirmInvoice';
import EditConfirmvoice from '../screens/EditConfirmvoice';

import Delivering from '../screens/Delivering';
import EditDelivering from '../screens/EditDelivering';

import DeliverInvoice from '../screens/DeliverInvoice';
import CancelInvoice from '../screens/CancelInvoice';

import FeedBack from '../screens/FeedBack';

import Pending from '../screens/Pending';
import EditFeedback from '../screens/EditFeedback';

import HideFeedBack from '../screens/HideFeedBack';

import ShowFeedBack from '../screens/ShowFeedBack';


import AddDiscount from '../screens/AddDiscount';
import EditDiscount from '../screens/EditDiscount';
import CateScreen from "../screens/products-creens/CategoriesProduct";
import AddCateScreen from "../screens/products-creens/category-screens/AddCateScreen";
import UpdateCateScreen from "../screens/products-creens/category-screens/UpdateCateScreen";
import ProductScreen from "../screens/products-creens/Products";
import AddProductScreen from "../screens/products-creens/product-screens/AddProductScreen";
import UpdateProductScreen from "../screens/products-creens/product-screens/UpdateProductScreen";
import Login from "../screens/Login";
import AddNewsScreen from "../screens/news-screens/AddNewsScreen";
import NewsScreen from "../screens/News";

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
              <Router exact path={'/thongke'}>
                  <Statistic />
              </Router>

              <Router exact path={'/danhgia'}>
                  <FeedBack />
              </Router>

              <Router exact path={'/trangthaidon'}>
                  <InvoiceState />
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

                <Route path="/tintuc" component={NewsScreen} />
                <Route path="/themtt" component={AddNewsScreen} />

                <Route path='/trangthaidon/cxn' component={UnconfirmInvoice}/>
                <Route path="/suahdcxn/:id" component={EditUnconfirmVoice}/>

                <Route path={'/trangthaidon/dxn'} component={ConfirmInvoice}/>
                <Route path="/suahdxn/:id" component={EditConfirmvoice}/>

                <Route path='/trangthaidon/dg' component={Delivering}/>
                <Route path="/suahddg/:id" component={EditDelivering}/>

                <Route path="/danhgia/choduyet" component={Pending}/>
                <Route path="/suadanhgia/:id" component={EditFeedback}/>
                
                <Route path="/danhgia/an" component={HideFeedBack} />
                <Route path="/danhgia/hienthi" component={ShowFeedBack} />


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

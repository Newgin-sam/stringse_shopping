import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/mainLayout';

import Home from './components/home/index';
import Footer from './components/navigation/footer';
import Header from './components/navigation/header';
import RegisterLogin from './components/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from './store/actions/user.actions';
import Loader from './utils/loader';
import Dashboard from './components/dashboard';
import authGuard from './hoc/authGuard';
import UserInfo from './components/dashboard/user/info';
import AdminProducts from './components/dashboard/admin/products';
import AddProduct from './components/dashboard/admin/products/addedit/add';
import EditProduct from './components/dashboard/admin/products/addedit/edit';
import Shop from './components/shop';
import ProductDetail from './components/product';
import UserCart from './components/dashboard/user/cart';
import ManageSite from './components/dashboard/admin/site';



const Routes = (props) => {


  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])


  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  return (
    <BrowserRouter>
      {loading ?
        <Loader full={true} />
        :
        <>
          <Header
            user={users}
            signOutUser={signOutUser}
          />
          <MainLayout>
            <Switch>
              <Route path="/dashboard/admin/manage_site" component={authGuard(ManageSite)} />
              <Route path='/dashboard/admin/edit_product/:id' component={authGuard(EditProduct)} />
              <Route path='/dashboard/admin/add_products' component={authGuard(AddProduct)} />
              <Route path='/dashboard/admin/admin_products' component={authGuard(AdminProducts)} />
              <Route path='/dashboard/user/user_cart' component={authGuard(UserCart)} />
              <Route path='/dashboard/user/user_info' component={authGuard(UserInfo)} />
              <Route path='/dashboard' component={authGuard(Dashboard)} />
              <Route path='/product_detail/:id' component={ProductDetail} />
              <Route path='/shop' component={Shop} />
              <Route path='/sign_in' component={RegisterLogin} />
              <Route path='/' component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      }
    </BrowserRouter>
  );
}

export default Routes;
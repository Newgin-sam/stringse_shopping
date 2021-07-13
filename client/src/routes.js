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
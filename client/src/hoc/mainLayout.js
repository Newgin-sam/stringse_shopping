import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearNotifications } from '../store/actions';

import { showToast } from '../utils/tools';

const MainLayout = (props) => {

    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    useEffect(() => {
        if (notifications && notifications.error) {

            const msg = notifications.msg ? notifications.msg : 'Error';

            showToast('ERROR', msg);
            dispatch(clearNotifications());
        }

        else if (notifications && notifications.success) {

            const msg = notifications.msg ? notifications.msg : 'Good Job !!'

            showToast('SUCCESS', msg)
            dispatch(clearNotifications());
        }

    }, [notifications, dispatch])

    return (
        <div>
            {props.children}
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
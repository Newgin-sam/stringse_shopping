import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    AUTH_USER,
    SIGN_OUT
} from '../types';

//user
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type: SIGN_OUT
})

//products
export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
})


export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

//notifications 
export const errorGlobal = (data) => ({
    type: ERROR_GLOBAL,
    payload: data
})

export const successGlobal = (data) => ({
    type: SUCCESS_GLOBAL,
    payload: data
})

export const clearNotifications = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATIONS
        })
    }
}
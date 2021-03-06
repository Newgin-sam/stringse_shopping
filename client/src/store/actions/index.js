import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    GET_PROD_BY_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    PRODUCT_ADD,
    CLEAR_PRODUCT_ADD,
    GET_PROD_BY_ID,
    CLEAR_CURRENT_PRODUCT,
    USER_ADD_TO_CART,
    PURCHASE__SUCCESS,
    GET_SITE_VARS,
    UPDATE_SITE_VARS
} from '../types';

//user
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type: SIGN_OUT
})

export const userUpdateProfile = (userdata) => ({
    type: UPDATE_USER_PROFILE,
    payload: userdata
})

export const userchangeEmail = (data) => ({
    type: USER_CHANGE_EMAIL,
    payload: data
})

export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART,
    payload: data
})

export const usepurchaseSuccess = (data) => ({
    type: PURCHASE__SUCCESS,
    payload: data
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

export const productsByPaginate = (data) => ({
    type: GET_PROD_BY_PAGINATE,
    payload: data
})

export const productRemove = () => ({
    type: REMOVE_PRODUCT
})

export const productAdd = (product) => ({
    type: PRODUCT_ADD,
    payload: product
})


export const clearProductAdd = () => ({
    type: CLEAR_PRODUCT_ADD
})

export const productsById = (product) => ({
    type: GET_PROD_BY_ID,
    payload: product
})

export const clearCurrentProduct = () => ({
    type: CLEAR_CURRENT_PRODUCT
})


//brands

export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands
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

//site

export const siteGetVars = (vars) => ({
    type: GET_SITE_VARS,
    payload: vars
})

export const updateSiteVars = (vars) => ({
    type: UPDATE_SITE_VARS,
    payload: vars
})
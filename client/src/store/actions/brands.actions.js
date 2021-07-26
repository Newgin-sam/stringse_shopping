
import * as actions from './index';
import axios from "axios"


export const getAllBrands = () => {
    return async (dispatch) => {
        try {
            const brands = await axios.post(`/api/brands/all`);
            dispatch(actions.getAllBrands(brands.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}
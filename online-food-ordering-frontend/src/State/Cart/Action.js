import { api }  from '../../Component/config/api';

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({type: 'FIND_CART_REQUEST'});
        try {
            const response = await api.get(`/api/cart/`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({type: 'FIND_CART_SUCCESS',payload: response.data});
        } catch (error) {
            dispatch({type: 'FIND_CART_FAILURE', payload: error});
        }
    }
}

export const getAllCartItems =(reqData) =>{
    return async (dispatch) => {
        dispatch({type: 'GET_ALL_CART_ITEMS_REQUEST'});
        try {
            const response = await get(`/api/cart/${reqData.cartId}/items`,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type: 'GET_ALL_CART_ITEMS_SUCCESS',payload: response.data});
        } catch (error) {
            dispatch({type: 'GET_ALL_CART_ITEMS_FAILURE',payload: error});
        }
    };
};

export const addToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({type: 'ADD_ITEM_TO_CART_REQUEST'});
        try {
            const {data} = await put(`/api/cart/add`,reqData.cartItem,{
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            console.log("add item to cart ", data);
            dispatch({type:'ADD_ITEM_TO_CART_SUCCESS',payload: data});

        } catch (error) {
            console.log("catch error ", error);
            dispatch({type: "ADD_ITEM_TO_CART_FAILURE", payload:error});
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type: 'UPDATE_CART_ITEM_REQUEST'});
        try {
            const {data} = await put(`/api/cart-item/update`,reqData.data,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("update cart item ", data);
            dispatch({type: 'UPDATE_CART_ITEM_SUCCESS', payload: data});
        } catch (error) {
            console.log("catch error ", error);
            dispatch({type: 'UPDATE_CART_ITEM_FAILURE', payload: error});
        }
    };
};

export const removeCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type: 'REMOVE_CART_ITEM_REQUEST'});
        try {
            const {data} = await delete(`/api/cart-item/${reqData.cartItemId}/remove`,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("remove cart item ", data);
            dispatch({type: 'REMOVE_CART_ITEM_SUCCESS', payload: data});
        } catch (error) {
            console.log("catch error ", error);
            dispatch({type: 'REMOVE_CART_ITEM_FAILURE', payload: error});
        }
    };
}

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({type: 'CLEAR_CART_REQUEST'});
        try {
            const {data} = await put(`/api/cart/clear`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            console.log("clear cart ", data);
            dispatch({type: 'CLEAR_CART_SUCCESS', payload: data});
        } catch (error) {
            console.log("catch error ", error);
            dispatch({type: 'CLEAR_CART_FAILURE', payload: error.message});
        }
    };
};

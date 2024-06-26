import { Dispatch } from "redux"
import { APITypes } from "../types"
import axios from "axios"
import * as Interfaces from '../interfaces'
import { getToken } from '@/app/controller/lib/get-token'
import store from "../store"
import  printful  from "../lib/APIPrintful"
import { PrintfulTypes } from "../types"

export const getUser = () => async (dispatch:Dispatch)=>{
    const token = getToken() as string
    const { user } = store.getState().api
    try{
        const res = await axios.post('/api/get-user',user,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        const data = await res.data
        if(data.token === 'undefined'){
            localStorage.removeItem('jwt')
        }
        dispatch({
            type:APITypes.API_GET_USER,
            user:data?.user?.data ? data.user.data : data.user,
            image:data?.image
        })
    }catch(err){
        if(typeof window !== 'undefined'){
            localStorage.removeItem('jwt')
        }
        dispatch({
            type:APITypes.API_GET_USER,
            data:{msg:'You must be logged in',user:null},
        })
    }
}
export const getUsers = () => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.get('/api/get-users')
        const data = await res.data
        dispatch({
            type:APITypes.API_GET_ALL_USERS,
            users:data?.users
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_GET_ALL_USERS,
            users:[]
        })
    }
}
export const deleteUser = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/delete-user',{id:id})
        const data = await res.data
        dispatch({
            type:APITypes.API_GET_ALL_USERS,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_GET_ALL_USERS,
            data:null
        })
    }
}
export const setProducts = () => async(dispatch:Dispatch)=>{
    try{
        const res = await axios.get('/assets/db/products.json')
        const data = await res.data
        const prevProducts = store.getState().api.products
        prevProducts.forEach((p:Interfaces.Product)=>{
            data.forEach((ip:Interfaces.Product)=>{
                if(p.id === ip.id){
                    ip.inCart = p.inCart
                }
            })
        })
        dispatch({
            type:APITypes.API_SET_PRODUCTS,
            products:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_SET_PRODUCTS,
            products:[]
        })
    }
}
export const register = (formData:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/register',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.data
        dispatch({
            type:APITypes.API_REGISTER,
            user:data.user,
            token:data.token,
            data:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_REGISTER,
            data:err
        })
    }

}
export const login = (formData:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/login',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.data
        const cookies = document.cookie;

        // Parse the cookie string to extract the value of the "wearable-jwt" cookie
        const cookieArray = cookies.split(';').map(cookie => cookie.trim());
        const wearableJwtCookie = cookieArray.find(cookie => cookie.startsWith('wearable-jwt='));
      
        // Extract the value of the "wearable-jwt" cookie
        let wearableJwt = null;
        if (wearableJwtCookie) {
          wearableJwt = wearableJwtCookie.split('=')[1];
        }
        dispatch({
            type:APITypes.API_LOGIN,
            data:data,
            user:data.user,
            token:data.token,
        })
        if(wearableJwt){
            window.location.href = '/'
        }
    }catch(err){
        dispatch({
            type:APITypes.API_LOGIN,
            data:err
        })
    }

}
export const logout = () => async(dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const deleteCookie = 'wearable-jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = deleteCookie;

        const res = await axios.get('/api/logout')
        const data = await res.data

        setTimeout(() => {
            if(typeof window !== 'undefined'){
                window.location.href = "/"
            }
        }, 1000);
        dispatch({
            type:APITypes.API_LOGOUT,
            token:null,
            data:data
        })
    }
}
export const updateProfile = (user:Interfaces.User) => async(dispatch:Dispatch) =>{
    const token = getToken()
    try{
        const res = await axios.post('/api/update-profile',user,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        const data = await res.data
        dispatch({
            type:APITypes.API_UPDATE_PROFILE,
            data:data,
            image:data.image
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_UPDATE_PROFILE,
            data:{
                msg:"Profile Not Updated"
            }
        })
    }
}
export const filterProducts = (query:any) => async(dispatch:Dispatch) =>{
    const localProducts = localStorage.getItem('wearable-products')
    const items = JSON.parse(localProducts as string)
    // Define the regex patterns conditionally based on the query parameters
const nameRegex = query.name ? new RegExp(`^${query.name}`, 'i') : null;
const sizeRegex = query.size ? new RegExp(`^${query.size}`, 'i') : null;

const filtered = items?.filter((product:any) => {
  return product.sync_variants.some((variant:any) => {
    const productName = product.sync_product.name;
    const variantRetailPrice = parseFloat(variant.retail_price);
    const variantSize = variant.size;
    const isNameMatch = nameRegex ? nameRegex.test(productName) : true;
    const isSizeMatch = sizeRegex ? sizeRegex.test(variantSize) : true;
    const isPriceMatch = variantRetailPrice > parseFloat(query.min_price) && variantRetailPrice < parseFloat(query.max_price);
    return isNameMatch && isPriceMatch && isSizeMatch;
  });
});

    if(filtered.length > 0){
        dispatch({
            type:APITypes.API_FILTER_PRODUCTS,
            products:filtered.filter((p:any) => p !== undefined && p !== null)
        })
    }
}


export const getCard = (user_id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/get-card',{ user_id:user_id })
        const data = await res.data
        dispatch({
            type:APITypes.API_GET_CARD,
            card:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_GET_CARD,
            card:null
        })
    }
}
export const updateCard = (query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/update-card',{ ...query })
        const data = await res.data
        dispatch({
            type:APITypes.API_UPDATE_CARD,
            card:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_UPDATE_CARD,
            card:null
        })
    }
}
/*---------------------PRINTFUL API-----------------------*/

export const printfulSetLocale = (locale:string) => (dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const storedLocale = localStorage.getItem('wearable-locale')
        if(storedLocale !== locale){
            localStorage.setItem('wearable-locale',locale)
            dispatch({
                type:PrintfulTypes.PRINTFUL_SET_LOCALE,
                locale:locale
            })
        }else{
            const storedLocale = localStorage.getItem('wearable-locale')
            dispatch({
                type:PrintfulTypes.PRINTFUL_SET_LOCALE,
                locale:storedLocale
            })
        }
    }
}

export const printfulAuth = () => async(dispatch:Dispatch) =>{
   try{
     const res = await printful.get('/auth')
     const data = await res.data
     dispatch({
        type:PrintfulTypes.PRINTFUL_AUTH,
        html:data
     })
   }
   catch(err){
    console.log(err)
    dispatch({
        type:PrintfulTypes.PRINTFUL_AUTH,
        storeHeader:null,
        oAuthToken:null,
        refreshToken:null
    })
   } 
}
export const printfulAuthRedirect = (code:string) => async(dispatch:Dispatch) =>{
   try{
     const res = await printful.get('/auth-redirect',{
        params:{
            code:code
        }
     })
     const data = await res.data
     dispatch({
        type:PrintfulTypes.PRINTFUL_AUTH_REDIRECT,
        storeHeader:null,
        oAuthToken:null,
        refreshToken:null
     })
   }
   catch(err){
    console.log(err)
    dispatch({
        type:PrintfulTypes.PRINTFUL_AUTH_REDIRECT,
        storeHeader:null,
        oAuthToken:null,
        refreshToken:null
    })
   } 
}

export const printfulGetProducts = (category_id:number) => async (dispatch:Dispatch) => {
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/products',{
            params:{
                category_id:category_id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCTS,
            products:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCTS,
            products:[]
        })
    }

}

export const printfulGetVariant = (id:number) => async (dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/variant',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_VARIANT,
            variant:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_VARIANT,
            variant:null
        })
    }
}
export const printfulGetProduct = (id:number) => async (dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/products',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT,
            product:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT,
            product:null
        })
    }
}

export const printfulGetSizes = (id:number,unit:string) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.get(`/get-sizes`,{
            params:{
                id:id,
                unit:unit
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SIZES,
            sizes:data
        })
    }catch(err){
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SIZES,
            sizes:[]
        })
    }

}

export const printfulGetCategories = () => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/categories',{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORIES,
            categories:data
        })
    }catch(err){
        console.log(err)
         dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORIES,
            categories:err
        })
    }
}

export const printfulGetCategory = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/categories',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORY,
            category:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORY,
            category:null
        })
    }
}

export const printfulSetAllSyncProducts = (products:any) => async (dispatch:Dispatch) =>{
    dispatch({
        type:PrintfulTypes.PRINTFUL_SET_ALL_SYNC_PRODUCTS,
        products:products
    })
}

export const printfulGetAllSyncProducts = (offset:number,limit:number) => async (dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    let isFetched = false
    let tmpOffset = offset
    let tmpLimit = limit
    let tmpProducts = []
    try {
        while(!isFetched){
            const res = await printful.get('/sync-products',{
                params:{
                    offset:tmpOffset,
                    limit:tmpLimit,
                    locale:locale
                }
            }) 
            const data = await res.data
            tmpProducts.push(...data.result)
            tmpOffset += 100
            if(!data?.result[0]?.id){
                isFetched = true
            }
        }
      
                 if(typeof window !== 'undefined'){
                    const serializedProducts = JSON.stringify(tmpProducts?.filter((p:any) => p !== undefined && p !== null).filter((p:any) => {
                        if(p.id){
                            return p
                        }
                    }));
                    localStorage.setItem('wearable-products',serializedProducts)
                    dispatch({
                        type:PrintfulTypes.PRINTFUL_GET_ALL_SYNC_PRODUCTS,
                        products:[...JSON.parse(serializedProducts)]
                    })
                
                   }
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_ALL_SYNC_PRODUCTS,
            products:null
        })
    }
}

export const printfulGetSyncProducts = (category_id:number,status:string) => async (dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try {
        const res = await printful.get('/sync-products',{
            params:{
                category_id:category_id,
                status:status,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCTS,
            products:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCTS,
            products:null
        })
    }
}

export const printfulCreateSyncProduct = (sync_product:any,sync_variants:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/sync-product',{
            sync_product:sync_product,
            sync_variants:sync_variants
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_SYNC_PRODUCT,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_SYNC_PRODUCT,
            data:null
        })
    }
}

export const printfulGetSyncProduct  = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
       const res = await printful.get('/sync-products',{
            params:{
                id:id,
                locale:locale
            }
       })
       const data = await res.data
       dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT,
            product:data
       })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT,
            product:null
        })
    }
}

export const printfulDeleteSyncProduct = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/sync-product',{ id:id })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT,
            data:data
        })
    }catch(err){
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT,
            data:err
        })
    }
}


export const printfulModifySyncProduct = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.put('/sync-product',{ id:id })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_PRODUCT,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_PRODUCT,
            data:err
        })
    }
}

export const printfulGetSyncVariant = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/sync-variant',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT,
            variant:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT,
            variant:null
        })
    }
}


export const printfulDeleteSyncVariant = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.delete('/sync-variant',{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT,
            variant:data,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT,
            variant:null,
            data:null
        })
    }
}
export const printfulModifySyncVariant = (id:number,query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.put('/sync-variant',{
           id:id,
           query:query 
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT,
            variant:data,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT,
            variant:null,
            data:null
        })
    }
}
export const printfulCreateNewSyncVariant = (id:number,query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post(`/sync-variant`,{
            id:id,
            query:query
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_NEW_SYNC_VARIANT,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_NEW_SYNC_VARIANT,
            data:null
        })
    }
}

export const printfulGetProductsTemplateList = (offset:number,limit:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/products-templates',{
            params:{
                offset:offset,
                limit:limit,
                locale:locale
            }
        })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATES,
            templates:data,
        })

    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATES,
            templates:null
        })
    }

}

export const printfulGetProductTemplate = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/product-templates',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATE,
            templates:data,
        })

    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_PRODUCT_TEMPLATE,
            templates:null
        })
    }

}

export const printfulDeleteProductTemplate = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/product-templates',{ id:id })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_PRODUCT_TEMPLATE,
            data:data
        })

    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_PRODUCT_TEMPLATE,
            data:null,
        })
    }

}
export const printfulGetListOfOrders = (offset:number,limit:number,status:string) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/orders',{
            params:{
                offset:offset,
                limit:limit,
                status:status,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_LIST_OF_ORDERS,
            orders:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_LIST_OF_ORDERS,
            orders:[],
        })
    }
}
export const printfulCreateNewOrder = (confirm:boolean,update_existing:boolean,query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/orders',{
            confirm:confirm,
            update_existing:update_existing,
            query:query
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_NEW_ORDER,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CREATE_NEW_ORDER,
            data:null       
        })
    }
}

export const printfulGetOrderData = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/orders',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_ORDER_DATA,
            order:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_ORDER_DATA,
            order:null,
        })
    }
}
export const printfulCancelAnOrder = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.delete('/orders',{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CANCEL_AN_ORDER,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CANCEL_AN_ORDER,
            data:null
        })
    }
}
export const printfulUpdateOrderData = (id:number,confirm:boolean,query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.put('/orders',{query:query},{
            params:{
                id:id,
                confirm:confirm
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_UPDATE_ORDER_DATA,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_UPDATE_ORDER_DATA,
            data:null
        })
    }
}
export const printfulConfirmDraftForFulfillment = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.put(`/confirm-draft-for-fulfillment`,{
            id:id,
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CONFIRM_DRAFT_FOR_FULLFILMENT,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CONFIRM_DRAFT_FOR_FULLFILMENT,
            data:null
        })
    }
}
export const printfulEstimateOrderCost = (order_data:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post(`/estimate-costs`,{
            order_data:order_data
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_ESTIMATE_ORDER_COST,
            informationCost:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_ESTIMATE_ORDER_COST,
            informationCost:null,
        })
    }
}
export const printfulAddANewFile = (query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/files',{
            query:query
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_ADD_A_NEW_FILE,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_ADD_A_NEW_FILE,
            data:null
        })
    }
}
export const printfulGetFile = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.get('/file',{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_FILE,
            file:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_FILE,
            file:null,
        })
    }
}
export const printfulReturnAvailableColorsFromImageUrl = (file_url:string) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/files-thread-colors',{
                file_url:file_url
            })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_AVAILABLE_THREDS_COLORS_FROM_IMAGE_URL,
            data:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_AVAILABLE_THREDS_COLORS_FROM_IMAGE_URL,
            data:null
        })
    }
}
export const printfulShippingRateAPI = (query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.post('/shipping-rates',{
                query:query
            })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_SHIPPING_RATE_API,
            shipping:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_SHIPPING_RATE_API,
            shipping:null,
        })
    }
}
export const printfulGetListOfSyncProductsEcommerce = (query:any) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/sync-products-ecommerce',{
            params:{
                ...query,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_LIST_OF_SYNC_PRODUCTS_ECOMMERCE,
            products:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_LIST_OF_SYNC_PRODUCTS_ECOMMERCE,
            products:null,
        })
    }
}
export const printfulGetListOfSyncProductEcommerce = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/sync-products-ecommerce',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT_ECOMMERCE,
            product:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_PRODUCT_ECOMMERCE,
            product:null,
        })
    }
}
export const printfulDeleteListOfSyncProductEcommerce = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.delete('/sync-products-ecommerce',{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT_ECOMMERCE,
            data:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_PRODUCT_ECOMMERCE,
            data:null,
        })
    }
}
export const printfulGetSyncVariantEcommerce = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/sync-variant-ecommerce',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT_ECOMMERCE,
            variant:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_SYNC_VARIANT_ECOMMERCE,
            variant:null,
        })
    }
}
export const printfulModifySyncVariantEcommerce = (id:number,query:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.put('/sync-variant-ecommerce',{
            query:query
        },{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT_ECOMMERCE,
            data:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_MODIFY_SYNC_VARIANT_ECOMMERCE,
            data:null,
        })
    }
}
export const printfulDeleteSyncVariantEcommerce = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.delete('/sync-variant-ecommerce',{
            params:{
                id:id
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT_ECOMMERCE,
            data:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_DELETE_SYNC_VARIANT_ECOMMERCE,
            data:null,
        })
    }
}
export const printfulGetCountries = () => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/countries',{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_COUNTRIES,
            countries:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_COUNTRIES,
            variant:null,
        })
    }
}
export const printfulTaxRate = () => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/tax-countries',{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_TAX_API,
            tax:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_TAX_API,
            tax:null,
        })
    }
}
export const printfulCalculateTaxRate = (recipient:any) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.post('/tax-rates',recipient,{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CALCULATE_TAX_RATE,
            tax:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CALCULATE_TAX_RATE,
            tax:null,
        })
    }
}
export const printfulDisableWebhookSupport = () => async(dispatch:Dispatch) =>{
    try{
        const res = await printful.delete('/webhooks')
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_DISABLE_WEBHOOK_SUPPORT,
            data:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_DISABLE_WEBHOOK_SUPPORT,
            data:null,
        })
    }
}
export const printfulStoreInformationAPI = (query:any) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.post('/store-packing-slip',{query:query},{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_CHANGE_PACKING_SLIP,
            packing:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_CHANGE_PACKING_SLIP,
            packing:null,
        })
    }
}
export const printfulGetBasicInformationAboutStores = () => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/stores',{
            params:{
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORES,
            stores:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORES,
            stores:null,
        })
    }
}
export const printfulGetBasicInformationAboutStore = (id:number) => async(dispatch:Dispatch) =>{
    const { locale } = store.getState().api
    try{
        const res = await printful.get('/stores',{
            params:{
                id:id,
                locale:locale
            }
        })
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORE,
            store:data,
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_BASIC_INFORMATION_ABOUT_STORE,
            store:null,
        })
    }
}

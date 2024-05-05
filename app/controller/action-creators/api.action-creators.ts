import { Dispatch } from "redux"
import { APITypes } from "../types"
import axios from "axios"
import * as Interfaces from '../interfaces'
import { getToken } from '@/app/controller/lib/get-token'
import store from "../store"
import { prinful } from "../lib/prinful"
import { PrintfulTypes } from "../types"
import { headers } from "next/headers"

export const changeCurrency = (currency:string) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.get('/assets/db/products.json')
        const products = await res.data
        let actualCurrency = 0
        switch(currency){
            case 'USD':
                actualCurrency = 1
                break
            case 'EU':
                actualCurrency = 0.92
                break
            case 'PLN':
                actualCurrency = 0.25 
                break
            default:
                actualCurrency = 1
        }
    
        const tmpProducts = products.map((p:Interfaces.Product) =>({
            ...p,
            prevPrice:(p.prevPrice / actualCurrency).toFixed(2),
            price:(p.price / actualCurrency).toFixed(2)
        }))
        dispatch({
            type:APITypes.API_CHANGE_CURRENCY,
            currency:actualCurrency,
            products:tmpProducts
        })
    }catch(err){
        console.log(err)
    }
}
export const test = () => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/test-app',{},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.data
        if(typeof window !== 'undefined'){
            if(data){
                localStorage.setItem('jwt',data.token)
            }
        }
        dispatch({
            type:APITypes.API_TEST,
            data:data,
            user:data.user,
            token:data.token,
        })
    }catch(err){
        dispatch({
            type:APITypes.API_TEST,
            data:err
        })
    }

}
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
        if(typeof window !== 'undefined'){
            if(data?.token){
                localStorage.setItem('jwt',data?.token)
            }
        }
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
        if(typeof window !== 'undefined'){
            if(data){
                localStorage.setItem('jwt',data.token)
            }
        }
        dispatch({
            type:APITypes.API_LOGIN,
            data:data,
            user:data.user,
            token:data.token,
        })
    }catch(err){
        dispatch({
            type:APITypes.API_LOGIN,
            data:err
        })
    }

}
export const logout = () => async(dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        setTimeout(() => {
            if(typeof window !== 'undefined'){
                window.location.href = "/"
            }
        }, 1000);
        dispatch({
            type:APITypes.API_LOGOUT,
            token:null,
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
export const filterProducts = (min:number,max:number,color:any) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.get('/assets/db/products.json')
        let products = await res.data
        products = products.filter((p:Interfaces.Product) => {
            if(p.price > min && p.price < max){
                const isColor = p.colors.find((p)=> p.hex === color.hex)
                if(isColor){
                    return p
                }else{
                    return null
                }
            }
        }).filter((p:Interfaces.Product) => p !== null)
        const prevProducts = store.getState().api.products
        prevProducts.forEach((p:Interfaces.Product)=>{
            products.forEach((ip:Interfaces.Product)=>{
                if(p.id === ip.id){
                    ip.inCart = p.inCart
                }
            })
        })
        dispatch({
            type:APITypes.API_FILTER_PRODUCTS,
            products:products
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_FILTER_PRODUCTS,
            products:[]
        })
    }
}
export const searchProducts = (term:string) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.get('/assets/db/products.json')
        let products = await res.data
        const regex = new RegExp(`^${term}`,'gi')
        products = products.filter((p:Interfaces.Product) => regex.test(p.title))
        if(term === ''){
            dispatch({
                type:APITypes.API_SEARCH_PRODUCTS,
                matches:[]
            })
        }else{
            dispatch({
                type:APITypes.API_SEARCH_PRODUCTS,
                matches:products
            })
        }
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_SEARCH_PRODUCTS,
            matches:[]
        })
    }
}
export const pay = (total:number,currency:string,description:string) => async(dispatch:Dispatch) =>{
    try{
        const res = await axios.post('/api/pay',{total,currency,description})
        const data = await res.data
        dispatch({
            type:APITypes.API_PAY,
            paymentLink:data?.paymentLink
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:APITypes.API_PAY,
            paymentLink:''
        })
    }
}

/*---------------------PRINTFUL API-----------------------*/

export const prinfulGetProducts = (category_id:number) => async (dispatch:Dispatch) => {
    try{
        const res = await prinful.get('/products',{
            params:{
                category_id:category_id
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

export const prinfulGetVariant = (id:number) => async (dispatch:Dispatch) =>{
    try{
        const res = await prinful.get('/products/variant',{
            params:{
                id:id
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
export const prinfulGetProduct = (id:number) => async (dispatch:Dispatch) =>{
    try{
        const res = await prinful.get('/products',{
            params:{
                id:id
            }
        })
        const data = res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_VARIANT,
            product:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_VARIANT,
            product:null
        })
    }
}

export const printfulGetSizes = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await prinful.get(`/products/${id}/sizes`)
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
    try{
        const res = await prinful.get('/categories')
        const data = await res.data
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORIES,
            categories:data
        })
    }catch(err){
        console.log(err)
        dispatch({
            type:PrintfulTypes.PRINTFUL_GET_CATEGORIES,
            categories:[]
        })
    }
}

export const prinfulGetCategory = (id:number) => async(dispatch:Dispatch) =>{
    try{
        const res = await prinful.get('/categories',{
            params:{
                id:id
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

export const prinfulGetSyncProducts = (category_id:number,status:string) => async (dispatch:Dispatch) =>{
    const { storeHeader,oAuthToken } = store.getState().api
    try {
        const res = await prinful.get('/store/products',{
            params:{
                category_id:category_id,
                status:status
            },
            headers:{
                'X-PF-Store-Id':storeHeader,
                'Authorization':`Bearer ${oAuthToken}`
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

export const prinfulCreateSyncProduct = (sync_product:any,sync_variants:any) => async(dispatch:Dispatch) =>{
    const { storeHeader,oAuthToken } = store.getState().api
    try{
        const res = await prinful.post('/store/products',{
            sync_product:sync_product,
            sync_variants:sync_variants
        },{
            headers:{
                'X-PF-Store-Id':storeHeader,
                'Authorization':`Bearer ${oAuthToken}`
            }
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
            product:null
        })
    }
}

export const prinfulGetSyncProduct  = (id:number) => async(dispatch:Dispatch) =>{
    const { storeHeader, oAuthToken } = store.getState().api
    try{
       const res = await prinful.get('/store/products',{
            params:{
                id:id
            },
            headers:{
                'X-PF-Store-Id':storeHeader,
                'Authorization':`Bearer ${oAuthToken}`
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

export const prinfulDeleteSyncProduct = (id:number) => async(dispatch:Dispatch) =>{
    const { storeHeader, oAuthToken } = store.getState().api
    try{
        const res = await prinful.post('/store/products',{ id:id },{
            headers:{
                'X-PF-Store-Id':storeHeader,
                'Authorization':`Bearer ${oAuthToken}`
            }
        })
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


export const prinfulModifySyncProduct = (id:number) => async(dispatch:Dispatch) =>{
    const { storeHeader, oAuthToken } = store.getState().api
    try{
        const res = await prinful.put('/store/products',{ id:id },{
            headers:{
                'X-PF-Store-Id':storeHeader,
                'Authorization':`Bearer ${oAuthToken}`
            }
        })
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


import { Dispatch } from "redux"
import { ShopTypes } from "../types"
import store from "../store"
import * as Interfaces from '@/app/controller/interfaces'


export const addToCart = (id:number,sync_product_id:number,variant_id:number,warehouse_product_variant_id:number,external_variant_id:number,quantity:number,retail_price:number,currency:string,variantIndex:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { user } = store.getState().api
    let tmpCart = cart
    tmpCart.push({id,sync_product_id,variant_id,warehouse_product_variant_id,external_variant_id,quantity,retail_price,currency,variantIndex})
    if(typeof window !== undefined){
        localStorage.setItem(`wearable-cart-${user?.id}`,JSON.stringify(tmpCart))
    }
    dispatch({
        type:ShopTypes.SHOP_ADD_TO_CART,
        cart:tmpCart
    })
}
export const setCart = (items?:any) => (dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const { user } = store.getState().api
        const cartJSON = localStorage.getItem(`wearable-cart-${user?.id}`)
        const cart = JSON.parse(cartJSON as string)
        if(cart){
            if(items){
                localStorage.setItem(`wearable-cart-${user?.id}`,JSON.stringify([]))
                dispatch({
                    type:ShopTypes.SHOP_SET_CART,
                    cart:items
                })     
            }else{
                dispatch({
                    type:ShopTypes.SHOP_SET_CART,
                    cart:cart
                })                
            }
        }else{
            dispatch({
                type:ShopTypes.SHOP_SET_CART,
                cart:[]
            })
        }
    }
}
export const increment = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { user } = store.getState().api
    const cartItem = cart.find((i:any) =>  i.id === id) as any
    if(cartItem){
        cartItem.quantity += count
    }
    if(typeof window !== 'undefined'){
        localStorage.setItem(`wearable-cart-${user?.id}`,JSON.stringify(cart))
    }
    dispatch({
        type:ShopTypes.SHOP_INCREMENT,
        cart:cart
    })
}
export const decrement = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { user } = store.getState().api
    let tmpCart = cart
    const cartItem = cart.find((i:any) =>  i.id === id) as any
    if(cartItem.quantity > 1){
        cartItem.quantity -= count
    }else{
        tmpCart = tmpCart.filter((i:any) => i.id !== id)
    }
    if(typeof window !== 'undefined'){
        localStorage.setItem(`wearable-cart-${user?.id}`,JSON.stringify(cart))
    }
    dispatch({
        type:ShopTypes.SHOP_DECREMENT,
        cart:tmpCart
    })
}
export const removeFromCart = (id:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const { user } = store.getState().api
    const tmpCart = cart.filter((i:any) =>  i.id !== id) as any
    if(typeof window !== 'undefined'){
        localStorage.setItem(`wearable-cart-${user?.id}`,JSON.stringify(tmpCart))
    }
    dispatch({
        type:ShopTypes.SHOP_REMOVE_FROM_CART,
        cart:tmpCart
    })
}
export const clearCart = () => (dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const { user } = store.getState().api
        localStorage.removeItem(`wearable-cart-${user?.id}`)
    }
    dispatch({
        type:ShopTypes.SHOP_CLEAR_CART,
        cart:[]
    })
}
export const summary = () => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    let summary = 0
    cart.map((c:any)=>{
        summary += (c.quantity * c.retail_price)
    })
    dispatch({
        type:ShopTypes.SHOP_SUMMARY,
        summary:summary
    })
}
export const setFavoruites = () => (dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const { user } = store.getState().api
        const favoruitesJSON = localStorage.getItem(`wearable-favoruites-${user?.id}`)
        const favoruites = JSON.parse(favoruitesJSON as string)
        if(favoruites){
            dispatch({
                type:ShopTypes.SHOP_SET_FAVORUITES,
                favoruites:favoruites
            })
        }else{
            dispatch({
                type:ShopTypes.SHOP_SET_FAVORUITES,
                favoruites:[]
            })
        }
    }
}
export const addFavoruite = (id:number,variantIndex:number) => (dispatch:Dispatch) =>{
    const { favoruites } = store.getState().shop
    const { user } = store.getState().api
    let tmpFavoruites = favoruites
    if(!tmpFavoruites.includes(id)){
        tmpFavoruites.push({id,variantIndex})
    }
    if(typeof window !== 'undefined'){
        localStorage.setItem(`wearable-favoruites-${user?.id}`,JSON.stringify(tmpFavoruites))
    }
    dispatch({
        type:ShopTypes.SHOP_ADD_FAVORUITE,
        favoruites:tmpFavoruites
    })
}
export const removeFavoruite = (id:number) => (dispatch:Dispatch) =>{
    const { favoruites } = store.getState().shop
    const { user } = store.getState().api
    let tmpFavoruites = favoruites
    tmpFavoruites = tmpFavoruites.filter((f:any) => f.id !== id)
    if(typeof window !== 'undefined'){
        localStorage.setItem(`wearable-favoruites-${user?.id}`,JSON.stringify(tmpFavoruites))
    }
    dispatch({
        type:ShopTypes.SHOP_REMOVE_FAVORUITE,
        favoruites:tmpFavoruites
    })
}
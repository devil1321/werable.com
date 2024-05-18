import { Dispatch } from "redux"
import { ShopTypes } from "../types"
import store from "../store"
import * as Interfaces from '@/app/controller/interfaces'

export const addToCart = (product_id:number,sync_product_id:number,quantity:number,retail_price:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    let tmpCart = cart
    tmpCart.push({product_id,sync_product_id,quantity,retail_price})
    console.log(cart)
    dispatch({
        type:ShopTypes.SHOP_ADD_TO_CART,
        cart:tmpCart
    })
}
export const setCart = (cart:Interfaces.CartItem[]) => (dispatch:Dispatch) =>{
    dispatch({
        type:ShopTypes.SHOP_SET_CART,
        cart:cart
    })
}
export const increment = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const cartItem = cart.find((i:any) =>  i.product_id === id) as any
    if(cartItem){
        cartItem.quantity += count
    }
    dispatch({
        type:ShopTypes.SHOP_INCREMENT,
        cart:cart
    })
}
export const decrement = (id:number,count:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    let tmpCart = cart
    const cartItem = cart.find((i:any) =>  i.product_id === id) as any
    if(cartItem.quantity > 1){
        cartItem.quantity -= count
    }else{
        tmpCart = tmpCart.filter((i:any) => i.product_id !== id)
    }
    dispatch({
        type:ShopTypes.SHOP_DECREMENT,
        cart:tmpCart
    })
}
export const removeFromCart = (id:number) => (dispatch:Dispatch) =>{
    const { cart } = store.getState().shop
    const tmpCart = cart.filter((i:any) =>  i.product_id !== id) as any
    dispatch({
        type:ShopTypes.SHOP_REMOVE_FROM_CART,
        cart:tmpCart
    })
}
export const clearCart = () => (dispatch:Dispatch) =>{
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
export const setFavoruite = (favoruiteItem:any) => (dispatch:Dispatch) =>{
    if(typeof window !== 'undefined'){
        const favoruitesJSON = localStorage.getItem('wearable-favoruites')
        dispatch({
            type:ShopTypes.SHOP_SET_FAVORUITE,
            favoruites:JSON.parse(favoruitesJSON as string)
        })
    }
}
export const addFavoruite = (favoruiteItem:any) => (dispatch:Dispatch) =>{
    const { favoruites } = store.getState().shop
    let tmpFavoruites = favoruites
    if(!tmpFavoruites.includes(favoruiteItem)){
        tmpFavoruites.push(favoruiteItem)
    }
    if(typeof window !== 'undefined'){
        localStorage.setItem('wearable-favoruites',JSON.stringify(tmpFavoruites))
    }
    dispatch({
        type:ShopTypes.SHOP_ADD_FAVORUITE,
        favoruites:tmpFavoruites
    })
}
export const removeFavoruite = (id:number) => (dispatch:Dispatch) =>{
    const { favoruites } = store.getState().shop
    let tmpFavoruites = favoruites
    tmpFavoruites = tmpFavoruites.filter((f:any) => f.id !== id)
    if(typeof window !== 'undefined'){
        localStorage.setItem('wearable-favoruites',JSON.stringify(tmpFavoruites))
    }
    dispatch({
        type:ShopTypes.SHOP_REMOVE_FAVORUITE,
        favoruites:tmpFavoruites
    })
}
import { UITypes } from "../types";
import { Dispatch } from "redux";

export const setCarouselCount = (count:number) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.SET_CAROUSEL_COUNT,
        carouselCount:count
    })
} 

export const changeLanguage = (ln:string) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.UI_CHANGE_LANGUAGE,
        language:ln
    })
}
export const changeCurrency = (currency:string) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.UI_CHANGE_CURRENCY_STRING,
        currency:currency
    })
}


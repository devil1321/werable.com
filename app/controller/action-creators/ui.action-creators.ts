import { UITypes } from "../types";
import { Dispatch } from "redux";

export const setOrderTab = (tabNumber:number) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.UI_SET_TAB,
        tab:tabNumber
    })
} 

import { UITypes } from "../types";
import { Dispatch } from "redux";

export const setIsSidebar = (isOpen:boolean) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.UI_SET_IS_SIDEBAR,
        isSidebar:isOpen
    })
} 
export const setOrderTab = (tabNumber:number) => (dispatch:Dispatch) =>{
    dispatch({
        type:UITypes.UI_SET_TAB,
        tab:tabNumber
    })
} 

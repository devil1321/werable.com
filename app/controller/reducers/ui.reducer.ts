import { UITypes } from "../types"
import { UIActions } from "../actions/ui.actions"

interface InitState {
    language:string;
    currency:string;
    carouselCount:number;
}

const initState:InitState = {
    language:'English',
    currency:'USD',
    carouselCount:0
}

export default (state:InitState = initState,action:UIActions) =>{
    switch(action.type){
        case UITypes.SET_CAROUSEL_COUNT:
            return{
                ...state,
                carouselCount:action.carouselCount
            }
        case UITypes.UI_CHANGE_LANGUAGE:
            return {
                ...state,
                language:action.language
            }
        case UITypes.UI_CHANGE_CURRENCY_STRING:
            return {
                ...state,
                currency:action.currency
            }
        default:
            return {
                ...state
            }
        }
    }

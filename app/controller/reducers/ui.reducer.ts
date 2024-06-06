import { UITypes } from "../types"
import { UIActions } from "../actions/ui.actions"

interface InitState {
    tab:number;
    isSidebar:boolean;
}

const initState:InitState = {
    tab:0,
    isSidebar:false
}

export default (state:InitState = initState,action:UIActions) =>{
    switch(action.type){
        case UITypes.UI_SET_TAB:
            return {
                ...state,
                tab:action.tab
            }
        case UITypes.UI_SET_IS_SIDEBAR:
            return {
                ...state,
                isSidebar:action.isSidebar
            }
        default:
            return {
                ...state
            }
        }
    }

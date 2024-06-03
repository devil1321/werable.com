import { UITypes } from "../types"
import { UIActions } from "../actions/ui.actions"

interface InitState {
    tab:number;
}

const initState:InitState = {
    tab:0
}

export default (state:InitState = initState,action:UIActions) =>{
    switch(action.type){
        case UITypes.UI_SET_TAB:
            return {
                ...state,
                tab:action.tab
            }
        default:
            return {
                ...state
            }
        }
    }


import { UITypes } from "../types"

interface SET_TAB{
    type:UITypes.UI_SET_TAB;
    tab:number;
}


export type UIActions = SET_TAB | any

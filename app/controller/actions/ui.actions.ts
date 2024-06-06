
import { UITypes } from "../types"

interface SET_TAB{
    type:UITypes.UI_SET_TAB;
    tab:number;
}
interface SET_IS_SIDEBAR{
    type:UITypes.UI_SET_IS_SIDEBAR;
    isSidebar:boolean;
}


export type UIActions = SET_TAB |  SET_IS_SIDEBAR | any

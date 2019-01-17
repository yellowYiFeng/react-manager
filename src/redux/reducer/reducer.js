/**
 * reducer
 */

import { combineReducers } from 'redux'
import { type } from '../action/action';
const ebikeData = (state, action) => {//state:{menuName:''},action:{menuName: "富文本"type: "SWITCH_MENU"}
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};
    }
};

export default ebikeData;
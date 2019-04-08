/**
 * reducer
 */

import { combineReducers } from 'redux'
import { type } from '../action/action';
//reducer
const ebikeData = (state, action) => {//state:{menuName:''},action:{menuName: "富文本"type: "SWITCH_MENU"}
    switch (action.type) {
        case type.SWITCH_MENU:return {
            ...state,
            menuName:action.menuName
        };
        case type.DEALCOUNT:return {
            ...state,
            count:action.count //= action.count+2
        }
        default:
            return {...state};
    }
};

export default ebikeData;
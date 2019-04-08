export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    DEALCOUNT:'DEALCOUNT'
}
// action creators
export const switchMenu = menuName => {
    return {type: type.SWITCH_MENU,menuName}
}
export const dealCount = count => {
    return {type: type.DEALCOUNT,count}
}

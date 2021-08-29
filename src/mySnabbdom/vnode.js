/*
    vnode函数的作用是暴露一个函数,
    函数d的功能就是把传入的5个参数，拼成一个对象返回
*/
export default function (sel, data, children, text, elm) {
    return {
        sel,
        data,
        children,
        text,
        elm
    }
}
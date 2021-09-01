/*
    patch函数的功能是
*/
import vnode from './vnode'
import createElement from './createElement'
export default function patch(oldVnode, newVnode) {
    // 先通过sel属性判断oldVnode是dom节点还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        // oldVnode是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // 判断oldVnode和newVnode是同一个节点
    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        // 选择器相同且key相同，则是同一个节点
        // 同一个节点，要进行精细化比较
    } else {
        // 不是同一个节点，暴力删除旧的，插入新的节点
        // 创建一个DOM节点
        let newVnodeElm = createElement(newVnode)
        // 插入到老节点之前
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);

    }
    console.log(oldVnode, newVnode);
}
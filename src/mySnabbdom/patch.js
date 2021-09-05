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
        // 判断新旧VNode是否是同一个对象，如果是，就什么都不做
        if (oldVnode === newVnode) return
        // 同一个节点，要进行精细化比较
        // 判断新VNode是否有text属性
        if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
            // 有text属性,比较新老text是否相同,相同就什么都不做
            // 不同就把oldVnode中的elm的innertext改变为newVnode的text
            // console.log(newVnode, '哈哈 ');
            if (newVnode.text != oldVnode.text) {
                oldVnode.elm.innerText = newVnode.text
            }
        } else {
            // 没有text属性,判断oldVnode有没有children，
            if (oldVnode.children != undefined && oldVnode.children.length > 0) {
                // 最复杂，新老都有children
            } else {
                // 老的没有children，新的有children
                // 清空老节点的内容
                oldVnode.elm.innerHTML = ''
                for (let i = 0; i < newVnode.children.length; i++) {
                    let dom = createElement(newVnode.children[i])
                    oldVnode.elm.appendChild(dom)
                }
                // console.log(newVnode, oldVnode, 'hehe');
            }
        }
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
    // console.log(oldVnode, newVnode);
}
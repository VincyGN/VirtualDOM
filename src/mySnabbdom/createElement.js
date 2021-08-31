// /*
//     封装创建DOM节点的方法
//     vnode:要创建的dom节点
//     pivot:是一个标杆，将vnode元素，插入到pivot之前
// */
// export default function createElement(vnode, pivot) {
//     console.log(`目的是把`, vnode, '插入到', pivot, '之前');
//     // 创建一个真正的DOM节点，这个节点是孤儿节点
//     let domNode = document.createElement(vnode.sel)
//     // 判断是有子节点还是有文本， 子节点与文本不共存
//     if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
//         // 内部是文字
//         domNode.innerText = vnode.text
//         // 让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标签节点之前
//         pivot.parentNode.insertBefore(domNode, pivot)
//     } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
//         // 内部是子节点，递归创建子节点
//         // 直到h函数的第三个参数是文本时，结束递归
//         // 也就是说要重复调用createElement方法
//         // 但是，没有可参考的标杆，因此要改造createElement方法
//     }
// }

// ----------改造后,适应递归

/*
    封装创建DOM节点的方法
    vnode:要创建的dom节点
    是孤儿节点，不进行插入
*/
export default function createElement(vnode) {
    // 创建一个真正的DOM节点，这个节点是孤儿节点
    let domNode = document.createElement(vnode.sel)
    // 判断是有子节点还是有文本， 子节点与文本不共存
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        // 内部是文字
        domNode.innerText = vnode.text
        // console.log(`目的是把`, vnode, domNode); 
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 内部是子节点，递归创建子节点
        for (let i = 0; i < vnode.children.length; i++) {
            // 得到当前这个children
            let ch = vnode.children[i]
            // 创建出它的DOM， 一旦调用createElement意味着：创建出DOM了，并且它的elm属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点  
            let chDOM = createElement(ch)
            // console.log(chDOM);
            // 上树
            domNode.appendChild(chDOM)
        }
    }
    // 补充elm属性
    vnode.elm = domNode
    // 返回elm,elm是一个纯DOM的属性对象
    return vnode.elm
}
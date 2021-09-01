import h from './mySnabbdom/h';
import patch from './mySnabbdom/patch'

const myVnode1 = h('h1', {}, '你好')
const myVnode2 = h('section', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, [
        h('div', {}, [
            h('ol', {}, [
                h('li', {}, '哈哈'),
                h('li', {}, '嘻嘻'),
                h('li', {}, '么么哒'),
            ])
        ])
    ]),
    h('li', {}, 'D'),
    h('li', {}, 'E'),
])
const container = document.getElementById('container')
const btn = document.getElementById("btn")
// patch(container, myVnode1)
// 第一次上树
patch(container, myVnode2)

// 新节点
const myVnode3 = h('section', {}, '我变成文字了')
btn.onclick = function () {
    patch(myVnode2, myVnode3)
}
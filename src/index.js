import h from './mySnabbdom/h';
import patch from './mySnabbdom/patch'

const myVnode1 = h('h1', {}, '你好')
const myVnode2 = h('ul', {}, [
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
// patch(container, myVnode1)
patch(container, myVnode2)
import h from './mySnabbdom/h';
var myNode1 = h('div', {}, [
    h('li', {}, '哈哈'),
    h('li', {}, '嘻嘻'),
    h('li', {}, [
        h('span', {}, 'a'),
        h('span', {}, 'b'),
    ]),
])
var myNode2 = h('div', {}, h('li', {}, '我是唯一的children'))
console.log(myNode2);
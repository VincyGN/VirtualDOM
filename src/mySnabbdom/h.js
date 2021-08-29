import {
    array
} from 'snabbdom'
import vnode from './vnode'

// 编写一个低配版的H函数，这个函数必须接收3个参数，缺一不可
// 相当于它的重载功能较弱
// 也就是说，调用的时候形态必须是下面的三种之一：
// 形态一：h('div', {}, '文字’)
// 形态二：h('div', {}, [])
// 形态三：h('div', {}, h())
export default function (sel, data, c) {
    // 检查参数个数
    if (arguments.length != 3)
        throw new Error('对不起，h函数必须传入三个参数，我们是低配版h函数')
    // 检查参数3的类型
    if (typeof c == 'string' || typeof c == 'number') {
        // 说明是形态一，直接调用vnode
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        // 说明第三个参数是数组，要遍历c,收集children
        let children = []
        for (let i = 0; i < c.length; i++) {
            // 如果C[i]不是对象且没有sel参数，说明c[i]这项不是H函数
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
                throw new Error('传入的数组参数有项不是h函数')
            // 此时不需要执行c[i]函数，因为c[i]是h函数，会直接执行返回结果
            // 只需要收集到children中即可
            children.push(c[i])
        }
        // 返回带children的vnode函数
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        // 说明是对象，且有sel参数
        // 即传入的C是唯一的children，放到children中即可
        let children = []
        children.push(c)
        // 返回带children的vnode函数
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的第三个参数类型不对')
    }
}
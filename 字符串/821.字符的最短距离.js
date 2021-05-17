// https://leetcode-cn.com/problems/shortest-distance-to-a-character/

/**
 * 
 * 方法1. 中心扩展法, 对于每一个元素向左向右各遍历一次找到最小距离
 *  时间复杂度O(n2) 空间复杂度O(1)
 * 
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
    let n = s.length;
    let answer = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        // 刚好匹配 不处理
        if (s[i] === c) continue;
        // 定义向左向右两个指针, 初始化 最短距离=Infinity(因为数组默认初始值是0)
        let l = i, r = i, shortest = Infinity;
        // 向左找
        while (l >= 0) {
            if (s[--l] === c) {
                shortest = Math.min(i - l, shortest); //如果left找到了先赋值
            }
        }
        // 向右找
        while (r <= n) {
            if (s[++r] === c) {
                shortest = Math.min(r - i, shortest); //如果left找到了, 会与之比较, 更小就会替换掉
            }
        }
        answer[i] = shortest;
    }
    return answer;
};



/**
 * 
 * 方法2. 先找出所有匹配的下标, 对剩余未匹配的字符二分查找找到距离最近的位置, 计算距离
 *  时间复杂度O(n2) 空间复杂度O(1)
 * 
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {

    let n = s.length;
    let match = [];
    let answer = Array(n).fill(-1);

    // 遍历找出所有匹配的元素下标
    for (let i = 0; i < n; i++) {
        if (s[i] === c) {
            match.push(i);
            answer[i] = 0;
        }
    }
    // ... TODO 后面不会写了 不知道怎么二分查找了


    return answer;
};



console.log(shortestToChar('loveleetcode', 'e'));
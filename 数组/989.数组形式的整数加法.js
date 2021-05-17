// https://leetcode-cn.com/problems/add-to-array-form-of-integer/

/**
 * 方法1. 逐位相加
 * 
 * 时间复杂度O(n), 空间复杂度O(1)
 * 
 * @param {*} num 
 * @param {*} k s
 * @returns
 */
var addToArrayForm = function (num, k) {
    const res = []; //栈
    const n = num.length;
    /**
     * 遍历num, 从低位开始与 k 逐位相加, >=10 进位, 把进的那一位加到 k 上, 将计算(并进位后)的结果推到 res
     */
    for (let i = n - 1; i >= 0; --i) {
        let sum = num[i] + k % 10; // k%10取模得到k的最后一位数字; num[i] + k % 10 -> 两个最低位相加
        k = Math.floor(k / 10); // Math.floor(k/10); 取除了最后一位的前面的数字, Math.floor(num) 取<=num的最大整数
        if (sum >= 10) {
            k++; //进位, k++
            sum -= 10; //得到进位后的值
        }
        res.push(sum);
    }
    /**
     * 如果num遍历完 k 还未全部处理完, 将 k 从低位开始逐位推入 res
     */
    for (; k > 0; k = Math.floor(k / 10)) {
        res.push(k % 10);
    }
    res.reverse();
    // Array.prototype.reverse()
    // 将数组中元素的位置颠倒, 并返回该数组.
    // 数组的第一个元素会变成最后一个, 数组的最后一个元素变成第一个.
    // 该方法会改变原数组
    return res;
};



/**
 * 方法2. 
 *      另一个思路是将整个加数 k 加入数组表示的数的最低位。
        上面的例子 [ 1, 2, 3 ] + 912, 我们把它表示成 [ 1, 2, 3+912 ]。
        然后，计算 3 + 912 = 915, 将 5 留在当前这一位，将 910/10=91 以进位的形式加入下一位。
        然后，重复这个过程，计算 [1, 2+91, 5]。得到 93, 3 留在当前位，将 90/10=9 以进位的形式加入下一位。
        继而又得到 [1+9, 3, 5], 重复这个过程之后, 最终得到结果 [1,0,3,5]

        时间复杂度O(n), 空间复杂度O(1)

 * @param {*} num 
 * @param {*} k 
 * @returns 
 */
var addToArrayForm = function (num, k) {
    const res = [];
    const n = num.length;
    // 从后往前遍历 num; 每次循环结束后 --i, k = Math.floor(k / 10) 取得未处理的剩余数字
    for (let i = n - 1; i >= 0 || k > 0; --i, k = Math.floor(k / 10)) {
        // 如果num中有数据先处理num里的; 如果num里没了, 那么不会进入这个判断
        if (i >= 0) {
            k += num[i];
        }
        // 因为循环条件是 i >= 0 || k > 0 所以这里可以保证在 k 位数大于 num 时 k 才能被压入栈中
        res.push(k % 10);
    }
    res.reverse();
    return res;
};
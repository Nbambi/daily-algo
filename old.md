- [[数组] 989.数组形式的整数加法](#数组-989数组形式的整数加法)
- [[链表] 24.两两交换链表中的节点](#链表-24两两交换链表中的节点)
- [[链表] 61.旋转链表](#链表-61旋转链表)
- [[字符串] 821.字符的最短距离](#字符串-821字符的最短距离)



<br/>

### [数组] 989.数组形式的整数加法
```
https://leetcode-cn.com/problems/add-to-array-form-of-integer/
```

```javascript
/**
 * 方法1. 逐位相加
 * 
 * 时间复杂度O(n), 空间复杂度O(1)- [[字符串] 821.字符的最短距离](#字符串-821字符的最短距离)
 * - [[字符串] 821.字符的最短距离](#字符串-821字符的最短距离)
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
```
<br/>


### [链表] 24.两两交换链表中的节点
```
https://leetcode-cn.com/problems/swap-nodes-in-pairs/
```

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * 方法1: 递归
 *  时间复杂度O(n) 空间复杂度O(n) n是链表的长度
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
 var swapPairs = function (head) {
    if (head === null || head.next === null) {
        return head;
    }

    // 1. 两两交换中的头结点
    let newHead = head.next;

    // 递归处理后续后面的链表(这行代码), 并把处理后链表的头结点指回来(下一行代码)
    // 这个函数的作用就是两两进行交换, 返回交换后的头结点
    head.next = swapPairs(newHead.next); 

    // 2. 两两交换中的尾结点, 递归处理, 将小链串成大链
    newHead.next = head;

    // 返回处理后的新的头结点
    return newHead;
};


/**
 * 方法2: 迭代
 *  时间复杂度O(n) 空间复杂度O(1)
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    /**
     * 涉及挪动指针的三段式套路:
     *  1.创建虚拟节点 newHead 作为新链表的头结点
     *  2.虚拟节点存储指向第一个节点的指针
     *  ... 循环逻辑操作 ...
     *  3.返回 newHead.next
     */

    // 创建虚拟节点
    let newHead = new ListNode(0);
    newHead.next = head;

    let prev = newHead;
    let cur;
    let next;

    while (
        (cur = prev.next) !== null &&
        (next = prev.next.next) !== null
    ) {
        // 0. 指针初始化
        // cur = prev.next;
        // next = cur.next;

        // 1. 交换
        cur.next = next.next;
        next.next = cur;
        // 注意: 交换后要把 前面链表的尾节点 与 交换后的头节点 连接起来
        prev.next = next;

        // 2. 移动指针
        prev = cur;
    }

    return newHead.next;
};
```
<br/>


### [链表] 61.旋转链表
```
https://leetcode-cn.com/problems/rotate-list/
```

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 方法1. 闭合为环
 *      时间复杂度：O(n), 最坏情况下需要遍历该链表两次
 *      空间复杂度：O(1), 只需要常数的空间存储若干变量
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
    if (k === 0 || !head || head.next === null) {
        return head;
    }

    let length = 1; //链表长度
    let cur = head;
    // 1. 遍历链表, 计算链表长度, 挪动指针, 遍历结束后cur指针指向链表尾结点
    while (cur.next) {
        length++;
        cur = cur.next;
    }
    // 2. 计算指针移动到新链表最后一个节点该移动的步数, 也就是从旧链表尾结点到新链表尾结点的距离
    let move = length - k % length;
    // 3. 判断是否需要进行指针的移动, 不需要则直接返回原链表
    if (move === 0) {
        return head;
    }
    // 4. 需要移动, 连接成闭环
    cur.next = head;
    // 5. 移动指针
    while (move > 0) {
        cur = cur.next;
        move--;
    }
    // 6. 切断链表环
    let newHead = cur.next;
    cur.next = null
    // 7. 返回newHead
    return newHead;
};



/**
 * 方法2. 快慢指针法
 * [思路]
 *      往右移k个位置意味着链表的后 k%length 个元素转动至链表头
 *      也就是说快指针比满指针多走 k%length 步, 等快指针移至链表尾巴时慢指针指向新链表尾结点
 * 
 * [复杂度]
 *      时间 O(n)
 *      空间 O(1)
 * 
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
    if (k === 0 || !head || head.next === null) {
        return head;
    }

    // 1. 计算链表长度
    let length = 1, cur = head;
    while (cur.next) {
        length++;
        cur = cur.next;
    }

    // 2. 计算快慢指针之间的距离, 即快指针比满指针多走几步
    let distance = k % length;
    if (distance === 0) {
        return head;
    }

    // 3. 初始化快慢指针, 快指针比满指针多走d步
    let slow = head, fast = head;
    while (distance > 0) {
        fast = fast.next;
        distance--;
    }

    // 4. 快慢指针一起走, 直到快指针走到链表尾巴
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    // 5. 此时慢指针指向新链表的队尾, 切断原来的链, 形成新的链
    let newHead = slow.next;
    slow.next = null;
    fast.next = head;

    // 6. 返回新链表的首节点
    return newHead;
};
```
<br/>


### [字符串] 821.字符的最短距离
```
https://leetcode-cn.com/problems/shortest-distance-to-a-character/
```

```javascript
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
```
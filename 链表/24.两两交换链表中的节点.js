// https://leetcode-cn.com/problems/swap-nodes-in-pairs/


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

    let newHead = head.next;
    // 递归处理后续后面的链表
    head.next = swapPairs(newHead.next); 
    // 并把处理后链表的头结点指回来
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
     *  1.创建一个空节点 newHead 作为新链表的头结点
     *  2.空节点.next指向当前节点首节点
     *  ... 循环逻辑操作 ...
     *  3.返回 newHead.next
     */

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
// https://leetcode-cn.com/problems/rotate-list/

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
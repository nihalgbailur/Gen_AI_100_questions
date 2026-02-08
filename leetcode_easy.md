# LeetCode Easy Problems - Python Solutions
*10 Classic Problems with Explanations*

> **Audience:** Public learners  
> **Prerequisites:** Python basics, arrays, strings, and linked list fundamentals  
> **Estimated time:** 2-3 hours  
> **Last reviewed:** 2026-02-08  
> **Tags:** `DSA`, `Python`

---

## 1. Two Sum (Problem #1)

**Problem**: Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to target.

**Example**: `nums = [2,7,11,15], target = 9` → Output: `[0,1]` (because 2 + 7 = 9)

### Solution 1: Brute Force - O(N²)

```python
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

### Solution 2: HashMap - O(N) ✅ Optimal

```python
def twoSum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

**Explanation**:
- We store each number and its index in a hashmap
- For each number, we check if `target - num` already exists
- If yes, we found our pair!
- **Time**: O(N), **Space**: O(N)

---

## 2. Valid Parentheses (Problem #20)

**Problem**: Given a string containing just `(){}[]`, determine if the input string is valid.

**Example**: `s = "()[]{}"` → `True` | `s = "(]"` → `False`

### Solution: Stack - O(N)

```python
def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:  # closing bracket
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:  # opening bracket
            stack.append(char)
    
    return len(stack) == 0
```

**Explanation**:
- Push opening brackets onto stack
- For closing brackets, check if top of stack matches
- At end, stack should be empty
- **Time**: O(N), **Space**: O(N)

---

## 3. Merge Two Sorted Lists (Problem #21)

**Problem**: Merge two sorted linked lists and return as one sorted list.

**Example**: `list1 = [1,2,4], list2 = [1,3,4]` → `[1,1,2,3,4,4]`

### Solution: Two Pointers - O(N+M)

```python
def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    # Attach remaining nodes
    current.next = list1 if list1 else list2
    
    return dummy.next
```

**Explanation**:
- Use dummy node to simplify edge cases
- Compare heads of both lists, attach smaller one
- When one list exhausted, attach the remaining
- **Time**: O(N+M), **Space**: O(1)

---

## 4. Best Time to Buy and Sell Stock (Problem #121)

**Problem**: Given an array where `prices[i]` is the stock price on day i, find max profit from one transaction.

**Example**: `prices = [7,1,5,3,6,4]` → `5` (buy at 1, sell at 6)

### Solution: One Pass - O(N)

```python
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        profit = price - min_price
        max_profit = max(max_profit, profit)
    
    return max_profit
```

**Explanation**:
- Track minimum price seen so far
- At each day, calculate potential profit if sold today
- Update max profit if current is better
- **Time**: O(N), **Space**: O(1)

---

## 5. Valid Palindrome (Problem #125)

**Problem**: Given a string, check if it's a palindrome considering only alphanumeric characters (ignore case).

**Example**: `s = "A man, a plan, a canal: Panama"` → `True`

### Solution: Two Pointers - O(N)

```python
def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True
```

**Explanation**:
- Two pointers from both ends
- Skip non-alphanumeric characters
- Compare characters (case-insensitive)
- **Time**: O(N), **Space**: O(1)

---

## 6. Reverse Linked List (Problem #206)

**Problem**: Reverse a singly linked list.

**Example**: `[1,2,3,4,5]` → `[5,4,3,2,1]`

### Solution: Iterative - O(N)

```python
def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next  # Save next
        current.next = prev       # Reverse pointer
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    
    return prev
```

### Solution: Recursive

```python
def reverseList(head):
    if not head or not head.next:
        return head
    
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

**Explanation**:
- Iterative: Keep three pointers (prev, current, next), reverse links one by one
- Recursive: Reverse the rest of list, then fix pointers
- **Time**: O(N), **Space**: O(1) iterative, O(N) recursive

---

## 7. Contains Duplicate (Problem #217)

**Problem**: Given an integer array, return true if any value appears at least twice.

**Example**: `nums = [1,2,3,1]` → `True`

### Solution 1: HashSet - O(N) ✅ Optimal

```python
def containsDuplicate(nums):
    return len(nums) != len(set(nums))
```

### Solution 2: Explicit HashSet

```python
def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
```

**Explanation**:
- If set size differs from list size, duplicates exist
- Or check each element if already seen
- **Time**: O(N), **Space**: O(N)

---

## 8. Maximum Subarray (Problem #53)

**Problem**: Find the contiguous subarray with the largest sum.

**Example**: `nums = [-2,1,-3,4,-1,2,1,-5,4]` → `6` (subarray [4,-1,2,1])

### Solution: Kadane's Algorithm - O(N)

```python
def maxSubArray(nums):
    current_sum = max_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

**Explanation**:
- At each position: either start new subarray or extend current
- If current_sum becomes negative, starting fresh is better
- Track maximum seen so far
- **Time**: O(N), **Space**: O(1)

---

## 9. Climbing Stairs (Problem #70)

**Problem**: You can climb 1 or 2 steps. How many distinct ways to climb n steps?

**Example**: `n = 3` → `3` (ways: 1+1+1, 1+2, 2+1)

### Solution: Dynamic Programming - O(N)

```python
def climbStairs(n):
    if n <= 2:
        return n
    
    prev1, prev2 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev1 = prev2
        prev2 = current
    
    return prev2
```

**Explanation**:
- This is Fibonacci! ways(n) = ways(n-1) + ways(n-2)
- From step n-1, take 1 step; from step n-2, take 2 steps
- Space-optimized: only keep last two values
- **Time**: O(N), **Space**: O(1)

---

## 10. Linked List Cycle (Problem #141)

**Problem**: Given a linked list, determine if it has a cycle.

### Solution: Floyd's Cycle Detection (Tortoise & Hare) - O(N)

```python
def hasCycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False
```

**Explanation**:
- Two pointers: slow moves 1 step, fast moves 2 steps
- If cycle exists, fast will eventually catch slow
- If no cycle, fast reaches end (None)
- **Time**: O(N), **Space**: O(1)

---

## Quick Reference Table

| # | Problem | Pattern | Time | Space |
|:--|:--------|:--------|:-----|:------|
| 1 | Two Sum | HashMap | O(N) | O(N) |
| 20 | Valid Parentheses | Stack | O(N) | O(N) |
| 21 | Merge Two Sorted Lists | Two Pointers | O(N+M) | O(1) |
| 121 | Best Time to Buy/Sell Stock | One Pass | O(N) | O(1) |
| 125 | Valid Palindrome | Two Pointers | O(N) | O(1) |
| 206 | Reverse Linked List | Iterative/Recursive | O(N) | O(1) |
| 217 | Contains Duplicate | HashSet | O(N) | O(N) |
| 53 | Maximum Subarray | Kadane's Algorithm | O(N) | O(1) |
| 70 | Climbing Stairs | Dynamic Programming | O(N) | O(1) |
| 141 | Linked List Cycle | Floyd's Cycle Detection | O(N) | O(1) |

---

## Key Patterns to Remember

1. **HashMap/HashSet**: Use for O(1) lookups (Two Sum, Contains Duplicate)
2. **Two Pointers**: Use for sorted arrays or from both ends (Palindrome, Merge Lists)
3. **Stack**: Use for matching pairs or LIFO operations (Valid Parentheses)
4. **Sliding Window / Kadane's**: Use for subarray problems (Max Subarray)
5. **Slow & Fast Pointers**: Use for linked list cycles or finding middle
6. **Dynamic Programming**: Use when current depends on previous states (Climbing Stairs)

---

*Last Updated: February 8, 2026*

---

**Next doc:** [`Mega_Prompt_Templates_Python_Learning.md`](Mega_Prompt_Templates_Python_Learning.md)

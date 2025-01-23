---
title: "[Data Structure] Queue & Stack"
description: "[Data Structure] Queue & Stack"
date: 2024-04-20
update: 2024-04-20
tags:
  - datastructure
series: "Data Structure"
---

## 큐 (Queue)

**Queue**란 먼저 저장한 데이터를 먼저 출력하는 FIFO(First In First Out)형식의 선형 자료구조이다.<br>
queue의 뒤(rear)에 데이터를 추가하는 것을 enqueue, 앞(front)에서 데이터를 꺼내는 것을 dequeue라고 한다.

<img src="https://github.com/user-attachments/assets/f1acedb1-4714-4b65-abe8-baf9295e42b1" alt="" width="700" style="margin-left:0" />

### 사용 예시

- 너비우선탐색 (BFS)

### list 기반 구현

- how to enqueue → `.append()` : 시간복잡도 $O(1)$
- how to dequeue → `.pop(0)` : 앞에서 꺼낸 후, 남아 있는 모든 요소의 인덱스를 한칸씩 앞으로 당겨야하므로 $O(n)$

```python
q = []

# enqueue
q.append(1) # [1]
q.append(2) # [1, 2]
q.append(3) # [1, 2, 3]

# dequeue
q.pop(0) # [2, 3]
q.pop(0) # [3]
```

### Linked list 기반 구현

파이썬에서 `deque` 라이브러리를 쓰면 queue를 쉽게 만들 수 있다. `deque`는 앞, 뒤 양방향에서 데이터의 삽입과 제거가 가능한 자료구조이다. `deque`는 **doubly linked list**로 구현 되어 있어 모든 연산이 $O(1)$의 시간 복잡도를 가지므로 list 기반 구현 queue보다 훨씬 효율적이다.

|      | 맨 앞(왼쪽)  | 맨 뒤(오른쪽) |
| ---- | ------------ | ------------- |
| 삽입 | appendleft() | append()      |
| 제거 | popleft()    | pop()         |

<br>

```python
from collections import deque

q = deque()

# enqueue
q.append(1) # [1]
q.append(2) # [1, 2]
q.append(3) # [1, 2, 3]
q.appendleft(0) # [0, 1, 2, 3]

# dequeue
q.popleft() # [1, 2, 3]
q.popleft() # [2, 3]
q.pop() # [2]
```

## 스택 (Stack)

**Stack**이란 마지막에 저장한 데이터를 먼저 출력하는 LIFO(Last In First Out)형식의 선형 자료구조이다.<br>
값을 추가할 때는 `push`, 값을 꺼낼 때는 `pop`을 사용한다.

<img src="https://github.com/user-attachments/assets/cb17e027-3139-4cec-9152-b97bb2d53965" alt="" width="700" style="margin-left:0" />

### 사용 예시

- 깊이우선탐색 (DFS)

스택은 list 를 사용해도 가장 뒤에서 데이터를 삽입, 삭제 하므로 시간복잡도 $O(1)$ 로 동일하다.

```python
s = []

# push
s.append(1) # [1]
s.append(2) # [1, 2]

# pop
s.pop() # [1]
```

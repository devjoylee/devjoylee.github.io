---
title: "[Data Structure] List - Linked List"
description: "[Data Structure] List - Linked List"
date: 2024-02-22
update: 2024-02-22
tags:
  - datastructure
series: "Data Structure"
---

## Linked List

Linked List는 Node라는 구조체가 연결되는 형식으로 데이터를 저장하는 자료구조이다. 여기서 Node는 자료구조에서 정보를 저장하는 기본 단위를 뜻한다. Linked List에서 노드는 Node는 두 부분으로 구성되어 있는데 실제 데이터 값을 저장하는 부분과 다음 Node의 주소를 저장하는 포인터로 이루어져 있다.

### Linked List가 만들어지는 과정

1. 노드 클래스를 초기화한다.

<img width="180" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/a5fbbd9f-41a9-4d09-b10e-ebf93fcc2cca">

```python
class Node :
  def __init__(self, value = 0, next = None):
    self.value = value
    self.next = next
```

<br/>

2. 생성한 노드 클래스로 임의의 노드 4개를 만들어준다. (`value` 값만 가진 상태. 다음 노드로 연결되지 않음)

<img width="750" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/28c5e3b7-89e1-4847-a2e9-1f7fa011cebd" >

```python
first = Node(1)
second = Node(2)
third = Node(3)
fourth = Node(4)
```

<br/>

3. 다음에 올 노드를 `next` 포인터에 저장한다.

<img width="750" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/85c1b1ec-e98e-4a76-bc98-85ac72c0ffe6" style="margin-left:0">

```python
first.next = second
second.next = third
third.next = fourth
```

4.  길이가 4인 Linked List 완성!

### Linked List 클래스 직접 구현하기

위와 같은 원리로 구현한 `LinkedList` 클래스는 다음과 같다. 처음엔 리스트가 비어있으므로 `head` 포인터가 None을 가르킨다.

```python
class LinkedList(object):
  def __init__(self):
    self.head = None
  def append(self, value):
    # ...
```

```python
ll = LinkedList() # linked list 초기화!
ll.append(1)
ll.append(2)
ll.append(3)
```

### Array와 차이점

Array의 경우 연속성을 유지하기 위해 메모리에 순서대로 데이터를 저장하는 방식을 사용했지만, Linked list는 연속성을 유지할 필요가 없어 메모리 사용이 좀 더 자유롭다. Linked List는 배열과 다르게 동적으로 크기를 조절할 수 있으며 특정 위치에 데이터를 삽입하거나 삭제하는 것이 비교적 용이하다.

<div style="display: flex">
  <img width="500" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/4030bf8d-0d9f-4672-9eb3-400578d18288">
  <img width="500" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/e9583cba-ecca-4ead-94ef-8ee80071cb51">
</div>

## Linked List 종류

### Singly Linked List

한쪽 방향으로만 탐색하는 linked list. (next 노드의 주소만 저장)

<img width="750" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/e6bf5d30-dbd4-440f-af05-7755d93f2bd9" style="margin-left:0">

```python
class Node :
  def __init__(self, value):
    self.value = value
    self.next = next
```

### Doubly Linked List

양방향 탐색이 가능한 linked list. (previous 노드와 next 노드를 함께 저장)

<img width="750" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/ccbac1e8-0696-471f-8238-1d51d7e31a3c" style="margin-left:0">

```python
class Node(object):
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None
```

## Linked List 기능 함수

### .append()

`append`는 linked list에 원소들을 추가하는 기능을 가진 함수이다. 규칙은 다음과 같다.

- 첫 번째 원소인 경우, `head`로 지정해주어야 한다
- 노드를 추가할 때는 마지막 노드 다음에 추가해야 한다.

```python
class LinkedList(object):
  def __init__(self):
		self.head = None
  def append(self, value):
		new_node = Node(value) # 새로운 노드 생성

		# 첫번째 노드인 경우 head로 지정
    if self.head is None:
        self.head = new_node

    # 마지막 노드의 next 포인터로 new_node를 넣어준다.
    else:
        current = self.head
        while(current.next):
            current = current.next
        current.next = new_node
```

### .get()

인덱스값을 입력으로 받아 해당 인덱스의 value값을 출력한다.

```python
class LinkedList(object):
  def __init__(self):
		self.head = None
	def get(self, idx):
		current = self.head
		# head부터 idx 까지 이동해서 value 값 확인
		for _ in range(idx):
			current = current.next
		return current.value
```

### insert_at()

특정 인덱스에 값을 추가한다.

<img width="600" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/a18bf23d-3221-4329-92af-b239b81f77d8" style="margin-left:0">

```python
def insert_at(self, idx, value):
  new_node = Node(value) # 추가할 노드 생성
  current = self.head
  for _ in range(idx-1):
    current = current.next
  new_node.next = current.next
  current.next = new_node
```

### remove_at()

특정 인덱스의 값을 삭제한다.

```python
def remove_at(self, idx):
  current = self.head
  for _ in range(idx-1):
    current = current.next
  current.next = current.next.next
```

## Linked List와 시간복잡도

### .append()

- 시간복잡도 O(n) 일 때 : `head` 노드에서 시작해서 마지막 노드에 도착했을 때 append 실행

```python
class LinkedList(object):
  def __init__(self):
		self.head = None
  def append(self, value):
		new_node = Node(value)

    if self.head is None:
        self.head = new_node
    else:
        current = self.head
        while(current.next):
            current = current.next
        current.next = new_node
```

- 시간복잡도 O(1) 일 때 : (**singly linked list**) : 마지막 노드인 `tail` 노드에 바로 접근해서 append 실행

```python
class LinkedList(object):
  def __init__(self):
		self.head = None
		self.tail = None # tail 포인터 추가!
  def append(self, value):
		new_node = Node(value)
    if self.head is None:
        self.head = new_node
        self.tail = new_node
    else:
        self.tail.next = new_node
        self.tail = new_node
```

- 시간복잡도 O(1) 일 때 : (**doubly linked list**)

```python
class Node(object):
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None

class LinkedList(object):
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
```

### 그 외 함수

배열(Array)의 경우 중간에 데이터를 삽입/삭제하면 해당 index의 뒤쪽의 모든 원소를 한 칸씩 shift를 해야해서 $O(n)$의 시간복잡도를 갖는다. 하지만 Linked list는 다른 원소의 이동없이 원하는 위치의 next address가 가리키는 주소값만 변경하면 되기 때문에 $O(1)$의 시간복잡도로 삽입/삭제가 가능하다.

|               | Linked list | Array                     |
| ------------- | ----------- | ------------------------- |
| access/update | $O(n)$      | $O(1)$                    |
| insert_front  | $O(1)$      | $O(n)$                    |
| insert_at     | $O(n)$      | $O(n)$                    |
| insert_back   | $O(n)$      | $O(1)$ (amortized $O(1)$) |
| remove_front  | $O(1)$      | $O(n)$                    |
| remove_at     | $O(n)$      | $O(n)$                    |
| remove_back   | $O(n)$      | $O(1)$                    |

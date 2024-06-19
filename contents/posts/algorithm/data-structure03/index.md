---
title: "[Data Structure] 메모리 구조와 Node의 주소값"
description: "[Data Structure] 메모리 구조와 Node의 주소값"
date: 2024-01-21
update: 2024-01-21
tags:
  - datastructure
series: "Data Structure"
---

## 메모리 구조란?

메모리는 데이터를 저장하는 공간으로, 프로그램의 성능을 최적화하기 위해 메모리 구조를 잘 이해하고 적절한 자료구조를 사용하는 것이 중요하다.

- **메모리**: 데이터를 저장하는 곳으로, 전기신호를 0과 1로 저장하는 트랜지스터로 이루어져 있다.
- **RAM 메모리**: 휘발성 메모리로, 0과 1로 이루어진 이진수(bit)를 저장한다.

### 메모리 단위와 자료형 크기

- **비트(bit)**: 메모리의 가장 작은 단위로, 0 또는 1을 나타낸다.
- **바이트(byte)**: 8비트로 이루어진 단위이다.
    - **int**: 4 bytes
    - **char**: 1 byte

### 메모리 단위 변환

- 1 byte = 8 bits
- 1 KB = 1024 bytes
- 1 MB = 1024 KB
- 1 GB = 1024 MB

### 2진수와 16진수

이진수는 16진수로 변환할 수 있으며, 2진수 4자리는 16진수 1자리로 표현된다.

예) 2진수 `1010` = 16진수 `A`

## Node란?

<img width="600" alt="" src="https://github.com/devjoylee/devjoylee.github.io/assets/68415905/5ef66f19-e3d0-40b9-8e0a-7d6b5416a49a">

Node는 데이터를 저장하는 데 사용되는 기본적인 구조체이다. 다음 데이터의 주소값을 함께 저장하여 연결 리스트 등 다양한 자료구조를 구현하는 데 사용된다.

### Node의 구조

Node는 보통 다음과 같은 구조를 가진다. `value`는 해당 노드의 데이터를, `next`는 다음 노드의 주소를 가리킨다. 이때, 주소값은 16진수로 저장한다.

```python
class Node:
    def __init__(self, value):
        self.value = value  # 데이터 값
        self.next = None    # 다음 노드를 가리키는 포인터
```

### Node의 활용 예시

- 연결 리스트(Linked List): 각 노드가 데이터와 다음 노드를 가리키는 포인터로 구성되어 있다.
- 트리(Tree): 각 노드는 자식 노드들과의 연결을 나타내기 위해 사용된다.
- 그래프(Graph): 각 노드는 그래프의 정점을 나타내며, 인접한 노드들과의 관계를 링크 필드를 통해 저장한다.

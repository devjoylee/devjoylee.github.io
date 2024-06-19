---
title: "[Data Structure] 자료구조와 알고리즘"
description: "[Data Structure] 자료구조와 알고리즘"
date: 2024-01-08
update: 2024-01-08
tags:
  - datastructure
series: "Data Structure"
---

## 자료구조란?

> 자료구조 (Data Structure) : 데이터를 저장하고 관리하는 방식. 데이터를 체계적으로 저장하여 메모리를 효율적으로 사용하면서 빠르고 안정적으로 데이터를 처리할 수 있다.

### 자료구조의 종류

- 선형 자료구조: Array, Dynamic Array, Linked List, Queue, Stack, Hash Table
- 비선형 자료구조: Tree, Graph

<img width="1220" alt="" src="https://github.com/devjoylee/devjoylee.github.io/assets/68415905/66df3636-a7fe-4573-a59a-8e2a419e49e5">

## 알고리즘이란?

> 알고리즘 (Algorithm) : 문제 해결 방법; 어떠한 문제를 해결하기 위해 정해진 일련의 절차나 방법.

- 자주 쓰이는 문제 해결 방법(알고리즘)은 패턴화되어 있다. (예: BFS, DFS, Binary Search, Dijkstra …)
- 한 문제를 해결하기 위한 다양한 알고리즘이 존재하며, 어떤 알고리즘이 적합한지 평가할 수 있어야 한다.

### 알고리즘 평가 기준

1. 시간 복잡도 (Time Complexity)
2. 공간 복잡도 (Space Complexity)
3. 구현 복잡도

여기서 시간 복잡도와 공간 복잡도는 보통 상반된 관계이다. 실행 시간을 줄이기 위해서는 메모리를 더 사용해야 하고, 메모리 사용량을 줄이려면 실행 시간이 늘어난다. 코딩 테스트에서는 주로 시간 복잡도를 우선으로 하여 실행 시간을 줄이는 것을 중점적으로 보고 있다.

### 자료구조와 알고리즘의 관계

자료구조에 따라 사용할 수 있는 알고리즘과 시간 복잡도가 달라질 수 있다. 

**사용 예시**

| 자료구조       | 사용 예시                    |
|--------------|---------------------------|
| Array        | 이진 탐색 (Binary Search)  |
| Linked List  | 선형 탐색 (Linear Search)  |
| Queue        | BFS (너비 우선 탐색, Breadth-First Search) |
| Stack        | DFS (깊이 우선 탐색, Depth-First Search)   |
| Hash Table   | 해시 함수를 이용한 빠른 검색 및 삽입          |
---
title: "[Data Structure] List - Array & Dynamic Array "
description: "[Data Structure] List - Array & Dynamic Array "
date: 2024-02-16
update: 2024-02-16
tags:
  - datastructure
series: "Data Structure"
---

## 리스트 (List)

List는 sequence라고도 불리며 "순서"를 가지고 원소를 저장하는 자료구조이다.
List 구현은 크게 2가지로 나뉘는데 Array List와 Linked List가 있다. python에서 사용하는 `list` 자료구조는 Array List 형태이다.

<img width="600" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/f52de651-75d7-495d-b3cd-0c17ea8f35d7">

## Array List

Array List는 말 그대로 배열을 기반으로 만들어진 자료구조이다. <br/> 크기가 고정된 static array와 크기 변화를 줄 수 있는 dynamic array가 있다.

## 1. Static Array

> **정적 배열 (Static Array)** : 정해진 size만큼 **연속된 메모리**를 할당 받아 data를 순차적으로 저장하는 자료구조

### 배열의 특성

1. 고정된 저장 공간(fixed-size)
2. 순차적인 데이터 저장(order)

예시)

```c
int arr[5] = {3, 7, 4, 2, 6} // size가 5인 int형 배열 선언
```

배열이 선언되면 데이터를 저장할 메모리 공간을 먼저 확보한다.<br/>
→ int형 데이터 5개를 가진 배열을 만들기 위해서는 총 20 byte의 공간이 필요하다. `4byte(int형 데이터) * 5(size) = 20 byte`<br/>
→ 첫 번째 값부터 순차적으로 메모리에 저장한다.

<img width="1000" alt="" src="https://github.com/devjoylee/devjoylee/assets/68415905/4030bf8d-0d9f-4672-9eb3-400578d18288">

### Random Access

**Random Access**는 자료 구조에서 특정 데이터에 직접 접근할 수 있는 능력을 의미한다.

배열(Array)은 대표적인 random access 가능한 데이터 구조이다. 일반적으로 데이터에 접근하려면 해당 데이터의 메모리 주소값을 알아야 한다. 배열에 저장된 값은 메모리에 연속적으로 할당되기 때문에 배열의 첫 주소값만 알면 어떤 index에도 바로 접근할 수 있다. `(첫 주소값 + index)`

즉 O(1)의 시간복잡도로 접근이 가능하다.

<br/>

## 2. Dynamic Array

> 동적 배열 (Dynamic Array) : 배열의 크기(size)를 변경(resizing)할 수 있는 배열

데이터의 갯수가 정해져 있을 때는 static array를 사용하는 것이 매우 효율적이다. 하지만 배열 크기보다 더 많은 데이터를 저장해야 하는 경우에는 공간 부족으로 문제가 발생할 수 있다. 이런 문제를 보안하기 위해서 Dynamic Array 방식이 사용된다.

### Resizing 과정

기존 배열의 할당된 크기를 초과하여 데이터가 생성된 경우 배열을 resize하는 과정은 다음과 같다:

1. **데이터 추가 요청**: 동적 배열에 새로운 데이터를 추가하려고 합니다.
2. **배열 size 초과 확인**: 현재 배열의 크기가 새로운 데이터를 추가하기에 충분한지 확인합니다.
3. **다른 위치에 새로운 배열 생성 (더블링)**: 기존 배열의 크기의 2배인 새로운 배열을 메모리에 생성합니다.
4. **기존 데이터 복사**: 기존 배열의 모든 데이터를 새로운 배열로 복사합니다.
5. **새로운 배열에 데이터 추가**: 새로운 배열의 적절한 위치에 새로운 데이터를 추가합니다.
6. **기존 배열 삭제 (free)**: 메모리에서 기존 배열을 해제(free)합니다.

### 배열 연산과 시간복잡도

배열 크기를 명시하지 않아도 되는 dynamic array는 코딩테스트에서 자주 사용된다. 그 예로 Python에는 dynamic array로 구현된 `list` 자료형이 있다. `list`의 연산과 해당하는 시간복잡도는 아래와 같다.

|                 | Static array | Dynamic array    |
| --------------- | ------------ | ---------------- |
| access / update | $O(1)$       | $O(1)$           |
| insert_back     | $O(1)$       | amortized $O(1)$ |
| delete_back     | $O(1)$       | $O(1)$           |
| insert_at       | $O(n)$       | $O(n)$           |
| delete_at       | $O(n)$       | $O(n)$           |

**리스트의 선언** : `a = [1, 2, 3]`

**리스트 접근하기**

- 0번째 원소 접근 하기 : `a[0]` → $O(1)$
- 0번째 원소 업데이트 하기 : `a[0] = 3` → $O(1)$

**리스트의 원소 추가**

- 마지막에 원소 추가 : `a.append(1)` → $O(1)$
- 중간에 원소 추가 : `a.insert(2,10)` → $O(n)$
  ⇒ 2번째 index에 10을 추가한다

**리스트 원소 삭제**

- 마지막 원소 삭제 : `a.pop()` → $O(1)$
- 중간 원소 삭제 : `a.pop(2)` / `a.remove(2)` → $O(n)$
  ⇒ `pop(2)` : 2번째 index에 있는 값을 삭제
  ⇒ `remove(2)` : 값 ‘2’를 찾아서 삭제. 없으면 error

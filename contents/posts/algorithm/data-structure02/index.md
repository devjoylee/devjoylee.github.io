---
title: "[Data Structure] 시간 복잡도와 Big-O 표기법"
description: "[Data Structure] 시간 복잡도와 Big-O 표기법"
date: 2024-01-10
update: 2024-01-10
tags:
  - datastructure
series: "Data Structure"
---

## 시간 복잡도란?

시간 복잡도는 알고리즘이 처리하는 입력 크기 n에 따라 소요되는 시간을 "Big-O 표기법"으로 나타낸 것이다. 이를 통해 알고리즘의 성능을 분석하고 비교할 수 있으며, 특히 대용량 데이터를 다룰 때 어떤 알고리즘이 더 효율적인지 판단하는 데 중요한 기준이 된다.

### 시간 복잡도 cases

- **Best Case**: 가장 이상적인 입력의 시간 복잡도. 예) 정렬 알고리즘에서 이미 정렬된 배열을 입력으로 받는 경우
- **Average Case**: 모든 입력 값에 대한 평균 수행 시간.
- **Worst Case**: 가장 느리게 동작하는 입력의 시간 복잡도. 알고리즘 평가에 주로 사용된다.

### Big-O 표기법 종류 및 순서

- O(1): 상수 시간 복잡도. 입력 크기에 관계없이 실행 시간이 일정.
- O(log n): 로그 시간 복잡도. 입력 크기의 로그에 비례하는 시간이 소요된다.
- O(n): 선형 시간 복잡도. 입력 크기에 비례하는 실행 시간이 소요된다.
- O(n^2): 제곱 시간 복잡도. 입력 크기의 제곱에 비례하는 실행 시간이 소요된다.
- O(2^n): 지수 시간 복잡도. 입력 크기의 지수에 비례하는 실행 시간이 소요된다.
- O(n!): 팩토리얼 시간 복잡도. 입력 크기의 팩토리얼에 비례하는 실행 시간이 소요된다.

<br/>

> 시간복잡도 순서 : O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)

<img width="800" alt="" src="https://github.com/devjoylee/devjoylee.github.io/assets/68415905/b3b2f47f-6875-42d1-9e0c-d967cf770ab7">

### 코드 예시

1. **O(1)**: 입력 크기에 상관없이 항상 동일한 시간이 걸린다.

   ```python
   def get_first_element(arr):
       return arr[0]

   ```

2. **O(log n)**: 이진 탐색 등이 해당된다.

   ```python
   def binary_search(arr, target):
       left, right = 0, len(arr) - 1
       while left <= right:
           mid = (left + right) // 2
           if arr[mid] == target:
               return mid
           elif arr[mid] < target:
               left = mid + 1
           else:
               right = mid - 1
       return -1
   ```

3. **O(n)**: 배열에서 최대값을 찾는 경우 등이 해당된다.

   ```python
   def find_max(arr):
       max_val = arr[0]
       for num in arr:
           if num > max_val:
               max_val = num
       return max_val
   ```

4. **O(n log n)**: Merge Sort, Heap Sort 등이 해당된다.

   ```python
   def merge_sort(arr):
       if len(arr) > 1:
           mid = len(arr) // 2
           left_half = arr[:mid]
           right_half = arr[mid:]
           merge_sort(left_half)
           merge_sort(right_half)
           i = j = k = 0
           while i < len(left_half) and j < len(right_half):
               if left_half[i] < right_half[j]:
                   arr[k] = left_half[i]
                   i += 1
               else:
                   arr[k] = right_half[j]
                   j += 1
               k += 1
           while i < len(left_half):
               arr[k] = left_half[i]
               i += 1
               k += 1
           while j < len(right_half):
               arr[k] = right_half[j]
               j += 1
               k += 1
   ```

5. **O(n²)**: 삽입 정렬, 선택 정렬 등이 해당된다.

   ```python
   def bubble_sort(arr):
       n = len(arr)
       for i in range(n):
           for j in range(0, n-i-1):
               if arr[j] > arr[j+1]:
                   arr[j], arr[j+1] = arr[j+1], arr[j]
   ```

6. **O(2^n)**: 피보나치 수열 재귀 호출 등이 해당된다.

   ```python
   def fibonacci(n):
       if n <= 1:
           return n
       else:
           return fibonacci(n-1) + fibonacci(n-2)
   ```

7. **O(n!)**: 순열 생성 등이 해당된다.

   ```python
   def permutations(arr):
       if len(arr) == 0:
           return [[]]
       result = []
       for i in range(len(arr)):
           rest = arr[:i] + arr[i+1:]
           for p in permutations(rest):
               result.append([arr[i]] + p)
       return result
   ```

## 시간복잡도와 제약조건

코딩테스트에서 시간복잡도를 결정하기 위해서는 제약조건을 잘 확인해야한다. 제약조건의 최댓값을 시간복잡도 n에 대입했을 때, 10⁸ (100,000,000)이 넘으면 시간이 초과될 가능성이 높다.

- 예시1) 제약조건이 1≤ n ≤ 10⁵ 일 때 : 시간복잡도가 O(n²) 인 자료구조 사용 ❌  → 총 크기 10¹⁰ 으로 시간 초과.<br/>
  O(n)이나 O(log n) 으로 풀 수 있는 다른 방법을 생각해야한다.

- 예시2) 제약조건이 1 ≤ n ≤ 10³ 일 때 : 시간복잡도가 O(n²) 인 자료구조 사용 ⭕️ → 총 크기 10⁶ 으로 통과 가능

- 예시3) 제약조건이 1 ≤ n ≤ 7 일 때 : O(n!) 같은 복잡한 자료구조를 사용해도 데이터가 적기때문에 통과 가능

---
title: "[Node] 호출스택과 이벤트 루프"
description: "[Node] 호출스택과 이벤트 루프"
date: 2022-07-31
update: 2022-07-31
tags:
  - nodejs
series: "NodeJS"
---

## 🚀 호출스택과 이벤트 루프

### 1. 호출 스택 (call stack)

노드는 자바스크립트 코드의 맨 위부터 한 줄씩 실행합니다. 함수 호출 부분을 발견하면 호출한 함수를 호출 스택에 넣고, 함수가 실행되는 동안 호출 스택에 머물러 있다가 실행이 완료되면 호출 스택에서 지워집니다. (Last In First Out)

```js
function first() {
  second()
  console.log("첫번째")
}
function second() {
  third()
  console.log("두번째")
}
function third() {
  console.log("세번째")
}
```

함수는 호출 순서대로 스택에 쌓인 후, 역순으로 실행됩니다. 이때, 스택 가장 아래에 쌓이는 anonymous는 파일이 실행되면 만들어지는 가상의 실행 환경 (global context)를 의미합니다.

<img src="https://user-images.githubusercontent.com/68415905/183275903-67f4f44d-2a1a-4009-b384-2a20c7003456.JPG" alt='' width="500" />

### 2. 이벤트 루프

호출 스택 내부의 함수는 순차적, 동기적으로 실행됩니다. 그래서 setTimeout과 같은 비동기 함수는 호출 스택만으로는 정의하기가 어렵습니다. 이를 파악하기 위해서는 이벤트 루프, 태스크 큐(task queue), 백그라운드(background)를 알아야 합니다.

```js
function run() {
  console.log("3초 후 실행")
}
console.log("시작")
setTimeout(run, 3000)
console.log("끝")
```

- 이벤트 루프: 이벤트 발생 시 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정하는 역할을 담당합니다. 노드가 종료될 때까지 이벤트 처리를 위한 작업을 반복하므로 루프(loop)라고 부릅니다.

- 백그라운드: setTimeout 같은 타이머나 이벤트 리스너들이 대기하는 곳입니다. 자바스크립트가 아닌 다른 언어로 작성된 프로그램이라고 봐도 됩니다. 여러 작업이 동시에 실행될 수 있습니다.

- 태스크 큐: 이벤트 발생 후, 백그라운드에서는 태스크 큐로 타이머나 이벤트 리스너의 콜백 함수를 보냅니다. 정해진 순서대로 콜백들이 줄을 서 있으므로 콜백 큐라고도 부릅니다. 콜백들은 보통 완료된 순서대로 줄을 서 있지만 특정한 경우에는 순서가 바뀌기도 합니다.

<br>

<img src="https://user-images.githubusercontent.com/68415905/183276969-638c31c2-cdf0-4afa-9ae9-649e9151c6de.jpg" alt='' width="550" />

<hr>

<img src="https://user-images.githubusercontent.com/68415905/183276970-efde2d93-ddd2-4014-bc53-da8343168547.jpg" alt='' width="550" />

<hr>

<img src="https://user-images.githubusercontent.com/68415905/183276971-006e63b0-c613-41de-8be3-01779662b58b.jpg" alt='' width="550" />

<hr>
<br /><br /><br />

> REFERENCE <br /> Node.js 교과서 개정 2판 https://thebook.io/080229/ch01/01/

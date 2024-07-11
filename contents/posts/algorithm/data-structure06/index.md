---
title: "[Data Structure] 자료구조에서 클래스란?"
description: "[Data Structure] 자료구조에서 클래스란?"
date: 2024-07-07
update: 2024-07-07
tags:
  - datastructure
series: "Data Structure"
---

## 클래스로 만드는 객체형 자료구조

클래스는 객체 지향 프로그래밍(OOP)에서 사용되는 중요한 개념이다. 클래스는 객체를 생성하기 위한 템플릿으로 객체의 속성과 메소드를 정의한다. JavaScript에서 클래스는 ES6부터 도입되었으며 객체의 생성과 관리를 보다 구조화된 방식으로 제공한다.

### 용어 정리

- 클래스 (Class): 객체를 만드는 템플릿
- 인스턴스 (Instance): 클래스(템플릿)로 생성된 각각의 객체
- 생성자 함수 (Constructor): 객체 초기화 함수. 인스턴스가 만들어질 때 호출된다.
- 프로퍼티 (Property): 객체의 속성 및 데이터
- 메소드 (Method): 객체의 프로퍼티를 조작하거나 동작을 수행하는 함수

### 사용 예시

클래스로 Stack 자료구조를 만들며 차근차근 살펴보자!

1. `class` + `클래스 명` 의 형식으로 클래스를 정의한다.

```js
class Stack {
  // ...
}
```

2. `new` 키워드로 클래스를 호출하여 새 인스턴스 객체를 만든다.

```js
let instanceA = new Stack() // instanceA {}
let instanceB = new Stack() // instanceB {}
```

3.  생성자 함수 `constructor()`를 추가한다. 생성자 함수는 객체의 초기 프로퍼티를 설정하며 인스턴스가 생성될 때 자동으로 호출된다. 프로퍼티는 `this.속성명`의 형태로 작성한다.

```js
class Stack {
  constructor() {
    this.items = [] // 인스턴스 생성시 호출
  }
}

let instanceA = new Stack() // instanceA { items : [] }
let instanceB = new Stack() // instanceB { items : [] }
```

4. 클래스에 메소드를 추가하여 객체의 동작을 정의하고 인스턴스를 사용해서 메소드를 호출한다.

```js
class Stack {
  constructor() {
    this.items = [] // 인스턴스 생성시 호출
  }

  push(element) {
    // 스택에 요소를 추가하는 메소드
    this.items.push(element)
  }

  isEmpty() {
    // 스택이 비어 있는지 확인하는 메소드
    return this.items.length === 0
  }
}

let instanceA = new Stack() // instanceA { items : [] }
let instanceB = new Stack() // instanceB { items : [] }

instanceA.push("apple") // instanceA { items : ['apple'] }
instanceA.push("orange") // instanceA { items : ['apple', 'orange'] }

instanceA.isEmpty() // false
instanceB.isEmpty() // true
```

## 메소드 종류

클래스에서 메소드는 두 가지 유형으로 나뉜다: 인스턴스 (instance) 메소드와 정적 (static) 메소드.

### 인스턴스 메소드

인스턴스에서 호출하는 메소드이다. 즉, 객체를 만들어서 그 객체를 통해 호출할 수 있는 함수이다. 객체의 데이터를 처리하거나 객체와 관련된 동작을 수행할 때 사용한다.

```js
class User {
  constructor(name) {
    this.name = name
  }

  // 인스턴스 메소드
  greet() {
    return `Hello, ${this.name}!`
  }
}

const user1 = new User("Alice")
console.log(user1.greet()) // "Hello, Alice!"
```

### 정적 메소드

정적 메소드는 클래스의 인스턴스 없이 클래스 자체에서 호출할 수 있는 메소드이다. `static` 키워드를 사용하여 정의되며 클래스 레벨에서 동작하는 함수로 인스턴스에서는 호출할 수 없다. 객체에 의존하지 않는 범용적인 기능을 구현할 때 사용한다.

```js
class MathHelper {
  // 정적 메소드
  static add(a, b) {
    return a + b
  }
}

console.log(MathHelper.add(5, 3)) // 8
```

### 사용 예시

- `printScore()`: 각 학생의 이름과 점수를 출력하는 **인스턴스 메소드**이다.
- `compareScores(A, B)`: 두 학생의 점수를 비교하여 차이를 반환하는 **정적 메소드**이다.

인스턴스 메소드는 각 학생 인스턴스 레벨에서 호출되어 해당 학생의 정보를 처리하고 출력하며, 정적 메소드는 클래스 레벨에서 두 학생 객체의 점수를 비교하는 기능을 가진다.

```js
class Student {
  constructor(name, score) {
    this.name = name
    this.score = score
  }

  // 인스턴스 메소드: 점수 출력
  printScore() {
    console.log(`${this.name}의 점수는 ${this.score}점 입니다.`)
  }

  // 정적 메소드: 점수 비교
  static compareScores(studentA, studentB) {
    return studentA.score - studentB.score
  }
}

// 학생 인스턴스 생성
const student1 = new Student("Alice", 85)
const student2 = new Student("Bob", 92)

// 인스턴스 메소드 호출
student1.printScore() // "Alice의 점수는 85점 입니다."
student2.printScore() // "Bob의 점수는 92점 입니다."

// 정적 메소드 호출
const scoreComparison = Student.compareScores(student1, student2)
console.log(`점수 차이: ${scoreComparison}`) // "점수 차이: -7"
```

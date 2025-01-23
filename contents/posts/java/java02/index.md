---
title: "[Java] 클래스의 기본 특징 : 속성/생성자/메서드/this/super"
description: "[Java] 클래스의 기본 특징 : 속성/생성자/메서드/this/super"
date: 2025-01-23
update: 2025-01-23
tags:
  - java
  - fullstack
series: "Java"
---

## 1. 클래스란?

클래스는 객체 지향 프로그래밍(OOP)의 기본 구성 요소로 관련된 데이터와 메서드를 하나의 단위로 묶어주는 템플릿이다.

### 클래스를 사용하는 이유

- 코드의 재사용성 향상
- 유지보수의 용이성
- 코드의 구조화와 직관성 향상
- 데이터의 캡슐화 가능

## 2. 클래스의 기본 구조

1. **필드(Fields)**: 클래스의 “상태”를 나타내는 변수들
2. **생성자(Constructor)**: 객체 생성 시 “초기화”를 담당
3. **메서드(Methods)**: 클래스의 “행위”를 정의하는 함수들

```java
public class Dog {
    // fields
    String name;
    int age;

    // constructor
    public Dog(String name) {
        this.name = name;
    }

    // methods
    public void bark() {
        System.out.println(name + " says woof!");
    }
}
```

<br/>

- 사용 예시

```java
// 객체 생성
Dog myDog = new Dog("Rex");

// 객체의 메서드 호출
myDog.bark();

// 객체의 필드 접근
System.out.println(myDog.name);

```

## 3. 생성자 (Constructor)

생성자는 객체가 생성될 때 자동으로 호출되는 특별한 메서드이다.

### 생성자의 특징

- 클래스명과 동일한 이름을 가짐
- 반환 타입이 없음
- 여러 개의 생성자를 정의할 수 있음(생성자 오버로딩)
- 매개 변수(넘겨줄 값)가 없는 경우 생략가능

```java
public class Dog {
    String name;
    int age;

    // 기본 생성자
    public Dog() {}

    // 매개변수가 있는 생성자
    public Dog(String name) {
        this.name = name;
    }

    // 모든 필드를 초기화하는 생성자
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

## 4. 메서드 (Methods)

메서드는 특정 작업을 수행하는 코드의 집합이다. 접근 제어자의 경우 public으로 누구든지 쓸 수 있다.

<img src="https://github.com/user-attachments/assets/b3de964b-7cf6-4df9-ae9e-43851053f5a2" alt="" width="450" style="margin-left:0" />

```java
public class Calculator {
    // 1. 기본적인 메서드
    public int add(int a, int b) {
        return a + b;
    }

    // 2. 반환값이 없는 메서드
    public void printMessage(String message) {
        System.out.println(message);
    }

    // 3. 매개변수가 없는 메서드
    public String getVersion() {
        return "Calculator v1.0";
    }
}
```

## 5. this()

`this`는 현재 객체를 가리키는 참조 변수이다.

### this의 사용

1. 필드와 매개변수의 이름이 같을 때 구분을 위해 사용한다.

```java
public class Dog {
    String name;
    int age;

    public Dog(String name) {
        this.name = name;  // this로 필드와 매개변수 구분
    }
}
```

2. 생성자에서 다른 생성자를 호출할 때 사용한다.

```java
public class Dog {
    String name;
    int age;

    public Dog() {
        this("멍멍이", 1);  // 다른 생성자 호출
    }

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

```

## 6. super()

`super`는 부모 클래스를 가리키는 참조 변수이다.

### super의 사용

- 자식 클래스에서 부모 클래스의 멤버에 접근할 때 사용한다.

```java
public class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("동물 소리");
    }
}

public class Dog extends Animal {
    String breed;

    public Dog(String name, String breed) {
        super(name);  // 부모 클래스의 생성자 호출
        this.breed = breed;
    }

    @Override
    public void makeSound() {
        super.makeSound();  // 부모 클래스의 메서드 호출
        System.out.println("멍멍!");
    }
}
```

## 7. this()와 super() 제약 사항

자바는 객체의 안전한 생성을 위해 부모->자식 순서로 초기화하며 이 순서를 보장하기 위해 생성자의 첫 줄에서만 super()나 this()를 호출할 수 있도록 제한하고 있다.

### 첫 줄 규칙

```java
public Dog() {
    // 첫 줄에서만 호출 가능!
    super();    // 부모 생성자 호출
    // 여기서부터는 this()나 super() 사용 불가
}
```

### 왜 첫 줄에서만 가능할까?

1. **초기화 순서**
   - 객체 생성할 때 반드시 부모부터 초기화해야 함
   - 자식 객체 초기화 전에 부모가 준비되어야 함
2. **이중 초기화 방지**

```java
public Dog() {
    this(10);   // 이미 여기서 super()가 암시적으로 호출됨
    super();    // ❌ 부모를 두 번 초기화하게 됨
}
```

### 변수명 중복 시

변수명이 중복되지 않는 경우 `this`나 `super` 생략 가능하다. 하지만 명확성을 위해 키워드 사용을 권장한다. <br/>특히 상속 관계에서는 `super`를 명시적으로 항상 사용한다

```java
public class Animal {
    String species;

    public Animal(String animalSpecies) {
        species = animalSpecies;  // this 생략 가능
    }
}

public class Dog extends Animal {
    String breed;

    public Dog(String dogBreed) {
        super("개과");     // 부모 생성자 호출
        breed = dogBreed;  // this 생략 가능
    }
}
```

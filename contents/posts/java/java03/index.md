---
title: "[Java] 메서드 오버로딩, 오버라이딩과 상속(extends)"
description: "[Java] 메서드 오버로딩, 오버라이딩과 상속(extends)"
date: 2025-01-24
update: 2025-01-24
tags:
  - java
  - fullstack
series: "Java"
---

## 1. 메서드 오버로딩(Method Overloading)

메서드 오버로딩은 같은 이름의 메서드를 매개변수의 타입이나 개수를 다르게 하여 여러 개 정의하는 것이다. 이는 하나의 메서드 이름으로 다양한 작업을 처리할 수 있도록 한다.

- 사용 예시

```java
public class Dog {
    public void bark() {
        System.out.println("Woof!");
    }

    public void bark(String sound) {
        System.out.println(sound);
    }

    public void bark(String sound, int times) {
        for(int i = 0; i < times; i++) {
            System.out.println(sound);
        }
    }
}
```

##

## 2. 메서드 오버라이딩(Method Overriding)

메서드 오버라이딩은 자식 클래스에서 부모 클래스의 메서드를 재정의하는 것이다. 이는 부모 클래스의 기본 동작을 자식 클래스에 맞게 변경할 수 있도록 한다.

### 오버라이딩의 규칙

- 메서드 이름, 매개변수, 반환 타입이 모두 동일해야 한다.
- 접근 제어자는 부모 클래스의 메서드보다 더 제한적이면 안 된다.
- `@Override` 어노테이션을 사용하여 컴파일러가 올바르게 오버라이딩되었는지 확인하도록 권장한다.

```java
public class Puppy extends Dog {
    @Override
    public void bark() {
        System.out.println(name + " makes a small woof!");
    }
}
```

## 3. Overloading과 Overriding의 차이점

| **구분**        | **메서드 오버로딩**                     | **메서드 오버라이딩**                         |
| --------------- | --------------------------------------- | --------------------------------------------- |
| **정의**        | 같은 이름의 메서드를 여러개 정의하는 것 | 부모 클래스의 메서드를 자식 클래스에서 재정의 |
| **적용 대상**   | 같은 클래스 내부                        | 상속 관계의 클래스                            |
| **메서드 이름** | 동일                                    | 동일                                          |
| **매개변수**    | 다르게 정의                             | 동일해야 함                                   |
| **반환 타입**   | 상관없음                                | 동일해야 함                                   |
| **어노테이션**  | 필요 없음                               | `@Override` 사용 권장                         |

## 4. 상속(Inheritance)

상속은 **기존 클래스의 특성을 다른 클래스가 물려받아 재사용하거나 확장**하는 개념이다. 상속을 통해 코드의 재사용성을 높이고 계층 구조를 통해 논리적인 관계를 표현할 수 있다.

### 상속의 특징

- `extends` **키워드 사용**: 자식 클래스는 부모 클래스를 상속받기 위해 `extends` 키워드를 사용한다.
- **단일 상속만 가능**: 자바는 다중 상속을 지원하지 않으며, 한 클래스는 오직 하나의 부모 클래스만 가질 수 있다.
- `super` **키워드로 부모 클래스 참조**: 부모 클래스의 생성자나 메서드를 호출할 때 사용한다.

```java
// 부모 클래스
public class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("Some sound");
    }
}

// 자식 클래스
public class Dog extends Animal {
    public Dog(String name) {
        super(name);  // 부모 클래스의 생성자 호출
    }

    // 메서드 오버라이딩
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

```

---

### 다중 상속과 다이아몬드 문제

자바는 **다중 상속을 지원하지 않는다**. 이는 다중 상속으로 인해 발생할 수 있는 **다이아몬드 문제**를 방지하기 위함이다. 다이아몬드 문제란, 두 부모 클래스가 동일한 메서드를 가지고 있을 때 자식 클래스가 이를 상속받을 경우, 어떤 부모 클래스의 메서드를 호출해야 하는지 모호해지는 상황을 말한다.

자바에서는 다중 상속 대신 **인터페이스**를 사용하여 이러한 문제를 해결한다.

- 인터페이스: "이런 기능이 있어야 해요"라는 약속
- `implements`: "네, 그 기능을 만들게요"라는 실천

```java
interface 날수있는 {}
interface 힘이센 {}
interface 빠른 {}

class 슈퍼맨 implements 날수있는, 힘이센, 빠른 {
    // 여러 능력을 동시에 구현할 수 있음
}
```

```java
interface Animal {
    void eat();
}

interface Pet {
    void play();
}

// Dog 클래스는 Animal과 Pet 인터페이스를 모두 구현(implements)
public class Dog implements Animal, Pet {
    @Override
    public void eat() {
        System.out.println("Dog is eating.");
    }

    @Override
    public void play() {
        System.out.println("Dog is playing.");
    }
}

```

## 4. 사용 **예시: 상속과 오버라이딩**

```java
// 부모 클래스
public class Animal {
    // protected 접근 제어자로 선언된 변수로, 자식 클래스에서 접근 가능
    protected String name;

    // 생성자: 객체 생성 시 이름을 초기화
    public Animal(String name) {
        this.name = name;
    }

    // 동물이 움직인다는 기본 동작을 출력하는 메서드
    public void move() {
        System.out.println("동물이 움직입니다.");
    }
}

// 자식 클래스
public class Bird extends Animal {
    // Bird 클래스의 생성자: 부모 클래스의 생성자를 호출하여 name을 초기화
    public Bird(String name) {
        super(name); // 부모 클래스의 생성자 호출
    }

    // 부모 클래스의 move 메서드를 오버라이딩하여 새의 움직임을 정의
    @Override
    public void move() {
        System.out.println(name + "가 하늘을 납니다."); // name은 부모 클래스에서 상속받은 변수
    }

    // 새만의 추가 기능을 정의한 메서드
    public void sing() {
        System.out.println(name + "가 노래합니다.");
    }
}

// 사용 예시
public class Main {
    public static void main(String[] args) {
        // Bird 클래스의 객체 생성, 이름은 "참새"
        Bird sparrow = new Bird("참새");

        // 오버라이딩된 move 메서드 호출: "참새가 하늘을 납니다." 출력
        sparrow.move();

        // Bird 클래스에 정의된 sing 메서드 호출: "참새가 노래합니다." 출력
        sparrow.sing();
    }
}

```

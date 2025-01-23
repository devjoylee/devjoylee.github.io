---
title: "[Java] 기초 개념 : 변수/자료형/접근제어자/static"
description: "[Java] 기초 개념 : 변수/자료형/접근제어자/static"
date: 2025-01-22
update: 2025-01-22
tags:
  - java
  - fullstack
series: "Java"
---

## 1. 변수와 데이터 타입

자바에서는 변수 사용 시 반드시 타입을 명시해야 한다. 한번 선언된 타입은 변경할 수 없다.

### 기본 자료형 (Primitive Types)

실제 값을 저장하는 자료형

```java
// 정수형
byte age = 25;         // 1바이트 (-128 ~ 127)
short point = 32000;   // 2바이트 (-32,768 ~ 32,767)
int count = 1000000;   // 4바이트 (약 ±21억)
long money = 1234567890L;  // 8바이트 (L 접미사 필수)

// 실수형
float height = 175.5f;  // 4바이트 (f 접미사 필수)
double weight = 67.5;   // 8바이트

// 문자형
char grade = 'A';       // 2바이트 (단일 문자)

// 논리형
boolean isStudent = true;  // true/false

```

### 참조 자료형 (Reference Types)

데이터의 '주소'를 저장하는 자료형. 클래스, 인터페이스, 배열과 같은 자료형이 있다. <br/>사용할 때는 `new` 예약어를 통해 생성한다. (= 생성자 constructor 호출)

```java
// 문자열
String name = "김철수";

// 배열
int[] numbers = new int[5];
String[] fruits = {"사과", "바나나", "오렌지"};

// 클래스 객체
Student student = new Student("김철수", 20);
```

## 2. 접근 제어자

자바의 접근 제어자는 클래스, 메서드, 변수의 접근 범위를 제어한다.

| 접근제어자  | 클래스 내 | 패키지 내 | 하위 클래스 | 전역 |
| ----------- | --------- | --------- | ----------- | ---- |
| `public`    | O         | O         | O           | O    |
| `protected` | O         | O         | O           | X    |
| `default`   | O         | O         | X           | X    |
| `private`   | O         | X         | X           | X    |

### 사용 예시

```java
public class Student {
    // private: 같은 클래스 내에서만 접근 가능
    private String name;
    private int age;

    // public: 어디서든 접근 가능
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // protected: 같은 패키지와 자식 클래스에서 접근 가능
    protected void study() {
        System.out.println(name + "이(가) 공부중입니다.");
    }

    // default(접근제어자 생략): 같은 패키지 내에서만 접근 가능
    void eat() {
        System.out.println("식사 중...");
    }
}

```

### 꼭 알아야 할 특징!

1. 클래스의 멤버 변수는 기본적으로 `private`으로 선언
2. 외부에서 접근이 필요한 경우 getter/setter 메서드를 `public`으로 제공
3. 상속이 필요한 메서드는 `protected` 사용
4. 특별한 이유가 없다면 `default` 접근제어자는 지양

```java
public class BankAccount {
    private int balance;  // 잔액은 private으로 보호

    // getter
    public int getBalance() {
        return balance;
    }

    // setter
    public void deposit(int amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}

```

## 3. static 키워드

static은 클래스 레벨의 멤버를 선언할 때 사용한다.

### 주요 특징

- static 멤버는 프로그램이 시작되어 해당 클래스가 메모리에 로드되는 시점에 생성된다.
- 메모리에 단 하나만 존재하며 모든 객체(인스턴스)가 공유한다.
- 객체 생성(`new`) 없이 클래스 이름만으로 직접 접근이 가능하다.

```java
public class Calculator {
    static double PI = 3.14159;  // static 변수

    public static int add(int a, int b) {  // static 메서드
        return a + b;
    }
}
```

### private static의 의미

`private static`은 static의 특징에 접근 제어를 추가한 것이다.

- 특징 : static의 모든 특징을 가지나 같은 클래스 내에서만 접근 가능하며 외부에서 직접 접근이 불가능하다
- 예시 코드

```java
public class UserManager {
    // 클래스 내부에서만 접근 가능한 공유 변수
    private static int userCount = 0;

    // 클래스 내부에서만 사용하는 유틸리티 메서드
    private static boolean validateUser(String name) {
        return name != null && !name.trim().isEmpty();
    }

    public void addUser(String name) {
        if (validateUser(name)) {
            userCount++;
        }
    }
}
```

### static vs private static 비교

| 구분             | static                   | private static                    |
| ---------------- | ------------------------ | --------------------------------- |
| 접근 범위        | 어디서나 접근 가능       | 같은 클래스 내에서만 접근 가능    |
| 공유 특성        | 모든 객체가 공유         | 모든 객체가 공유                  |
| 메모리 생성 시점 | 클래스 로드 시           | 클래스 로드 시                    |
| 주요 용도        | 공용 API, 유틸리티, 상수 | 내부 유틸리티, 클래스 내부 데이터 |

## 4. 실제 사용 예시

```java
public class UserManager {
		// static 멤버: 모든 UserManager 인스턴스가 공유하는 사용자 수 카운터
    private static int totalUserCount = 0;

    // 인스턴스 멤버: 각 매니저가 관리하는 사용자 목록
    private List<User> users;

    public UserManager() {
        this.users = new ArrayList<>();
    }

    public void addUser(String name, int age) {
        if (isValidAge(age)) {
            users.add(new User(name, age));
            totalUserCount++;  // static 변수 증가
            System.out.println("사용자가 추가되었습니다.");
        } else {
            System.out.println("유효하지 않은 나이입니다.");
        }
    }

		// static 메서드: 나이 유효성 검사는 인스턴스와 무관한 공통 로직
    private static boolean isValidAge(int age) {
        return age >= 0 && age <= 120;
    }

    public void printUsers() {
        for (User user : users) {
            System.out.println(user.getName() + ": " + user.getAge() + "세");
        }
    }

    // static 메서드: 전체 사용자 수 조회
    public static int getTotalUserCount() {
        return totalUserCount;
    }
}

```

---
title: "[Java] Java 개발 환경과 JVM의 동작 원리"
description: "[Java] Java 개발 환경과 JVM의 동작 원리"
date: 2025-02-01
update: 2025-02-01
tags:
  - java
  - fullstack
series: "Java"
---

## 1. Java 동작 방식

Java는 "Write Once, Run Anywhere" 철학을 기반으로 한 번 작성된 코드를 다양한 플랫폼에서 실행할 수 있는 언어이다. **JDK**를 사용해 개발하고 **JVM**을 통해 실행된다. 이 과정에서 컴파일과 런타임을 거치며 JVM 내부의 다양한 메모리 영역과 실행 엔진이 관여한다.

<img src="https://github.com/user-attachments/assets/b340d87f-a539-4322-bb8c-070bd3d8f52d" alt="" width="800" />

### Java 구성 요소

- **JDK (Java Development Kit)** : “JRE + 컴파일러(`javac`) + 개발 도구(디버거, 빌드 도구 등)”로 구성된 도구 모음.
  <br/>Java 애플리케이션을 개발하고 컴파일하는데 사용된다.
- **JRE (Java Runtime Environment)** : JVM + 라이브러리로 구성. 자바를 실행할 수 있는 환경을 제공한다
- **JVM (Java Virtual Machine)** : 바이트코드 실행하는 가상 환경. 각 운영 체제에 맞는 기계어로 변환하여 실행

### 쉽게 이해하기

- **JDK**: 개발 및 조립을 가능하게 하는 **“자동차 + 공구 세트”**
- **JRE**: 운전을 가능하게 하는 **“자동차 프레임”**
- **JVM**: 자동차를 실제로 움직이게 하는 **“엔진”**

## 2. 자바의 컴파일과 런타임

자바는 **컴파일과 런타임** 과정을 거쳐 최종적으로 프로그램이 실행된다. 이 과정에서 중요한 역할을 하는 것이 JVM이다.

<img src="https://github.com/user-attachments/assets/a4036ba5-7783-4cb4-9280-3bce6bc0631b" alt="" width="700" />

### 컴파일 단계 (Complie)

컴파일은 JDK에 포함된 자바 컴파일러(javac)를 통해 “자바 소스 코드(.java)를 바이트코드(.class)로 변환”하는 과정이다.

1.  개발자가 자바 소스코드 작성한다 (`.java` 파일)
2.  `javac` 컴파일러가 코드를 분석하고 문법 검사 수행한다. 오류가 발견되면 컴파일이 중지된다.
3.  컴파일이 성공하면 바이트코드가 생성된다. (`.class` 파일)<br/> 이때, 바이트코드(Byte Code)란 JVM에서 실행할 준비가 된 중간 코드를 뜻한다.

```bash
javac HelloWorld.java  # HelloWorld.class 생성
```

### 런타임 단계 (Runtime)

런타임은 컴파일된 바이트코드(.class 파일)를 기계어코드로 변경 후 JVM을 통해 실행하는 과정이다.

1. **Class Loader** : JVM의 클래스 로더가 `.class` 파일을 읽고 바이트코드를 메모리(Runtime Data Area)에 저장한다. <br/>동적 로딩 방식으로 필요한 클래스만 실시간으로 로드한다.
2. **Runtime Data Area** : JVM의 메모리 영역으로, 프로그램 실행에 필요한 데이터를 저장한다. 주요 메모리 영역은 아래와 같다.
   - Method Area: 클래스 정보(메타데이터), 정적 변수, 메서드 코드 저장.
   - Heap Area: 객체와 인스턴스 변수를 저장.
   - Stack Area: 메서드 호출과 지역 변수 저장.
   - PC Register: 현재 실행 중인 명령의 주소 저장.
   - Native Method Stack: 네이티브 코드 실행에 사용.
3. **Execution Engine :** JVM의 핵심 컴포넌트로, 바이트코드를 실제 기계어로 변환하여 실행한다. 엔진은 자바 클래스가 JVM에 로드된 이후에 바이트 코드를 실제 기계어로 OS에 맞게 변환하고 Runtime Data Area에서 필요한 데이터를 가져와 실행한다.
   - Interpreter: 바이트코드를 한 줄씩 해석하여 실행.
   - JIT(Just-In-Time) Compiler: 자주 실행되는 코드를 네이티브 코드로 변환하여 실행 속도를 향상.
   - 가비지 컬렉션: 더 이상 사용되지 않는 객체를 자동으로 제거하여 메모리를 관리.

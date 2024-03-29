---
title: "[Node] 노드의 주요 특성 Non Blocking / Single Thread"
description: "[Node] 노드의 주요 특성 Non Blocking / Single Thread"
date: 2022-08-02
update: 2022-08-02
tags:
  - nodejs
series: "NodeJS"
---

## 📚 노드의 주요 특성

### 1. 이벤트 기반

노드는 이벤트 발생 시 미리 지정해둔 작업을 수행하는 **이벤트 기반**으로 작동합니다. 이벤트가 생기면 해당 이벤트에 대한 함수를 Event Listener에서 찾아 Callback 함수를 호출합니다.

- 이벤트의 예: 클릭, 네트워크 요청, 타이머 등
- Event Listener : 이벤트를 등록하는 함수
- Callback 함수 : 이벤트가 발생했을 때 실행될 함수

<img src="https://user-images.githubusercontent.com/68415905/183243780-a2bba588-6e90-4c0b-a704-ea1d9498d882.JPG" width="430" />

### 2. Non Blocking I/O

> Non Blocking : 오래 걸리는 함수를 백그라운드로 보낸 후 다음 코드를 먼저 실행하고 나중에 오래 걸리는 함수를 실행하는 방식

블로킹은 이전 작업이 끝난 후 다음 작업을 실행 하는 순차적인 방식이며 논블로킹은 대기없이 모든 작업에 대한 요청을 먼저 받고 동시적으로 실행하는 방식을 뜻합니다. 주로 I/O 작업 (파일 시스템 접근, 네트워크 요청), 압축, 암호화 등이 논블로킹 방식으로 백그라운드에서 병렬로 동시 실행되며 그 외에는 블로킹 방식을 사용합니다. I/O 작업이 많을 때 노드 활용성이 극대화됩니다.

<img src="https://user-images.githubusercontent.com/68415905/183245019-0fa3173a-136f-4790-8c80-b5e4eb05a9a6.JPG" width="1000" />

### 3. Single Thread

### - 프로세스 & 스레드

기본적으로 프로그램 1개당 프로세스가 1개 실행됩니다. 실행된 프로세스에서 1개의 작업만 가능하면 싱글 스레드, 다양한 작업을 할 수 있으면 멀티 스레드라고 합니다. 노드 프로세스는 멀티 스레드처럼 보이지만 직접 다룰 수 있는 스레드는 하나이기 때문에 싱글 스레드라고 표현합니다. 노드 버전 14부터는 멀티 스레드도 사용 가능하나 멀티 스레드 대신 멀티 프로세스를 주로 사용합니다.

- 프로세스 : 운영체제에서 할당하는 작업의 단위, 프로세스 간 자원 공유 X
- 스레드 : 프로세스 내에서 실행되는 작업의 단위, 부모 프로세스 자원 공유

<img src="https://user-images.githubusercontent.com/68415905/183243737-c55bd301-75e5-4343-8d92-f706022ecbbf.JPG" width="550" />

### - 싱글 스레드란?

싱글 스레드는 요청에 대한 작업을 1개씩 처리하는 방식입니다. 그래서 블로킹이 발생하면 나머지 작업은 모두 대기해야해서 효율이 떨어지는 단점이 있습니다. Node는 이런 단점을 보완하기 위해 논블로킹 모델을 채택하여 일부 코드(I/O)를 백그라운드 (다른 프로세스) 에서 실행 가능하도록 만들었습니다.

- 장점 : 프로그래밍 난이도가 쉽고 CPU, 메모리 자원을 적게 사용
- 단점 : 에러 발생 시, 프로그램이 멈춤

### - 멀티 스레드와 비교

노드 14버전에서는 멀티 스테드를 사용할 수 있도록 worker_threads 모듈을 도입했습니다. CPU를 많이 사용하는 작업에 활용에 적합합니다. 하지만 프로그래밍이 어렵고 자원의 사용이 많다는 문제점으로 멀티 스레드 대신 멀티 프로세스를 더 선호합니다.

- 장점 : 에러 발생 시, 새로운 스레드를 생성하고 극복 가능
- 단점 : 새로운 스레드 생성 혹은 동작하지 않는 스레드에 대한 비용이 발생, 프로그래밍 난이도가 어려움, 스레드 개수만큼 자원을 많이 사용함

<img src="https://user-images.githubusercontent.com/68415905/183243734-4e24dab8-e7f4-4be4-b64b-5832856d5bad.JPG" width="650" />

<br /><br /><br />

> REFERENCE <br /> Node.js 교과서 개정 2판 https://thebook.io/080229/ch01/01/

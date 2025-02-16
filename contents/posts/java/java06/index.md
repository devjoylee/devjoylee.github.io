---
title: "[Java] Java에서 Thread Safety를 지키는 방법"
description: "[Java] Java에서 Thread Safety를 지키는 방법"
date: 2025-02-07
update: 2025-02-07
tags:
  - java
  - fullstack
series: "Java"
---

## Thread Safety 란?

Java 애플리케이션에서 여러 스레드가 동시에 실행될 때 공유 메모리에 접근하거나 데이터를 수정할 때 일관성을 유지하려면 **스레드 안전**(**Thread Safety**)을 보장해야 한다. 여기서 스레드 안전이란, 여러 스레드가 동시에 하나의 데이터를 사용할 때 데이터가 꼬이거나 잘못된 값이 나오지 않도록 안전하게 처리하는 것을 말한다.

스레드 안전은 프로그램의 안정성과 신뢰성을 보장하기 위해 필수적이다. 하지만 과도하게 사용하면 스레드가 차례를 기다리느라 프로그램이 느려질 수 있다. 따라서 꼭 필요한 부분에만 스레드 안전을 적용해야 한다.

### 스레드 안전이 중요한 이유

1. 데이터의 일관성 보장
2. 예측 불가능한 동작 방지
3. 데드락 및 레이스 컨디션 방지
4. 멀티스레드 환경에서 안정성 확보

## Thread Safety 적용 방법

### 1. 동기화(Synchronization) 사용

`synchronized` 키워드를 사용해서 여러 스레드가 동시에 공유 데이터를 수정하지 못하도록 잠금을 걸어준다. <br/>
이렇게 하면 한 번에 하나의 스레드만 특정 코드 블록이나 메서드에 접근할 수 있도록 할 수 있다. 가장 기본적이고 직관적인 방식이지만 과도한 사용은 성능 저하을 일으켜 효율성이 떨어진다.

```java
public class Counter {
  private int count = 0;

	// 한 번에 하나의 스레드만 실행 가능
  public synchronized void increment() {
      count++;
  }

  public synchronized int getCount() {
      return count;
  }
}
```

### 2. Concurrent API (패키지) 사용

Java에서 제공되는 유틸리티를 사용하면 safety가 보장된 자료구조를 쓸 수 있다. <br/> 이런 자료구조들은 내부적으로 알아서 동기화를 처리해 주기 때문에 직접 잠금을 걸 필요가 없다. Concurrent API는 실무에서 가장 많이 사용되며 성능과 안정성을 동시에 확보할 수 있다.

- 예시) `CopyOnWriteArrayList` : 일반 리스트(ArrayList)는 여러 스레드가 동시에 접근하면 문제가 생길 수 있지만,  `CopyOnWriteArrayList`는 안전하게 동작한다.
- 그 외에도, `ConcurrentHashMap`, `CopyOnWriteArrayList`, `ConcurrentLinkedQueue` 등이 있다.

```java
import java.util.concurrent.CopyOnWriteArrayList;

public class Example {
  private CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

  public void addItem(String item) {
      list.add(item); // 스레드 안전하게 추가
  }

  public String getItem(int index) {
      return list.get(index); // 스레드 안전하게 가져오기
  }
}
```

### 3. 불변 객체 사용

불변 객체(Immutable Object)는 상태를 변경할 수 없다. 데이터를 아예 변경할 수 없게 만들면 여러 스레드가 접근해도 안전하다. <br/>Java에서는 `final` 키워드를 사용하면 객체를 불변으로 만들 수 있다. 불변 객체는 설계가 간단하고 스레드 안전 문제를 원천적으로 제거하기 때문에 유지보수성이 높다.

```java
public final class ImmutableData {
  private final int value;

  public ImmutableData(int value) {
      this.value = value;
  }

  public int getValue() {
      return value;
  }
}
```

### 4. `Atomic` 클래스 사용

Java는 `AtomicInteger`, `AtomicLong` 와 같은 안전한 연산을 지원하는 클래스를 제공한다. 이 클래스들은 내부적으로 알아서 동기화를 처리해서 복잡하게 `synchronized`를 쓸 필요가 없다.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Counter {
  private AtomicInteger count = new AtomicInteger(0);

  public void increment() {
      count.incrementAndGet(); // 안전하게 +1
  }

  public int getCount() {
      return count.get(); // 안전하게 값 가져오기
  }
}
```

### 5. `volatile` 키워드 사용

`volatile` 키워드를 사용하면 변수의 값을 항상 최신 상태로 유지할 수 있다. 하지만 단순한 읽기/쓰기 작업에서만 안전하며 복잡한 연산에는 적합하지 않다.

```java
public class Example {
  private volatile boolean running = true;

  public void stop() {
      running = false; // 다른 스레드에서도 최신 값으로 반영됨
  }

  public boolean isRunning() {
      return running;
  }
}
```

### 6. ThreadLocal 사용

스레드마다 독립적인 데이터를 가지게 하면 공유 자원을 사용할 필요가 없다. 이때, `ThreadLocal`을 사용하면 각 스레드가 자기만의 데이터를 따로 저장하고 사용하므로 공유 자원에 접근하지 않게되서 스레드 안전을 보장한다.

```java
public class Example {
  private static ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);

  public void setValue(int value) {
      threadLocal.set(value); // 현재 스레드만의 값 저장
  }

  public int getValue() {
      return threadLocal.get(); // 현재 스레드만의 값 가져오기
  }
}
```

### 7. 락(Lock)으로 세밀한 제어

`synchronized` 대신 `ReentrantLock` 같은 락(Lock)을 사용하면 더 세밀하게 제어할 수 있다. 락은 동기화보다 유연하지만 직접 잠금을 걸고 풀어야 하므로 조금 더 복잡하다.

```java
import java.util.concurrent.locks.ReentrantLock;

public class Counter {
  private int count = 0;
  private final ReentrantLock lock = new ReentrantLock();

  public void increment() {
      lock.lock(); // 잠금
      try {
          count++;
      } finally {
          lock.unlock(); // 잠금 해제
      }
  }

  public int getCount() {
      return count;
  }
}
```

<br /><br />

> REFERENCE <br /> 스레드 안전(Thread Safe)을 지키기 위한 방법
> https://sorjfkrh5078.tistory.com/267 <br /> [Java] Thread Safety하게 개발하는 방법
> https://jindory.tistory.com/146 <br/> [Java] Java에서 Thread Unsafe한 상황 이해하기 https://jindory.tistory.com/entry/Java-Java에서-Thread-Unsafe한-상황-이해하기?category=1256005

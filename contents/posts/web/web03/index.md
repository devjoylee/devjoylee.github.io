---
title: "TCP vs UDP: Stateful과 Stateless의 차이 이해하기"
description: "TCP vs UDP: Stateful과 Stateless의 차이 이해하기"
date: 2025-02-14
update: 2025-02-14
tags:
  - web
series: "Web Architecture"
---

## Stateful과 Stateless

TCP/UDP를 이해하기 위해서는 먼저 "상태 관리" 개념을 이해하는 것이 필요하다. 네트워크 통신에서 상태란, 특정 시점에서 시스템이 기억하고 있는 정보를 의미한다. 이를 기반으로 프로토콜을 분류하면, 상태를 기억하고있는 **Stateful**과 상태 유지 없이 독립적으로 처리되는 **Stateless**로 나뉜다.

### Stateful (상태유지)

클라이언트와 서버 관계에서 서버가 클라이언트의 상태를 기억하고 보존함을 의미한다. 클라이언트의 정보를 기억한다는 말은 어딘가에 정보를 저장하고 통신할때마다 읽는다는 뜻이다. 이러한 정보들은 일반적으로 브라우저의 쿠키에 저장되거나 서버의 세션에 저장된다. 대표적인 Stateful 프로토콜에는 **TCP**가 있다.

- **장점**
  - 클라이언트 상태를 기억하므로 사용자 경험(UX)이 향상됨
  - 민감한 정보도 서버에서 안전하게 관리 가능
- **단점**
  - 서버 부하 증가(상태 저장으로 인해 메모리 사용량 증가)
  - 서버 장애 시 상태 복구가 어려움
  - 확장성 문제 (다른 서버에는 클라이언트 상태값이 없어 문제 발생)

### Stateless (**무상태)**

반대로 클라이언트와 서버 관계에서 서버가 클라이언트의 상태를 보존하지 않음을 의미한다. Stateless 구조에서 서버는 단순히 요청이 오면 응답을 보내는 역할만 수행하며 상태 관리는 전적으로 클라이언트에게 책임이 있다. 즉, 통신에 필요한 모든 상태 정보들은 클라이언트가 가지고 있다가 서버와 통신할때 상태를 보내는 것이 무상태 구조이다. 대표적인 Stateless 프로토콜에는 **UDP**가 있다.

- **장점**
  - 서버 부하 감소(상태 저장 불필요)
  - 서버 확장이 용이(다른 서버로 요청 전달 가능)
  - 장애 복구가 쉬움(상태 정보가 서버에 없으므로)
- **단점**
  - 요청마다 상태 정보를 포함해야 하므로 네트워크 트래픽 증가
  - 클라이언트에 상태 정보를 저장하므로 보안에 취약(XSS, 토큰 탈취 등)

### 차이점

| **구분**      | **Stateful**                    | **Stateless**                        |
| ------------- | ------------------------------- | ------------------------------------ |
| **상태 유지** | 서버가 상태를 저장              | 서버는 상태를 저장하지 않음          |
| **확장성**    | 낮음 (서버 간 상태 공유 어려움) | 높음 (서버 간 상태 공유 필요 없음)   |
| **성능**      | 메모리 부하 증가                | 요청당 처리 속도가 빠름              |
| **보안**      | 민감한 정보 서버에 저장         | 클라이언트에 정보 저장으로 보안 취약 |
| **예시**      | TCP, 세션                       | UDP, HTTP, JWT                       |

---

## TCP (Transmission Control Protocol)

TCP는 두 개의 호스트를 “연결”하여 데이터 스트림을 교환하게 해주는 네트워크 프로토콜이다. 데이터가 목적지에 정확하게 도달했는지 확인하고 손실된 부분이 있다면 다시 전송을 요청한다. 이때, 양방향 연결을 설정하는 과정을 **3-way handshake** 라고 하고 이를 통해 신뢰성있는 통신을 보장한다.

<img src="https://github.com/user-attachments/assets/8b93a1ab-b17c-4d19-9d97-51bfa798fe8b" alt="" width="450" />

### 3-way handsake

3-way handshake는 TCP/IP 네트워크에서 연결을 초기화할 때 사용되며 3번의 통신을 함으로써 서로 데이터를 주고받을 수 있는 상태가 되었다는것을 확인한다. 여기서 세션의 저장된 ‘상태’에 따라 서버의 응답이 달라짐으로 stateful한 구조라고 볼 수 있다.

1. Client → Server: 접속 요청 메세지 SYN 전송 [Client State `SYN_SENT` ]
2. Server → Client : 요청을 수락하는 SYN/ACK 전송 [Server State `SYN_RECEIVED` ]
3. Client → Server : 수락 확인으로 ACK 전송 [Client/Server State `ESTABLISHED` ]

> `ESTABLISHED` = 서버와 클라이언트가 서로 데이터를 주고 받을 수 있는 상태가 되었다는 뜻

<img width="750" src="https://github.com/user-attachments/assets/ddb3cd4f-b634-455e-baa0-cfefae9f4d7c" />

### 동작 방식

1. 데이터 전송을 하기 전에 먼저 3-way handshake로 연결 설정을 한다.
2. 연결이 성립되면 데이터를 세그먼트 형태로 나누어 순차적으로 전송한다.
3. 수신자는 데이터를 받을 때마다 ACK를 보내 송신자에게 도착을 알린다. 만약 ACK가 일정 시간 내에 도착하지 않으면 해당 데이터를 재전송한다.
4. 데이터 전송이 완료되면 양쪽 모두가 연결을 종료할 준비가 되었음을 확인하고 4단계의 핸드셰이크를 통해 연결을 종료한다.

### TCP 예시 코드

```jsx
const express = require("express")
const app = express()
app.use(express.json())

// 사용자 정보를 받는 엔드포인트
app.post("/send-data", (req, res) => {
  const userData = req.body
  console.log("Received data:", userData)

  // 데이터 처리 로직 (예: 데이터베이스에 저장)
  res.status(200).send({ message: "Data received successfully!" })
})

// 서버 시작
app.listen(3000, () => {
  console.log("TCP 기반 Express 서버가 http://localhost:3000에서 실행 중입니다")
})
```

---

## UDP (User Datagram Protocol)

UDP는 빠르고 간단한 통신을 위해 연결 설정 없이 데이터를 전송하는 네트워크 프로토콜이다. TCP와 달리 연결 설정을 하지않고 데이터를 전송한다. 데이터가 도착했는지 확인하지 않기때문에 신속하지만 신뢰성이 낮다. 비디오 스트리밍과 같은 실시간으로 빠른 반응이 요구되는 서비스에서 유리하다.

<img src="https://github.com/user-attachments/assets/3afafca0-7c3b-4881-88bc-e33c97f9fc1f" alt="" width="450" />

### 동작 방식

- UDP는 데이터를 '데이터그램'이라고 하는 독립적인 패킷 형태로 전송한다. 각 데이터그램은 목적지 주소와 포트 정보를 포함하고 독립적으로 전송된다.
- 전송된 데이터그램의 도착을 보장하지 않으며, 도착 순서 또한 보장하지 않는다.
- 간소화된 동작 방식은 프로토콜 오버헤드를 줄여 네트워크 지연을 최소화하고 전송 속도를 빠르게 한다.

### UDP 예시 코드

Express.js에서는 UDP를 직접적으로 다루지 않아 `dgram` 모듈을 사용하여 UDP 서버를 구현한다. 이는 비동기적이고 손실 허용적인 데이터 전송에 유리하다.

```jsx
const dgram = require("dgram")
const server = dgram.createSocket("udp4")

// UDP 서버가 수신할 때
server.on("message", (msg, rinfo) => {
  console.log(`수신된 메시지: ${msg} from ${rinfo.address}:${rinfo.port}`)

  // 메시지에 대한 응답 전송
  server.send("Hello, UDP Client!", rinfo.port, rinfo.address, err => {
    if (err) console.error(err)
    console.log("응답 메시지를 클라이언트로 전송했습니다")
  })
})

// UDP 서버 시작
server.bind(4000, () => {
  console.log("UDP 서버가 4000 포트에서 실행 중입니다")
})
```

## TCP와 UDP의 차이점

|                      | **TCP <br/> (Transmission Control Protocol)**                  | **UDP <br/> (User Datagram Protocol)**            |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------------- |
| **연결 방식**        | 연결 지향(Connection-oriented), <br/> 3-way handshake 사용     | 비연결(Connectionless), <br/> handshake 없이 전송 |
| **데이터 전송 방식** | 신뢰성 있는 데이터 전송 <br/> (순서 보장, 오류 검출 및 재전송) | 빠른 데이터 전송 <br/> (순서 보장 X, 손실 가능)   |
| **오버헤드**         | 높음 (연결 설정 및 오류 제어 필요)                             | 낮음 (추가적인 제어 없음)                         |
| **속도**             | 상대적으로 느림                                                | 빠름                                              |
| **순서 보장**        | 보장됨                                                         | 보장되지 않음                                     |
| **오류 제어**        | 있음 (패킷 손실 시 재전송)                                     | 없음 (패킷 손실 시 재전송 안 함)                  |
| **사용 사례**        | 웹 브라우징, 이메일, 파일 전송 (HTTP, FTP, SMTP 등)            | 실시간 스트리밍, VoIP, 온라인 게임, DNS 요청      |
|                      |

<br/>
<br/>

> REFERENCE <br /> 아주 쉽게 이해하는 Stateful / Stateless 차이 https://inpa.tistory.com/entry/WEB-📚-Stateful-Stateless-정리 <br/> Stateless / Stateful 란? https://velog.io/@makeitcloud/란-Stateless-Stateful-이란

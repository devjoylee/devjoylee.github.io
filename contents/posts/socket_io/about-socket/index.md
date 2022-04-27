---
title: "Socket 통신 개념 및 Socket.io 사용 예시"
description: "Socket 통신 개념 및 Socket.io 사용 예시"
date: 2022-04-20
update: 2022-04-20
tags:
  - socket.io
series: "Socket.io"
---

## ✨ Socket 이란?

네트워트 상에서 Socket은 프로토콜, IP 주소, 포트 넘버 등으로 해석됩니다. 떨어져 있는 두 호스트를 연결해주는 도구로 사용되며 Socket을 통해 데이터를 내보내거나 받아올 수 있는 데이터 통로가 만들어 집니다. 소켓의 역할에 따라 클라이언트 소켓, 서버소켓으로 구분됩니다.

### Websocket

> 사용자의 브라우저와 서버 사이의 양방향 연결 채널을 구성하는 HTML5 프로토콜

WebSocket은 HTML5 웹 표준 기술로써 HTTP 통신의 단점을 보완하여 양방향 통신을 지원하고 또 서버와의 연결이 유지가 된 상태에서 데이터가 이동하기 때문에 실시간 데이터 전송이 가능합니다.

데이터를 주고 받는것 이외의 다른 기능은 없으나 동작 속도가 매우 빠르며 통신할 때 아주 적은 데이터를 이용합니다. 그래서 주로 가상화폐 거래소나 규모가 큰 데이터 이동이 많은 프로젝트에서 사용합니다. Websocket은 오래된 브라우저와 호환이 되지 않는 단점이 있습니다.

## 🤔 HTTP 통신과 Socket 통신 비교

### HTTP 통신

> Client의 요청(Request)이 있을 때만 Server가 응답(Response)하여 정보를 전송한 후 연결을 종료하는 통신

HTTP통신은 실시간 연결보다는 필요할 때 Server로 요청을 보내는 상황에 유리합니다.

- 단방향 통신 : Client가 요청을 보내는 경우에만 Server가 응답합니다.
- 일회성 통신 : Server로부터 응답을 받은 후에는 연결이 바로 종료됩니다.

### Socket 통신

> Server와 Client가 특정 Socket(Port)를 통해 실시간으로 양방향 통신을 하는 방식

Socket 통신은 동영상 스트리밍이나 채팅창 등 실시간으로 데이터를 주고받을 때 사용됩니다.

- 양방향 통신 : Client에서 Server로, Server에서 Client로 데이터 전달이 가능합니다.
- 지속성 통신 : 연결이 끊이지 않고 실시간으로 계속 유지됩니다.

## 🔎 Socket.io 사용 하기

> **Socket.io** 👉 Websocket 기반으로 웹 클라이언트와 서버 간의 실시간 양방향 통신을 가능하게 해주는 Cross-platform WebSocket API

Socket.io는 WebSocket을 편리하게 쓸 수 있도록 하는 라이브러리입니다. 브라우저간의 호환성을 높이고 `room`이라는 기능을 이용해 일부 Client에만 데이터를 전송하는 브로드캐스팅이 가능합니다. 아래 구현 예시를 통해 더 자세히 알아보겠습니다.

### 서버 Socket 구현

1. Socket 패키지를 설치합니다

```bash
npm i socket.io
```

2.  app서버 생성 후 소켓IO에 생성한 서버를 전달하고 동작시킨다

```js
const app = require("express")()
const SocketIO = require("socket.io")

const server = app.listen(8005, () => {})
const io = SocketIO(server, { path: "/socket.io" })
// 서버 연결, path는 프론트와 일치시켜준다.
// path: 이 경로를 통해 통신을 수행하며, 생략시 디폴트 값은 /socket.io 로 지정된다.
```

3. 소켓 연결에 성공하면 각 이벤트에 대한 코드를 작성합니다.

   (`addEventListener` 방식을 사용)

```js
// 웹소켓 연결 시
io.on('connection', (socket) => {
  // 연결 종료 Event
  socket.on('disconnect', () => {
    console.log('클라이언트 접속 해제', ip, socket.id);
  }

  // 에러 발생 Event
  socket.on('error', (error) => {
    console.error(error);
  });

  // Client -> Server (데이터 수신)
  // Client가 reply라는 이벤트로 전송한 데이터
  socket.on('reply', (data) => {
    console.log(data);
  });

  // Server -> Client (데이터 전송)
  socket.emit('message', 'Hello World')

}
```

### 클라이언트 Socket 구현

1. Socket 패키지를 설치합니다 (client버전)

```bash
npm i socket.io-client
```

2. Socket을 불러와서 Server로 데이터를 전송하는 코드를 작성합니다.

```js
import { io } from "socket.io-client"
const socket = io("http://localhost:3000") // server url 전달

// Server -> Client (데이터 수신)
socket.on("message", data => {
  console.log(data)
})

// Client -> Serer (데이터 전송)
socket.emit("message", "hello world!")
```

<br /><br />

> REFERENCE<br /> Learn Socket.io In 30 Minutes https://youtu.be/ZKEqqIO7n-k <br/> 소켓(Socket) 통신이란? https://helloworld-88.tistory.com/215

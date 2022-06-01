---
title: "Socket.io 기능 알아보기"
description: "Socket.io 기능 알아보기"
date: 2022-04-27
update: 2022-04-27
tags:
  - websocket
series: "Web Socket"
---

## 🔎 Socket.io 란?

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

socket.on("connect", () => {
  displayMessage(`You connected with id : ${socket.id}`)
})
```

<br/>

## 🔀 데이터 교환 방식 (emit & on)

- 데이터 전송 : `emit`

```js
socket.emit("event-name", data)
```

- 데이터 수신 : `on`

```js
socket.on("event-name", data => {
  console.log(data)
})
```

### 예시

1. Client에서 데이터를 전송한다.

```js
const message = messageInput.value
socket.emit("send-message", message)
```

2. Server는 Client로부터 데이터를 받은 후 다시 Client에 전달한다.
   - `io.emit` : Client가 가진 모든 소켓에 데이터 전송

```js
io.on("connection", socket => {
  socket.on("send-message", message => {
    io.emit("receive-message", message)
  })
})
```

3. Client에서 데이터를 출력한다.

```js
socket.on("receive-message", message => {
  displayMessage(message)
})
```

<br/>

## 📝 그외 Socket.io 기능들

### broadcast

`socket.broadcast.emit` : 데이터를 전송한 socket을 제외한 모든 socket에 데이터 전달
<br/> ex) A가 보낸 메세지는 A를 제외한 B,C에 전달됨

```js
io.on("connection", socket => {
  socket.on("send-message", message => {
    socket.broadcast.emit("receive-message", message)
  })
})
```

### room

`socket.to(room).emit` : 특정한 socket에만 데이터를 전송해야하는 경우 room을 생성하여 room에 속한 socket에만 데이터를 보낼 수 있는 기능입니다.

1. Client에서 room을 생성한 후 Server에 전달합니다.

```js
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value
  socket.emit("join-room", room)
})
```

2. Client로부터 전달받은 room값을 Server에 저장합니다.

```js
io.on("connection", socket => {
  socket.on("join-room", room => {
    socket.join(room)
  })
})
```

3. 특정 room에 데이터를 보내는 경우, Client에서 데이터와 room 정보를 함께 전송합니다

```js
const message = messageInput.value
const room = roomInput.value
socket.emit("send-message", message, room)
```

4. Server에서 특정 room으로 데이터를 전송합니다. `socket.to(room)`

```js
io.on("connection", socket => {
  socket.on("send-message", (message, room) => {
    if (room) {
      socket.to(room).emit("receive-message", message)
      // to(room)은 broadcast 특징을 함께 가짐
    }
  })
})
```

<br /><br />

> REFERENCE<br /> Learn Socket.io In 30 Minutes https://youtu.be/ZKEqqIO7n-k <br/> Socket.io란 https://nesoy.github.io/articles/2017-04/Socket.io<br/>Dev Scroll https://inpa.tistory.com/entry/SOCKET-📚-SocketIO-사용-해보기

---
title: "Socket.io 기능 알아보기"
description: "Socket.io 기능 알아보기"
date: 2022-04-27
update: 2022-04-27
tags:
  - socket.io
series: "Socket.io"
---

## ✨ Socket.io 기본 Set-up

- Server

```js
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
})

io.on("connection", socket => {
  console.log(socket.id)
})
```

- Client

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

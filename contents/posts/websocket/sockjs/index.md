---
title: "Stomp.JS 로 채팅방 구현하기"
description: "Stomp.JS 기능 알아보기"
date: 2022-05-10
update: 2022-05-10
tags:
  - sockjs
series: "Web Socket"
---

## ✨ StompJS 란?

> stomp : 단순 <또는 스트리밍) 텍스트 지향 메시징 프로토콜. spring에 종속적.<br/> [StompJS Docs](https://stomp-js.github.io/guide/stompjs/upgrading-stompjs.html)

### stomp 설치

최근 브라우저는 모두 socket을 지원하지만 IE 9 이하에서는 사용이 불가능합니다. 브라우저 대응이 필요한 경우, `socketjs-client`를 추가로 설치하여 사용합니다.

- `stompjs` (@types 패키지는 typescript를 사용하는 경우에만 설치)

```bash
npm i @stomp/stompjs, @types/stompjs
```

- `socketjs-client` : 브라우저 대응이 필요한 경우 추가 설치

```bash
npm i socketjs-client, @types/socketjs-client
```

### stomp flow

1. 서버와 연결할 클라이언트 객체 생성

2. 서버와 연결할 클라이언트 Connection

3. 메세지 전송 전 Subscriber와 Publisher를 지정

4. Subscribe를 하면 해당 URL로 나에게 메세지를 보낼 수 있는 경로가 생긴다

5. Publisher를 하면 Publish한 URL로 메세지가 이동한다

## 🔎 StompJS 사용하기

### 새 클라이언트 생성

설치한 패키지를 import한 후 client 객체를 생성합니다. [properties 더보기](https://stomp-js.github.io/api-docs/latest/classes/Client.html#connectHeaders)

```js
import SockJS from "sockjs-client"
import StompJs from "@stomp/stompjs"
```

```js
const client = new StompJs.Client({
  brokerURL: "ws://localhost:8888/ws", // server 주소 (or endpoint)
  connectHeaders: {
    login: "user",
    passcode: "password",
  }, // optional
  debug: function (str) {
    console.log(str) // optional
  },
  reconnectDelay: 5000, // optional
  heartbeatIncoming: 4000, // optional
  heartbeatOutgoing: 4000, // optional
})
```

- `brokerURL` : 서버 API 주소. http주소는 ws로, https주소는 wss로 변경합니다.
- `connectHeaders` : stomp 연결 시, 서버에서 식별자로 사용됨 (HTTP 연결 헤더 ❌)
- `debug` : 각 동작에 대한 정보를 console로 확인 가능
- `reconnectDelay` : stomp 서버 자동 연결 간격
- `heartbeatIncoming` & `heartbeatOutgoing` : socket 연결 상태 확인 주기

### 소켓 connection

연결됐을때 실행할 함수와 에러처리를 담당하는 함수를 생성하고 클라이언트를 활성화 시켜줍니다.

```js
client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
}

client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log("Broker reported error: " + frame.headers["message"])
  console.log("Additional details: " + frame.body)
}

client.activate()
```

- 소켓 미지원 브라우저 대응

```js
if (typeof WebSocket !== "function") {
  client.webSocketFactory = function () {
    return new SockJS("http://localhost:8080/stomp")
  }
}
```

### 소켓 disconnection

```js
const disConnect = () => {
  if (client != null) {
    if (client.connected) client.deactivate()
  }
}

useEffect(() => {
  connect()
  return () => disConnect()
}, [])
```

### 메세지 보내기

클라이언트와 서버가 연결 되면 publish 메서드를 사용하여 메세지를 보낼 수 있습니다. destination는 목적지라는 뜻입니다 어디로 메세지를 보낼지를 결정합니다.

body는 보낼 내용입니다.

```js
const sendMessage = (text: string) => {
  if (client != null) {
    if (!client.connected) return
    const message = { userId: 36, message: text }
    client.publish({
      destination: SEND_MESSAGE_API(room?.id),
      body: JSON.stringify(message),
    })
  }
}
```

v5부턴 바이너리 메세지 전송도 지원된다고 하네요! (header에 'content-type': 'application/octet-stream')로 contentType을 써줍니다.)

```js
const binaryData = generateBinaryData()
client.publish({
  destination: "/topic/special",
  binaryBody: binaryData,
  headers: { "content-type": "application/octet-stream" },
})
```

### 메세지 받기

```js
const getMessage = () => {
    if (client != null && client.connected) {
      client.subscribe(GET_MESSAGE_API(room?.id), () => {
        const newMessage: string = JSON.parse(data.body).message as string;
        addContent(newMessage);
      });
    }
  };
```

<br /><br />

> REFERENCE<br /> WebSoket (stompJS+React) 채팅 https://velog.io/@cksal5911/WebSoket-stompJSReact-%EC%B1%84%ED%8C%85-1 <br/> react stomp.js으로 소켓 통신과정 https://okky.kr/article/1152048

---
title: "Socket 통신의 특징 및 프로토콜의 종류"
description: "Socket 통신 개념 및 Socket.io 사용 예시"
date: 2022-04-20
update: 2022-04-20
tags:
  - websocket
series: "Web Socket"
---

## ✨ Socket 이란?

네트워트 상에서 Socket은 프로토콜, IP 주소, 포트 넘버 등으로 해석됩니다. 떨어져 있는 두 호스트를 연결해주는 도구로 사용되며 Socket을 통해 데이터를 내보내거나 받아올 수 있는 데이터 통로가 만들어 집니다. 소켓의 역할에 따라 클라이언트 소켓, 서버소켓으로 구분됩니다.

### WebSocket

> 사용자의 브라우저와 서버 사이의 양방향 연결 채널을 구성하는 HTML5 프로토콜

WebSocket은 HTML5 웹 표준 기술로써 HTTP 통신의 단점을 보완하여 양방향 통신을 지원하고 또 서버와의 연결이 유지가 된 상태에서 데이터가 이동하기 때문에 실시간 데이터 전송이 가능합니다.

데이터를 주고 받는것 이외의 다른 기능은 없으나 동작 속도가 매우 빠르며 통신할 때 아주 적은 데이터를 이용합니다. 그래서 주로 가상화폐 거래소나 규모가 큰 데이터 이동이 많은 프로젝트에서 사용합니다. Websocket은 오래된 브라우저와 호환이 되지 않는 단점이 있습니다.

## 🤔 HTTP 통신과 Socket 통신 비교

### HTTP 통신 (stateless)

> Client의 요청(Request)이 있을 때만 Server가 응답(Response)하여 정보를 전송한 후 연결을 종료하는 통신

HTTP통신은 실시간 연결보다는 필요할 때 Server로 요청을 보내는 상황에 유리합니다.

- 단방향 통신 : Client가 요청을 보내는 경우에만 Server가 응답합니다.
- 일회성 통신 : Server로부터 응답을 받은 후에는 연결이 바로 종료됩니다.

### Socket 통신 (statefull)

> Server와 Client가 특정 Socket(Port)를 통해 실시간으로 양방향 통신을 하는 방식

Socket 통신은 동영상 스트리밍이나 채팅창 등 실시간으로 데이터를 주고받을 때 사용됩니다.

- 양방향 통신 : Client에서 Server로, Server에서 Client로 데이터 전달이 가능합니다.
- 지속성 통신 : 연결이 끊이지 않고 실시간으로 계속 유지됩니다.

## 💡 WebSocket 통신의 특징

Socket 통신은 hand-shake 방식으로 Client와 Server 접속을 유지한 채 데이터를 주고 받기때문에 양방향 통신이 가능합니다.

> handshake란? 송신자와 수신자간에 암호화된 데이터를 교환할 때 필요한 협상과정

Client에서 랜덤하게 생성된 키값을 전송하고, Server는 이 키값을 바탕으로 토큰을 생성하여 Client에 Response를 보내어 Client와 Server간의 handShaking이 이루어 집니다. 채팅, 실시간 화상통화 등 양방향 통신에 아주 유용하게 쓰이고 있습니다.

## ✅ WebSocket 프로토콜의 종류

일반적으로 Node.js 를 이용할땐 socket.io 를,<br/>
Spring을 사용할땐 socket.js, stomp.js를 사용합니다.

### socket.io

인터넷 익스플로러 구버전의 사용자는 websocket으로 작성된 웹페이지를 볼 수 없습니다. 이를 해결하기위해 socket.io는 웹페이지가 열리는 브라우저가 websocket을 지원하면 일반 websocket방식으로 동작하고 지원하지 않는 브라우저라면 http를 이용해 websocket을 흉내내는 방식으로 통신을 지원합니다. socket.io는 nodeJS에 종속적 입니다.

### sock.js

위와 같은 브라우저 문제를 해결하기 위한 방법으로 Spring에서는 sockJS를 솔루션으로 제공합니다. 서버 개발시 일반 websocket으로 통신할지 sockJS 호환으로 통신할지 결정할 수 있습니다. 그리고 클라이언트는 sockJS client를 통해 서버와 통신합니다.

### stomp.js

stomp는 단순 (또는 스트리밍) 텍스트 지향 메시징 프로토콜입니다. spring에 종속적이며, 구독방식으로 사용하고 있습니다. 가벼워서 sockJs와 주로 함께 사용합니다.

<br /><br />

> REFERENCE<br /> Learn Socket.io In 30 Minutes https://youtu.be/ZKEqqIO7n-k <br/> 소켓(Socket) 통신이란? https://helloworld-88.tistory.com/215

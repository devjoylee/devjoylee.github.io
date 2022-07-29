---
title: "[Node] 서버와 런타임 개념 이해하기"
description: "[Node] 서버와 런타임 개념 이해하기"
date: 2022-07-27
update: 2022-07-27
tags:
  - nodejs
series: "NodeJS"
---

## 🔎 Node란?

> Nodejs : Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임

[공식문서에서의 노드](https://nodejs.org/ko/)는 Javascript 런타임이라고 표현되어 있습니다. 하지만 대부분은 Node를 서버 실행을 위해 사용합니다. 여기서 '서버'와 '런타임'은 무엇이고 어떤 차이가 있을까요?

### 서버로서의 노드

네트워크는 요청과 응답을 주고받으며 끊임없이 통신합니다. 이때, 요청을 보내는 주체를 클라이언트, 요청에 응답하는 주체를 서버라고 합니다. 다시말해 서버란 네트워크 상에서 클라이언트에게 요청에 대한 정보 및 서비스를 제공하는 프로그램을 뜻합니다.<br>
예) Client : 주소창에 홈페이지 URL을 입력 (요청) ➡ Server : 해당 URL에 대한 정보를 브라우저에 출력 (응답)

<img src="https://user-images.githubusercontent.com/68415905/183243977-9994702a-5372-4a94-bbf0-5498bab69847.JPG" width="500" />

그리고 Node의 가장 큰 특징 중 하나가 Node에서 서버를 만들 수 있는 모듈(ex http)을 제공한 다는 것입니다. Node 자체는 서버가 아니지만 Node가 제공하는 서버 구성 모듈을 사용해서 Javascript로 작성된 서버를 만들고 실행할 수 있습니다.

<img src="https://user-images.githubusercontent.com/68415905/183244730-41d34478-3464-45b7-92e5-aedc28233c88.JPG" width="750" />

### 런타임으로서의 노드

- 대표적인 Javascript 런타임 : **웹 브라우저(크롬, 사파리 등)**

런타임은 프로그래밍 언어가 실행되는 환경을 뜻합니다. 그렇다면 Javascript 런타임이란 Javascript를 실행하는 환경을 뜻합니다.
Node.js 가 나오기 전에는 Javascript를 인터넷 브라우저에서만 실행할 수 있었습니다. 하지만 node.js라는 새로운 Javascript 런타임의 등장으로 브라우저 외부에서도 Javascript를 실행할 수 있게 되었습니다. (ex 웹 프레임 워크 : Angular, React, Vue 등..)

<br />

> REFERENCE <br /> Node.js 교과서 개정 2판 https://thebook.io/080229/ch01/01/

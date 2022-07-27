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

### 서버

네트워크는 요청과 응답을 주고받으며 끊임없이 통신합니다. 이때, 요청을 보내는 주체를 클라이언트, 요청에 응답하는 주체를 서버라고 합니다. 서버는 클라이언트에게 요청에 대한 정보 및 서비스를 제공합니다.

예) 클라이언트 ➡ 주소창에 홈페이지 URL을 입력 (요청) <br/>
서버 ➡ 해당 URL에 대한 정보를 브라우저에 출력 (응답)

![img](https://thebook.io/img/080229/025.jpg)

### 런타임

런타임은 프로그래밍 언어가 실행되는 환경을 뜻합니다. 그렇다면 Javascript 런타임이란 Javascript를 실행하는 환경을 뜻합니다. Node.js 가 나오기 전에는 Javascript를 인터넷 브라우저에서만 실행할 수 있었습니다. 하지만 node.js라는 새로운 Javascript 런타임의 등장으로 브라우저 외부에서도 Javascript를 실행할 수 있게 되었습니다.

<br />

> REFERENCE <br /> Node.js 교과서 개정 2판 https://thebook.io/080229/ch01/01/

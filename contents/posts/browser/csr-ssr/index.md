---
title: "브라우저 렌더링 CSR vs SSR"
description: "브라우저 렌더링 CSR vs SSR"
date: 2022-10-17
update: 2022-10-17
tags:
  - webbrowser
series: "Web Browser"
---

## 💻 CSR (Client Side Rendering)

CSR은 JavaScript를 사용하여 직접 웹브라우저에서 페이지를 렌더링하는 것을 의미한다. <br/>
모든 로직 및 데이터 가져오기, 템플릿 및 라우팅은 서버가 아닌 클라이언트(브라우저)에서 처리된다.

### 동작 순서

<img src="https://user-images.githubusercontent.com/68415905/197331301-53b2d667-c03d-436f-8c3b-eb04c52ea7a1.png" width="800" />

1. 클라이언트 ➡ 서버 : 사이트 접속을 알림
2. 서버 ➡ 클라이언트 : index.html 전송 <br/>
   처음 접속하면 다음과 같은 html을 내려받는다. 컨텐츠가 없는 텅 빈 html이기때문에 첫 화면은 빈 화면만 보인다.

   > ```html
   > <html>
   >   <head>
   >     ...
   >   </head>
   >   <body>
   >     <div id="root"></div>
   >     <script src="app.js"></script>
   >   </body>
   > </html>
   > ```

3. 클라이언트 ➡ 서버 : Javascript 파일 요청
4. 서버 ➡ 클라이언트 : `app.js` 파일 전송 (용량이 커서 초기 로딩시간이 길다.) <br/>
   Javascript 로직 뿐 아니라 이를 구동시키는 프레임워크, 라이브러리의 코드도 모두 포함해서 전송한다 <br/>

### 장점

- 페이지가 로드된 후, 리렌더링할 때는 필요한 리소스만 교체하므로 로딩이 빠르다.
- 서버로 데이터를 요청하는 횟수가 적다.

### 단점

- 사용자가 첫 화면을 보기까지 **초기 로딩시간(Time To View)이 길다.**
- **낮은 SEO (Search Engine Optimization)** : 네이버나 구글 등의 검색엔진은 서버에 등록된 사이트를 돌아다니며 html문서를 분석해서 사용자가 검색을 빠르게 할 수 있도록 도와준다. 하지만 CSR은 html이 텅 비어있기 때문에 SEO 분석에 취약하다.

<br/>

## 📲 SSR (Server Side Rendering)

SSR은 CSR와 다르게 웹사이트에 접속하면 서버측에서 필요한 데이터를 모두 가져와 html파일을 생성하여 클라이언트로 보내준다. 처음부터 서버에서 컨텐츠가 포함된 html을 가져오기때문에 로딩속도가 빠르고 효율적인 SEO가 가능하다. SSR을 사용하면 클라이언트(사용자 기기)의 사양에 의존하지 않고, 고사양 서버에서 HTML을 구축할 수 있다.

### 동작 순서

<img src="https://user-images.githubusercontent.com/68415905/197331299-9de64557-829a-412e-a3c1-7ce786d847b2.png" width="800" />

1. 클라이언트 ➡ 서버 : 사이트 접속을 알림
2. 서버 ➡ 클라이언트 : index.html 전송<br/>
   로딩 시, 서버에서 필요한 데이터를 모두 가져와 잘 짜여진 html파일을 전송한다.
3. 클라이언트 ➡ 서버 : Javascript 파일 요청
4. 서버 ➡ 클라이언트 : app.js 전송

### 장점

- 검색엔진 최적화 (SEO)에 유리하다.
- 페이지가 보여지는 시간이 빠르다.

### 단점

- 페이지 이동 시, 매번 새로운 html파일을 요청해서 가져오기때문에, 페이지 깜박임현상이 발생한다.
- 브라우저가 해야 할 일을 서버가 대신 처리하므로 서버 렌더링에 따른 부하가 발생한다.
- html가 로드된 이후에 js를 요청하기때문에, js가 완전히 로드되지 않은경우 페이지가 제대로 작동을 하지 않을 수 있다.

## 📱 Progressive Rendering

Server Side Rendering 기술 중 하나. 예시로 구글 검색 페이지가 있다. 검색을 하면 상단의 검색창과 메뉴 버튼은 빠르게 뜨고 조금 기다리면 검색 결과가 출력된다.
또 다른 예시는 네이버 메인페이지다. 정보량이 많지만 빠르게 출력된다.

### 동작순서

1. HTML 요청
2. 중요도가 높은 HTML 문서를 먼저 렌더링하고 클라이언트로 전달
3. 클라이언트에서 페인팅
4. 다음 중요도인 HTML 문서를 렌더링하고 클라이언트로 전달
5. 클라이언트에서 페인팅

<br /><br />

> REFERENCE <br /> Node.js 교과서 개정 2판 https://thebook.io/080229/ch01/01/

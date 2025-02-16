---
title: "브라우저의 렌더링 과정"
description: "브라우저의 렌더링 과정"
date: 2022-08-11
update: 2022-08-11
tags:
  - web
  - webbrowser
series: "Web Architecture"
---

## Brower Rendering

### 1. 주소 입력

클라이언트측에서 URL을 통해 서버로 요청을 보낸다.

<img src="https://images.velog.io/images/bumsu0211/post/a9db8eaf-7c20-431d-872b-c8342c99ed41/Untitled%201.png" width="600" align="left" />

### 2. HTML 파일 다운로드

서버는 클라이언트가 요청한 URL에 따라 결과물을 만들어서 응답한다. 이때, 리턴값은 HTML 파일일 수도 있고, JSON일 수도 있고, 이미지 등의 파일일 수도 있다.

아래의 경우에는 HTML 파일을 반환하며, 브라우저가 가장 첫번째로 다운로드 받는 것이 HTML이다.

<img src="https://images.velog.io/images/bumsu0211/post/b2e69eaa-2f6d-4567-a1c9-d4c28a2a47f1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-09-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.42.31.png" width="900" />

### 3. CSS, JS 다운로드

HTML 파일을 파싱하는 과정에서 만나는 CSS, JS 등의 모듈들을 다운로드 한다.

<img src="https://images.velog.io/images/bumsu0211/post/23eea083-3978-4860-a7e8-3c6c435ae12f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-09-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.47.45.png" width="950" />

### 4. 네트워크 연결 제한 (HTTP 1.1)

브라우저마다 한번에 다운로드할 수 있는 모듈의 개수가 정해져 있다. 아래 표는 Max Connection per Domain으로 하나의 도메인으로부터 다운로드 받을 수 있는 모듈의 개수이다.

<img src="https://images.velog.io/images/bumsu0211/post/b0b9c1c2-99b5-4887-b3f7-d0ff9c17dadf/Untitled%202.png" width="300"  />

브라우저는 보통 한번에 6개의 모듈을 하나의 도메인으로부터 다운로드 받을 수 있다. 이는 HTTP 1.1에 해당하며 HTTP2는 제한 사항이 다르며 6개 이상도 동시 요청할 수 있다. 아래에 조금 더 상세히 설명한다.

여러 도메인으로부터 다운로드 받으면 6개 이상의 모듈을 동시에 다운로드 받을 수 있고, 몇백~몇천개의 모듈을 동시에 다운로드 받을 수 있어서 제한이 거의 없다고 봐도 된다. 따라서 동시 연결 제한을 우회하는 방법으로 여러 서브 도메인으로부터 모듈을 다운로드 받는 방법이 있다. (도메인 샤딩)

### 5. DOM Tree, CSSOM Tree 생성

HTML, CSS 파일을 다운로드한 뒤 구문 분석과정을 거쳐 DOM 트리와 CSSOM 트리를 만든다.

<img src="https://images.velog.io/images/bumsu0211/post/140a2a67-040d-4167-80ab-5dae6dfcf81e/Untitled%207.png" width="470" align="left"/>
<img src="https://images.velog.io/images/bumsu0211/post/c75189bb-3613-4dfa-be71-7404fb6ba480/Untitled%208.png" width="470" align="left" />

### 6. Render Tree 생성

DOM 트리와 CSSOM 트리를 기반으로 실제로 화면에 표시하는 객체들로 구성된 Render 트리를 만든다.

Render 트리의 각 노드는 DOM 객체에 스타일이 붙어있는 형태이며, display: none 스타일을 갖는 DOM 객체는 Render 트리에서 탈락한다.

<img src="https://images.velog.io/images/bumsu0211/post/0c3bd724-a2b3-45bc-bbdc-5a14b9fb9994/Untitled%209.png" width="900" />

### 7. Layout

Render 트리를 기반으로 DOM 객체의 위치를 잡는 레이아웃 과정을 진행한다. 브라우저 화면에서 어디에 위치하며, 크기는 얼마로 해야하는지 계산하는 단계이다

<img src="https://images.velog.io/images/bumsu0211/post/5a539af6-1d12-4b8d-b118-a98a4c789869/Untitled%2010.png" width="600" />

### 8. Paint

레이아웃 과정 후에 실제로 요소들을 그리는 과정

### 9. JS 실행

자바스크립트 파일도 다운로드 후 자바스크립트 엔진에 의해 실행된다. 반복되는 코드는 JIT 컴파일러에 의해 컴파일 된다. JIT 컴파일러의 동작과정은 아래 링크에서 확인할 수 있다.

자바스크립트까지 실행되면 비로소 개발자가 의도한 화면이 브라우저에 표시된다.

<br /><br />

> REFERENCE <br /> 벨로그 https://velog.io/@bumsu0211/

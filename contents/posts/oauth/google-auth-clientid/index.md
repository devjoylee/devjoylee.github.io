---
title: "Google OAuth Client ID 만들기"
description: "Google OAuth Client ID 만들기"
date: 2022-03-12
update: 2022-03-12
tags:
  - firebase
  - auth
series: "OAuth Service"
---

## 👨‍💼 Google 사용자 인증 정보 생성

외부 사이트에서 **구글 로그인**과 같은 구글 API를 사용하기 위해서는 사용자 인증 정보(OAuth 클라이언트 ID)를 발급받아야 한다. 발급 절차는 아래와 같다.

1. Google Cloud Platform에 접속하여 새 프로젝트를 생성한다. 👉 [Google Cloud 바로가기](https://console.cloud.google.com/)

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpqhCs%2FbtqEfqOwE4m%2FGkOTrLn4NbAfeiAjsxoGv0%2Fimg.png" />

2. 프로젝트 이름을 입력하고 만들기버튼을 클릭한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcOsekD%2FbtqEh7fFWxR%2FXsuWZeC0Lk7SKbyNH3109k%2Fimg.png" />

3. 상단 헤더에서 프로젝트를 선택한 후, **OAuth 동의 화면(Consent Screen)** 페이지로 이동한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnmxM8%2FbtqEgRxTvum%2FZCKCxA5unhivyyONHgkLOK%2Fimg.png" />

4. User Type을 **"외부(External)"**로 설정한 후 만들기 클릭.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeehnBK%2FbtqEeYLskR2%2FnNyZdt539SquPkYSOXnMuk%2Fimg.png" />

5. 앱이름과 이메일을 추가하고, 이 단계에서 사진 우측과 같은 OAuth 동의 화면을 커스텀 할 수 있다.

<img src="https://medipress.co.kr/wp-content/uploads/2020/12/05-google-developer-info-1.png" />

6. 사용자 인증 정보 (Credentials) 탭으로 이동한 후, **사용자 인증 정보 만들기 > OAuth 클라이언트 ID**를 차례로 클릭한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkK3SP%2FbtqEhPM33Ea%2FRx5N4x4eAjK2jQitCXmKQK%2Fimg.png" />

6. 애플리케이션 유형으로 "웹 애플리케이션" 선택하고, 애플리케이션 이름을 입력한다. 구글 로그인을 적용할 사이트의 주소를 승인된 자바스크립트 원본과 승인된 리다이렉션 URI에 입력한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb7aIi4%2FbtqEfYjVyGX%2FERXAsc5YeP7euAdO4ke7X0%2Fimg.png" />

6. 가장 아래 '생성' 버튼을 클릭하면, 클라이언트 ID와 비밀번호를 확인할 수 있다!

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdvMtfd%2FbtqEfYxtVps%2F98p6Wj9U72bZDKdaBcthG0%2Fimg.png" />

<br />
<br />

> REFERENCE<br /> 구글 로그인 Client ID와 Client Secret Key 설정방법 https://medipress.co.kr/archives/2147

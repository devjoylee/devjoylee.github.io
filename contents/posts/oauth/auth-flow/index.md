---
title: "OAuth 2.0 흐름 파악하기"
description: "OAuth 2.0 흐름 파악하기"
date: 2022-03-10
update: 2022-03-10
tags:
  - auth
series: "OAuth Service"
---

## ✔ 등록 (Register)

Resource Server에 새로운 Client를 등록합니다.

- Client ID : 애플리케이션 식별 ID (노출 가능)
- Client Secret : 식별 비밀번호 (노출 X)
- Authorized **Redirect URLs** : server로부터 데이터를 받을 주소

<img src='https://user-images.githubusercontent.com/68415905/164886171-79ae9fd7-b11d-4316-902c-69bd31dc4d0e.png' alt='auth' width='300px' />

## ✔ **Resource Owner의 승인**

Server의 데이터를 Client에서 사용하는 것에 동의하는 사용자의 권한 승인이 필요합니다.

1. Owner → Client : 특정 작업 요청
2. Client → Owner : Server요청을 위한 화면 전송 <br/><br/>

   > 서버 요청 버튼의 링크 (ex Google/Naver Login 버튼) <br/> _https//resource.server?client-id=1&scope=B,C&redirect-uri=http//~_

   - `client_id` : 요청을 보내는 클라이언트 ID

   - `scope` : server에 요청할 작업 목록(ex, username가져오기.. 등)

   - `redirect_uri` : 요청 완료 시 이동할 주소 (서버에 저장된 주소와 다르면 이동 x) <br/><br/>

3. Owner → Server : 버튼 클릭 시, 위 주소로 서버에 접속 요청
4. Server → Owner : 로그인 여부 확인 후, 로그인 창 전송

   <img src='https://user-images.githubusercontent.com/68415905/164886170-389cb7b0-9933-4cd1-ba1f-7c2e4cf76700.png' alt='auth' width='300px' />

5. Owner → Server : 로그인
6. Server → Owner :

   1). `client_id` **값이 있는지 확인**

   2). 요청받은 `redirect_uri` 값과 저장된 `redirect_uri`값이 같은지 확인 (다르면 종료)

   3). 1,2 가 일치하면 `scope`에 해당되는 권한을 client가 사용하는 것에 대한 동의창 전송

   <img src='https://user-images.githubusercontent.com/68415905/164886168-04fd1365-9074-4156-b4b0-1617612bb38f.png' alt='auth' width='300px' />

7. Owner → Server : 권한에 동의하면 Server에 `userId` 와 `scope`에 해당하는 데이터가 저장됨

   (`userId` 에 해당하는 Owner는 `scope` 데이터에 대한 권한을 동의하였음을 뜻합니다)

## ✔ Resource Server의 승인

Server에서 accessToken을 발급하기 전, Resource Owner가 요청한 Client 정보가 일치하는지 확인합니다.

1. **Server → Owner → Client** : authorization code 전송

   Client에 authorization code값이 저장됨 (`Location`: https//client/~~?code=3 )

   <img src='https://user-images.githubusercontent.com/68415905/164886167-7b1e1d0f-3767-4ddf-9617-dfed32b4e7ee.png' alt='auth' width='650px' />

2. Client → Server : Server에 직접 접속하여 전송. <br/><br/>

   > _https//resource.server/token?**grant-type**=authorization-code&**code**=3&**redirect-uri**=http//client/callback&**client-id**=1&**client-secret**=2_

   - `grant_type` : 3자 인증 방식 (authorization_code)

   - `code` : authorization_code 값

   - `redirect_uri` / `client_id` / `client_secret` : Client 정보

   <img src='https://user-images.githubusercontent.com/68415905/164886165-5295697f-928c-4125-9cd5-dda925e3eaa9.png' alt='auth' width='300px' />

3. Server : 요청 받은 authorization_code 에 해당하는 정보의

   `redirect_uri` `client_id` / `client_secret` 값이 일치 하는 지 확인

## ✔ Access Token 발급

1. Server에서 Client의 요청이 승인되면 저장된 authorization_code를 삭제합니다.
2. **Authentication Server**에서 Access Token을 발급한 후 Client에 전달합니다.

   → Client는 발급받은 Access Token으로 **Resource Server**에 데이터 요청을 할 수 있습니다.

  <img src='https://user-images.githubusercontent.com/68415905/164978655-fd212862-161c-4386-b05e-ec1c5714099e.JPG' alt='auth' width='400px' />

## ✔ API 호출 (데이터 가져오기)

Server로부터 API 데이터를 불러오는 방법은 2가지가 있습니다.

1. Access Token을 쿼리 파라미터로 전달하는 방법

> https//www.googleapis.com/calendar/v3/users/me/calendarList?access_token=<access_token>

2. Authentication : Bearer HTTP header로 전달하는 방법 (**preferred**)

> Authentication : Bearer <access_token> <br/> <br/>
> curl -H "Authorization: Bearer <access_token>" https//www.googleapis.com/calendar/v3/users/me/calendarList

## ✔ Refresh Token 발급

1. Access Token의 유효기간이 만료되면 Client는 **Authentication Server**로 Refresh Token 발급 요청을 합니다.
2. Server는 새로운 Access Token을 발급하여 Client에 전달합니다.

  <img src='https://user-images.githubusercontent.com/68415905/164982319-92220411-7f85-4147-a30b-b20a6f6a7417.JPG' alt='auth' width='800px' />

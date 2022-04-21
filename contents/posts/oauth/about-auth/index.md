---
title: "OAuth 2.0 의 개념 및 플로우"
description: "OAuth 2.0 의 개념 및 플로우"
date: 2022-03-03
update: 2022-03-03
tags:
  - auth
series: "OAuth Service"
---

## 🔎 OAuth 개념 알기

웹 사이트를 이용할 때 "네이버로 로그인" 같이 별도의 회원가입 없이 로그인을 제공하는 서비스를 이용해 본적이 있나요? 이때 해당 플랫폼의 아이디가 있다면 외부 서비스에서도 인증을 가능하게하고 그 서비스의 API를 사용할 수 있습니다. 이것을 OAuth라고 합니다.

<img src='https://user-images.githubusercontent.com/68415905/164481902-412a2c42-d633-4d4c-8f65-a1e893fe8b9d.png' alt='google-auth' width='400px' />

### OAuth 란?

> OAuth : 사용자가 애플리케이션에게 모든 권한을 넘기지 않고 사용자 대신 서비스를 이용할 수있게 해주는 HTTP 기반의 보안 프로토콜

OAuth 에서 Auth는 Authentication(인증) & Authorization(허가) 2가지 의미를 포함하고 있습니다. OAuth 실행에는 **‘서비스 제공자를 대신하여 제 3자가 어떤 정보를 사용하도록 접근을 허용하겠는가?’** 와 같은 사용자의 접근 권한 동의가 필요합니다. 이 물음에 동의하면, 서비스 제공자로부터 전달된 접근 권한을 제 3자(사용하고자 하는 서비스)가 갖게 됩니다.

이때, 권한을 넘겨주는 과정에서 보안사고가 발생하지 않도록 사용자의 정보는 있는 그대로가 아닌 식별 가능한 토큰으로 변환되어 전달됩니다.

- ❌ : A 서비스 ▶ (ID/PASSWORD) ▶ B 서비스
- ⭕ : A 서비스 ▶ (ID/PASSWORD ➡ 토큰) ▶ B 서비스

## 📰 OAuth 용어 정리

### Owner, Server, Client

1. **Resource Owner** : 정보의 소유권을 가진 사용자

2. **Provider** : OAuth를 사용하는 Open API를 제공하는 서비스 (ex. 구글, 네이버 등)

   - **Resource Server** : 사용자의 정보를 보관하고 있는 서버
   - **Authorization Server** : 사용자 인증 후 Client에 accessToken을 발행하는 서버

3. **Client** : 제 3의 서비스. 사용자 동의하에 Resource Server 에 사용자 정보를 요청 할 수 있습니다.

<!-- - Request Token : Consumer가 Service Provider에게 접근 권한을 인증받기 위해 사용하는 값 인증이 완료된 후에는 Access Token으로 교환한다.
- Access Toekn : 인증 후 Consumer가 Service Provider의 자원에 접근하기 위한 키를 포함한 값 -->

### Tokens

Token이란 Authorization Server로부터 발급된 랜덤한 문자열이며 2가지 종류가 있습니다.

1. **Access Token**

Client가 Resource Server에게 사용자 정보를 요청하기 위한 입장권 같은 것입니다.
입장권에는 유효기간이 있습니다. 각 provider 마다 다릅니다. 유효 기간이 지나면 더 이상 이 토큰을 사용 할 수 없습니다.

<!-- 2. Request Token : Consumer가 Service Provider에게 접근 권한을 인증받기 위해 사용하는 값 인증이 완료된 후에는 Access Token으로 교환한다. -->

2. **Refresh Token**

위 Access Token 이 유효기간이 만료 되면, 새로운 Access Token 을 발급 받기 위해 필요한 토큰입니다. 이 토큰에도 유효기간이 있습니다. 각 provider 마다 다릅니다. Access Token 보다는 유효기간이 훨씬 깁니다.

## 🔀 OAuth Flow

![oauth2-flow](https://user-images.githubusercontent.com/68415905/164474091-491fb63d-bfe0-4fb6-9c11-0af53a674032.png)

### Slack OAuth Flow

![slack_oauth](https://user-images.githubusercontent.com/68415905/164478649-346a7233-4b0c-46e2-a6c6-cf462ed600a8.png)

### Payco OAuth Flow

![oauth-payco](https://user-images.githubusercontent.com/68415905/164478162-6f935cd6-21b6-45e8-a317-076cc522d9dd.png)

### Kakao OAuth Flow

![kakao](https://user-images.githubusercontent.com/68415905/164478340-fac28ca7-9c17-43b6-a1db-b52a05b27354.png)

## 🤔 OAuth vs OAuth 2.0

- 기능의 단순화, 기능과 규모의 확장성 등을 지원하기 위해 만들어 졌다.
- 1.0은 만들어진 다음 표준이 된 반면 2.0은 처음부터 표준 프로세스
- https가 필수여서 간단해 졌다.(암호화는 https가 담당)
- 다양한 인증방식을 지원한다.
- api서버에서 인증서버를 분리 할 수 있도록 해 놓았다.

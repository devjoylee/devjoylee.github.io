---
title: "웹 통신 규약, HTTP와 HTTPS에 대해서"
description: "웹 통신 규약, HTTP와 HTTPS에 대해서"
date: 2025-02-13
update: 2025-02-13
tags:
  - web
  - webbrowser
series: "Web Architecture"
---

## 1. HTTP란?

HTTP란 Hypertext Transfer Protocol의 약자로 웹에서 클라이언트와 서버 간의 통신을 위해 정해진 규칙, **통신 규약**이다. 웹 페이지를 요청하거나, 서버로 데이터를 전송하는 등 인터넷 상의 거의 모든 작업이 HTTP를 통해 이루어진다. 크게 아래와 같은 특징이 있다.

- **Connectionless**: 요청과 응답이 완료되면 연결이 끊어진다.
- **Stateless**: 각 요청은 서로 독립적이며 이전 요청의 상태를 저장하지 않는다.
- **Flexibility**: 텍스트, 이미지, 비디오, JSON 등 다양한 데이터를 전송할 수 있다.

## 2. HTTP 통신의 동작 원리

HTTP는 *요청(Request)과 응답(Response) 메시지*를 주고받는 방식으로 동작한다. 클라이언트가 요청을 보내면 서버는 이를 처리한 뒤 응답을 반환한다. HTTP 메시지는 크게 두 부분으로 나뉜다.

1. **HTTP Header :** 메시지에 대한 메타 정보(프로토콜 버전, 인증 정보 등)를 포함한다.
2. **HTTP Body :** 실제 요청하거나 응답하는 데이터를 담고 있다. (HTML, JSON, 이미지 등)

### Request Message

클라이언트에서 서버로 특정 작업(CRUD)을 요청할 때 사용하는 메시지이다.

- 헤더 첫줄 정보 : `Method`(요청작업 명시) + `Path`(요청 자원의 위치) + `Protocol Version`

```bash
# Header
POST /api/login HTTP/1.1 # method path protocol
Host: www.example.com
Content-Type: application/json
Content-Length: 57

# Body
{
  "username": "kim123",
  "password": "mypassword123"
}
```

> ❗️ Request Method 종류 <br/> **`GET`** (데이터 조회), **`POST`** (데이터 전송), **`DELETE`** (데이터 삭제), **`PUT/PATCH`** (데이터 수정)

</aside>

### Response Message

서버에서 클라이언트의 요청에 대한 처리 결과를 반환할 때 사용하는 메시지이다.

- 헤더 첫줄 정보 : `Protocol Version` + `Status code`(처리 결과 코드) + `Status Message` (코드 설명)

```bash
# Header
HTTP/1.1 200 OK # protocol code message
Content-Type: text/html
Content-Length: 1234

# Body
<html>
  <body>Success!</body>
</html>
```

> ❗️ Response Status Code 종류 <br/> **`1xx`** (요청 처리중) **`2xx`** (요청 성공) **`3xx`** (리다이렉션) **`4xx`** (클라이언트 오류) **`5xx`** (서버 오류)

## 3. HTTPS란?

HTTPS는 HTTP에 Secure(보안) 기능이 추가된 프로토콜이다. HTTP는 데이터를 암호화하지 않기 때문에 중간에서 데이터가 탈취될 위험이 있는 반면, HTTPS는 데이터를 암호화하여 전송하여 신뢰성이 보장된다. 크게 아래와 같은 특징이 있다.

1. **SSL/TLS 암호화 :** HTTPS는 SSL(Secure Sockets Layer) 또는 TLS(Transport Layer Security) 프로토콜을 통해 데이터를 암호화함으로써 클라이언트와 서버 간의 데이터가 중간에서 탈취되거나 변조되는 것을 방지한다.
2. **인증 :** 클라이언트는 서버가 신뢰할 수 있는 기관에서 발급받은 인증서를 통해 서버의 신뢰성을 보장한다.
3. **데이터 무결성 :** 전송 중 데이터가 변조되지 않도록 보호한다.

### HTTP와의 차이점

| 특징          | HTTP               | HTTPS                                  |
| ------------- | ------------------ | -------------------------------------- |
| **보안**      | 데이터 암호화 없음 | SSL/TLS로 데이터 암호화                |
| **포트 번호** | 80                 | 443                                    |
| **속도**      | 빠름               | 암호화 과정으로 인해 약간 느림         |
| **인증서**    | 없음               | CA에서 발급받은 인증서 필요            |
| **사용 사례** | 일반적인 웹 페이지 | 금융, 로그인, 민감 데이터 전송 시 사용 |

## **4. HTTPS의 중요성**

- HTTPS는 로그인 정보, 결제 정보 등 민감한 데이터를 암호화하여 보호할 수 있다.
- HTTPS를 사용하는 웹사이트는 브라우저에서 "안전함"으로 표시되며, 사용자로부터 더 높은 신뢰를 얻을 수 있다.
- 검색 엔진 최적화(SEO)에 유리하다. 검색 엔진에서 HTTPS를 사용하는 웹사이트는 더 높은 순위로 평가된다.
- 최신 브라우저는 HTTPS를 기본으로 요구하며 HTTP만 사용하는 웹사이트는 경고 메시지가 표시될 수 있다.

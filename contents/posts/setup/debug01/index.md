---
title: "디버깅 환경 : Chrome DevTools로 에러 발생 원인 파악하기"
description: "디버깅 환경 : Chrome DevTools로 에러 발생 원인 파악하기"
date: 2024-06-26
update: 2024-06-26
tags:
  - frontend
  - development
series: "Dev Environment"
---

## 디버깅이란? (Debugging)

> 디버깅은 코드가 예상대로 동작하지 않을 때 오류가 나는 부분을 찾아 원인을 파악하고 해결하는 전체적인 과정을 뜻한다.

## 디버깅하는 방법

### `console.log()`

`console.log()`는 대표적인 디버깅 방법이다. console.log()로 코드의 동작을 확인하고 데이터 흐름을 추적할 수 있다.

```js
// 👇 console.log() 지옥
const example = async () => {
  try {
    console.log("작동 중")
    let header = new Headers({})
    let response = await fetch(url, { headers: header })
    console.log("response는 뭐지?", response)

    let data = await response.json()
    console.log("받는 데이터가 뭐지?", data)
  } catch (error) {
    console.log("에러 발생!", error.message)
  }
}
```

<br/>

하지만 무분별한 console.log()의 사용은 코드의 가독성을 떨어트리고 브라우저의 콘솔창에 그대로 노출되어 보안유지에 취약하다.

<img width="500" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/6dedf002-23f8-4114-864e-e3cc20686af3" style="margin-left: 0">

### Chrome DevTools

대부분의 브라우저는 강력한 디버깅 도구를 제공한다. 그 중에도 가장 보편적으로 쓰이는 것이 Chrome의 DevTools이다. <br/> 브라우저에서 `F12` (Windows) 또는 `Option + Command + J` (Mac) 키를 누르면 도구창이 열린다.

DevTools의 Network 탭을 이용하면 console.log를 사용하지 않아도 네트워크 요청과 응답 데이터를 자세히 확인할 수 있다. 이를 통해 어떤 데이터가 주고받는지, 요청이 성공했는지 또는 실패했는지를 쉽게 알 수 있다. 에러가 발생했을 때 Network 탭을 활용하면 요청의 상태 코드, 헤더, 페이로드, 응답 내용을 확인할 수 있어 문제의 원인을 보다 정확하게 분석하고 신속하게 해결할 수 있다.

## Devtools 네트워킹 분석 도구

### Network 탭 활용하기

1. 먼저 Network 탭으로 이동하고 페이지를 새로고침하면 브라우저가 내려받은 파일이 순서대로 출력된다. <br/>각 파일의 Status를 통해 정상 작동 여부(200)나 에러 발생 여부(404)를 확인할 수 있다.

2. 파일을 클릭하면 해당 파일이 가진 데이터를 자세히 살펴볼 수 있다.

3. 데이터를 확인하며 발생한 에러의 원인을 분석한다.

<img width="700" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/1af48878-d83d-47e7-9848-f1d15973b077" style="margin-left: 0">

### Network 탭 상세 설명

- Headers 탭 : 서버에 요청한 데이터의 Header 값 ex) URL, 상태 코드
  <img width="828" alt="Screenshot 2024-06-27 at 2 32 21 PM" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/dcb9d9d7-d148-43d6-bd6e-65f9bd6b2286" style="margin-left: 0">

- Payload : 서버에 요청한 쿼리 데이터 정보 확인
  <img width="745" alt="Screenshot 2024-06-27 at 2 33 17 PM" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/ce96e777-239a-432e-b250-ef2669123e4f" style="margin-left: 0">

- Preview / Response : 서버에서 반환한 데이터 정보. 에러가 있는 경우 에러메세지 반환
  <img width="750" alt="Screenshot 2024-06-27 at 2 33 42 PM" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/02c138d4-a758-4dfd-b408-d33ee31e4357" style="margin-left: 0">

  <img width="750" alt="Screenshot 2024-06-27 at 2 33 32 PM" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/9a4aaac5-2d05-481c-9c09-56a4be29770c" style="margin-left: 0">

<br />
<br />
<br />

> REFERENCE<br /> 브라우저 디버깅하는 방법 [2024] https://www.youtube.com/watch?v=C4poqiG8ulM

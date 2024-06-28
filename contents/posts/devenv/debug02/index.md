---
title: "디버깅 환경 : 디버거의 Breakpoint를 활용한 문제 해결"
description: "디버깅 환경 :디버거의  Breakpoint를 활용한 문제 해결"
date: 2024-06-27
update: 2024-06-27
tags:
  - frontend
  - development
series: "Dev Environment"
---

## Chrome DevTools 디버깅 도구

### Source 탭 활용하기

Chrome DevTools의 Network 탭이 데이터를 분석하고 오류의 원인을 찾기 위해 사용되었다면 Source 탭은 실제 코드를 확인하면서 디버깅하는 데 사용된다. 이때, breakpoint라는 기능을 사용하는데 이는 코드의 특정 지점에서 실행을 멈추고 상태를 점검할 수 있도록 도와준다. Breakpoint를 설정하고 활용하는 방법은 다음과 같다.

### Breakpoint 설정

1.  Source 탭 열기: Chrome DevTools의 상단 메뉴에서 Source 탭을 클릭한다.

2.  파일 선택: 좌측 파일 탐색기에서 디버깅할 자바스크립트 파일을 선택한다.

<img width="700" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/515eba12-cbe2-43b2-b3bf-346128bae645" style="margin-left: 0">

<br/>

3.  라인 번호 클릭: 디버깅하고 싶은 코드 라인의 번호를 클릭하면 파란색으로 표시되며 Breakpoint가 설정된다.

<img width="590" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/fe04fc21-7f0f-4097-bdab-eccdb89005ae" style="margin-left: 0">

### Breakpoint 활용

1. breakpoint가 설정된 상태에서 페이지를 새로고침하면 코드가 해당 라인에서 멈춘다.

2. 변수 확인: 하단의 Scope 섹션에서 breakpoint 기준으로 멈춘 시점의 모든 변수 상태를 확인할 수 있다.

- `header` 변수는 breakpoint 이전에 있으므로 데이터가 들어온 상태
- `response` 변수는 breakpoint로 실행이 멈춘 상태이므로 데이터 undefined.

- `data` 변수는 breakpoint 이후에 있으므로 실행전이라 데이터 undefined.

<img width="800" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/c6ec7d57-1b6f-4f5d-9c5d-9e6ade0461f0" style="margin-left: 0">

<br/>

3. 실행 제어: 컨트롤 바 <img width="150" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/81e02b97-1f11-4932-b627-89cb60cc74f0" style="display: inline; margin-bottom: -8px;">를 사용해 코드 실행을 제어할 수 있다.

4. breakpoint 삭제 : 라인 번호를 다시 클릭하면 breakpoint가 삭제된다. <br/> 삭제하지않고 잠시 꺼두고 싶은 경우에는 아래처럼 체크를 해제하면 일시적으로 비활성화를 해둘 수 있다.

<img width="438" alt="Screenshot 2024-06-28 at 11 53 28 AM" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/44508bb1-8c0d-49f0-bca2-e93ab280eef0" style="margin-left: 0">

### Control tool 종류

1. Continue <img width="30" alt="1" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/9c346029-88aa-404d-b0ec-e9a358d080e4" style="display: inline; margin-bottom: -8px;"> <br/> breakpoint에서 에러가 없을 경우 다음 breakpoint로 이동한다. 에러가 있으면 디버깅 모드를 멈추고 에러를 출력한다.

2. Step Over <img width="30" alt="2" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/10a45292-8c89-4a15-b174-c9b2c37bad36" style="display: inline; margin-bottom: -8px;"><br/> 현재 줄을 실행하고 다음 줄로 넘어간다. 함수를 만나면 실행만 하고 함수 내부 탐색없이 다음 줄로 이동한다. <br/> 함수의 동작을 전체적으로 보고 싶지만 함수 내부를 자세히 조사할 필요가 없을 때 사용한다.

```js
function main() {
  // breakpoint
  let result = math(5, 3) // step 1
  console.log("결과는" + result) // step 2
}

function math(a, b) {
  console.log(a + b)
  console.log(a - b)
  console.log(a / b)
}
```

3. Step Into (함수 내부) <img width="30" alt="3" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/f06b2cbf-ba3d-49da-bcbd-c3ece979d0e7" style="display: inline; margin-bottom: -8px;"> <br/> 현재 줄을 실행하고 다음 줄로 넘어간다. 함수를 만나면 함수 내부로 들어가서 해당 함수의 첫번째 줄에서 멈춘다. <br/> 함수의 내부 동작을 자세히 조사하고 싶을 때 사용한다.

```js
function main() {
  // breakpoint
  let result = math(5, 3) // step 1
  console.log("결과는" + result) // step 5
}

function math(a, b) {
  console.log(a + b) // step 2
  console.log(a - b) // step 3
  console.log(a / b) // step 4
}
```

4. Step Out (함수 밖으로) <img width="30" alt="4" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/74155ea7-0157-406f-a01d-7df6c8cfd1a3" style="display: inline; margin-bottom: -8px;"><br/>현재 디버깅 중인 함수의 나머지 코드를 한꺼번에 실행하고 함수를 빠져나온다. <br/>현재 함수에서 나와 함수 호출 지점으로 돌아가고 싶을 때 사용한다.

5. Step (다시 시작) <img width="30" alt="5" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/efc4399f-fcaf-45af-8d71-20a9c029f32f" style="display: inline; margin-bottom: -8px;"><br/> 실행을 중단한 후 다시 실행을 시작한다. 다음 breakpoint나 예외가 발생할 때까지 코드를 계속 실행한다.

### Breakpoint 조건 추가

1. 라인 번호를 우클릭하고 Add conditional breakpoint를 선택한다.

2. Breakpoint가 활성화될 조건을 입력한다. 예를 들어, `i === 5`와 같이 특정 조건에서만 멈추도록 설정할 수 있다.

<br />
<br />
<br />

> REFERENCE<br /> 아직도 console.log써서 디버깅 한다고? | 브라우저 디버깅하는 법 https://www.youtube.com/watch?v=C4poqiG8ulM

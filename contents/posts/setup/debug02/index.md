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

Chrome DevTools의 Network 탭이 데이터를 분석하고 오류의 원인을 찾기 위해 사용되었다면 Source 탭은 실제 코드를 확인하면서 디버깅하는 데 사용된다. 이때, breakpoint라는 기능을 사용하는데 이는 코드의 특정 지점에서 실행을 멈추고 상태를 점검할 수 있도록 도와준다.

Breakpoint를 설정하고 활용하는 방법은 다음과 같다.

### Breakpoint 설정하기

1.  Source 탭 열기: Chrome DevTools를 열고 상단 메뉴에서 Source 탭을 클릭합니다.
2.  파일 선택: 좌측 파일 탐색기에서 디버깅할 자바스크립트 파일을 선택합니다.
3.  라인 번호 클릭: 디버깅하고 싶은 코드 라인의 번호를 클릭하면 파란색으로 표시되며 Breakpoint가 설정됩니다.

### Breakpoint 활용하기

- 페이지 새로고침: Breakpoint가 설정된 상태에서 페이지를 새로고침하면 코드가 해당 라인에서 멈춥니다.
- 변수 확인: DevTools 하단의 Scope 섹션에서 현재 스코프의 변수 상태를 확인할 수 있습니다.
- 실행 제어: 상단의 컨트롤 바를 사용해 코드 실행을 제어할 수 있습니다.

- Resume (재개): 코드를 계속 실행합니다.
- Step Over (다음 줄): 다음 줄로 이동합니다.
- Step Into (함수 내부): 함수 내부로 들어갑니다.
- Step Out (함수 밖으로): 함수 실행을 완료하고 함수 밖으로 나옵니다.

### Breakpoint 제거하기

- 라인 번호 클릭: 다시 라인 번호를 클릭하면 Breakpoint가 제거됩니다.

### Conditional Breakpoint 설정하기

- 라인 번호 우클릭: 라인 번호를 우클릭하고 Add conditional breakpoint를 선택합니다.
- 조건 입력: Breakpoint가 활성화될 조건을 입력합니다. 예를 들어, i === 5와 같이 특정 조건에서만 멈추도록 설정할 수 있습니다.

이 과정을 통해 코드의 흐름을 쉽게 파악하고, 예상치 못한 버그를 효과적으로 해결할 수 있습니다. Chrome DevTools의 Breakpoint 기능을 활용하면 디버깅이 한층 수월해질 것입니다.

################

5. **Breakpoint 설정**

   - 문제가 발생하는 부분의 코드 줄 번호에 마우스를 가져가면, 줄 번호 옆에 클릭하여 breakpoint를 설정할 수 있습니다. 이는 코드 실행이 해당 지점에서 멈추게 만들어줍니다.

6. **디버깅**
   - breakpoint가 설정된 후 페이지를 새로고침하면, 코드 실행이 breakpoint에서 멈추고 DevTools의 상단 메뉴에서 변수 상태, 콘솔 로그 등을 확인할 수 있습니다. 이를 통해 문제의 원인을 식별하고 해결할 수 있습니다.

### 마무리

Chrome DevTools의 Source 탭과 breakpoint 설정을 통해 에러를 더 빠르고 효과적으로 해결할 수 있습니다. 이 기능을 활용하여 개발 과정에서 발생하는 다양한 문제를 해결하는 데 도움이 되길 바랍니다.

Happy debugging!

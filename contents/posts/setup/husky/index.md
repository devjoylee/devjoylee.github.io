---
title: "협업을 위한 프로젝트 설정 - husky + lint-staged"
description: "협업을 위한 프로젝트 설정 - husky + lint-staged"
date: 2024-06-21
update: 2024-06-21
tags:
  - frontend
  - development
series: "Dev Environment"
---

## 1. lint-staged : 에러 판독기

> git에서 staged된 상태 파일들에 한해 lint를 실행하여 커밋 전에 코드 스타일을 검사하고 수정하는 도구

협업 환경에서는 모든 개발자가 일관된 코드 품질을 유지하는 것이 중요하다. 하지만 개발 환경이 모두 다르기때문에 코드 스타일 규칙이 지켜지지 않는 경우가 종종 발생한다. 이러한 문제를 해결하기 위해 lint-staged와 husky를 함께 사용하여 프로젝트에 자동화된 linting 프로세스를 설정할 수 있다.

### 설치 및 설정

1. lint-staged 를 설치한다.

```bash
npm i -D lint-staged
```

2. package.json에 아래와 같이 lint-staged 설정을 추가한다.<br/>
   (src 디렉토리 내의 js 및 ts 파일에 대해 eslint와 prettier를 순차적으로 실행하여 코드 포맷팅 및 스타일 검사를 수행)

```json

  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix --max-warnings=0", // warn, error가 둘다 없을때만 통과
      // "eslint --fix",  // error가 없으면 통과 (warn은 패스)
      "prettier --write"
    ]
  }
```

3. 아래 명령어로 lint-staged를 실행한다. (staged 상태인 파일만 검사)

```bash
npx lint-staged
```

<br/>

## 2. husky : pre-commit 실행도구

husky는 git hook을 관리하고 설정하는 도구로 코드가 커밋되기 전에 필요한 작업을 자동으로 실행한다 (pre-commit). <br/> 즉, husky를 사용하여 커밋 할 때마다 자동으로 lint-staged를 실행시켜 코드를 검사할 수 있다. <br/>

### 설치 및 설정

1. husky를 설치한다.

```bash
# husky 초기화 (.husky 폴더 생성)
npx husky-init && npm install

# husky - Git hooks install
npx husky install
```

</br>

2. package.json에 아래 명령어가 추가된 것을 확인한다.

```json
"scripts": {
    "prepare": "husky install"
},
```

</br>

3. `.husky > pre-commit` 파일을 아래 내용처럼 작성한다.

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### 작동 방식

1. staged 상태의 코드를 커밋한다.
2. Husky가 pre-commit 훅을 실행시킨다.
3. pre-commit에 저장된 lint-staged 명령어가 실행된다
4. lint-staged가 실행되어 스테이지 상태의 파일들에 대해 eslint와 prettier 검사를 수행한다.
5. 에러 혹은 경고가 발견되면 커밋이 취소되고 오류 메시지가 출력된다.

<br/>
<br/>

> REFERENCE<br /> How to Install Commitlint & Husky [2024] https://medium.com/@abpeter14/how-to-install-commitlint-husky-2024-f1157f14006f

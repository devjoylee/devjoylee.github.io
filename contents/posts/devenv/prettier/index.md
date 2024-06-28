---
title: "협업을 위한 프로젝트 설정 - Prettier"
description: "협업을 위한 프로젝트 설정 - Prettier"
date: 2024-05-12
update: 2024-05-12
tags:
  - frontend
  - development
series: "Dev Environment"
---

## prettier

Prettier는 코드를 정해진 스타일로 교정해주는 도구이다. 주로 ESLint와 함께 사용되며 ESLint를 통해 에러를 최소화하여 코드 품질을 높이고 prettier를 통해 코드 스타일을 자동 포맷팅하여 코드의 가독성과 일관성을 높인다.

### prettier 설치

```bash
npm i prettier --save-dev
```

### prettier config 추가

`.prettierrc` 파일을 생성하고 다음과 같은 규칙을 추가한다. (관련 문서 : https://prettier.io/docs/en/options.html)

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "printWidth": 80,
  "endOfLine": "auto"
}
```

### ESLint와 Prettier의 차이점

- **ESLint**: 주로 코드 품질을 개선하고 오류를 방지하기 위해 사용된다. 문법 오류, 잠재적 버그, 스타일 등을 검사하여 알려준다.
- **Prettier**: 코드 스타일과 관련된 들여쓰기, 공백, 따옴표 사용 등을 규칙에 맞게 자동으로 수정해준다.

### ESLint 충돌 방지 설정하기

ESLint와 prettier의 설정 중에는 스타일과 관련된 비슷한 규칙이 있어서 종종 두가지 규칙이 충돌하는 일이 생긴다.<br/> 이를 방지하기 위해 아래와 같은 플러그인을 추가해서 충돌을 막아준다.

1. `eslint-config-prettier`: prettier를 ESLint plugin에 추가. prettier가 인식한 에러를 ESLint 에러로 출력시켜준다.
2. `eslint-plugin-prettier`: ESLint rule 중에서 prettier와 충돌하는 부분을 비활성화할 수 있다.

<br/>

- 플러그인 설치하기

```bash
npm i -D eslint-config-prettier eslint-plugin-prettier @types/eslint-config-prettier
```

- `eslint.config.js`에 prettier 설정 추가하기 (주의! prettier 규칙은 eslint 규칙 마지막부분에 작성한다)

```js
import prettierConfig from "eslint-config-prettier"
import pluginPrettier from "eslint-plugin-prettier"

export default [
  // ...
  {
    plugins: {
      prettier: pluginPrettier, // 'prettier' 플러그인 추가
    },
  },
  {
    rules: {
      // ...
      // 가장 아래에 작성
      ...prettierConfig.rules, // prettier와 eslint 규칙 병합
      "prettier/prettier": "error", // prettier 규칙에 어긋나면 eslint 에러발생
    },
  },
]
```

### VSCode formatter 설정

1. VSCode Extension에서 'Prettier - Code formatter' 플러그인 설치
2. VSCode setting → Defalut Formatter 검색 → 'Prettier - Code formatter' 선택

<img width="800" alt="Screenshot 2024-06-21 at 6 03 03 PM" src="https://github.com/devjoylee/devjoylee.github.io/assets/68415905/b3bb3d93-d6eb-4f41-9aa0-15e522a24c7e">

3. VSCode setting → `formatOnSave` 검색 후 체크 <br/>(formatOnSave 를 설정해두면 파일을 저장할 때마다 prettier 포맷이 실행되어 코드 가독성을 올려준다.)

<img width="800" alt="" src="https://github.com/devjoylee/devjoylee.github.io/assets/68415905/b9cf8e4b-5358-4973-9c21-6d2f6e9ba7ff">

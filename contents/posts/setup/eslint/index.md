---
title: "협업을 위한 프로젝트 설정 - ESLint"
description: "협업을 위한 프로젝트 설정 - ESLint"
date: 2024-06-10
update: 2024-06-10
tags:
  - frontend
  - development
series: "Dev Environment"
---

## ESLint

ESLint는 JavaScript/Typescript 코드에서 문법 오류를 검사하고 코드 최적화를 도와주는 도구이다. <br/> ESLint를 사용하면 코드 품질을 높이고 일관된 코드를 작성할 수 있어 협업 환경에서 주로 사용된다.

> Lint란? 소스코드를 분석하여 문법적인 오류나 스타일적인 오류, 적절하지 않은 구조 등에 표시를 달아주는 행위.

### ESLint 사용 예시

```jsx
// 예시 1: 일관된 코드 스타일 유지 (따옴표, 들여쓰기, 세미콜론 등)
const obj = {
  firstname: "Joy", // single 따옴표가 아니면 에러
  lastname: 'Lee'
}

// 예시 2: 문법 오류 감지
const x = 10
x = 5 // const 변수는 재할당 불가능 (Error)

// 예시 3: 사용하지 않는 변수 경고
function add(a, b) {
  const result = a + b // result 변수가 사용되지 않음 (warning)
  return a + b
}

// 예시 4: 코드 최적화
if (isAvailable === true) {..} // ❌
if (isAvailable) {..} // ⭕️

// 예시 5: React prop-types 검사
// prop의 name 타입 명시하지 않음 (warning)
export const MyComponent = ({ name }) => {
  return <div>Hello, {name}</div>
}
```

### ESLint 설치 및 실행

- 설치하기

```bash
npm init @eslint/config
```

- 실행하기 : package.json 파일의 scripts란에 아래 명령어를 추가한 후, 터미널에서 `npm run lint` 로 실행시킨다.

```bash
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  },
```

### ESLint config 파일

ESLint 관련 규칙은 config 파일을 사용하여 자유롭게 설정할 수 있다. <br/> ESLint ver7 까지는 config 파일로 `.eslintrc` 를 사용했으나 ver.8부터는 `eslint.config.js` 파일에서 config를 작성한다.<br/> (참고 : https://github.com/jsx-eslint/eslint-plugin-react#configuration)

```jsx
// eslint.config.mjs
import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"

export default [
  // 모든 JavaScript, TypeScript 및 JSX/TSX 파일에 대해 설정 적용
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        // JSX 구문 분석을 위한 파서 옵션 설정
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser, // 브라우저 전역 변수 추가
    },
  },

  pluginJs.configs.recommended, // ESLint 기본 규칙 적용
  ...tseslint.configs.recommended, // TypeScript 관련 규칙 적용
  ...fixupConfigRules(pluginReactConfig), // React 관련 규칙 적용

  {
    settings: {
      react: { version: "detect" }, // React 버전을 자동으로 감지
    },
  },
  {
    // 추가 규칙 설정 (custom 가능)
    rules: {
      "no-console": "warn", // console.log 사용 경고
      semi: ["error", "always"], // 세미콜론 필수
      quotes: ["error", "single"], // 작은따옴표 사용
      indent: ["error", 2], // 들여쓰기 2칸
      "no-unused-vars": "warn", // 사용하지 않는 변수 경고
      "react/prop-types": "off", // React prop-types 사용 안함
      "@typescript-eslint/no-unused-vars": ["warn"], // TypeScript 사용하지 않는 변수 경고
    },
  },
]
```

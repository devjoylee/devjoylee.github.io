---
title: "견적서 게시판 (필터링 기능)"
description: "견적 요청서 게시판 제작"
date: 2022-02-10
update: 2022-02-10
tags:
  - wanted
  - typescript
  - react
  - heroku
series: "원티드 프리온보딩"
---

## ☝ 프로젝트 시작하기 전

이번 프로젝트부터는 javascript가 아닌 typescript를 사용하기로 했다. 타입스크립트가 적용된 CRA를 내려받고 절대경로(ex `components/Filter`) 설정도 해두었다.

`npx create-react-app [project-name] --template typescript`

- 타입스크립트 절대경로 설정 (**tsconfig.json**)

```json
{
  "compilerOptions": {
    // etc..
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

## 📌 프로젝트 링크

[Github](https://github.com/devjoylee/estimate-board)
[배포링크](https://estimate-board-page.herokuapp.com/)

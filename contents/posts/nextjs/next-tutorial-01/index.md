---
title: "NextJS 작동 원리와 파일 구조"
description: "NextJS 작동 원리와 파일 구조"
date: 2022-11-05
update: 2022-11-05
tags:
  - nextjs
series: "NextJS"
---

## 🧐 NextJS란?

> NextJS : React에서 서버 사이드 렌더링을 간편하게 해주는 프레임워크

### 작동 원리

1. Next.js는, 기본적으로 서버측에서 React코드를 실행한다.
2. React.js를 서버측에서 pre-rendering하여 html을 생성하고, 브라우저로 보내준다.
3. 그 후, 브라우저에서 React를 사용해 웹페이지를 완성한다. ➡ 결과 : 속도가 빠르고 SEO에 유리하다

### 주요 기능

- 직관적인 페이지 기반 라우팅 시스템( 동적 경로 지원 포함 )
- 사전 렌더링, 정적 생성(SSG) 및 서버 측 렌더링(SSR) 모두 페이지 단위로 지원된다.
- 자동 코드 분할! ( 빠른 로딩 )
- 최적화된 프리페치를 통한 클라이언트 측 라우팅
- 내장 CSS 및 Sass 지원 및 모든 CSS-in-JS 라이브러리 지원
- Fast Refresh를 지원한다. ( 빠른 리프레쉬 )
- Serverless Functions로 API 엔드포인트를 빌드하기 위한 API 경로

## 🔎 React와 NextJs의 차이점

### 1. library vs framework

- React (library) : 필요할 때 불러와서 사용. 라우팅, 폴더 구조 등을 사용자가 직접 정해서 사용한다.

- NextJS (framework) : 정해진 규칙에 맞춰 코드를 작성하면 앱이 실행됨. 라우팅, 폴더 구조를 커스텀할 수 없다.

### 2. CSR vs SSR

- React (CSR) : 브라우저가 javascript 파일에서 UI를 모두 다운받은 후 페이지가 출력된다.

- NextJS (SSR) : 페이지가 먼저 렌더링된 후 (pre-rendering) API 등 필요한 javascript는 나중에 가져온다

## 📚 File Structure

```js
public  // 어플리케이션에 사용되는 정적 파일들
└── assets
     ├── images
     └── icons

pages   // 페이지 라우팅 (파일/폴더명으로 url 결정)
  ├── api
  ├── product
  │     └── [id].tsx
  ├── _app.tsx
  ├── _document.tsx
  └── index.tsx

src     // 그 외 필요한 sources 모음
  ├── components
  │   ├── common
  │   └── layout
  ├── styles
  │   └── globals.css
  ├── hooks
  ├── types
  └── utils
```

### \_app.tsx

- NextJS 실행 시 가장 먼저 실행되는 파일
- 모든 페이지에서 쓰는 스타일, 레이아웃을 적용시키는 곳 (ex global.css)
- google analytics , 검색엔진, 스크립트 분석 등에 사용

```js
import type { AppProps } from "next/app"
import { AppLayout } from "@components"
import "@styles/globals.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
```

### \_document.tsx

- \_app.js 다음으로 실행되는 파일
- index.html 파일과 같은 역할 (`<meta>` 태그 & `<link>` 태그 추가)
- html, body와 같은 기본 태그들의 속성을 지정하여 어플리케이션의 구조를 만들어 주는 파일

```js
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### pages

React에서는 react-router-dom을 설치하고 라우터를 직접 만들어야하지만 NextJS는 그렇지 않다.
<br/> pages폴더 안에 파일이나 폴더를 만들면 라우팅 설정이 자동으로 이루어진다.

- index.tsx 파일 : 메인 페이지 (localhost:3000)
- 파일/폴더명 = URL 주소 ➡ 파일/폴더명에 해당하는 주소로 페이지가 라우팅된다.
- 컴포넌트의 이름은 중요하지 않으나 반드시 `export default` 로 컴포넌트 작성 ❗❗.

```js
pages
  ├── about
  │     ├── index.tsx        // localhost:3000/about
  │     └── new.tsx          // localhost:3000/about/new
  ├── product
  │     └── [id]
  │          ├── index.tsx   // localhost:3000/product/25
  │          └── edit.tsx    // localhost:3000/product/25/edit
  └── index.tsx              // localhost:3000
```

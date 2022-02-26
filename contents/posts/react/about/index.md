---
title: "[React] 리액트의 개념과 특징"
description: "[React] 리액트의 개념과 특징"
date: 2021-12-20
update: 2021-12-20
tags:
  - frontend
  - react
series: "React.js"
---

## 🧐 React란?

React는 페이스북에서 개발한 Javascript 기반의 라이브러리로써 사용자와의 인터렉션을 UI로 쉽게 구현할 수 있도록 만들어 졌습니다.

![다운로드](https://user-images.githubusercontent.com/68415905/154801618-9bf1d698-3467-4f54-9df4-ebafce5b1e38.png)

## ✨ React의 필요성

사용자 요청에 의한 UI 변화가 거의 없는 정적인 페이지는 React 라이브러리를 사용하지 않고도 개발이 가능합니다. 하지만 웹 애플리케이션이라 불릴 만큼 규모가 크고 UI 변화가 잦은 동적인 페이지라면 상태 변화 관리를 최소화 하고 DOM의 직접적인 업데이트를 막아주는 React 혹은 다른 프레임워크를 사용하는 것이 바람직합니다.

## 🧾 React의 특징

### 1. 단방향 데이터플로우

React는 데이터가 한방향으로만 이동하는 **단방향 데이터플로우**를 가집니다. 데이터가 UI로 이동하고 데이터가 변하면 UI도 함께 업데이트 되지만 반대로 UI쪽에서 데이터를 변화시키는 것은 불가능합니다. 단방향 데이터플로우를 사용하면 데이터 흐름이 간단해서 추적이 쉽고 예측이 가능해 유지보수가 편리하다는 장점이 있습니다.

> ↔ 양방향 데이터 플로우 : 앵귤러(Angular.js) / 뷰(Vue.js)

### 2. 가상돔(Virtual DOM)

Virtual DOM이란 가상의 Document Object Model을 말합니다. 기존에는 javascript에서 DOM에 직접 접근하여 변화를 주는 방식을 사용하였는데 이경우 HTML,CSS,JS파일이 다시 리렌더링 되어 브라우저 내부에서 성능이슈가 발생했습니다.

React는 이런 단점을 보완하기 위해 Virtual DOM 이라는 것을 따로 만들었고 실제 DOM과 가상의 DOM을 비교하여 변화된 부분만 빠르게 업데이트 하는 방식을 사용하고 있습니다.

**🔀 Virtual DOM 렌더링 순서**

> JSX 수정 ➡ 가상 DOM 업데이트 ➡ 가상 DOM이 업데이트 되기 전과 비교하여 어떤 요소가 변경되었는지 확인 ➡ 가상 DOM에서 변경된 요소만 실제 DOM에서 업데이트

### 3. Component 구조

컴포넌트란 UI를 구성하는 개별 단위입니다. UI가 레고라면 컴포넌트는 하나의 블럭으로써 블럭을 쌓아 레고를 완성시키는 것처럼 컴포넌트를 조합하여 하나의 UI(페이지)를 만들 수 있습니다. 컴포넌트는 재사용이 가능하여 코드의 중복을 줄일 수 있고 효율적으로 유지보수를 할 수 있습니다.

```js
const MainPage = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <Section title="about" />
        <Section title="portfolio" />
      </MainContent>
      <Footer />
    </Container>
  )
}
```

### 4. JSX 문법

JSX(Javascript + xml)는 Javascript에 대한 확장 구문으로서, Javascript를 좀더 편리하게 사용할 수 있도록 하는 Syntax Sugar 역할을 합니다. 이는 함수를 호출하거나 객체를 만들때 문법적인 편의를 제공하며 특히 DOM 요소를 만들 떄 `React.createElement()` 호출을 반복해야 하는 불편을 줄여줍니다. JSX는 React 엘리먼트를 생성하면서 자바스크립트의 모든 기능을 쓸 수 있도록 도와줍니다.

JSX로 작성된 코드는 렌더링 시 Babel에 의해 자동으로 Javascript 코드로 컴파일됩니다.

```jsx
// jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

```jsx
// javascript
React.createElement(
  MyButton,
  { color: "blue", shadowSize: 2 },
  "Click Me"
  //
)
```

<br />

> REFERENCE<br/>React란 무엇인가 https://firework-ham.tistory.com/5<br/>React란? https://velog.io/@jini_eun/React-React.js%EB%9E%80-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC

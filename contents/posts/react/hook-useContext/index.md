---
title: "[React] React Hook - useContext"
description: "[React] React Hook - useContext"
date: 2022-01-11
update: 2022-01-11
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useContext 정의

**Context API** : 전역적으로 사용되는 state나 데이터를 필요한 컴포넌트에 전달하는 방법

- Context를 사용하면 컴포넌트를 재사용하기 어려워 질 수 있다.
- **Prop drilling**을 피하기 위한 목적이라면 Component Composition (컴포넌트 합성)을 먼저 고려해볼 것! <br/>\*\*_Prop drilling_ : 컴포넌트가 필요한 데이터를 여러 컴포넌트를 거쳐 전달받는 과정

![Untitled](https://user-images.githubusercontent.com/68415905/155961762-07444598-b37f-4a31-991b-7cf610056aa4.png)

## 🌱 Context 사용 전

부모 App 컴포넌트에서 전역적으로 생성한 state를 자식 컴포넌트인 Header에서 사용하고자 합니다. state값은 App → Page → Header 순서로 전달됩니다. 중간에 있는 Page 컴포넌트는 state를 전달하는 매개체일 뿐, state 값을 사용하지는 않습니다.

```jsx
// App.js
function App() {
  const [isDark, setIsDark] = useState(false)
  return <Page isDark={isDark} setIsDark={setIsDark} />
}
```

```jsx
// Page.js
function Page({ isDark, setIsDark }) {
  return (
    <div>
      <Header isDark={isDark} />
      <Content isDark={isDark} />
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}
```

```jsx
// Header.js
function Header({ isDark }) {
  return (
    <header
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    ></header>
  )
}
```

## 🍀 Context 생성

`context` 폴더를 만들고 js 파일을 생성한 후 context 코드를 작성합니다.

```jsx
// ThemeContext.js
import { createContext } from "react"

export const ThemeContext = createContext(null)
```

## 🌿 Context 전달

생성한 Context는 데이터를 가진 부모컴포넌트에 import 시킨 후 `Provider`로 컴포넌트를 감싸줍니다. 그리고 `value`라는 prop에 전달하고자 하는 데이터를 집어넣어 줍니다.

`Provider` 가 감싸는 모든 하위 컴포넌트는 `value`로 전달한 데이터에 접근이 가능합니다. <br/>(불필요한 props 전달 ❌)

```jsx
// App.js
import React, { useState } from "react"
import Page from "./components/Page"
import { ThemeContext } from "./context/ThemeContext"

function App() {
  const [isDark, setIsDark] = useState(false)
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Page />
    </ThemeContext.Provider>
  )
}

export default App
```

```jsx
// Page.js
function Page() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
```

## 🌳 Context 사용

부모 컴포넌트에서 Context 로 state값을 전달하면 자식 컴포넌트에서 `useContext`를 사용해 데이터를 가져옵니다.

```jsx
// Header.js
function Header() {
  const { isDark } = useContext(ThemeContext) // Context 불러오기
  return (
    <header
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    ></header>
  )
}
```

```jsx
// Footer.js
import React, { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function Footer() {
  const { isDark, setIsDark } = useContext(ThemeContext) // Context 불러오기
  const toggleTheme = () => setIsDark(!isDark)
  return (
    <footer
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
      }}
    >
      <button onClick={toggleTheme}>Dark Mode</button>
    </footer>
  )
}
```

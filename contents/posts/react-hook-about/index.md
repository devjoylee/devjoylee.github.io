---
title: "[React] React Hook이란?"
description: "[React] React Hook이란?"
date: 2021-12-22
update: 2021-12-22
tags:
  - frontend
  - react
series: "React.js"
---

## 🌟 Hook의 등장 배경

리액트 컴포넌트 종류 : **Class Component** / **Functional Component**

Hook이 등장하기 전 리액트에는 여러 문제들이 있었습니다. Class Component는 Functional Component에 비해 문법이 어렵고 로직의 재사용이 힘든 단점이 있으나 Functional Component로는 할 수 없었던 state관리나 Life Cycle Method가 가능하다는 이유로 어쩔 수 없이 Class Component를 사용해왔습니다.

Hook이 등장하기 전의 리액트는

- 컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어려웠습니다.

- 생명주기 컴포넌트로 인한 복잡한 컴포넌트는 이해하기 어려웠습니다. 상태관련 로직이 모두 같은 공간에 위치하기 때문입니다.

## 🧐 Hook 이란?

Hook은 리액트 16.8 버전 이후 함수형 컴포넌트에 추가된 기능입니다. 즉, React Hook은 함수형 컴포넌트가 클래스형 컴포넌트의 기능을 사용할 수 있도록 해주는 기능이며 Hook이 등장하면서 더 이상 상태를 관리하기 위해 Class Component를 쓸 필요가 없어졌습니다.

기존에는 Class Component 에서만 상태를 관리 할 수 있었고, 함수형 컴포넌트에서는 상태를 관리할 수 없었습니다. 하지만 Hook이 등장하면서 함수형 컴포넌트 에서도 상태 관리를 할 수 있게 되었고, 상태 관리 뿐만 아니라 기존 클래스형 컴포넌트에서만 가능하던 여러 기능을 사용할 수 있게 되었습니다.

👉 [React Hook 공식문서 바로가기](https://reactjs.org/docs/hooks-intro.html)

## 🧾 Hook의 종류

### useState

가장 대표적인 Hook으로 상태값을 생성 및 업데이트시켜주는 Hook입니다.

👉 [useState 더 알아보기](https://devjoylee.github.io/react-hook-useState)

### useEffect

컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정하는 Hook입니다.

👉 [useEffect 더 알아보기](https://devjoylee.github.io/react-hook-useEffect)

### useReducer

useState처럼 상태관리에 쓰이며 구조가 복잡한 상태관리에 적합한 Hook입니다.

👉 [useReducer 더 알아보기](https://devjoylee.github.io/react-hook-useReducer)

### useRef

렌더링과 관련없는 값을 관리하거나 DOM에 접근이 필요한 경우 사용하는 Hook입니다.

👉 [useRef 더 알아보기](https://devjoylee.github.io/react-hook-useRef)

### useMemo

렌더링 시 메모리에 값을 저장해두고 필요할 때 불러와서 사용할 수 있도록 하는 Hook입니다.

👉 [useMemo 더 알아보기](https://devjoylee.github.io/react-hook-useMemo)

### useCallback

useMemo와 비슷하나 값이 아닌 함수를 재사용하고자 할 때 사용하는 Hook입니다.

👉 [useCallback 더 알아보기](https://devjoylee.github.io/react-hook-useCallback)

### useContext

전역적으로 사용되는 state나 데이터를 필요한 컴포넌트에 전달하는 Hook입니다.

👉 [useContext 더 알아보기](https://devjoylee.github.io/react-hook-useContext)

<br />

> REFERENCE<br /> React(23) 리액트 훅이란? https://devbirdfeet.tistory.com/52<br />리액트 공식 문서 https://reactjs.org/docs/hooks-intro.html<br/>[React] Hooks의 종류 https://lelana.tistory.com/146

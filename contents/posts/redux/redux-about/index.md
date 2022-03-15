---
title: "Redux - 상태 관리 라이브러리"
description: "Redux - 상태 관리 라이브러리"
date: 2022-02-20
update: 2022-02-20
tags:
  - react
  - redux
series: "Redux"
---

## 💡 Redux란?

Redux란 '상태 관리 라이브러리'로써 기존에 흩어져 있는 state들을 한 곳에 모아 관리하여 예측 불가능한 버그를 최소화하고 효율적으로 state를 사용할 수 있도록 합니다. 또한 Redux는 React 외에도 Angular, Vue, jQuery 등 다양한 환경에서 사용할 수 있습니다.

![why-using-redux](https://user-images.githubusercontent.com/68415905/157664466-dffebac5-4ead-438f-895b-dd53e3b01b70.jpg)

- `React`에서의 상태관리

  React에서의 상태는 `props`를 통해 각 컴포넌트로 전달됩니다. 특정 컴포넌트에서 state가 변화하면 `props`로 연결된 모든 컴포넌트가 함께 업데이트 됩니다.

- `Redux`에서의 상태관리

  Redux에서의 상태는 컴포넌트끼리 공유하지 않고 `store`라는 파일을 거쳐 필요한 컴포넌트로 즉시 전달됩니다. (`store` : 앱에서 사용되는 모든 state를 저장하고 관리하는 장소)

## 📝 Redux의 3원칙

1. **Single source of truth**

   필요한 상태 데이터는 모두 `store`라는 데이터 공간에 저장하고 관리됩니다.

2. **State is read-only**

   리액트에서 useState로 상태 변경을 하듯이 리덕스에서는 `action`이라는 객체를 통해서만 상태를 변경할 수 있습니다. (예측 가능)

3. **Changes are made with pure functions**

   상태 변경은 순수함수(`reducer`)로만 가능합니다.

![redux](https://user-images.githubusercontent.com/68415905/158020881-ecacf242-8f93-4518-9372-afa3b10d4609.png)

## 🎉 Redux 시작하기

### 0. Redux 설치 및 폴더 구조

```bash
npm install redux react-redux
```

```bash
redux/
├── actions/
│   ├── index.js # 액션 엔트리
│   ├── actionTypes.js # 액션 타입 상수 파일
│   ├── auth.js # action 1
│   └── counter.js  # action 2
├── reducers/
│   ├── index.js # 리듀서 엔트리 (rootReducer)
│   ├── auth.js # reducer 1
│   └── counter.js # reducer 2
└── store.js # 스토어 엔트리 (스토어 생성)
```

### 1. action 생성

> `action` : 객체 형식으로 컴포넌트에서 상태 변경을 요청할 때 사용

- `type` : 액션명 (필수)
- `payload` : 변경할 상태 값 (옵션)

action 생성 시 필요한 값으로는 `type`과 `payload` 가 있는데 이때, `type`은 파일을 별도로 만들어 상수(constant)로 관리하는 것이 유지 보수 하기 좋습니다.

```jsx
// actions/actionTypes.js
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const INCREASE_COUNT = "INCREASE_COUNT"
export const DECREASE_COUNT = "DECREASE_COUNT"
```

```jsx
//actions/auth.js
import { LOG_IN, LOG_OUT } from "./actionTypes"
// 로그인 요청 action
export const login = user => ({
  type: LOG_IN,
  payload: user, // 전달받은 상태값을 payload에 저장
})
// 로그아웃 요청 action
export const logout = () => ({
  type: LOG_OUT,
})
```

### 2. reducer 생성

> `reducer` : action 에 맞게 state를 업데이트 하는 함수

reducer는 상태(state)와 액션(action)을 전달 받아 '현재 상태'를 '새로운 상태'로 교체 한 후 반환하는 함수이며 주로 `switch` ~ `case` 문으로 작성합니다.

```jsx
const initialState = {
  user: '',
  loading: false
};
const reducer = (state = initialState, action) {
  switch(action.type) {
    case LOG_IN:
      return {
        ...state, // 현재 상태를 가져와
        user: action.payload // 전달받은 payload값으로 교체
      }
    case LOG_OUT:
      return {
        ...state,
        user: ''
      }
    default:
      return state
  }
}
```

reducer 파일이 여러개라면 index.js 파일을 만들고 `combineReducers`를 사용해 reducer를 하나로 합쳐주는 `rootReducer`를 생성합니다.

```jsx
// reducers/index.js
import { combineReducers } from "redux"
import { authReducer, counterReducer } from "reducers"
export const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
})
```

### 3. store 생성

> `store` : 모든 상태가 저장되는 공간

만들어둔 `reducer`(or `rootReducer`) 함수를 `createStore`에 전달하여 `store`를 생성합니다.

```jsx
import { createStore } from "redux"
const store = createStore(rootReducer)
export default store
```

## 🔎 Redux 사용하기

### - Provider

> Provider : store에 저장된 상태값을 컴포넌트로 전달

모든 컴포넌트에서 store에 접근할 수 있도록 최상단 컴포넌트(`App`)를 `Provider`로 감싸주고 store를 전달합니다.

```jsx
import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { Provider } from "react-redux"
import store from "redux/store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
```

### - useSelector

> useSelector : store에 저장된 상태값 가져와서 사용

```jsx
import { useSelector } from "react-redux"

export const mainPage = () => {
  const user = useSelector(state => state.auth.user)

  return <div>{user}님 환영합니다</div>
}
```

### - useDispatch

> useDispatch : action을 실행시켜 store의 상태값 업데이트

```jsx
import { useDispatch } from "react-redux"
import {login} from "actions/auth.js"

export const loginPage = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch()

  // login 액션을 실행시켜 input value값을 store로 전달!
  const handleLogIn = () => {
    dispatch(login(value))
  }

  return (
    <input value={value} type="text"/>
    <button onClick={handleLogIn}>Log In</button>
  )
}
```

<br />
<br />

> REFERENCE<br />Youtube 생활코딩 https://youtu.be/yjuwpf7VH74<br/>야무의 React 러닝 가이드 https://yamoo9.github.io/react-master/lecture/rd-redux.html

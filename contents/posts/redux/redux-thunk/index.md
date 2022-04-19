---
title: "Redux-thunk로 비동기 작업하기"
description: "Redux-thunk로 비동기 작업하기"
date: 2022-02-28
update: 2022-02-28
tags:
  - react
  - redux
series: "Redux"
---

## 💡 redux-thunk란?

redux-thunk는 redux 에서 **비동기 작업**이 필요할 때 사용하는 미들웨어(middleware)입니다. 이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있습니다. 여기서 thunk란 특정 작업을 나중에 하도록 미루기 위해 **함수**로 감싼 것을 말합니다.

## 📝 redux-thunk 예시

### 기본 Redux : '액션 객체' 생성

일반 액션 생성자는 아래와 같이 파라미터를 가지고 액션 객체를 리턴하는 작업만 합니다.

```js
const getUser = id => ({ type: GET_USER, payload: id })
```

### Redux-thunk : '액션 함수' 생성

Redux-thunk는 `dispatch`, `getState` 를 파라미터로 가지는 thunk 함수를 리턴합니다. 이 때 함수 안에서 액션을 dispatch 할 수도 있고 getState를 사용하여 현재 상태도 조회 할 수 있습니다.

```js
const getComments = () => (dispatch, getState) => {
  const id = getState().post.userId // 현재 상태 조회
  dispatch({ type: "GET_COMMENTS_REQUEST" }) // 요청이 시작했음을 알리는 액션

  api
    .getUser(id) // 요청을 하고
    // 성공시
    .then(comments => dispatch({ type: "GET_COMMENTS_SUCCESS", id, comments }))
    // 실패시
    .catch(e => dispatch({ type: "GET_COMMENTS_ERROR", error: e }))
}
```

위 코드를 try~catch 문과 async/await를 사용해 아래처럼 바꿀 수도 있습니다. 이런식으로 thunk 함수를 사용하면 비동기로 api 데이터 사용이 가능해집니다.

```js
const getComments = () => async (dispatch, getState) => {
  const id = getState().post.activeId
  dispatch({ type: "GET_COMMENTS" })
  try {
    const comments = await api.getComments(id)
    dispatch({ type: "GET_COMMENTS_SUCCESS", id, comments })
  } catch (e) {
    dispatch({ type: "GET_COMMENTS_ERROR", error: e })
  }
}
```

## ➕ redux-thunk 적용하기

### applyMiddleware()

먼저 npm으로 redux-thunk 를 설치하고 `store.js` 파일에서 설치한 패키지를 불러옵니다. 불러온 `thunk`는 store에 2번째 파라미터에 `applyMiddleware()`로 감싸준 후 전달합니다.

```bash
npm i redux-thunk
```

```js
// store.js
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // redux-thunk 추가
)
```

### composeWithDevTools()

크롬 관리자 도구에서 state는 물론 thunk를 사용한 비동기 처리를 한눈에 확인 할 수 있도록 하는 라이브러리입니다.

1. 크롬 확장프로그램에서 Redux DevTools를 설치합니다.

![tool](https://user-images.githubusercontent.com/68415905/164023530-d5a9a68d-785e-4e82-a7e6-fd819be755b5.JPG)

2. npm을 통해 `redux-devtools-extension`을 설치합니다.

```bash
npm i redux-devtools-extension -D
```

3. 설치한 패키지에서 `composeWithDevTools`를 가져와 `thunk`를 한번 더 감싸줍니다.

```js
// store.js
// ...
import { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // redux-thunk 추가
)
```

4. 크롬 관리자 > Redux 탭으로 이동하여 비동기 작업 목록과(왼쪽), state를(오른쪽) 확인할 수 있습니다.

![devtool](https://user-images.githubusercontent.com/68415905/164022332-1bc68f8e-7696-464b-a399-d55baa79907b.JPG)

<br />
<br />

> REFERENCE<br />Redux - redux-thunk란? https://jw910911.tistory.com/48<br/>벨로퍼트 Redux-thunk https://react.vlpt.us/redux-middleware

````

```

```
````

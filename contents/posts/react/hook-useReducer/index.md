---
title: "[React] React Hook - useReducer"
description: "[React] React Hook - useReducer"
date: 2022-01-25
update: 2022-01-25
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useReducer 정의

useState처럼 state를 생성 및 관리하는 hook입니다. 여러개의 하위값을 가진 복잡한 state를 다뤄야하거나 배열값에 추가,삭제,수정 등의 동시작업이 필요한 경우 사용합니다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

- `dispatch` : state 업데이트를 위한 요구
- `action` : 요구의 내용
- `reducer` : state를 업데이트하는 역할 (은행)

![reducer](https://user-images.githubusercontent.com/68415905/156757818-b586bdeb-e253-4466-80eb-0b9af175d2e9.JPG)

## 🔎 useReducer 사용하기

### 1. 필요한 action 정하기

reducer에서 사용할 action은 상수화시켜 관리하면 유지보수가 편리합니다.

```jsx
const ACTION_TYPES = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
}
```

### 2. reducer 함수 작성

reducer함수에는 `switch`~`case`문을 사용하여 action에 따라 state를 업데이트 시켜주는 코드를 작성합니다. `payload`란 배나 비행기에 실려온 '화물'을 뜻하는데 여기서는 action이 실행되었을 때 전달되는 값을 의미합니다.

```jsx
// 기존 state에 전달된 payload 값을 더하거나 빼서 state 업데이트
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.DEPOSIT:
      return state + action.payload
    case ACTION_TYPES.WITHDRAW:
      return state - action.payload
    default:
      return state
  }
}
```

### 3. useReducer 호출

useReducer의 인자로 reducer 함수와 초기값(initialState)을 넘겨주면 state와 dispatch를 반환합니다. (`state`: 현재 상태 / `dispatch`: state 업데이트에 필요한 요구)

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

### 4. dispatch로 action 실행

`dispatch`를 사용해서 필요한 값을 전달하고 action을 실행합니다. ex) '입금' 버튼을 클릭했을 때, 'DEPOSIT' action 실행. '출금' 버튼을 클릭했을 때, 'WITHDRAW' action 실행

```jsx
const [value, setValue] = useState(0)
const [money, dispatch] = useReducer(reducer, 0)
const handleDeposit = () =>
  dispatch({ type: ACTION_TYPES.DEPOSIT, payload: number })
const handleWithdraw = () =>
  dispatch({ type: ACTION_TYPES.WITHDRAW, payload: number })

return (
  <div>
    <h2>Reducer 은행</h2>
    <p>잔고 : {money}원</p>
    <input type="number" value={value} step="1000" />
    <button onclick={handleDeposit}>입금</button>
    <button onclick={handleWithdraw}>출금</button>
  </div>
)
```

## 🧐 useReducer 예시

### reducer 함수

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      }
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      }
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      }
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      }
    default:
      return state
  }
}
```

### dispatch 함수

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
const nextId = useRef(4)

const { users } = state
const { username, email } = state.inputs

const onChange = useCallback(e => {
  const { name, value } = e.target
  dispatch({
    type: "CHANGE_INPUT",
    name,
    value,
  })
}, [])

const onCreate = useCallback(() => {
  dispatch({
    type: "CREATE_USER",
    user: {
      id: nextId.current,
      username,
      email,
    },
  })
  nextId.current += 1
}, [username, email])

const onToggle = useCallback(id => {
  dispatch({
    type: "TOGGLE_USER",
    id,
  })
}, [])

const onRemove = useCallback(id => {
  dispatch({
    type: "REMOVE_USER",
    id,
  })
}, [])
```

<br/>

> REFERENCE<br /> Youtube 별코딩 https://youtu.be/tdORpiegLg0<br/>벨로퍼트 리액트 https://react.vlpt.us/basic/20-useReducer.html

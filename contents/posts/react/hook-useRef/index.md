---
title: "[React] React Hook - useRef"
description: "[React] React Hook - useRef"
date: 2022-01-08
update: 2022-01-08
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useRef 정의

```jsx
const ref = useRef(value) // { current: value }
```

Ref는 'reference'의 약자로 '참조'라는 뜻입니다. useRef는 인자로 전달된 값을 `current`에 할당하여 객체로 반환해 주는데, 이때 current에 할당된 값은 렌더링되어도 그대로 유지됩니다.
그래서 렌더링에 상관없이 동일한 참조값이 필요한 경우 useRef를 사용합니다.

또한 current 값이 바뀌어도 컴포넌트가 리렌더링되지 않기때문에 자주 업데이트 되는 값은 <br/>state가 아닌 ref로 관리하면 불필요한 렌더링을 줄일 수 있습니다.

## 🤔 useRef 언제 사용할까?

### 1. 컴포넌트 내부 변수 관리

변화는 감지해야 하지만, 렌더링이 불필요한 변수값을 다룰 때 useRef를 사용하면 컴포넌트 성능을 높일 수 있습니다. useRef를 활용한 변수는 아래와 같은 곳에 쓰입니다.

- setTimeout, setInterval을 통해 만들어진 id
- scroll 위치
- 배열에 새 항목을 추가할 때 필요한 고유값 key

```jsx
// App.js
const users = [
  {
    id: 1,
    username: "joy",
  },
  {
    id: 2,
    username: "user1",
  },
]

const nextId = useRef(3) // 새로운 유저 id값 3으로 지정
const onCreate = username => {
  users.push({
    id: nextId, // ref에 저장된 id 값 할당
    username: username,
  })
  nextId.current += 1 // id값 1 증가
}
```

### 2. DOM 요소에 접근

`Document.querySelector()` 와 비슷한 기능으로 DOM에 직접적인 접근이 필요할 때 useRef를 사용할 수 있습니다. 사용하고자 하는 DOM 요소의 인라인 속성으로 useRef 값이 할당된 변수를 전달해주면 해당 Ref의 current 값에 DOM 요소가 저장됩니다.

```jsx
const inputRef = useRef(null)
console.log(inputRef) // {current: input}

return <input ref={inputRef} type="text" />
```

DOM 요소에 접근이 필요한 경우는 아래와 같습니다.

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때.
- 애니메이션을 직접적으로 실행시킬 때.
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때.

```jsx
// input.js
const App = () => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus() // input 요소에 focus
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="username" />
      <button onClick={login}>로그인</button>
    </div>
  )
}
```

## 🔎 useRef 특징

1. 렌더링이 발생해도 current에 저장된 값은 그대로 유지됩니다.
2. current 값이 바뀌어도 컴포넌트가 리렌더링되지 않습니다.

### Ref와 변수의 차이점

- 공통점 : 렌더링 발생 ❌

- 차이점 : ref 와 변수에 각각 값을 저장하다가 **렌더링이 발생하면** 변수에 저장된 값은 초기화되지만 ref에 저장된 값은 그대로 유지됩니다.

```jsx
import React, { useState, useRef } from "react"

const App = () => {
  const [render, setRender] = useState(0)
  console.log("렌더링 발생!!")
  const countRef = useRef(0)
  let countVar = 0

  return (
    <div>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={() => countRef.current++}>Ref올려</button>
      <button onClick={() => countVar++}>Var올려</button>
      <button onClick={() => setRender(render + 1)}>렌더링 발생!</button>
    </div>
  )
}
export default App
```

```jsx
Ref : 0 , Var : 0
Ref : 1 , Var : 1
Ref : 2 , Var : 2
Ref : 3 , Var : 3
렌더링 발생!!
Ref : 4 , Var : 0
Ref : 5 , Var : 1
Ref : 6 , Var : 2
렌더링 발생!!
Ref : 7 , Var : 0
Ref : 8 , Var : 1
```

### Ref와 state의 차이점

- `state` 변화 → 렌더링 ⭕ → 컴포넌트 내부 변수들 초기화

- `ref` 변화 → 렌더링 ❌ → 변수 값이 유지됨 <br/>
  (state에 의해 다시 렌더링 되었을 때도 그대로 유지)

```jsx
import React, { useState, useRef } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  console.log("렌더링!")

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <button onClick={() => setCount(count + 1)}>State올려</button>
      <button onClick={() => countRef.current++}>Ref올려</button>
    </div>
  )
}
export default App
```

- `state올려` 버튼 클릭 : 클릭할 때마다 화면에 증가한 state값이 나타납니다.

  → state가 매번 업데이트되면서 App 컴포넌트가 다시 렌더링 되기 때문

- `ref올려` 버튼 클릭 : 화면에는 변화가 없지만 내부적으로 ref값이 증가합니다.

  → ref는 렌더링을 발생시키지 않으므로 화면이 업데이트되지 않기 때문

  → 이후에 state가 변하고 렌더링이 발생하면, 이때 변화된 ref값이 화면에 나타난다!

### useRef로 무한렌더링 방지

렌더링 될 때마다 렌더링 횟수를 카운트하는 state를 만들고자 합니다. 아래 코드처럼 useEffect 내부에 상태 업데이트 함수를 사용하면 이렇게 무한루프가 발생하게 됩니다.

렌더링 → `useEffect` 실행→ `setRenderCount` → state 업데이트 → 렌더링 → `useEffect` 실행 → `setRenderCount` → state 업데이트 → 렌더링 ...

```jsx
const [renderCount, setRenderCount] = useState(1)

useEffect(() => {
  console.log("렌더링")
  setRenderCount(renderCount + 1) // 렌더링 발생
})
```

그러므로 이 경우에는, 렌더링 횟수를 저장하는 renderCount를 `useRef`로 관리하면 `useEffect` 내부에서 렌더링이 발생하지 않으므로 무한 렌더링을 막을 수 있습니다.

```jsx
const renderCount = useRef(1)

useEffect(() => {
  console.log("렌더링")
  renderCount.current++ // 렌더링 발생 ❌
})
```

<br />
<br />

> REFERENCE<br /> Youtube 별코딩 https://youtu.be/VxqZrL4FLz8<br />[React] useRef() 는 언제 사용하는가? https://yoonjong-park.tistory.com/entry/React-useRef-는-언제-사용하는가

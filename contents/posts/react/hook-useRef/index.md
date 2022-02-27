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

useRef는 인자로 넘어온 초기값을 `current` 속성에 할당하여 객체로 반환합니다. 이 current 속성은 값이 바뀌어도 컴포넌트가 리렌더링되지 않습니다.

또한 렌더링 횟수에 상관 없이 mount 시점부터 unmount 되는 시점까지 값이 그대로 유지됩니다. 그러므로 자주 업데이트 되는 값은 state가 아닌 ref로 관리하면 불필요한 렌더링을 줄일 수 있습니다.

## 🤔 useRef 언제 사용할까?

- 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때.
- 애니메이션을 직접적으로 실행시킬 때.
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때.

## 🔎 useRef 특징

### 1. 변수 관리

- 원리 : 변화는 감지해야 하지만, 렌더링이 불필요한 값을 다룰 때 사용.

state의 변화 → 렌더링 → 컴포넌트 내부 변수들 초기화

ref 의 변화 → No 렌더링 → 변수 값이 유지됨 (state에 의해 다시 렌더링 되었을 때도 그대로 유지)

`state올려` 버튼을 클릭하는 경우, 클릭할 때마다 화면에 증가한 state값이 나타난다.

→ state가 매번 업데이트되면서 App 컴포넌트가 다시 렌더링 되기 때문

`ref올려` 버튼을 클릭하는 경우, 화면에는 아무런 변화가 없지만 내부적으로 ref값이 증가한다.

→ ref는 렌더링을 발생시키지 않으므로 화면이 업데이트되지 않아 값이 나타나지 않는다.

→ 이후에 state가 업데이트되어 렌더링이 발생하면, 이때 변화된 ref값이 화면에 나타난다!

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
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        State올려
      </button>
      <button
        onClick={() => {
          countRef.current++
        }}
      >
        Ref올려
      </button>
    </div>
  )
}
export default App
```

### 2. DOM 요소에 접근

= `Document.querySelector()` 와 비슷한 역할을 한다.

사용하고자 하는 DOM 요소에 인라인태그(`ref={}`)로 useRef 값이 할당된 변수를 전달해주면

해당 Ref값의 current에 DOM 요소가 저장된다.

```jsx
const inputRef = useRef()
console.log(inputRef) // {current: input}

return <input ref={inputRef} type="text" />
```

**_input.js_**

렌더링 되었을 때 인풋에 focus, 로그인 했을 때 입력값 alert으로 출력.

```jsx
const App = () => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const login = () => {
    alert(`환영합니다 ${inputRef.current.value}!`)
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="username" />
      <button onClick={login}>로그인</button>
    </div>
  )
}
```

## Ref와 변수의 차이

공통점 : 렌더링 발생 X

차이점 : ref 와 변수에 각각 값을 저장하다가 **렌더링이 발생하면** 변수에 저장된 값은 초기화되지만 ref에 저장된 값은 기존의 값을 그대로 유지한다.

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
      <button
        onClick={() => {
          countRef.current++
        }}
      >
        Ref올려
      </button>
      <button
        onClick={() => {
          countVar++
        }}
      >
        Var올려
      </button>
      <button
        onClick={() => {
          setRender(render + 1)
        }}
      >
        렌더링 발생!
      </button>
    </div>
  )
}
export default App
```

```jsx
/*
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

*/
```

## useEffect와 useRef의 사용

렌더링 될 때마다 렌더링 횟수를 카운트하는 state를 만들고자 한다.

아래 코드처럼 useEffect 내부에 상태 업데이트 함수를 사용하면 이렇게 무한루프가 발생하게된다.

렌더링 → `useEffect` 실행→ `setRenderCount` → state 업데이트 → 렌더링 → `useEffect` 실행 → `setRenderCount` → state 업데이트 → 렌더링 ...

```jsx
const [count, setCount] = useState(1)
const [renderCount, setRenderCount] = useState(1)

useEffect(() => {
  console.log("렌더링") // count 변화시 렌더링
  setRenderCount(renderCount + 1) // renderCount+1 -> 다시 렌더링된다
})
```

그러므로 이 경우에는, 렌더링 횟수를 관리하는 renderCount를 `useRef`로 관리하면

`useEffect` 내부에서 렌더링이 발생하지 않으므로 무한 렌더링을 막을 수 있다.

```jsx
const [count, setCount] = useState(1)
const renderCount = useRef(1)

useEffect(() => {
  console.log("렌더링") // count 변화시 렌더링
  renderCount.current++ // renderCount + 1 -> 렌더링 x
})
```

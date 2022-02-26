---
title: "[React] React Hook - useEffect"
description: "[React] React Hook - useEffect"
date: 2021-12-26
update: 2021-12-26
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useEffect 정의

첫 렌더링 할 때(**mount**), 다시 렌더링될 때(**update**), 화면에서 사라질 때(**unmount**), 특정한 작업을 수행하고 싶은 경우 사용하는 Hook입니다. `useEffect` 를 사용 할 때에는 첫번째 인자에는 함수, 두번째 인자로는 의존값이 들어있는 배열 Dependency Array(deps)를 넣습니다.

- 렌더링될 때마다 실행 - Dependency array ❌

```jsx
useEffect(() => {
  // code...
})
```

- 첫 렌더링될 때(mount)만 실행 - Dependency array 빈 배열

```jsx
useEffect(() => {
  // code ...
}, [])
```

- 첫 렌더링 될때 + 특정 `state`**가 바뀔 때** 실행 - Dependency array에 `state` 전달

```jsx
useEffect(() => {
  // code ...
}, [value])
```

- 컴포넌트 unmount 시 실행 - `return` 추가

```jsx
useEffect(() => {
  // code ...
  return () => {
    // clean up!!
  }
}, [])
```

## 🤔 useEffect 언제 사용할까?

### 마운트할 때 필요한 작업

- props 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

### 언마운트할 때 필요한 작업

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기<br/>
  (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

## 🔎 useEffect 제대로 사용하기

### Dependency Array

해당 컴포넌트에 state가 여러개 있는 경우, state가 호출될 때 다른 state값도 다같이 렌더링 됩니다. 이때 useEffect를 사용해 dependency array에 호출하고자 하는 state값을 전달해주면 다른 불필요한 state 렌더링을 막을 수 있습니다.

```jsx
const [count, setCount] = useState(1)
const [name, setName] = useState("")

// count만 렌더링!  name은 사용 x
useEffect(() => {
  console.log("count 렌더링")
}, [count])

// name만 렌더링! count은 사용 x
useEffect(() => {
  console.log("name 렌더링")
}, [name])
```

### return

`useEffect` 에서는 함수를 return 할 수 있는데 이때 반환되는 함수를 **cleanup 함수**라고 부릅니다. cleanup 함수는 useEffect 에 대한 뒷정리를 해준다고 이해하시면 되는데요, deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출됩니다.

**_timer.js_**

```jsx
import React, {useEffect} from 'react';

const Timer = () => {
	useEffect(()=> {
		// 컴포넌트가 mount 될 때 실행
		const timer = setInterval(() => {
			console.log('타이머 실행 중....');
		}, 1000);

		// 컴포넌트가 unmount 될 때 실행
		return () => {
			clearInterval(timer);
			console.log('타이머 종료!');
		}
}, []);
return (
	<div>타이머를 시작합니다.</div>
)
export default Timer;
```

**_App.js_**

```jsx
import React, { useState } from "react"
import Timer from "./Timer"

function App() {
  const [showTimer, setShowTimer] = useState(false)
  return (
    <div>
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle</button>
    </div>
  )
}
export default App
```

<br />

> REFERENCE<br />Velopert React https://react.vlpt.us/basic/16-useEffect.html<br/>Youtube 별코딩 https://youtu.be/kyodvzc5GHU

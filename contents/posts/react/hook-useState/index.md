---
title: "[React] React Hook - useState"
description: "[React] React Hook - useState"
date: 2021-12-23
update: 2021-12-23
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useState 정의

상태 관리에 사용되는 Hook이며 상태값을 생성하고 업데이트 시킬 수 있습니다. useState를 호출 하면 state값이 저장되는 '변수'와 state값을 변화시키는 '함수'가 배열로 리턴됩니다.

```jsx
const [state, setState] = useState(<상태 초기 값>);
```

- `state` : 상태 값 저장 변수 (현재 상태 값)
- `setState` : 상태 값 갱신 함수 (state를 업데이트하는 setter 함수)

## 💡 useState 예시

### Counter 만들기

초기값을 1로 설정 후, 버튼 클릭할 때마다 상태값(`count`)이 +1씩 업데이트 됩니다.

```jsx
// count.js
import { useState } from "react"

function Count() {
  const [count, setCount] = useState(1) // 초기값이 1인 count(state) 생성
  const handleClick = () => {
    setCount(count + 1) // 클릭 이벤트 발생 시, count = count + 1
  }
  return (
    <div>
      <span>클릭 횟수 : {count}</span>
      <button onClick={handleClick}>Update</button>
    </div>
  )
}
```

## 🔎 useState 제대로 사용하기

### state가 배열 or 객체일 때?

`setState` 함수로 `state`의 상태를 업데이트할 때는, **콜백함수** 내부에서 스프레드 연산자(`...`)로 이전 상태값을 가져온 뒤 현재 입력값을 추가하여 덮어쓰는 방식으로 사용합니다.

```jsx
const updateArray = () => {
  setNames(prevState => [newName, ...prevState])
}
```

```jsx
const updateObject = () => {
  const name = "joy"
  const job = "developer"
  setJobs(prevState => ({
    ...prevState,
    [name]: job,
  }))
}
```

### useState 최적화

useState가 호출되면 컴포넌트가 다시 렌더링됩니다. state 초기값을 호출하는 루트가 복잡한 경우 컴포넌트가 렌더링될 때마다 다시 실행되서 성능이 떨어지게 됩니다. 이때, useState 내부에 **콜백함수**를 만들어 초기값을 선언하면 첫 렌더링 때만 불러오므로 불필요한 메모리 소비를 막을 수 있습니다.

```jsx
import {useState} from 'react';

const heavyWork = () => {
	console.log('엄청 무거운 작업!!')
	return ['Joy', 'Hana']
}

function Input() {
	const [names, setNames] = useState(() => {
		return heavyWork(); // callback으로 초기값 선언
	});
	const [input, setInput] = useState('');

	const handleChange = (e) => {
		setInput(e.target.value);
	}
	const handleUpload =() => {
		setNames((prev) => {
			return([input, ...prev];
		});
	};

	return (
		<div>
			<input type="text" value={input} onChnage={handleChange} />
			<button onClick={handleUpload}>Upload</button>
			{names.map((name,i) => {
				return <p key={i}>{name}</p>
			})}
		</div>
	);
}
```

> REFERENCE<br />Velopert React https://react.vlpt.us/basic/07-useState.html<br/>Youtube 별코딩 https://youtu.be/G3qglTF-fFI

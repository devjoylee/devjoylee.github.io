---
title: "[React] React Hook - useMemo"
description: "[React] React Hook - useMemo"
date: 2022-01-14
update: 2022-01-14
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useMemo 정의

useMemo는 'Memoization' 되어있는 값을 반환시켜주는 hook입니다. Memoization이란 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법을 말합니다. Memoization을 절적히 적용하면 중복 연산을 피할 수 있기 때문에 메모리를 조금 더 쓰더라도 애플리케이션의 성능을 최적화할 수 있습니다.

```jsx
const result = useMemo(() => {
  return calculate(a, b) // 10
}, [a, b])
```

- 컴포넌트 성능 최적화에 사용된다!
- dependency array에 추가한 값이 업데이트되면 useMemo값도 업데이트 된다.
- 꼭 필요할 때만 사용할 것! 추가로 메모리를 소비해야하므로 많이 쓴다고 좋은 것 x

## 🔎 useMemo 특징

### 1. state 관리 최적화

- `useMemo` 적용 전

App 컴포넌트가 렌더링될 때마다, `hardCalculate`와 `easyCalculate`가 다시 실행되어 딜레이가 발생할 수 있습니다.

```jsx
// calculate.js
const hardCalculate = num => {
  console.log("어려운 계산!")
  for (let i = 0; i < 999999999; i++) {} // take your time..
  return num + 10000
}
const easyCalculate = num => {
  console.log("쉬운 계산!")
  return num + 1
}
```

```jsx
// App.js
const App = () => {
  const hardSum = hardCalculate(num);
  const easySum = easyCalculate(num);
	return (
		//...
	)
};
```

<br/>

- `useMemo` 적용 후

첫 렌더링 시, useMemo가 적용된 함수의 리턴값을 저장해두고 이후 컴포넌트가 리렌더링되었을 때 저장되있던 값을 불러와 사용합니다. dependency array로 전달한 인자값이 변하면, 함수를 다시 실행 해서 저장된 값을 업데이트 시켜줍니다.

```jsx
// App.js
const App = () => {
  const hardSum = useMemo(() => hardCalculate(num), [num]);
  const easySum = easyCalculate(num);
  return (
    // ...
  )
}
```

### 2. 객체 주소 관리하기

- `useMemo` 적용 전

useEffect의 dependency array로 객체를 전달할 경우, 객체에 변화가 없어도 useEffect가 실행됩니다. 렌더링이 발생하면 객체 메모리 주소가 새로운 주소로 바뀌기 때문입니다.

```jsx
const location = {
  country: isKorea ? "한국" : "캐나다",
}

useEffect(() => {
  console.log("렌더링")
}, [location])
```

위처럼 변수에 객체타입을 저장하면 객체 자신이 아닌 **객체가 담긴 메모리의 주소**가 할당됩니다. 객체값에는 변화가 없더라도 렌더링 시 `location`에 새로운 주소가 할당되었으므로 useEffect가 실행됩니다.

![JPG](https://user-images.githubusercontent.com/68415905/156110497-9051a4f5-5669-4a08-9726-d16d56a86a4d.jpg)

- `useMemo` 적용 후

useMemo를 사용해서 `객체 메모리 주소`값을 가진 변수가 매 렌더링 시 업데이트 되지 않도록 설정합니다. 이때, 객체 내부에서 변하는 값을 useMemo의 dependency array로 전달하여 그 값이 업데이트된 경우에만 변수(메모리주소)가 업데이트되도록 합니다.

```jsx
const location = useMemo(() => {
	return {
	  country: isKorea ? '한국' : '캐나다',
	};
}, [isKorea]; // isKorea가 변할 때 location의 메모리 주소 업데이트

useEffect(() => {
  console.log('렌더링');
}, [location]); // location의 메모리주소가 업데이트 되면 실행
```

## 🚫 useMemo 사용 시 주의점

성능 최적화를 할때는 기대되는 성능이 지불하는 대가에 비해서 미미하지 않은지 반드시 따져보고 사용을 해야합니다. 예를 들어, useMemo hook 함수를 남용하면, 컴포넌트의 복잡도가 올라가기 때문에 코드를 읽기도 어려워지고 유지보수성도 떨어지게 됩니다. 또한 useMemo가 적용된 레퍼런스는 재활용을 위해서 가바지 컬렉션(garbage collection)에서 제외되기 때문에 메모리를 더 쓰게 됩니다.

일반적으로 수초 이상 걸리는 로직이 프론트엔드(front-end)에 존재하다는 것은 흔치 않은 일이고, 만약 그렇게 오래 걸리는 로직이 있다고 해도 useEffect 등을 이용해서 비동기로 처리하는 방안을 먼저 고려해보는 것이 좋습니다. 또한 컴포넌트가 여러 번 렌더링된다고 해서 실제로 심각한 성능 이슈로 이어지는 경우가 매우 적기때문에 무조건적인 useMemo의 사용은 지양할 필요가 있습니다.

<br/>
<br/>

> REFERENCE<br />Youtube 별코딩 https://youtu.be/e-CnI8Q5RY4<br/>React Hooks: useMemo 사용법 https://www.daleseo.com/react-hooks-use-memo/

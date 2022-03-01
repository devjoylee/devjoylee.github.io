---
title: "[React] React Hook - useCallback"
description: "[React] React Hook - useCallback"
date: 2022-01-20
update: 2022-01-20
tags:
  - frontend
  - react
series: "React.js"
---

## ✨ useCallback 정의

useCallback은 useMemo와 같이 Memoization 기법을 사용하여 컴포넌트 최적화에 사용됩니다. useMemo는 함수에서 반환되는 '값'을 저장한다면 useCallback은 '함수 그 자체'를 저장해두고 재사용하는 것입니다. useCallback 역시 2개의 인자를 필요로 하는데, memoization할 콜백함수와 dependency array를 인자로 받아옵니다.

```jsx
const result = useCallback(() => {
  return value
}, [])
```

## 🔎 useCallback 사용하기

함수형 컴포넌트가 렌더링되면 내부의 모든 변수가 초기화됩니다. 그러므로 컴포넌트 내부에 존재하는 함수 역시 렌더링될 때마다 초기화되고 새로운 함수가 생성됩니다.

이때, 내부 함수를 useCallback으로 감싸주면, 컴포넌트가 렌더링 되어도 함수가 초기화되는 것을 막을 수 있습니다. 첫 렌더링 때, 함수 객체를 만들어서 초기화한 후 저장해두고 이후 렌더링 부터는 저장된 함수를 사용하는 것 입니다.

- `useCallback` 적용 전

```jsx
function App() {
  const [number, setNumber] = useState(0);
  const someFunction = () => { // 렌더링마다 초기화
    console.log(`number: ${number}`)
    return
  }

  useEffect(() => {
    console.log("someFunction이 변경되었습니다.")
  }, [someFunction])

  return (
    // 렌더링 발생 로직..
  )
}
```

- `useCallback` 적용 후

```jsx
function App() {
  const [number, setNumber] = useState(0);
  const someFunction = useCallback(() => { // 첫 렌더링에만 초기화
    console.log(`number: ${number}`)
    return
  }, [number]); // number가 바뀔 때 만 업데이트

  useEffect(() => {
    console.log("someFunction이 변경되었습니다.")
  }, [someFunction])

  return (
    // 렌더링 발생 로직..
  )
}
```

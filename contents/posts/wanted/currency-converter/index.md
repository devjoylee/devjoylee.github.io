---
title: "환율 계산기(Currency Converter) 만들기"
description: "Currency Converter"
date: 2022-01-28
update: 2022-01-28
tags:
  - wanted
  - javascript
  - react
  - netlify
series: "원티드 프리온보딩"
---

## ☝ 프로젝트 시작하기 전

프리온보딩 첫번째 과제가 발표되었다! 첫번째 과제는 4명의 팀원 중 2명씩 짝을 이루어 기능이 다른 환율계산기를 1개씩 구현하는 것이었다. 배정된 짝과 논의 해서 탭기능이 추가된 환율계산기를 만들기로 결정했다.

본격적으로 프로젝트를 시작하기 전에 협업에 필요한 규칙을 몇가지 정하기로 했다.

- 프로젝트 폴더 구조는 어떻게 만들까?
- 커밋은 어떤 방식을 사용할 것인가?
- 네임 컨벤션은 어떻게 따를 것인가? (컴포넌트이름, branch이름, 상수처리 등 )
- CSS는 어떤 툴을 사용할 것인가? (Styled Component, SASS, CSS Modules 등)

크게 4가지 주제로 팀원들과 협업규칙을 정했고 Docs로 정리해두었다. [👉 Docs 보러가기](https://www.notion.so/50aee26d48df4e0baf7ac3f8203c7f08)

## 📌 프로젝트 링크

[Github](https://github.com/devjoylee/currency-converter)
[배포링크](https://currency-converter-w.netlify.app/)

## 📲 환율 계산기 만들기

환율 정보는 제공된 API(https://currencylayer.com/)에서 실시간 환율 데이터를 `fetch`해서 사용했다. 계산기에 값을 입력하고 화폐단위를 선택하면 해당 환율을 출력하도록 로직을 설계했다.

### 입력값 상태 저장

![Untitled](https://user-images.githubusercontent.com/68415905/154837797-6f5b9bb5-eebb-4a9f-9b4f-8fc47bc9c815.png)

먼저 입력값은 2가지로 나뉜다.

1. **input으로 입력한 금액**

2. **select 박스로 선택한 화폐단위**

```jsx
const [inputValue, setInputValue] = useState("")
const [currency, setCurrency] = useState("USD")
```

각각 다른 state를 만들어 입력 값을 관리하도록 하였고 input의 입력값에는 10자리 이하 숫자만 입력되도록 하기위해 입력값 length가 10을 넘는 경우 return 시켰다. 그리고 `toLocaleString` 을 사용해 숫자 3자리마다 콤마(,)가 자동으로 보이도록 만들었다. ex) 1,000,000

```jsx
// input에 값이 입력될 때
const handleType = e => {
  const pureString = e.target.value.split(",").join("")
  if (isNaN(Number(pureString))) return
  if (pureString.length > 10) return
  if (Number(pureString) >= 1000) {
    setInputValue(Number(pureString).toLocaleString())
  } else {
    setInputValue(pureString)
  }
}
// select box 값이 선택될 때
const handleChange = e => {
  setCurrency(e.target.value)
  setInputValue("")
}
```

### 탭 기능 구현

![Untitled](https://user-images.githubusercontent.com/68415905/154838315-42884797-688c-43c6-aab6-bc06f9b33f2a.JPG)

위 select 박스에서 선택된 단위는 아래 탭박스에 나타나지 않도록 하기위해 전체 화폐단위 값을 가져와서 `filter`로 select 박스에 선택된 값을 제외하고 탭을 다시 정렬하도록 구현했다. 활성화된 탭은 border-bottom값을 none으로 해주었다.

```jsx
const [tabs, setTabs] = useState(TAB_CURRENCY)
const [currentTab, setCurrentTab] = useState("")

const handleClick = e => {
  setCurrentTab(e.target.innerHTML)
} // 탭 클릭 시 현재 탭 상태 업데이트

useEffect(() => {
  const handleTab = () => {
    let changedTabs = TAB_CURRENCY.filter(tab => tab !== currency)
    setTabs(changedTabs)
    setCurrentTab(changedTabs[0])
  }
  handleTab()
}, [currency, setCurrentTab])
```

### 실시간 날짜 & 환율 계산

![Untitled](https://user-images.githubusercontent.com/68415905/154838566-6341a0f4-bad8-4f66-b706-f6accb9e7488.jpg)

데이터를 성공적으로 받아오면, `DateConverter`와 `CurrencyCalculator`로 실시간 환율을 계산한다. 환율 계산할 때는, 콤마(,)때문에 string으로 변한 value값을 다시 number로 바꾸어 준다. ex) “1,000” → 1000

- 날짜 계산 (dateConverter.js)

```jsx
export const DateConverter = timestamp => {
  const time = new Date(timestamp * 1000)
  const year = time.getFullYear()
  const month = time.toLocaleString("en", { month: "short" })
  const date = time.getDate()
  return `${year}-${month}-${date}`
}
```

- 환율 계산 (currencyCalculator.js)

```jsx
const CurrencyCalculator = (target, base, money) => {
  let targetRate = apiData.quotes[`USD${target}`]
  let baseRate = apiData.quotes[`USD${base}`]
  let exchangeRate = Number((targetRate / baseRate) * money)
  return exchangeRate.toLocaleString("en", {
    maximumFractionDigits: 2,
  })
}
```

## ♻ 프로젝트 리팩토링

### API 상수화

처음에는 API key, 화폐정보 등이 모두 포함된 API를 통째로 string으로 써서 data를 불러왔는데 화폐정보가 바뀔때 API를 수정해야한다는 불편함이 생겨 좀더 편리한 구조로 API 주소를 바꾸었다.

- **리팩토링 전**

```jsx
// constants.js
export const API_ENDPOINT =
  "http://api.currencylayer.com/live?access_key=7cceb7113b3a6f9436614acd65e70c26&format=1"

// converter.jsx
fetch(API_ENDPOINT)
```

- **리팩토링 후**

```jsx
// constants.js
const KEY = "7cceb7113b3a6f9436614acd65e70c26"
export const SELECT_CURRENCY = ["KRW", "JPY", "PHP"]
export const TAB_CURRENCY = ["USD", "KRW", "JPY", "CAD", "HKD", "CNY"]
export const API_ENDPOINT = currencies =>
  `http://api.currencylayer.com/live?access_key=${KEY}&currencies=${currencies}&format=1`

// converter.jsx
fetch(API_ENDPOINT(TAB_CURRENCY.join(",")))
```

### API fetch 실패 시 로딩화면 추가

처음에는 사용자가 입력창에 값을 입력하기 전 까지는 fetch 성공여부를 알 수 없었다. (fetch 실패 시 계산 안됨). 그래서 fetch가 실패한 경우 로딩이 실패했다는 UI를 보여줌으로써 사용자가 입력창에 입력을 해서 확인해보는 불필요한 작업을 최소화시켰다.

<img src="https://user-images.githubusercontent.com/68415905/154838974-eb069e65-bbf1-4dbc-8794-2560ec8ac318.JPG" width="450" />

### Netlify 배포 오류

![error](https://user-images.githubusercontent.com/68415905/154839736-666c1574-4817-4461-9789-6d8edcf6bbda.jpg)
프로젝트가 끝난 후, Netlify로 배포를 하려는데 `Mixed Content`라는 HTTP 관련 이슈가 생겨 배포가 안되는 문제가 발생했다. 알아본 결과 최신 브라우저에서는 `https` 페이지에서 `http` 리소스를 요청할 수 없다는 것을 알게되었다. 로컬에서는 API 사용이 가능했던 이유는 리액트 개발 서버는 http도 사용하기 때문이라고 했다.

그래서 차선책으로 HTTP 업로드가 가능한 AWS를 통해 배포를 하기로 결정했다.
[AWS 링크](http://beefplz.s3-website.ap-northeast-2.amazonaws.com/)

하지만 AWS는 Netlify처럼 자동으로 업데이트되지 않고 배포한 사람이 매번 직접 빌드를 해야한다는 단점이 있었다. 그래서 Netlify에서 앞서 발생한 이슈를 해결할 수 있는 방법이 있을까 찾아보다가 public 위치에 `_redirects`라는 파일을 만들면 된다는 글을 보게되었다!

```bash
// _redirects
/api/* http://api.currencylayer.com/:splat 200
```

```jsx
fetch(`http://api.currencylayer.com/live?access_key=${KEY}`)
👇
fetch(`/api/live?access_key=${KEY}`)
```

`_redirects`에 HTTP 주소를 추가한 후, fetch 경로를 위처럼 수정하니 HTTP 이슈 없이 Netlify 배포에 성공했다! 🎉

<br />

> REFERENCE<br />Netlify 공식문서 https://www.netlify.com/blog/2021/12/13/setting-up-redirects-on-netlify/

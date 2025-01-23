---
title: "견적서 게시판 (필터링 기능)"
description: "견적 요청서 게시판 제작"
date: 2022-02-10
update: 2022-02-10
tags:
  - wanted
  - typescript
  - react
  - heroku
series: "원티드 프리온보딩 회고"
---

## ☝ 프로젝트 시작하기 전

이번 프로젝트부터는 javascript가 아닌 typescript를 사용하기로 했다. 타입스크립트가 적용된 CRA를 내려받고 절대경로(ex `components/Filter`) 설정도 해두었다.

`npx create-react-app [project-name] --template typescript`

- 타입스크립트 절대경로 설정 (**tsconfig.json**)

```json
{
  "compilerOptions": {
    // etc..
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

## 📌 프로젝트 링크

[Github](https://github.com/devjoylee/estimate-board)
[배포링크](https://estimate-board-page.herokuapp.com/)

## 📑 견적서 게시판 제작

### 1. json-server로 REST-API 요청

json-server로 가상의 서버를 만들어 REST-API 요청을 보내고 서버에 저장된 데이터베이스로 부터 필요한 데이터를 가져올 수 있도록 만들었다.

> REST-API란? <br/>
> url과 method를 사용해 HTTP 기반으로 클라이언트가 서버로 CRUD를 요청하는 것<br/>
> ▪ Create : POST => 새로운 데이터 생성<br/>
> ▪ Read : GET => 데이터 불러오기<br/>
> ▪ Update : PUT => 데이터 수정<br/>
> ▪ Delete : DELETE => 데이터 삭제<br/>

먼저 json-server를 설치하고 프로젝트 최상단에 `server` 폴더를 생성했다.

```bash
npm install json-server
```

그리고 server를 생성하는 명령어 파일(index.js)을 추가한 후 데이터가 저장된 db.json 파일을 만들었다. 저장한 데이터를 가져오기 위해서는 서버 url로 GET 요청을 보내야 한다. <br/>(요청 url - localhost:3001/requests)

```json
// db.json
{
  "requests": [
    {
      "id": 1,
      "title": "자동차 시제품 제작",
      "client": "A 고객사",
      "due": "2020.12.14",
      "count": 2,
      "amount": 100,
      "method": ["밀링", "선반"],
      "material": ["알루미늄"],
      "status": "대기중"
    }
    // ...
  ]
}
```

```js
// index.js
const jsonServer = require("json-server")
const path = require("path")

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname + "/db.json"))
const middlewares = jsonServer.defaults({
  static: path.resolve(__dirname + "/../build/"),
})

const port = process.env.PORT || 3001

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use(router)
server.listen(port, () => {
  console.log("JSON Server is running")
})
```

server로 보내는 GET 요청은 fetch 함수를 사용한다. useEffect를 사용해서 렌더링 시 데이터를 요청하고 불러온 데이터는 state에 저장하도록 설계했다.

```jsx
const [apiData, setApiData] = useState<Estimate[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await fetch("/requests")
    setApiData(await data.json())
  }
  fetchData()
}, [])
```

GET 요청 성공 여부를 알고 싶다면 브라우저 네트워크 탭을 확인하면 된다.

![get](https://user-images.githubusercontent.com/68415905/156305269-37019cd0-fc20-4442-b98b-25cf1883295d.JPG)

### 2. 필터링 기능 구현

이번 프로젝트에서 필요한 필터링 기능은 총 2가지 이다. 각 기능은 서로 다른 방식으로 구현을 해보기로 했다.

1. select 박스 형태의 카테고리 선택에 따라 해당 카테고리 내역만 출력<br/>
   👉 `filter`와 `include()` method를 사용해서 구현
2. 토글 버튼 클릭 시, '상담 중' 라벨이 붙어있는 내역만 출력<br/>
   👉 className를 각각 부여하고 토글버튼 클릭 시 `display:block` or `none` 처리

![image](https://user-images.githubusercontent.com/68415905/156330421-4364ff3e-a37e-41e3-b28f-bb22abd1466d.jpg)

### - 카테고리 필터링

먼저 카테고리 필터링은 util 함수를 따로 작성하였다. `filterData`라는 이 함수는 서버에서 받아온 API 데이터와 category에서 선택된 옵션을 비교하여 선택된 옵션과 모두 일치하는 item만 데이터에서 필터링시켜 출력하도록 구현했다.

```jsx
// filterData.ts
import { Estimate, Category } from "types"

export const filterData = (apiData: Estimate[], categories: Category) => {
  const filtered = apiData.filter((item: Estimate) => {
    // '재료' 카테고리에서 선택된 옵션과 모두 일치하면 true
    const materials = categories.material.every((option: string) =>
      item.material.includes(option)
    )
    // '가공방식' 카테고리에서 선택된 옵션과 모두 일치하면 true
    const methods = categories.method.every((option: string) =>
      item.method.includes(option)
    )
    // 두 조건에 모두 부합하는 item만 필터링하여 출력
    return materials && methods
  })
  return filtered
}
```

이때, 선택된 카테고리는 `categories`라는 state를 만들어 관리했다. 받아온 api데이터와 categories 목록을 `filterData` 함수의 인자로 넘겨주면 필터링된 새로운 데이터를 반환한다.
필터링 데이터는 컴포넌트로 넘겨주어 `map`으로 각 아이템을 출력하게 했다.

useMemo를 사용하기 전 데이터를 state에 저장할지 useMemo로 메모리에 저장해둘지 고민을 많이 했는데 어떤 방식이 더 좋은지는 아직 잘 모르겠다. state에 저장을 하면 렌더링마다 같은 필터링이 반복되고, useMemo에 저장을 하면 추가적으로 메모리를 소비하는데 어떤게 더 좋은 선택일지는 차차 고민해보도록 해야겠다.

```jsx
// mainPage.ts
const [categories, setCategories] = useState({
  method: [],
  material: [],
})
const filteredList = useMemo(() => {
  return filterData(apiData, categories)
}, [apiData, categories])
return (
  // 카테고리 컴포넌트 (옵션 선택 시 state 업데이트)
  <FilterList categories={categories} setCategories={setCategories} />
  // map으로 list를 순회하며 각 아이템을 출력하는 컴포넌트
  <EstimateList list={filteredList} isChecked={isChecked} />
)
```

### - 토글 필터링

토글 필터링은 조금 간단한 방식을 사용했다. 먼저 `isChecked`라는 state를 만들어 토글이 on/off 되었을 때를 관리하도록 했다.

```jsx
const [isChecked, setIsChecked] = useState(false)
const handleClick = () => {
  setIsChecked(!isChecked)
}
return (
  // ..
  <Toggle isChecked={isChecked} handleClick={handleClick} />
)
```

그리고 데이터 정보에 따라 status가 상담중이면 `active`, 대기중이면 `pending` 이라는 클래스명을 부여하고 토글이 켜진 경우(`isChecked`가 참인 경우) 상담중(`active`) 아이템만 display:block 시키고 나머지는 모두 display:none 하도록 설계했다.

```jsx
// EstimateItem.tsx
interface StyleProps {
  isChecked: boolean;
}

export const EstimateItem = ({ isChecked }: EstimateItemProps) => {
  return (
    <EstimateItemContainer
      className={status === '상담중' ? 'active' : 'pending'}
      isChecked={isChecked}
    >
    // ...
    </EstimateItemContainer>
  );
}};

const EstimateItemContainer = styled.li<StyleProps>`
  &.pending {
    display: ${({ isChecked }) => (isChecked ? 'none' : 'block')};
  }
`;
```

<br/>

- 🔎 필터링 구현 영상

![gif](https://user-images.githubusercontent.com/68415905/156321675-9bc7f32d-0c7e-4cde-b0da-bb9daa8a132a.gif)

## ♻ 프로젝트 리팩토링

### 필터 기능 수정

사실 이번 프로젝트에서 내가 맡은 부분은 필터 기능 구현이 아닌 UI 컴포넌트 설계과 토글 기능 구현 담당이었다. 그래서 필터링 부분에 대해서는 프로젝트가 끝난 후 다른 팀원이 작성한 필터링 코드를 보며 개선할 부분을 생각해보고 추가적으로 학습하였다.

- 리팩토링 전

```jsx
import { Estimate } from "types/card"
import { Category } from "types/category"

export const getFilter = (apiData: Estimate[], categories: Category) => {
  const newData = []
  for (let i = 0; i < apiData.length; i++) {
    const methodFiltered = apiData[i].method.filter((data: string) =>
      categories.method.includes(data)
    )
    const materialFiltered = apiData[i].material.filter((data: string) =>
      categories.material.includes(data)
    )
    if (
      methodFiltered.length >= categories.method.length &&
      materialFiltered.length >= categories.material.length
    ) {
      newData.push(apiData[i])
    }
  }
  return newData
}
```

위 코드에서 리팩토링한 항목은 아래와 같다.

1. type이 불필요하게 2군데로 나누어져 있음
   👉 type 파일 1개로 합치기

2. filter method도 배열을 반환하는데 별도로 배열 변수를 추가해서 push함

   👉 추가로 할당된 배열을 없애고 filter된 배열 자체를 return하도록 수정

3. for loop내부에서 filter를 써서 시간복잡도 발생

   👉 2번에서 배열을 삭제함으로써 for loop 필요 없어짐

4. 함수명을 getFilter에서 filterData 변경 (좀 더 명시적으로)

<br/>

- 리팩토링 후

```jsx
import { Estimate, Category } from "types"

export const filterData = (apiData: Estimate[], categories: Category) => {
  const filtered = apiData.filter((item: Estimate) => {
    // '재료' 카테고리에서 선택된 옵션과 모두 일치하면 true
    const materials = categories.material.every((option: string) =>
      item.material.includes(option)
    )
    // '가공방식' 카테고리에서 선택된 옵션과 모두 일치하면 true
    const methods = categories.method.every((option: string) =>
      item.method.includes(option)
    )
    // 두 조건에 모두 부합하는 item만 필터링하여 출력
    return materials && methods
  })
  return filtered
}
```

### 옵션명 유틸 함수 추가

아이템별로 `[밀링], [밀링,선반], [선반]...` 과 같이 옵션이 다 달랐는데 데이터가 가진 옵션을 분석하여 동적으로 카테고리 옵션을 만들어주었다.

1. `.flat()` method로 데이터가 가진 옵션명 모두 합치기

   ex) `[밀링], [밀링,선반], [선반]` ➡ `[밀링, 밀링, 선반, 선반]`

2. `Set`을 사용하여 중복 제거

   ex) `[밀링, 밀링, 선반, 선반]` ➡ `[밀링, 선반]`

하지만 기존에는 두가지 옵션(material,method)을 각각 따로 `flat`처리하고 다른 state로 관리해서 코드의 가독성이 떨어졌다. 그래서 `getOptionList`라는 유틸함수를 만들어 코드의 가독성을 높이고 state도 1개로 통일시켜 재사용성을 높였다.

<br/>

- 리팩토링 전

```jsx
const methodArr = apiData.map(data => data.method).flat(Infinity);
const materialArr = apiData.map(data => data.material).flat(Infinity);
const methodSet = Array.from(new Set(methodArr));
const materialSet = Array.from(new Set(materialArr));
const [selectMethod, setSelectMethod] = useState<string[]>([]);
const [selectMaterial, setSelectMaterial] = useState<string[]>([]);
const [isMethodOpen, setIsMethodOpen] = useState(false);
const [isMaterialOpen, setIsMaterialOpen] = useState(false);
```

- 리팩토링 후

```js
const optionName = name === '가공방식' ? 'method' : 'material';
const optionList = getOptionList(apiData, optionName);
const [select, setSelect] = useState<string[]>([]);
const [isOpen, setIsOpen] = useState(false);
```

```js
// getOptionList.ts
import { Estimate } from "types"

export const getOptionList = (
  apiData: Estimate[],
  option: "method" | "material"
) => {
  const list = apiData.map(data => data[option]).flat(1)
  return Array.from(new Set(list))
}
```

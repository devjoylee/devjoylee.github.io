---
title: "어드민 페이지 (이미지 첨부 기능 / useForm)"
description: "어드민 상품 등록 페이지 제작"
date: 2022-01-31
update: 2022-01-31
tags:
  - wanted
  - javascript
  - react
  - netlify
series: "Project Memoirs"
---

## ☝ 프로젝트 시작하기 전

이번 프로젝트는 e-Commerce 서비스에서 주로 사용하는 어드민 페이지를 제작하는 것으로 판매 상품을 등록할 수 있는 폼 양식이 포함된 상품 등록 페이지를 만들기로 했다. 팀원들과는 비슷한 옵션별로 역할을 분담한 후 작업했는데 반복 코드를 줄이기 위해 페이지 전체에서 공통으로 쓰이는 UI는 미리 컴포넌트로 만들어 두었다.

![none](https://user-images.githubusercontent.com/68415905/154843327-bd704dff-8fd1-40fd-a59c-ad9473b74690.jpg)

## 📌 프로젝트 링크

[Github](https://github.com/devjoylee/admin-product-registry)
[배포링크](https://wanted-admin-product.netlify.app/)

## 🧾 상품 등록 페이지

### 이미지 첨부 기능 `input▫type="file"`

상품 썸네일은 **최대 1개,** 상품 대표 이미지는 **여러개** 첨부 가능하도록 기능 구현.

![Untitled](https://user-images.githubusercontent.com/68415905/154844537-f04a2902-3194-478e-80b4-772e8f32539b.png)

- 파일 업로드 버튼 custom 하기 : **input**의 `id`와 **label**의 `htmlFor`에 같은 id를 입력한 후 input은 `display:none` 해주고 `label` 스타일링.

- 이미지 파일만 첨부 가능하게 : `accept="image/*"` 또는 `accept="image/png"`
- 파일 중복 선택 `multiple`

```jsx
// ImageUpload.js
<input
  id={id}
  type="file"
  accept="image/*"
  style={{ display: 'none' }}
  multiple={!(id === 'thumbnail')}
/>
<label htmlFor={id}>
  <RiAddLine />
  이미지 첨부
</label >
```

```jsx
// Page.js
<ImageUpload id="thumbnail" />
<ImageUpload id="main-img" />

```

---

### 업로드한 이미지 정보 가져오기 `e.target.files`

- 이미지가 1개 인경우 `e.target.files[0]` 으로 첫번째 파일 정보를 바로 가져온다

  ex) `e.target.files[0].name`

![Untitled (1)](https://user-images.githubusercontent.com/68415905/154844914-ba2629f7-f07c-43f5-9dc3-6ed2b477bcd8.png)

- 이미지가 여러개인 경우 `Array.from(e.target.files).map()` <br/>
  `e.target.files` 로 불러온 객체 형식의 데이터를 배열로 바꾸어서 관리해준다.

![Untitled (2)](https://user-images.githubusercontent.com/68415905/154844917-3640cfb1-63e8-4bc6-a679-a714aa0b575f.png)

첨부한 이미지 데이터가 담긴 배열을 `map`으로 순회하며 이미지 파일명만 추출해서 새로운 state에 저장하고 화면에 출력하도록 설계했다.

```jsx
// ImageUpload.js
const [imageList, setImageList] = useState([])
const handleUpload = e => {
  const uploadedImage = Array.from(e.target.files).map(file => file.name)
  if (id === "thumbnail") {
    setImageList(uploadedImage)
  } else {
    setImageList([...imageList, ...uploadedImage].reverse())
  }
}
```

---

### 이미지 preview `URL.createObjectURL`

`URL.createObjectURL`로 이미지 파일의 URL을 추출하고 img태그의 src로 넣어준다.

```jsx
const [imgUrl, setImgUrl] = useState("")
const getImageUrl = e => {
  let file = e.target.files[0]
  let url = URL.createObjectURL(file)
  setImgUrl(url)
}
```

```jsx
<img src={imgUrl} alt="" />
```

---

## ♻ 프로젝트 리팩토링

처음엔 필수옵션이 기입되지 않은 경우 '필수 값을 모두 입력하세요!' 라는 alert이 보여지도록 코드를 작성했다. 하지만 사용자의 입장에서 어떤 옵션이 비어있는지 구체적으로 알 수 있으면 좋을 것 같아 alert에서 비어있는 옵션명도 함께 알려주도록 리팩토링 해보기로 했다.

먼저 validation이라는 유틸함수를 만들고 값이 전달되지 않는 필수 옵션명의 이름을 리턴하도록 작성했다. 그리고 코드의 가독성을 위해 useForm이라는 커스텀 hook을 만들었고 validation에서 리턴된 옵션명을 alert에 출력하는 함수를 리턴하도록 구현했다.

![캡처](https://user-images.githubusercontent.com/68415905/154845357-06d08840-fb5d-455f-8aec-fe1331ce6d80.JPG)

### validation.js

```jsx
export const validation = required => {
  const inVaild = Object.keys(required).filter(
    key => !required[key] || required[key].length === 0
  )

  const inVaildList = inVaild.map(el => {
    switch (el) {
      case "category":
        return "카테고리"
      case "productName":
        return "상품명"
      case "description":
        return "상품 구성 소개 정보"
      case "stock":
        return "상품 총 재고"
      case "option":
        return "상품 옵션"
      default:
        throw new Error("Unknown option type")
    }
  })

  return inVaildList
}
```

### useForm.js

```jsx
export const useForm = requiredList => {
  const [required, setRequired] = useState(requiredList)
  const addRequired = useCallback(
    (name, value) => {
      setRequired(prev => ({
        ...prev,
        [name]: value,
      }))
    },
    [setRequired]
  )

  const handleClick = () => {
    const inVaild = validation(required)
    if (!inVaild.length) {
      submitForm()
    } else {
      alert(
        `필수 값을 모두 입력하세요 ❗❗
👉 ${inVaild.join(", ")}을(를) 추가해주세요!`
      )
    }
  }

  const submitForm = () => {
    alert("상품이 등록 되었습니다 🎉🎉")
  }

  return { addRequired, handleClick }
}
```

- useForm 사용

```jsx
const { addRequired, handleClick } = useForm({
  category: [],
  productName: "",
  description: "",
  stock: "",
  option: [],
})

return (
  <RegistryForm onSubmit={e => e.preventDefault()}>
    <TopButton name="저장하기" handleClick={handleClick} type="submit" />
    <BasicInformation title="상품 기본 정보" addRequired={addRequired} />
    <OptionMain title="상품 옵션" addRequired={addRequired} />
    // ...
  </RegistryForm>
)
```

<br />

> REFERENCE<br />Stack Overflow https://stackoverflow.com/questions/60151566/display-file-name-for-custom-input-file-using-reactjs<br />[React] useForm 만들기 https://velog.io/@junghyeonsu/React-useForm

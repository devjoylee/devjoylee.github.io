---
title: "싸이월드 클론 built in NextJS"
description: "싸이월드 클론"
date: 2022-11-10
update: 2022-11-10
tags:
  - typescript
  - react
series: "Project Memoirs"
---

<img src="https://user-images.githubusercontent.com/68415905/201012943-51174d9b-43fa-4103-80da-1469f2aed925.png" alt="" width="800" align="center" />

## 😎 프로젝트 소개

> NextJS와 GraphQL로 빌드한 싸이월드 클론 프로젝트

- 제작 기간 : 2022.10.14 - 2022.11.03
- [Github Repo](https://github.com/devjoylee/cyworld)
- [프로젝트 배포 링크](https://cyworld-nb.vercel.app/)

## 🚀 프로젝트를 시작하기 전에..

### 1. NextJS & GraphQL 설치

```bash
npx create-next-app cyworld --typescript
npm install @apollo/client graphql
```

### 2. 폴더 구조

```bash
public
 ├── images
 └── icons

pages
 ├── diary
 │ ├── [id]
 │ │   ├── edit.tsx     // diary/12030/edit
 │ │   └── index.tsx    // diary/12030
 │ ├── new.tsx          // diary/new
 │ └── index.tsx        // diary
 ├── game
 │     └── index.tsx    // game
 ├── \_app.tsx
 ├── \_document.tsx
 └── index.tsx          // home

src
 ├── components
 ├── styles
 ├── hooks
 ├── queries
 ├── types
 └── utils
```

### 3. 절대 경로 설정

파일 import 시, `../../../components/Common` 와 같은 상대경로를 `@components/Common` 와 같은 절대경로로 바꿔준다. <br/>
(tsconfig.json 파일에 baseUrl, paths key추가)

```json
// tsconfig.json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@*": ["./src/*"]
  }
}
```

### 4. SCSS-modules 사용

- scss를 사용하려면 `npm i sass` 라이브러리 설치를 해야한다.
- `.module.scss` 파일을 만들어 필요한 scss를 추가하고 import해서 사용.
- 작성한 scss는 아래와 같이 className에 `styles.클래스명`을 추가해서 적용시킨다.

```jsx
// SectionTitle.tsx
import styles from "./SectionTitle.module.scss"

export const SectionTitle = () => {
  return <h2 className={styles.section_title}>{title}</h2>
}
```

```jsx
// SectionTitle.module.scss
@import '@styles/variables.scss';

.section_title {
  display: flex;
  align-items: center;
  color: $main-color-1;
}

```

### 5. 레이아웃 만들기

<img src="https://user-images.githubusercontent.com/68415905/201014999-8fb3eb43-4039-4c85-b4cd-98a473ae0945.png" alt="" width="650" />

```jsx
interface Props {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  return (
    <div className={styles.bg}>
      <div className={styles.innerbox}>
        <Header />
        <div className={styles.app_container}>
          <Profile />
          <ContentWrap>{children}</ContentWrap>
          <Navbar />
        </div>
      </div>
    </div>
  )
}
```

- ⭐ `children` props의 타입 → React.ReactNode
- Navbar의 각 메뉴를 클릭하면 ContentWrap에 해당하는 UI가 바뀐다 (`children`으로 전달되는 것 들)

## ✨ 프로젝트 주요 기능

### 1. checkbox selectAll

```js
export const BGMs = () => {
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [isSelectedAll, setIsSelectedAll] = useState(false)

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    setIsSelectedAll((prev) => !prev)
    if (checked) {
      setCheckedList(BGMList.map((item) => item.id + ''))
    } else {
      setCheckedList([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target

    if (checked) {
      setCheckedList([...checkedList, id])
    } else {
      setCheckedList(checkedList.filter((item) => item !== id))
      setIsSelectedAll(false)
    }
  }

  return (
    <section className={styles.bgm_list}>
      <SectionTitle title='추억의 BGM' subtitle='TODAY MUSIC' />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkbox}>
              <input
                type='checkbox'
                id='selectAll'
                checked={isSelectedAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className={styles.num}>번호</th>
            <th className={styles.title}>곡명</th>
            <th className={styles.artist}>아티스트</th>
          </tr>
        </thead>
        <tbody>
          {BGMList.map(({ id, title, artist }) => (
            <tr key={id}>
              <td className={styles.checkbox}>
                <input
                  type='checkbox'
                  id={id + ''}
                  onChange={handleChange}
                  checked={checkedList.includes(id + '')}
                />
              </td>
              <td className={styles.num}>{id}</td>
              <td className={styles.title}>{title}</td>
              <td className={styles.artist}>{artist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const BGMList = [
  { id: 1, title: 'After LIKE', artist: 'IVE (아이브)' },
  { id: 2, title: '사랑스러워', artist: '김종국' },
  { id: 3, title: 'Attention', artist: 'NewJeans' },
  { id: 4, title: 'Love Love Love', artist: '에픽하이' },
  { id: 5, title: 'Pink Venom', artist: 'BLACKPINK' },
  { id: 6, title: '눈의꽃', artist: '박효신' },
  { id: 7, title: 'Hype boy', artist: 'NewJeans' },
  { id: 8, title: 'FOREVER 1', artist: '소녀시대' },
  { id: 9, title: '그때 그 순간 그대로', artist: 'WSG워너비' },
  { id: 10, title: '애인있어요', artist: '이은미' },
]
```

<br />

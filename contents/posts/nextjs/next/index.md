---
title: "NextJS"
description: "NextJS"
date: 2022-11-10
update: 2022-11-10
tags:
  - NextJS
  - react
series: "NextJS"
---

<!-- - **Routing**

`a` 태그를 사용하면 페이지가 새로고침되어 리렌더링이 발생해 적합하지 않음

next가 제공하는 `Link`태그를 사용해야한다

Link 태그에는 속성을 줄 수 없으므로 내부에 <a> 로 한번 더 감싸고 속성을 추가해야한다

```jsx
import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a className="home">Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  )
}
```

- SEO

```js
export const SEO = ({ title }: { title: string }) => {
  const text = title + " | Cyworld via Numble"
  return (
    <Head>
      <title>{text}</title>
    </Head>
  )
}
``` -->

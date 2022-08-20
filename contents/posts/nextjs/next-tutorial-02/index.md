---
title: "NextJS ver.13 특징 살펴보기"
description: "NextJS ver.13 특징 살펴보기"
date: 2022-11-10
update: 2022-11-10
tags:
  - NextJS
  - react
series: "NextJS"
---

## app/ Directory

**app/ 디렉토리 구조는 beta버전이기 때문에 실제 프로덕션 레벨에서는 권장되지 않는다.**

<img src="https://velog.velcdn.com/images/hwangyena/post/0e40f528-e985-4164-a017-ae67cd6ff3e2/image.png" alt="pic" witdh="800">

기존에는 pages 디렉토리 안에 파일을 생성하여 Automating Routing을 실행했지만, 13버전부터는 app/이라는 새로운 디렉토리가 등장하였다. 파일 시스템 기반에서 디렉터리 기반 라우팅 시스템으로 전환하였다. 현재는 pages와 app 디렉토리가 공존하는 베타 버전으로 제공된다. app 디렉토리 안에는 layout.js, page.js, head.js파일이 존재한다. \*dev server를 돌리면 자동적으로 head.js와 layout.js를 생성해준다.

- page.js : 고유한 ui를 정의하는데 사용(index.js같은 느낌)
- layout.js : 여러 경로에서 공유되는 ui를 정의하는데 사용(nav, footer 컴포넌트)

## Data Fetching

- 이제 getStaticProps, getServerSideProps 사용 대신, 간편하게 `use` hooks 사용으로 SSR을 대체할 수 있어졌다.
- `use` hook을 사용하면 fetch, cache, 데이터 재검증을 컴포넌트 레벨에서 가능해진다.
- 즉, Static Site Generation (SSG), Server-Side Rendering (SSR), 그리고 Incremental Static Regeneration (ISR)의 모든 이점을 하나의 API를 통해 사용할 수 있다.

<img src="https://velog.velcdn.com/images/hwangyena/post/cce5ed30-39be-466c-9e44-ddc7233ca369/image.png" />
<img src="https://velog.velcdn.com/images/hwangyena/post/536b971e-9433-4167-9dcc-9f079d769fab/image.png" width="500" />

## @next/font

새로 등장한 `next/font`! 브라우저에서 Google로 폰트 import 요청없이 폰트 사용이 가능하다.<br/>

[next/font Docs 보러가기](https://nextjs.org/docs/api-reference/next/font)

- CSS와 font는 빌드 타임에 정적 자원으로 불러와지기 때문에 실제 브라우저에서는 google로 요청을 보낼일이 없다
- 개인 정보 보호 및 성능 향상을 위한 외부 네트워크 요청 제거
- 모든 폰트 파일에 대한 자동 self-hosting 내장
- CSS의 size-adjust 속성을 자동으로 적용 -> Layout shift 요소 제거
- 다양한 weight와 styles 사용 시 배열을 사용

```js
import { Inter, Roboto } from '@next/font/google';

const inter = Inter();
<html className={inter.className}>

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})
```

커스텀 폰트(local)도 자동 self-hosting, 캐싱, pre-loading 기능과 함께 제공된다.

```js
import localFont from '@next/font/local';

const myFont = localFont({ src: './my-font.woff2' });
<html className={myFont.className}>
```

## next/image

레이아웃 변경 없이 쉽게 이미지를 표시하고 성능 향상을 위해 필요에 따라 파일을 최적화할 수 있게 되었다. 기존에는 width height값을 적용하지 않으면 레이아웃이 깨지는 Layout shift가 발생하곤 했는데 Next.js 13에서는 이를 자동으로 처리해준다.

- client-side JavaScript에서 image shift 현상 최소화
- 웹 플랫폼에 맞게 조정
- 스타일링과 설정이 더 편해짐
- 기본적으로 `alt` 태그를 내장하여 접근성을 향상시킴 (필수)
- 네이티브한 lazy 로딩은 hydartion이 필요없기 때문에 더 빠름
- ⚠️ 기존에 사용되던 next/image 는 next/legacy/image path로 import 할 것.

### CLS 방지

> Next.js will automatically determine the width and height of your image based on the imported file. These values are used to prevent Cumulative Layout Shift while your image is loading.

자동으로 width 랑 height 정보를 받아와서, CLS 를 막아준다. 하지만, 로컬 이미지 파일이 아닌 remote URL 기반이라면, 반드시 width와 height을 명시해주어야 한다.

### Priority

Next JS Image에는 priority 속성이 있는데 LCP(Largest Contentful Paint)를 줄일 수 있게 도와주는 기능이다. 쉽게 말하자면, 사용자 화면에 모든 UI 렌더링되는 최종 시간을 줄일 수 있다는 뜻이다. 이미지 용량이 커서, 렌더링 저하를 유발시킬 것 같은 이미지 컴퍼넌트에 아래와 같이 priority 속성을 줌으로서, next js 가 화면을 로딩할 때 해당 이미지 렌더링에 우선순위를 줘고 최종적으로 LCP를 줄일 수 있다고 한다.

```js
import Image from "next/image"

export default function Home() {
  return <Image src="/me.png" alt="photo" width={500} height={500} priority />
}
```

## next/link

- Link Component 안에 더이상 `<a>` 태그를 사용하지 않아도 된다.
- Link 태그에도 props나 함수를 사용할 수 있다.

```js
// before
<Link href="/about">
  <a onclick={()=>console.log('clicked')}>About</a>
</Link>

// after
<Link href="/about" onclick={()=>console.log('clicked')}>
  About
</Link>
```

---
title: "Next-Auth로 Google 로그인 기능 구현"
description: "Next-Auth로 Google 로그인 기능 구현"
date: 2022-11-19
update: 2022-11-19
tags:
  - NextJS
  - react
series: "NextJS"
---

## ✨ Next-Auth란?

> Next.js에서 소셜 로그인 기능을 쉽게 추가하고 관리할 수 있는 Node.js 라이브러리 (Authentication)<br/>📝 [Next-Auth Docs 바로가기](https://next-auth.js.org/getting-started/example)

### Installation

```bash
npm install next-auth
npm install @next-auth/mongodb-adapter mongodb
```

## 🔎 Next Auth 설정하기

### 1. Google OAuth 인증 정보 발급

Next Auth를 설정하기에 앞서 사용하고자 하는 API의 Client ID와 Key를 발급받는다. 👉[Google OAuth Client ID 발급 방법](https://devjoylee.github.io/google-auth-clientid/)

### 2. 환경 변수 설정

발급받은 Google OAuth 클라이언트 정보를 `.env.local` 파일에 아래와 같이 추가한다.

```
GOOGLE_CLIENT_ID=7800994348....
GOOGLE_CLIENT_SECRET=GOCSPX....
```

### 3. Next Auth API 만들기

page 폴더 내에 `api/auth/[...nextauth].js` 파일을 만들고 아래 코드를 추가한다. <br/>이 파일은 `/api/auth/*` 의 경로로 요청되는 모든 request를 처리한다.

```js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // add more providers here
  ],
});
```

### 4. Next.js에 nextauth 연결하기

아래와 같이 next-auth가 제공하는 Provider로 컴포넌트를 감싸주면 next.js 내 모든 컴포넌트에서 useSession hooks를 활용하여 session 정보에 접근할 수 있게 된다.

```js
//_app.js
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### 5. 컴포넌트에 nextAuth 추가하기

- useSession Hook

로그인 여부를 알려주는 hook으로 로그인 여부에 따라 배열의 **첫번째 인자는 유저 정보, 두번쨰 인자로는 loading 상태**를 return 한다. 아래 코드는 session 변수로 로그인 상태를 확인하고 로그인/로그아웃 버튼을 출력한다.

- signIn, signOut 함수

signIn, signOut 함수는 next auth에서 제공해주는 함수로 해당 함수를 실행하면 next-auth가 만들어 놓은 로그인 페이지 혹은 로그아웃 페이지로 이동한다. 👉 [signIn & signOut 링크설정하기](https://next-auth.js.org/configuration/pages)

```js
// index.js
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession();
  if (loading) return <div>loading...</div>;

  return <>
    {!session &&
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    }
    {
      session &&
      Signed in as {session.user.name} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    }</>
  }
```

<br />
<br />

> REFERENCE<br /> NextAuth 공식문서 https://next-auth.js.org/

---
title: "Next-Auth + MongoDB 로그인 유저값 저장하기"
description: "Next-Auth + MongoDB 로그인 유저값 저장하기"
date: 2022-12-05
update: 2022-12-05
tags:
  - NextJS
  - react
series: "NextJS"
---

## 1️⃣ MongoDB 프로젝트 생성

1. https://www.mongodb.com/ 홈페이지에서 회원가입 후, 프로젝트를 생성 한다.

<img src="https://user-images.githubusercontent.com/68415905/221728163-0a33eb92-aab6-4bc8-a38d-946a5fbec98a.JPG" alt="img" width="800"  >

2. 생성한 프로젝트에 데이터 베이스를 추가한다. Free 버전 선택!
   <img src="https://user-images.githubusercontent.com/68415905/221728166-1675d8c6-c27a-431a-96c2-159272f32a22.JPG" alt="" width="700" />

3. Security > Database Access에서 사용자를 추가한다. 이때 패스워드는 나중에 쓰이므로 저장해둘 것!
   <img src="https://user-images.githubusercontent.com/68415905/221728172-cee90bf9-2d0f-4bac-bfee-3a449844f92d.JPG" alt="" />

4. Security > Network Access에서 IP주소를 추가한다
   <img src="https://user-images.githubusercontent.com/68415905/221731897-6db80b63-2c1a-4d10-b28d-432a1dbc6f17.JPG" alt="" width="550" style="margin:0"/>

## 2️⃣ 로컬에 MongoDB 환경 설정하기

[📝 Go to Next Auth + MongoDB Docs](https://next-auth.js.org/adapters/mongodb)

1. MongoDB Installation

```bash
npm install next-auth @next-auth/mongodb-adapter mongodb
```

2. `lib/mongodb.ts` 경로에 아래 코드를 추가한다.

```js
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
```

3. 만들어둔 next auth API에 MongoDB 어댑터를 추가한다 (경로 : `pages/api/auth/[...nextauth].js`) <br/>
   `adapter`를 사용할 때는 session strategy를 jwt로 설정해준다. [👉 jwt 인증방식 더 알아보기](https://devjoylee.github.io/node-tutorial-04/)

```js
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  }
  ...
})
```

## 3️⃣ JWT Secret 발급 받기

1. generate-secret.vercel.app 에서 JWT 코드를 발급 받는다. (코드 복사)
2. `.env.local` 파일에 복사한 코드를 저장한다

```
JWT_SECRET=0b7001621f33~~~
```

3. 만들어둔 next auth API에 secret 코드를 추가한다 (경로 : `pages/api/auth/[...nextauth].js`)

```js
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET
  ...
})
```

## 4️⃣ 데이터베이스 연결하기

1. MongoDB 데이터베이스가 만들어 지면 `Connect` 버튼을 눌러 아래와 같은 코드를 발급받는다.

<img src="https://user-images.githubusercontent.com/68415905/221734881-6eb6dcee-b437-44c7-9de1-97f3bfdf9391.JPG" alt="" width="700"/>

2. `.env.local` 에 발급받은 코드를 추가한다 (경로 : `pages/api/auth/[...nextauth].js`) <br/>
   여기서 `<password>`는 처음에 사용자 추가할 때 발급받은 비밀번호로 바꿔주고 `myFirstDatabase`는 앱이름으로 교체

```
MONGODB_URI=mongodb+srv://admin:<password>@cluster0.upmnolv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

## 5️⃣ 미들웨어 추가하기

미들웨어(Middleware)는 요청이 완료되기 전에 코드를 호출할 수 있는 기능을 제공한다.<br/>
덕분에 응답을 수정하고, 리다이렉트하고, 헤더를 추가하고, 심지어 HTML을 스트리밍할 수 있다. <br/>
[👉 NextJS 미들웨어 Docs 보러가기](https://nextjs.org/docs/advanced-features/middleware)

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*iO3GXX2ofuOF6CQUcG9u-g.png" alt="">

```js
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl

  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    })

    // login 유저가 없으면 /home
    if (!session) return NextResponse.redirect(`${origin}/home`)
    // login 유저가 있으면 /feed
    else return NextResponse.redirect(`${origin}/feed`)
  }
}
```

## 6️⃣ 로그인 버튼과 provider 연결

`getServerSideProps` 를 사용해서 추가한 provider를 가져온 후, 로그인 요청 시 유저값을 전송한다.

```ts
import { getProviders } from "next-auth/react"
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next"

// access to the google provider by props
const Home: NextPage = ({ providers }: ProviderType) => {
  return Object.values(providers).map((provider: any) => (
    <div key={provider.name}>
      <div className="pl-4">
        <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
          Sign In
        </button>
      </div>
    </div>
  ))
}

// server side rendering
export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders()
  return { props: { providers } }
}
```

<br />
<br />

> REFERENCE<br /> NextAuth 공식문서 https://next-auth.js.org/<br/> NextJS Middleware https://nextjs.org/docs/advanced-features/middleware

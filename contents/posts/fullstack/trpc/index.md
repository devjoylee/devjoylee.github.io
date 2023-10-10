---
title: "타입 안정성을 위한 최적의 선택: tRPC API 개발 가이드"
description: "타입 안정성을 위한 최적의 선택: tRPC API 개발 가이드"
date: 2023-09-11
update: 2023-09-11
tags:
  - fullstack
series: "Full Stack"
---

## tRPC 소개

tRPC는 풀스택 타입스크립트 환경에서 타입 안전한 백엔드 API를 작성할 수 있도록 돕는 라이브러리이다. <br/> tRPC를 사용하면 백엔드와 프론트엔드 간의 통신을 단순화하여 풀스택 타입스크립트 개발의 생산성을 크게 향상시킬 수 있다. 

## 기존 HTTP 호출방식의 문제점

과거에는 Swagger를 사용해 .yaml 파일을 기반으로 스키마를 생성하는 경우가 많았다. GraphQL에서도 마찬가지로, API를 설명하기 위해 GraphQL 언어를 배워야 하고, 변경이 있을 때마다 API 정의/스키마를 다시 생성해야 했다.

### 문제 1: 프론트엔드에서 요청을 보낼 때

프론트엔드에서 백엔드로 HTTP 요청을 보낼 때, 보내는 데이터의 타입이 백엔드에서 요구하는 타입과 일치하는지 타입스크립트 레벨에서 확인할 수 없다. 예를 들어, 잘못된 필드명을 가진 데이터를 보내더라도 타입스크립트 컴파일 시점이나 런타임에서 에러가 발생하지 않는다.

```tsx
const input = { name: "Hello", content: "World" }; // 잘못된 필드명
const response = await fetch("/api/post", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(input),
});
const data = await response.json();
```

### 문제 2: 백엔드에서 요청을 받을 때

백엔드에서 받은 데이터의 타입이 실제로 기대하는 타입과 같은지 확인할 수 없다. 예를 들어, 아래와 같이 req.body를 사용할 때 런타임에 타입 검증이 이루어지지 않는다.

```tsx
const input: PostInput = req.body;
```

### 문제 3: 백엔드에서 프론트엔드로 응답을 전달할 때

백엔드에서 프론트엔드로 응답을 전달할 때, 백엔드의 응답 타입을 프론트엔드에서 바로 확인할 수 없다. 프론트엔드에서는 여전히 any 타입을 가진 데이터를 받게 된다.

```tsx
// 백엔드 코드:
res.status(200).json(post);

// 프론트엔드 코드:
const data = await response.json(); // 하지만 프론트엔드에서는 `any`를 받음
```


## tRPC의 주요 특징

1. **타입 안전성:** 타입스크립트를 활용하여 백엔드와 프론트엔드 간의 타입 안전성을 보장한다.
2. **코드 생성 없음:** 별도의 스키마나 코드 생성 없이 타입 안전성을 유지한다.
3. **간편한 통신 :** RPC 방식을 사용하여 함수형식으로 백엔드 API를 호출함으로써 REST API나 GraphQL에 비해 더 직관적이고 사용하기 쉬운 통신 방식을 제공한다.
4. **빠른 개발 속도:** 백엔드의 API 코드와 프론트엔드의 호출 코드 간에 빠르게 이동할 수 있다. 

## tRPC 작동 원리

tRPC는 다음과 같은 방식으로 서버와 클라이언트 간에 타입 안전한 API 호출을 가능하게 한다. 

### **Server 측 설정**
서버에서 API 라우터를 정의하고, 각 라우터에 대해 입력 스키마와 출력 스키마를 지정한다. 이를 통해 서버는 입력 데이터의 유효성을 검사하고, 올바른 출력 데이터를 반환할 수 있다.

```tsx
import { z } from "zod"; // 입력 데이터의 유효성 검사에 필요한 라이브러리
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"; 

// title과 content를 입력받아 새로운 게시물을 생성하고 생성된 게시물의 정보를 반환하는 프로시저
export const postRouter = createTRPCRouter({
  createPost: publicProcedure  // createPost라는 프로시저를 정의
    .input(z.object({
      title: z.string(), // title : 문자열
      content: z.string(), // content : 문자열
    }))
    .mutation(({ input }) => {  
	    // mutation 함수 : 데이터 처리 후 결과를 반환
      return {
        id: "1", // 생성된 게시물의 고유 ID
        title: input.title, // 입력 받은 title을 그대로 반환
        content: input.content, // 입력 받은 content를 그대로 반환
        createdAt: new Date(), // 생성 시간 반환
      };
    }),
});

```

### **Client 측 호출**
클라이언트에서는 서버에서 정의한 API 라우터를 사용하여 함수를 호출한다. 이 때, 타입스크립트는 입력 데이터가 올바른지 검사하고, 서버에서 반환되는 데이터의 타입을 추론함으로써 타입 안전성을 보장한다.

```tsx
import { api } from "~/utils/api"; // tRPC 클라이언트를 가져온다

// useMutation 훅을 이용해 createPostMutation을 정의
const createPostMutation = api.post.createPost.useMutation();

// createPost 함수 생성
const createPost = async () => {
  // mutateAsync 함수를 사용해 서버에 createPost 요청 전송
  const result = await createPostMutation.mutateAsync({
    title: "Hello", // 서버에 전달할 title 값
    content: "World", // 서버에 전달할 content 값
  });

  console.log(result);  // 서버에서 반환된 결과를 출력
};
```

## tRPC vs GraphQL

tRPC와 GraphQL은 모두 API를 구축하는 데 사용되는 기술이지만, 몇 가지 중요한 차이점이 있다. 

**타입 시스템과 안정성**

- tRPC: TypeScript 기반으로 API의 입력과 출력 데이터를 타입화하여 안전성을 제공한다.
- GraphQL: 서버가 제공하는 스키마를 기반으로 클라이언트가 원하는 데이터를 요청하고 서버는 해당 스키마에 따라 데이터를 반환한다. 타입 안정성은 tRPC에 비해 상대적으로 낮다.

**데이터 흐름과 API 디자인**

- tRPC: RPC 스타일로 서버에서 정의한 API 메서드를 클라이언트에서 직접 호출할 수 있다.
- GraphQL: 클라이언트는 쿼리를 작성하여 원하는 데이터를 명시적으로 요청하고 서버는 해당 쿼리에 맞게 데이터를 반환한다. 

**통신 프로토콜과 환경**

- tRPC: HTTP/2를 기반으로 하며 gRPC와 유사한 방식으로 작동한다.
- GraphQL: HTTP나 WebSockets와 같은 다양한 통신 프로토콜을 지원하여 다양한 환경에서 사용할 수 있다. 특히 실시간으로 데이터 통신이 가능하다.

**도구 지원과 생태계:**

- tRPC: TypeScript와의 호환성은 뛰어나지만 GraphQL에 비해 도구의 활용도가 떨어진다.
- GraphQL: Apollo, Relay 등의 클라이언트 라이브러리와 함께 사용할 수 있고 다양한 도구를 지원한다.

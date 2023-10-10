---
title: "NextJS ver.14: 서버 컴포넌트와 서버 액션"
description: "NextJS ver.14: 서버 컴포넌트와 서버 액션"
date: 2023-10-10
update: 2023-10-10
tags:
  - NextJS
  - react
series: "NextJS"
---

## NextJS 14 주요 업데이트

Next.js 14 버전에서는 서버 컴포넌트(Server Components)와 서버 액션(Server Actions)이라는 두 가지 기능이 업데이트되었다.

### 14 버전의 주요 개선점

- 개발자 환경 및 생산성 향상
- 유저가 다운로드하는 자바스크립트 코드 감소
- 많은 코드와 라이브러리 삭제 가능

## 1. 서버 컴포넌트

서버 컴포넌트는 컴포넌트를 서버에서 렌더링하여 클라이언트로 전송하는 방식이다. 이를 통해 클라이언트는 자바스크립트 코드를 제외한 최종 렌더링된 HTML를 전송받는다.

### 서버 컴포넌트의 장점
- 향상된 성능: 클라이언트로 전송되는 자바스크립트 양이 줄어들어 초기 로드 시간이 단축되므로 사용자 경험이 향상된다.
- 보안 강화: 서버에서만 데이터를 처리함으로 클라이언트에 민감한 데이터가 노출되지 않는다.
- 간편한 데이터 페칭: 서버에서 직접 데이터베이스나 API에 접근하여 데이터를 가져오기 때문에 클라이언트 측에서 복잡한 데이터 페칭 로직을 작성할 필요가 없다.

### 이전 버전과의 비교

**이전 버전 :**

```javascript
function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await (await fetch("/api/posts")).json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

**Next.js 14 버전 :**

```js
export default async function Posts() {
  const data = await (await fetch("/api/posts")).json()

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## 2. 서버 액션

서버 액션(Server Actions)은 서버에서 비동기 작업을 수행하고 결과를 클라이언트로 반환하는 새로운 패턴이다. 이를 통해 클라이언트에서 복잡한 상태 관리 없이 서버와의 상호작용을 단순화할 수 있다.

### 사용 예제

```js
'use server'; // 서버 컴포넌트 모드 활성화

import { useState } from 'react'; // useState 훅을 React로부터 가져옴

export default function LikeButton() {
  const [likes, setLikes] = useState(0); 

  async function handleLike() {
    'use server'; // 서버에서 실행되는 함수임을 명시

    // 서버에 /api/like 엔드포인트로 POST 요청을 보내고, 새로운 좋아요 수를 받아옴
    const newLikes = await (await fetch('/api/like', { method: 'POST' })).json(); 

    setLikes(newLikes); // 새로운 좋아요 수로 상태 업데이트
  }

  return (
    <button onClick={handleLike}> 
      Like ({likes})
    </button>
  );
}
```

### 서버 액션의 장점
- 간결한 코드: 클라이언트와 서버 간의 상호작용을 간소화하여 클라이언트에서의 상태 관리 코드가 줄어든다.
- 향상된 성능: 서버에서 직접 작업을 처리하므로 클라이언트에서의 부담이 줄어들어 전체적인 성능이 향상된다.
- 안정성 및 보안: 서버에서 비동기 작업을 처리하므로 클라이언트에서의 보안 취약점을 줄일 수 있다.

### 서버 액션 사용 시 고려사항
- 서버 액션은 서버에서 실행되므로 네트워크 지연에 대한 고려가 필요하다.
- 비동기 작업의 결과가 클라이언트에 즉시 반영되지 않을 수 있으므로 사용자 경험을 고려한 디자인이 필요하다.
- 서버에서의 작업이 실패할 경우 이를 처리할 적절한 에러 핸들링이 필요하다.
---
title: "NextJS 14: 새로운 기능과 주요 업데이트"
description: "NextJS 14: 새로운 기능과 주요 업데이트"
date: 2024-06-17
update: 2024-06-17
tags:
  - NextJS
  - react
series: "NextJS"
---

## NextJS 14 버전 개요

Next.js는 풀스택 웹 애플리케이션을 구축하기 위한 최고의 React 프레임워크입니다. 14 버전에서는 서버 컴포넌트(Server Components)와 서버 액션(Server Actions)이라는 두 가지 주요 기능이 업데이트되었습니다.

## 14 버전의 주요 개선점

- **개발자 환경 및 생산성 향상**
- **유저가 다운로드하는 자바스크립트 코드 감소**
- **많은 코드와 라이브러리 삭제 가능**

## 서버 컴포넌트

서버 컴포넌트를 사용하면 컴포넌트를 서버에서만 렌더링할지 여부를 선택할 수 있습니다. 이를 통해 유저는 결과 UI만 제공받고 컴포넌트 자바스크립트 코드는 다운로드하지 않습니다.

### 이전 버전과의 비교

**이전 버전:**

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

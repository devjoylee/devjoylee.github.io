---
title: "구글 로그인 기능 with Firebase"
description: "구글 로그인 기능 with Firebase"
date: 2022-03-03
update: 2022-03-03
tags:
  - firebase
series: "Web Hosting"
---

## 🎉 firebase 프로젝트 생성

1. Firebase 에 접속하여 새로운 프로젝트를 생성합니다. 👉 [Firebase 바로가기](https://console.firebase.google.com/u/1/)

<img src="https://user-images.githubusercontent.com/68415905/158337784-a2053611-e4c2-47f1-9ea8-6a6a3f9d6448.jpg" width="600" />

2. 프로젝트 이름을 입력합니다.

<img src="https://user-images.githubusercontent.com/68415905/158343612-0438483d-57db-400e-9d7c-eec6deb1c908.JPG" width="600" />

3. Analytics가 필요하지 않으면 OFF

<img src="https://user-images.githubusercontent.com/68415905/158343614-06dea897-3dbf-41f7-b94f-179b828739e1.JPG" width="600" />

4. 프로젝트에 해당하는 앱을 추가합니다. (ios / android / web)

<img src="https://user-images.githubusercontent.com/68415905/158344954-bbac48bd-a10e-4c39-bf5f-d5722dcd9752.JPG" width="600" />

5. 먼저 1)앱 이름을 정하고 2)생성되는 config 코드를 복사합니다. <br/>(프로젝트 배포도 함께 원하는 경우 옵션 체크)

<img src="https://user-images.githubusercontent.com/68415905/158344599-8465cce0-43dc-454c-bf16-f2a296469b28.JPG" width="600" />

## 🙍 Authentication 설정

1. Authentication 섹션에 접속하여 로그인 방법(sign-in method)을 선택합니다.

![fb4](https://user-images.githubusercontent.com/68415905/158357869-3d4ee65a-19c2-4cab-819b-0fdbb46eb859.JPG)
![fb5](https://user-images.githubusercontent.com/68415905/158358729-9deccf70-342f-4d05-a9d0-d86e2354ebdc.JPG)

2. 로그인 방법으로 **Google**을 선택한 후 이메일을 추가합니다.

![fb3](https://user-images.githubusercontent.com/68415905/158359051-be6288b6-151d-4319-a31b-3b6acae3788a.JPG)

![fb1](https://user-images.githubusercontent.com/68415905/158359382-7092d37f-5e43-465c-879a-1ce5f99af612.JPG)

## 🔀 firebase 프로젝트 연동

1. firebase 설치합니다

```bash
npm install firebase
```

2. `firebase.js` 파일을 생성한 후 복사한 config 코드를 붙여넣기 합니다.

```js
import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  // copy and paste
}

const app = firebase.initializeApp(firebaseConfig)

export default app.auth()
```

3. login 컴포넌트에 provider를 추가합니다.

```jsx
// LoginPage.js
import firebase from "firebase/app"
import auth from "../../firebase"

const provider = new GoogleAuthProvider()
export const LoginButton = () => {
  return <button onClick={signInWithPopup(auth, provider)}>로그인</button>
}
```

4. 로그인 실행 시 아래와 같은 로그인 popup창이 생깁니다.

![fb1](https://user-images.githubusercontent.com/68415905/158363860-38723771-32ae-4637-a856-887180b118c5.JPG)
![fb](https://user-images.githubusercontent.com/68415905/158363958-b206f96f-f441-46d6-b9b8-b4ca8d82bd6e.jpg)

5. 로그인에 성공하면 firebase > Authentication > Users에 이메일이 추가됩니다.

<br />
<br />

> REFERENCE<br /> React에서 Firebase Auth를 사용한 로그인 구글 로그인 구현 https://koras02.tistory.com/58

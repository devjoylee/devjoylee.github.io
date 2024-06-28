---
title: "[React Native] AppLoading 컴포넌트"
description: "[React Native] AppLoading 컴포넌트"
date: 2023-02-24
update: 2023-02-24
tags:
  - react-native
series: "React Native"
---

## AppLoading 이란

> React Native가 앱을 초기화(API 호출, 데이터베이스 로딩, 이미지 파일 다운로드)하는 동안 로딩 화면을 보여주는 컴포넌트

### Installation

```bash
expo install expo-app-loading
```

### Props

- `onFinish` : 로딩이 끝나면 호출되는 함수
- `onError` : 에러 발생 시, 실행시킬 함수
- `startAsync` : Promise가 resolve되거나 종료되었을 때 promise를 반환해주는 함수 (로딩에 필요한 항목들을 await 함수로 만들어 실행시켜줌)

### 사용 예시

```jsx
import AppLoading from "expo-app-loading"
import React, { useState } from "react"
import { Text } from "react-native"

export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    // 로딩에 필요한 항목들
    await new Promist(resolve => setTimeout(resolve, 4000))
  }

  if (!ready) {
    // 로딩되는 동안 AppLoading 보여주기!
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    )
  }
  return <Text>We are done loading!</Text>
}
```

### 폰트 / 이미지파일 preload

```bash
expo install expo-font
expo install expo-asset
```

1. **Fonts & Assets Hook 사용하기**

기타 필요한 작업이 없고 오직! 폰트와 이미지 load 만 필요한경우 hook을 써서 간단하게 구현할 수 있다. <br/> 원격이미지를 불러오는 `Image.prefetch()`는 사용 불가!

```jsx
export default function App() {
	const [assets] = useAssets([require("./my-face.jpeg")]);
	const [loaded] = Font.useFonts(Ionicons.font);

	if (!assets || !loaded) {
		return <AppLoading />
	}
```

<br/>

2. **함수 만들어서 사용**

폰트, 이미지 이외에도 로딩할 작업이 있는 경우 ( API 호출, 데이터베이스 초기화 등…) 아래와 같이 함수를 생성해서 사용한다.

- Font, Asset 불러오기함수를 나열한 형태

```jsx
const startLoading = async () => {
  await Font.loadAsync(Ionicons.font)
  await Asset.loadAsync(require("./my-face.jpeg"))
  await Image.prefetch("https://reactnative.dev/img/oss_logo.png")
}
```

- Font, Asset 인자를 배열로 받는 유틸함수를 만들고 `Promise.all`을 사용해서 한꺼번에 호출하는 형태

```jsx
import * as Font from "expo-font"
import { Text, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Asset, useAssets } from "expo-asset"

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font))

const loadImages = images =>
  images.map(image => {
    return typeof image === "string"
      ? Image.prefetch(image)
      : Asset.loadAsync(image)
  })

export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font])
    const images = loadImages([
      require("./my-face.jpeg"),
      "https://reactnative.dev/img/oss_logo.png",
    ])
    await Promise.all([...fonts, ...images])
  }

  if (!ready) {
    // 로딩되는 동안 AppLoading 보여주기!
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    )
  }
  return <Text>We are done loading!</Text>
}
```

<br/>
<br/>

> REFERENCE <br/>
> React Native 공식 문서 https://reactnative.dev/docs/getting-started <br/> Expo 공식 문서 https://docs.expo.dev/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

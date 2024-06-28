---
title: "[React Native] 꼭 알아야할 주요 특징"
description: "[React Native] 꼭 알아야할 주요 특징"
date: 2023-02-20
update: 2023-02-20
tags:
  - react-native
series: "React Native"
---

## 🔥 React Native 튜토리얼

> React Native는 웹브라우저가 아닌, IOS와 안드로이드 같은 운영체제와 소통하기 위한 도구(인터페이스)이다!

### 1. No DIV, Use View

- React Native는 웹사이트가 아니기 때문에 html 태그 (div, section, p..)를 쓸 수 없다.
- 대신 컨테이너로 `div` 대신 `View` 를 사용한다.
- 모든 View 컨테이너는 `flex` **레이아웃을 default로** 가지고 있으며, 기본 flex direction은 **COLUMN** 이다.
- `flex: 숫자` : pixel이 아닌 전체 스크린(또는 부모 크기)에 대한 **비율**을 설정해서 크기를 지정함<br/>
  → ❗ 모바일 스크린 사이즈가 다양하기 때문에 width와 height는 거의 사용하지 않는다.

```jsx
<View style={{ flex: 1 }}>
  <View style={{ flex: 1 }}></View> // height 1/5 차지
  <View style={{ flex: 3 }}></View> // height 3/5 차지
  <View style={{ flex: 1 }}></View> // height 1/5 차지
</View>
```

### 2. 모든 텍스트는 `<Text></Text>` 컴포넌트 안에서 작성해야한다

<img src="https://user-images.githubusercontent.com/68415905/221510862-08db2f01-62ad-48ec-b5db-cc62eb978271.JPG" alt="img" width="400"/>

### 3. 스타일은 객체 형식과 CamelCase로 작성하며 사용할 수 없는 스타일도 있다.

ex) `border: "1px solid #000"` ❌ 사용할 수 없음

스타일을 적용시키는 방식은 크게 3가지로 나뉜다.

- 인라인 스타일

```jsx
<View
  style={{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Text style={{ fontSize: 28 }}>Hello</Text>
</View>
```

- 스타일 객체 생성 (자동완성 지원 X)

```jsx
;<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 28 },
}
```

- `StyleSheet.create({})` : 자동완성을 사용할 수 있다.

```jsx
;<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 28 },
})
```

### 4. 위 모든 규칙에는 Import 필수 !

```jsx
import { View, Text, StyleSheet } from "react-native"
```

### 5. Component vs API

- Component : 화면에 렌더링할 항목 (View, Text …)
- APIs : 운영체제와 소통하기 위해 만들어 놓은 자바스크립코드

```jsx
<Button onPress={()=> Vibration.vibrate(~~)} />
// Component -> <Button />
// API -> Vibration.vibrate()
```

### 6. Third Party Packages

- 리액트 네이티브 Docs [https://reactnative.dev/docs/components-and-apis](https://reactnative.dev/docs/components-and-apis)

React Native의 이전버전에서는 다양한 컴포넌트와 API가 제공되었는데 업데이트 되면서 많은 기능들이 사라졌다. (AsyncStorage, Navigation..)

- React Native 커뮤니티 [https://reactnative.directory/](https://reactnative.directory/)

그래서 React Native 커뮤니티에서 Third Parth 패키지(컴포넌트, API)를 제공하고 있다. 하지만 사용자들이 오픈소스처럼 추가하기 때문에 종류가 매우 많고 업데이트가 불분명하다는 단점이 있다.

- Expo SDK [https://docs.expo.dev/versions/latest/](https://docs.expo.dev/versions/latest/)

이런 모든 단점을 보완하기 위해 ‘Expo’ 라는 플랫폼에서 React-Native 에서 사용할 수 있는 모든 컴포넌트와 API를 자체적으로 만들었다. (Expo SDK) 아래 처럼 필요한 기능을 설치하고 import해서 사용할 수 있다.

```jsx
expo install expo-document-picker
```

<br/><br/>

> REFERENCE <br/>
> React Native 공식 문서 https://reactnative.dev/docs/getting-started <br/> Expo 공식 문서 https://docs.expo.dev/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

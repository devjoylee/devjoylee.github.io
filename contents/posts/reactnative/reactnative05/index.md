---
title: "[React Native] Stack Navigator"
description: "[React Native] Stack Navigator"
date: 2023-03-07
update: 2023-03-07
tags:
  - react-native
series: "React Native"
---

## Stack Navigator 종류

React Navigation에서 Stack Navigator를 사용하여 화면 간 전환을 쉽게 구현할 수 있다.<Br/> Stack Navigator에는 JavaScript로 구현된 기본 Stack Navigator와 native API를 사용한 Native Stack Navigator가 있다.

### 차이점

- Stack Navigator : JavaScript로 구현된 Navigator로 성능은 약간 떨어질 수 있지만 커스텀이 쉽다.
- Native Stack Navigator : Native API로 구현된 Navigator로 성능이 편리하고 빠르지만 커스텀이 제한적입니다.

```bash
npm install @react-navigation/native-stack
```

### 사용 방법

Stack Navigator의 사용 방법은 Tab Navigator와 거의 유사하다. (`screenOptions` or `options`..). <br/>`navigate` Prop을 사용해서 가고싶은 스크린의 이름을 넘겨준다.

- 코드 예제

```jsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, TouchableOpacity } from "react-native"

const NativeStack = createNativeStackNavigator()

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
)

const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
)

const ScreenThree = ({ navigation: { goBack } }) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Go Back</Text>
  </TouchableOpacity>
)

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
)

export default Stack
```

## Navigation Props

React Navigation에서는 다양한 네비게이션 속성을 제공한다:

- `navigate`: 다른 화면으로 이동
- `reset`: 네비게이터 상태를 초기화하고 새 경로로 대체
- `goBack`: 현재 화면을 닫고 스택에서 뒤로 이동
- `setParams`: 라우트의 매개변수 변경
- `dispatch`: 네비게이션 상태 업데이트를 위한 액션 객체 전송
- `setOptions`: 화면의 옵션 업데이트
- `isFocused`: 화면이 포커스되었는지 확인
- `addListener`: 네비게이터의 이벤트 업데이트 구독

## Configuration

Stack Navigator에서 다음과 같이 설정할 수 있다.

- `headerBackTitleVisible`

뒤로 가기 아이콘(<) 옆에 텍스트를 표시할지 여부를 설정

```jsx
const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    ...
  </NativeStack.Navigator>
)
```

- `headerTitleStyle` : 헤더 스타일 변경 (커스텀 항목이 많지 않음) <br/> fontFamily , fontSize, fontWeight, color 정도만 변경이 가능하다

```jsx
const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTitleStyle: { fontSize: 24, color: "blue" },
    }}
  >
    ...
  </NativeStack.Navigator>
)
```

- `animation` & `presentation` : 스크린 전환 시 애니메이션 설정 ex) card, modal, flip … 👉 [애니메이션 종류 ](https://reactnavigation.org/docs/native-stack-navigator#animation)

```jsx
const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{ animation: "fade", presentation: "modal" }}
  >
    ...
  </NativeStack.Navigator>
)
```

## Tab + Stack 같이 사용하기

**1. Tab 안에서 Stack 렌더링 시키기**
<br/> `Tab.Screen` 컴포넌트 안에서 Stack Navigator를 렌더링하고 기존 탭 헤더를 가립니다.<br/>[https://github.com/nomadcoders/noovies/commit/c08c9f1ea28236985c266ff15a2fc2e0f6269f0e](https://github.com/nomadcoders/noovies/commit/c08c9f1ea28236985c266ff15a2fc2e0f6269f0e)

```jsx
const Tabs = () => (
  <Tab.Navigator initialRountName="Search">
    <Tab.Screen
      name="Movies"
      component={Stack}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
)
```

<br/>

**2. Root 컴포넌트 만들기 (Tab + Stack 을 각각 렌더링)**
<br/>Tab Navigator와 Stack Navigator를 함께 사용하여 두 네비게이터 사이를 이동할 수 있습니다.

```jsx
// Root.js
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Tabs from "./Tabs"
import Stack from "./Stack"

const Nav = createNativeStackNavigator()

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
)

export default Root
```

<br/>

- `navigate` 함수에 이동하고싶은 Navigator + Navigator의 screen 이름을 같이 전달해준다. <br/>그러면 원하는 네비게이터와 그 내부의 스크린으로 이동할 수 있다.<br/><br/>`navigate('이동할 네비게이터 이름', { screen: '네비게이터 내부 스크린이름' })`

```jsx
// Movies.js
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

const Movies = ({ navigation: { navigate } }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <TouchableOpacity onPress={() => navigate("Stack", { screen: "Three" })}>
      <Text>Go to Screen Three</Text>
    </TouchableOpacity>
  </View>
)

export default Movies
```

```jsx
// 네비게이션 구조 예시
Root {
  Tabs {
    // 'Stack' 네비게이터 안에 있는 'One' 스크린으로 이동
    Movies --> navigate(Stack, { screen: 'One' })
  }

  Stack {
    // 'Tabs' 네비게이터 안에 있는 'Search' 스크린으로 이동
    One --> navigate(Tabs, { screen: 'Search' })
  }
}
```

<br/>
<br/>

> REFERENCE <br/>
> React Navigation Docs https://reactnavigation.org/docs/stack-navigator/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

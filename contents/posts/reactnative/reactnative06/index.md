---
title: "[React Native] Dark & Light 테마 적용하기"
description: "[React Native]  Dark & Light 테마 적용하기"
date: 2023-03-10
update: 2023-03-10
tags:
  - react-native
series: "React Native"
---

## React Native Theme

React Native 앱에서 다크 모드와 라이트 모드를 지원하는 것은 사용자 경험을 향상시키는 중요한 요소이다. Dark & Light 테마를 설정하는 방법과 Theme Hook을 사용하는 방법을 알아보자!

### 테마 변경 단축키

Shift + Command + A (맥 기준)

## Theme 설정 방법

### useColorScheme로 직접 테마 설정

**1. 컬러 팔레트 정의**

먼저 사용할 색상을 정의한다. (Color Picker : [Flat UI Colors 2 - 14 Color Palettes, 280 colors 🎨](https://flatuicolors.com/))

```jsx
export const YELLOW_COLOR = "#ffa801"
export const BLACK_COLOR = "#1e272e"
export const DARK_GREY = "#d2dae2"
export const LIGHT_GREY = "#808e9b"
```

<br/>

**2.useColorScheme 훅 사용하기**

useColorScheme 훅을 사용하면 현재 시스템 테마가 다크 모드인지 라이트 모드인지를 알려준다. 이를 활용해 네비게이션 바와 탭 바의 스타일을 동적으로 변경할 수 있다.

[useColorScheme Docs](https://reactnative.dev/docs/usecolorscheme)

```jsx
import { useColorScheme } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === "dark"

  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  )
}

export default Tabs
```

### Theme Hook 사용하기

useColorScheme 훅을 사용하면 테마별로 색상을 개별적으로 지정해야 한다. 하지만 Theme Hook을 사용하면 미리 정의된 테마를 간편하게 적용할 수 있다. 아래 예시에서는 NavigationContainer 컴포넌트에 다크 모드일 때는 DarkTheme, 라이트 모드일 때는 DefaultTheme를 적용했다.

```jsx
import React from "react"
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native"
import { useColorScheme } from "react-native"
import Tabs from "./navigation/Tabs"

const App = () => {
  const isDark = useColorScheme() === "dark"

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  )
}

export default App
```

<br/>
<br/>

> REFERENCE <br/>
> React Navigation Docs https://reactnavigation.org/docs/stack-navigator/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

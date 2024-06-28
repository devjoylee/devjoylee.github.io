---
title: "[React Native] Tab Navigator"
description: "[React Native] Tab Navigator"
date: 2023-03-01
update: 2023-03-01
tags:
  - react-native
series: "React Native"
---

## React Navigation 설치

React Native 프로젝트에서 React Navigation을 사용하면 앱 내에서 다양한 화면 간에 네비게이션을 쉽게 구현할 수 있다.

[React Navigation Docs](https://reactnavigation.org/docs/getting-started/)

- 설치

```bash
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
```

- MAC 사용자는 추가로 설치

```bash
npx pod-install ios
```

## Bottom Tab Navigation

React Navigation로 화면 하단에 탭 네비게이션 UI를 구현할 수 있다. 이를 위해 createBottomTabNavigator를 사용합니다.

### 1. Tab Navigator 생성

먼저, Tabs라는 이름의 네비게이터를 생성하고 각각의 탭 메뉴를 설정한다. <ㅠ>
(`Tab.Navigator` 로 컨테이너를 만들고 `Tab.Screen`으로 탭 메뉴 지정)

```jsx
// navigation/Tabs.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)

export default Tabs
```

### 2. 각 화면 컴포넌트 생성

각 탭 메뉴 클릭 시 이동할 화면 컴포넌트를 별도의 폴더에 추가한다

```jsx
// screens/Movies.js
import React from "react"
import { View, Text } from "react-native"

const Movies = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Movies</Text>
  </View>
)

export default Movies
```

### 3. NavigationContainer로 감싸기

App.js애서 `NavigationContainer` 의 자식요소로 생성한 Tab 컴포넌트 불러온다.

```jsx
// App.js
import React from "react"
import Tabs from "./navigation/Tabs"
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}
```

## 설정 (Configurations)

### 초기 화면 설정

`initialRountName`을 사용하여 네비게이션 항목 중 처음 렌더링할 화면을 설정할 수 있다.

```jsx
const Tabs = () => (
  <Tab.Navigator initialRountName="Search">
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)
```

### 공통 옵션 설정

`screenOptions`를 사용하여 모든 화면에 적용할 설정을 정의할 수 있다. 예를 들어, 메뉴 아이콘이나 텍스트 스타일을 지정할 수 있다.

```jsx
const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { backgroundColor: "red" },
      tabBarActiveTintColor: "blue", // active color
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)
```

### 특정 화면 옵션 설정

특정 탭 화면에만 적용되는 설정은 `options`을 사용하여 정의할 수 있습니

```jsx
const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{ tabBarBadge: 5 }} // alert icon
    />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)
```

## Icons 추가하기

탭 네비게이션에서 아이콘을 추가하여 더 직관적인 UI를 제공할 수 있다.

- **`tabBarIcon` 사용 예시**<br/>
  아이콘을 추가하려면 react-native-vector-icons 라이브러리를 사용하여 tabBarIcon 옵션을 설정한다.

```bash
npm install react-native-vector-icons
```

```jsx
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "react-native-vector-icons"
import Movies from "../screens/Movies"
import Tv from "../screens/Tv"
import Search from "../screens/Search"

const Tab = createBottomTabNavigator()

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "Movies") {
          iconName = focused ? "ios-film" : "ios-film-outline"
        } else if (route.name === "Tv") {
          iconName = focused ? "ios-tv" : "ios-tv-outline"
        } else if (route.name === "Search") {
          iconName = focused ? "ios-search" : "ios-search-outline"
        }

        return <Ionicons name={iconName} size={size} color={color} />
      },
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)

export default Tabs
```

<br/>
<br/>

> REFERENCE <br/>
> React Navigation Docs https://reactnavigation.org/docs/getting-started/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

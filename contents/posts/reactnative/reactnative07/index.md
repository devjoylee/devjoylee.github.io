---
title: "[React Native] React Native로 날씨앱 만들기 with Expo"
description: "[React Native]  React Native로 날씨앱 만들기 with Expo"
date: 2023-03-21
update: 2023-03-21
tags:
  - react-native
series: "React Native"
---

## 프로젝트 초기화

1. [https://expo.dev/](https://docs.expo.dev/) 회원가입 후, 프로젝트 만들기
2. PC에 expo 설치하기 (command lines)
   <br/>

   - Window

   ```bash
   npm install --global expo-cli
   ```

   - iOS

   ```bash
   npm install --global expo-cli
   brew update
   brew install watchman
   ```

3. 휴대폰에 expo 설치 후 회원가입하기 : [안드로이드 → Expo 설치] [IOS → Expo Go 설치]
4. PC에 프로젝트 폴더 생성 후, QR코드 발급받기

```bash
npx create-expo-app weather
npx expo start
```

5. 터미널에 나타난 QR코드를 휴대폰 카메라로 스캔하면 **동기화 완료**!

<img width="438" alt="" src="https://github.com/devjoylee/toyota_display_ads/assets/68415905/646f91d9-682e-43a9-ba27-d7842bf7b395" style="margin-left:0">

## 프로젝트 구조

```bash
weather
 ├──  .expo
 ├──  node_modules
 ├──  assets
 ├──  .gitignore
 ├──  App.js
 ├──  app.json
 ├──  bable.config.js
 ├──  package-lock.json
 └──  package.json
```

## 1. 레이아웃 만들기

### height는 flex로!

- flex 속성을 사용해서 스크린에 출력할 레이아웃을 만들어 준다.

```jsx
//App.js
import { StyleSheet, Text, View } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  )
}
```

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    flex: 3,
  },
  day: {
		flex:1
    alignItems: 'center',
  }
  // ...
});
```

### width는 Dimension으로!

Q: **스크린의 가로(width)를 100% 채우려면?**

**A:** `Dimensions` API를 가져와서 사용한다!

```jsx
import { ..., Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
	day: {
    width: SCREEN_WIDTH,
	}
})
```

### 스크롤 컨테이너 ScrollView

ScrollView는 컨텐츠가 많아서 스크롤이 필요한 경우에 사용할 수 있다. View와 차이점이 있다면 스타일 적용 시, `style` 대신 `contentContainerStyle` 속성을 사용해야한다.

[Go to ScrollView Docs](https://reactnative.dev/docs/scrollview)

**ScrollView Props 예시**

- horizontal : 가로스크롤
- pagingEnabled : 스크롤 효과를 좀 더 자연스럽게 만들어줌
- showsHorizontalScrollIndicator : 가로 스크롤바 보여주기/숨기기

```jsx
<ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.weather}
>
  <View style={styles.day}>...</View>
  <View style={styles.day}>...</View>
  <View style={styles.day}>...</View>
</ScrollView>
```

## 2. 유저 위치정보 가져오기

### `Location` API

[Go to Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)

```bash
npx expo install expo-location
```

```jsx
import * as Location from "expo-location"

export default function App() {
  const [city, setCity] = useState("")
  const [ok, setOk] = useState(true)

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) setOk(false)
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync()
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )
    setCity(location[0].city)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <View>
      {" "}
      ...
      <Text style={styles.cityName}>{city}</Text>
    </View>
  )
}
```

## 3. 위치에 맞는 날씨데이터 가져오기

1. [openweathermap.org/api](https://openweathermap.org/api) 에 가입하고 API key를 발급받는다.

```jsx
const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13"
```

2. On Call API에서 날씨데이터를 fetch하고 state로 저장하기

```jsx
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
)
const json = await response
```

3. state에서 필요한 속성을 가져와 출력하기 ex) 온도, 날씨명..

```jsx
<ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.weather}
>
  {days.length === 0 ? (
    <View style={styles.day}>
      <ActivityIndicator color="white" size="large" style={{ marginTop: 30 }} />
    </View>
  ) : (
    days.map((day, i) => (
      <View key={i} style={styles.day}>
        <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
        <Text style={styles.description}>{day.weather[0].main}</Text>
      </View>
    ))
  )}
</ScrollView>
```

<br/>
<br/>

> REFERENCE <br/>
> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

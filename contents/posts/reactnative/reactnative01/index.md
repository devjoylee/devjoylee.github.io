---
title: "[React Native] 설치 및 세팅하기"
description: "[React Native] 설치 및 세팅하기"
date: 2023-02-15
update: 2023-02-15
tags:
  - react-native
series: "React Native"
---

[React Native 공식 문서 참고](https://reactnative.dev/docs/environment-setup?guide=native&platform=ios&os=macos)

## 관련 프로그램 설치

### 1. Node & Watchman

```bash
brew install node
brew install watchman
```

### 2. Ruby

```bash
\curl -sSL https://get.rvm.io | bash -s stable
rvm install 'ruby-2.7.6'
rvm use 2.7.6
ruby --version
```

### 3. Xcode

- IOS app store

### 4. CocoaPods

```bash
sudo gem install cocoapods
```

<br/>

## React Native 설치 (택1)

### 일반적인 방법

```bash
npm uninstall -g react-native-cli @react-native-community/cli
npx react-native@latest init AwesomeProject
```

### ignite

- 한꺼번에 설치하고 싶을 때, 설정까지 다 되어있음

- [https://github.com/infinitered/ignite](https://github.com/infinitered/ignite)

```bash
npx ignite-cli new PizzaApp
```

### CRNA

- Create React Native App
- Reace Native CLI를 사용했을 때 얻을 수 있는 Native 접근 권한을 얻으면서 동시에 Expo의 SDK에 접근가능하고 QR 코드로 프리뷰도 가능하다.

```bash
npx create-react-native-app
```

## React Native 실행

### init

```bash
npm run ios
or
npx react-native run-ios
```

### expo로 iPhone에서 실행

```jsx
expo start --tunnel
```

## React Native 환경설정

### Typescript

[Using TypeScript · React Native](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project)

```bash
npm install -D @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript
```

### 절대경로 설정

```bash
npm i babel-plugin-module-resolver -D
```

```jsx
// babel.config.js
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
      },
    ],
  ],
}
```

```json
// tsconfig.json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "@types/styled-components-react-native"]
  },
  "baseUrl": "./src",
  "typeRoots": ["src/types"]
}
```

## 자주 발생하는 오류

- ⛔ Unable to boot device in current state: Booted

[https://stackoverflow.com/questions/71132549/react-native-cli-unable-to-boot-device-in-current-state-booted](https://stackoverflow.com/questions/71132549/react-native-cli-unable-to-boot-device-in-current-state-booted)

- ⛔ “launchPackager.command” can’t be opened because (null) is not allowed to open documents in Terminal.

[https://stackoverflow.com/questions/74187734/launchpackager-command-can-t-be-opened](https://stackoverflow.com/questions/74187734/launchpackager-command-can-t-be-opened)

<br/><br/>

> REFERENCE <br/>
> React Native 공식 문서 https://reactnative.dev/docs/getting-started <br/> Expo 공식 문서 https://docs.expo.dev/ <br/> Nomad Coder https://nomadcoders.co/react-native-for-beginners/lobby

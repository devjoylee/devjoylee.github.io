---
title: "[React] 리액트 시작하기 (without CRA)"
description: "[React] 리액트 시작하기 (without CRA)"
date: 2021-12-21
update: 2021-12-21
tags:
  - frontend
  - react
series: "React.js"
---

리액트 기반의 프로젝트를 시작할 때 npm으로 create-react-app 패키지를 설치하면 손쉽게 리액트 프로젝트 빌드가 가능합니다. (`npx create-react-app "project-name"`) 하지만 리액트 폴더구조와 빌드 시스템에 대해 자세히 알아보고 싶다면 create-react-app을 사용하지 않고 아래 순서에 따라 직접 리액트를 빌드해보는 것을 추천합니다!

## 리액트 시작하기 (CRA ❌)

### 1. 프로젝트 폴더 생성 후 초기화

원하는 경로에 프로젝트 폴더를 생성하고 프로젝트 초기화(`npm init -y`)를 진행합니다. 이때 `package.json`이라는 파일이 자동으로 생성되는데 이곳에 프로젝트 이름, 실행 명령어, 프로젝트에 필요한 라이브러리 등 관련 정보가 저장됩니다.

```bash
npm init -y
```

### 2. 리액트 라이브러리 설치

초기화가 끝나면 리액트 프로젝트에 필요한 패키지를 다운받습니다. 패키지 설치 방법은 아래와 같이 `npm install` 또는 `npm install --save-dev` 2가지 방식으로 가능합니다.

✅ `npm i <패키지 이름>`

- 배포(production mode) 할 때 해당 패키지 사용

- package.json의 dependencies 항목에 저장됨

```bash
npm i react react-dom
```

✅ `npm i --save-dev (or -D) <패키지 이름>`

- 배포(production mode) 할 때 패키지 사용 ❌ (development mode에서만 사용)

- package.json의 devDependencies 항목에 저장됨

```bash
npm i -D @babel/core @babel/preset-env @babel/preset-react
babel-loader css-loader style-loader url-loader
webpack webpack-cli webpack-dev-server
html-webpack-plugin
```

패키지 다운로드가 끝나면 프로젝트 폴더내부에 `node_modules` 폴더와 `package.lock.json` 파일이 새로 생성되고 (_yarn으로 설치한 경우_ `yarn.lock` _파일 생성_) `package.json`파일 내부에 아래와 같이 dependencies가 추가됩니다.

![image](https://user-images.githubusercontent.com/68415905/154797755-7080fda7-541e-4ebf-a553-caa0ca4c79cc.png)

### 3. `.babelrc` 파일 생성

`babel` 이란 모든 브라우저에 호환이 가능하도록 최신 코드(ES6)를 구버전 코드(ES5)로 변환해주는 도구입니다. babel 설정을 위해서는 `.babelrc` 파일을 만들어 브라우저 호환에 필요한 babel 플러그인을 추가합니다. (preset : 필요한 플러그인 묶음)

```bash
// .babelrc
{
  presets: ['@babel/preset-env', '@babel/preset-react'],
}
```

+) **webpack.config.js 파일 내부의 babel-loader의 옵션으로 추가한 경우 .babelrc 파일 생략 가능!!**

### 4 . `webpack.config.js` 파일 생성

`webpack`은 웹에서 사용되는 모든 자원(assets)을 묶음으로 번들링 해주는 도구입니다.

웹팩을 사용하면 js 파일간의 종속성 뿐만 아니라 js 내에서 필요한 css나 img와 같은 파일(.css, .jpg)도 번들링해서 하나의 파일로 합쳐줘서 네트워크 요청을 최소화 시킬 수 있습니다.

웹팩에 대해 자세히 알아보고 싶다면 링크를 참고해주세요!
👉 [웹팩 포스팅 바로가기 ](https://devjoylee.github.io/dev-webpack-1)

```jsx
// webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png)$/i,
        loader: "url-loader",
        options: {
          outputPath: "images",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    host: "localhost",
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: false,
    }),
  ],
}
```

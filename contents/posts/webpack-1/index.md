---
title: "프론트엔드 개발환경 #3 - webpack이란?"
description: "npm과 npx와 yarn의 차이"
date: 2021-11-29
update: 2021-11-29
tags:
  - frontend
  - development
series: "프론트엔드 개발환경의 이해"
---

## ✨ Webpack 등장 배경

이전 module 포스팅에서 javascript파일이 여러개로 나뉜 경우 간단하게 `type="module"` 을 `script` 태그에 추가하면 하나의 `script` 태그만으로도 모든 javascript를 연결할 수 있다고 설명한 바 있습니다. (CommonJS / ES Module 모듈화)

👉 [이전 포스팅 바로가기 ](https://devjoylee.github.io/module)

![image](https://images.velog.io/images/joyact/post/dfabe050-6ecc-4706-9e40-208164cb5621/image.png)

하지만 안타깝게도 이런 모듈 시스템을 지원하는 브라우저는 한정되어 있습니다. 인터넷 익스플로러를 포함한 몇 브라우저는 여전히 모듈 시스템을 사용하지 않고있습니다. 따라서 모든 브라우저에 호환가능한 모듈링 시스템이 필요했고 이때 등장한 것이 **Webpack** 입니다.

---

## 🧐 Webpack이란?

> Webpack : a module bundler

![image](https://images.velog.io/images/joyact/post/d47c7828-ea1a-4844-bf88-d950f185899c/image.png)

**웹팩(Webpack)**은 여러개 파일을 하나의 파일로 합쳐주는 번들러(bundler)입니다. 웹팩을 사용하면 여러개의 javascript 파일을 하나로 합쳐줌으로써 지저분한 `<script>` 태그의 반복 사용을 줄일 수 있고 효율적인 디버깅이 가능해집니다.

또 다른 웹팩의 기능으로는 변환(transforming) 기능이 있습니다. ES6와 같은 모던 javascript를 ES5 형식으로 변환하고, Sass를 CSS로 변환시킴으로써 모든 브라우저가 이해할 수 있는 환경을 자체적으로 만들어냅니다.

---

## ➕ Webpack 설치

1. npm install
   `npm install webpack webpack-cli --save-dev`

2. webpack.config.js 파일 생성
   `module.exports` 내부에 필요한 configuration 옵션을 추가합니다.

```javascript
// webpack.config.js
module.exports = {}
```

---

## 🚀 Webpack의 기능

![image](https://images.velog.io/images/joyact/post/835b56bd-c22f-4fdf-b49f-57559b59a90d/Full-Stack-Introduction-to-Webpack.docx-2.jpg)

모듈을 번들링하기 전, Webpack은 모듈 파일들을 그래프의 형식으로 인덱싱을 하게됩니다. 이를 **Dependency Graph**라고 하며 쉽게 말해 비슷한 형태의 파일을 하나로 묶기위해 분류하는 작업이라고 볼 수 있습니다.
<br />

### 기능1. The entry point

![](https://images.velog.io/images/joyact/post/2afea557-9875-4a91-ac40-94117260cc6a/image.png)

The entry point는 Dependency Graph의 출발점이자 모듈 번들링을 시작하는 파일을 의미합니다. default 값은 `./src/index.js` 이며 직접 값을 지정하고 싶은경우 아래와 같이 configuration을 설정합니다.

```javascript
// webpack.config.js
module.exports = {
  entry: "./app/index.js",
}
```

### 기능2. Loaders

![image](https://images.velog.io/images/joyact/post/877e8797-5b3d-490e-9076-b428a968acf8/image.png)

loader는 웹팩을 강력한 도구로 만들어주는 핵심 기능 중 하나입니다. 모듈에서 다루는 import, export 기능은 javascript와 json파일에만 국한되있는 것으로 css파일이나 image 파일을 다루게 되면 에러가 발생합니다. 하지만 loader를 사용하면 css, image 파일에도 접근이 가능하게 됩니다.

1. 필요한 loader 설치

   > **svg 파일 로더** : `npm install svg-inline-loader --save-dev` > **css 파일 로더** : `npm install style-loader css-loader --save-dev` > **js 파일 로더(es6->es5)** : `npm install babel-loader --save-dev`

2. webpack.config.js 옵션 추가

```javascript
// webpack.config.js
module.exports = {
  rules: [
    { test: /\.svg$/, use: "svg-inline-loader" },
    { test: /\.css$/, use: ["style-loader", "css-loader"] },
    { test: /\.(js)$/, use: "babel-loader" },
  ],
}
```

### 기능3. Output

Output은 번들링된 최종 파일 저장소를 뜻합니다. default 값으로 `dist/index.js` 가 설정이 되고 configuration 옵션에서 변경이 가능합니다.

> **순서** : 모듈 번들링 ➡ dist 폴더 생성 ➡ dist 폴더 내부에 번들링된 최종 파일 저장
> (생성된 파일 명은 옵션의 `filename`으로 지정)

```javascript
// webpack.config.js
module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
}
```

### 기능4. Plugin

Loader가 각 모듈(파일)을 위한 기능이라면, Plugin은 최종 번들된 파일을 위한 기능을 수행합니다.

- _**HtmlWebpackPlugin**_

웹팩 번들링이 완료된 후 최종파일이 생성되면, 생성된 파일을 경로로 하는 `script` 태그가 추가된 index.html 파일을 만들어주는 플러그인입니다. 만약 output의 경로가 변경되더라도 직접 html을 수정할 필요없이 자동으로 script태그의 경로가 함께 업데이트 됩니다.

1. 플러그인 설치
   `npm install html-webpack-plugin --save-dev`

2. webpack.config.js 옵션 추가

```javascript
  // webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	...
	module.exports = {
    	plugins: [
          new HtmlWebpackPlugin()
        ]
    }
```

![image](https://images.velog.io/images/joyact/post/ebea04b9-b261-4f62-911d-79da4c2a7635/image.png)

> REFERENCE <br /> Youtube uidotdev Webpack Crash Course https://youtu.be/lFjinlwpcHY / <br /> 네이버 블로그 https://blog.naver.com/wlsdml1103/221333814197

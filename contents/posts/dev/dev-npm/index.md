---
title: "프론트엔드 개발환경 #1 - npm / npx / yarn"
description: "npm과 npx와 yarn의 차이"
date: 2021-11-17
update: 2021-11-17
tags:
  - frontend
  - development
series: "프론트엔드 개발환경"
---

## ✔ npm

> npm : Node Package Manager(Modules)

npm은 NodeJS를 설치하면 함께 설치되는 패키지 관리도구입니다. 이 패키지는 모듈이라고도 불리며 npm을 통해 서비스 개발에 필요한 webpack, CRA, react 등의 다양한 모듈 라이브러리를 설치할 수 있습니다.

ex) `npm install webpack`

`npm init` 명령어를 사용해 초기 `package.json` 파일을 만들고 프로젝트를 초기화합니다. npm을 통해 다운된 패키지는 `package.json`에 기록됩니다.
<br />

### npm의 단점

- 로컬 컴퓨터에 직접 설치되어 용량 차지가 크다
- 다운받은 패키지의 새 버전이 나온 경우, 업데이트를 직접 해주어야한다.

---

## ✔ npx

> npx : Node Package Runner

npx는 npm 5.2.0 버전부터 새로 도입된 패키지 관리 도구입니다. npm 5.2.0 버전 이상을 다운받았다면 자동으로 설치되며 이는 npm을 좀더 편리하게 사용할 수 있도록 도와줍니다.

ex) `npx install webpack`
<br />

### npx의 장점

- 패키지를 컴퓨터에 직접 저장하지 않고 일회성으로 패키지를 사용해 용량차지를 하지 않는다.
- 매번 최신 업데이트된 패키지를 사용할 수 있다.
  <br />

### npx 동작방법

1. 기본적으로, 실행할 패키지가 실행 가능한 경로에 있는지 확인한다. (예를 들면, 프로젝트내에서 다운된 패키지가 있는지 확인)
2. 만약에 있다면, 그것을 실행한다.
3. 아니라면 패키지가 설치가 되지 않았다는 것으로 판단하여, npx가 가장 최신 버전의 패키지를 설치하고 실행한다.

---

## ✔ yarn

yarn은 npm과 같은 패키지 매니저입니다. 차이점이 있다면 Node.js 설치시에 함께 설치되지 않고 별도의 명령어를 사용해 설치합니다. yarn을 사용하면 `yarn.lock` 이라는 파일에 다운한 패키지가 기록되며 이 파일은 모든 디바이스에 같은 패키지를 설치하는 것을 보장합니다.

yarn 설치 : `npm install -g yarn`

```bash
# npm 사용법
npm install <package>
npm uninstall <package>

# yarn 사용법
yarn add <package>
yarn remove <package>
```

### yarn의 장점

- 속도나 안전성은 npm과 비슷하나 npm보다 보안이 뛰어나고 의존성 관리를 강조한다.
- 버전을 어디에서나 같게 만들어 버전 충돌에 의한 버그가 적다.

### yarn의 단점

- npm에 비해 레퍼런스가 적고 덜 보편적이다.

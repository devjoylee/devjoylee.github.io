---
title: "프론트엔드 개발환경 #2 - 모듈 (Module)"
description: "프론트엔드 개발환경 #2 - 모듈 (Module)"
date: 2021-11-21
update: 2021-11-21
tags:
  - frontend
  - development
series: "프론트엔드 개발환경의 이해"
---

## 🧐 모듈(Module) 이란?

Javascript를 공부하다보면 `Module`이라는 단어를 자주 접하게 됩니다.
Module이란 **코드를 내보낼 수 있는 파일 혹은 재사용 가능한 코드들의 묶음**을 말하는데
이런 모듈이 모여서 하나의 프로그램이 완성된다고 볼 수 있습니다.
<br />

### Module 사용 전

```html
<script src="./src/main.js">
<script src="./src/animation.js">
<script src="./src/banner.js">
```

기존에는 html에 `<script>` 태그를 이용해서 모든 파일을 하나하나 불러오는 방식을 사용했습니다. 이 방식은 파일을 불러오는 순서가 코드에 영향을 주며, 생성한 파일의 object가 모두 전역 변수가되서 문제가 발생할 수 있다는 단점이 있습니다
<br />

### Module 사용 후

```html
<script type="module" src="./src/main.js">
```

하지만 모듈을 사용하면 하나의 `<script>` 태그만으로 모든 모듈화된 javascript 파일에 접근이 가능해져 효율적으로 코드를 관리할 수 있습니다.

---

## ⛓️ 파일 모듈화 하기

Javascript 파일을 모듈화 하는 방식은 크게 2가지로 나뉩니다. **CommonJS**로 모듈화 하는 것과 **ES Module**로 모듈화하는 것입니다.
<br />

### CommonJS로 파일 내보내기/불러오기

CommonJS는 NodeJS의 기본 모듈 시스템이며 모듈화가 되지 않고 표준 라이브러리가 없는 과거 javascript의 문제를 해결하기 위한 모듈화 방식입니다.

주 키워드 : `module.exports`, `exports`, `require`

- 파일 불러오기 : `require`
- 여러 개의 객체를 내보낼 경우, `exports` 변수의 속성으로 할당
- 딱 하나의 객체를 내보낼 경우, `module.exports` 변수 자체에 할당

```javascript
// main.js
const name = "Joy"
const age = 28
//exports.name = name
//exports.age = age
module.exports = { name, age }

// result.js
const { name, age } = require("./main.js")
```

### ES Module로 파일 내보내기/불러오기

ES Module은 가장 대중적으로 사용되는 모듈 시스템입니다. 비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에서 유리한 측면이 있습니다. 또한 직관적인 키워드를 사용해 가독성이 뛰어나고 `Named Parameter`와 같은 CommonJS에서는 지원하지 않는 기능들이 있습니다.

주 키워드 : `import`, `export`, `from`, `default`

```javascript
// main.js
export const name = "Joy"
export const age = 28
export default function fullName(lastName) {
  return name + lastName
}

// result.js
import fullName, { name, age } from "./main.js"
```

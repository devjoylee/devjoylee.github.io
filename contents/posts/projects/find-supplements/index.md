---
title: "영양제 검색 페이지 (검색 및 무한 스크롤)"
description: "영양제 검색 페이지"
date: 2022-02-22
update: 2022-02-22
tags:
  - wanted
  - typescript
  - react
  - heroku
series: "원티드 프리온보딩 회고"
---

## ☝ 프로젝트 시작하기 전

사용자가 영양제의 이름을 검색했을때 주어진 Mock Data 안에서 검색한 키워드가 포함된 영양제 목록을 불러와 화면에 출력하는 무한스크롤 페이지를 만들었습니다.

## 📌 프로젝트 링크

[Github](https://github.com/devjoylee/find-my-supplements)
[배포링크](https://find-my-supplements.vercel.app/)

## 📑 기능 기획 및 설계

### onChange 이벤트에 따른 데이터 fetch 방식 논의

팀원들과의 논의 결과 두 종류의 fetch 방식이 추려졌고, 이하와 같은 논리적 이유에 따라 1번 data fetch 방식을 결정했다.

<img src="https://github.com/user-attachments/assets/699ad9f1-3ac9-42e1-8c19-2c5ff333c5e3" alt="" width="750" style="margin-left:0" />

<br/>

> 1. state에 모든 API Data를 담아둔 뒤 match 결과를 맵핑한다. ❌

초기 데이터 로딩 시간이 길어질 수 있음을 감안하여, Next.js를 통해 SSR을 구현하기로 결정

<img src="https://github.com/user-attachments/assets/ead53ea3-39a7-4ab3-bdd8-ff50272fac6e" alt="" width="500" style="margin-left:0" />

1번과 같은 경우는, 초기 렌더링 시에 한 번만 API요청을 보낸 뒤, `state`에 모든 데이터를 담아둔다. 그리고 `input`박스의 `onChange` 이벤트에 따라 `String.match()`를 통한 빠른 검색결과 리스팅을 구현할 수 있다.

- **장점**
  - `state` 배열 내에서 빠르게 `match`값들을 찾아 리스팅해줄 수 있다.
  - 데이터 정렬 횟수를 최소화 할 수 있다.
- **단점**
  - 만약 API데이터의 크기가 클 경우, 초기 데이터 fetch에 따른 로딩 시간이 굉장히 길어질 수 있다.
  - 메모리를 너무 방대하게 차지하는 공간 비효율성이 초래될 수 있다.

<br/>

> 2. onChange마다 해당 값에 맞는 데이터를 DB로부터 get 요청을 보낸다. ✅

<img src="https://user-images.githubusercontent.com/67448481/154735574-4e06195d-a0d1-49a7-b8e2-124c63370fa4.png" alt="" width="500" style="margin-left:0" />

2번 방식의 경우, `onChange` 이벤트가 발생할 때마다, **서버에 Get요청**을 보내는 방식이다. 초기에는 MongoDB와 Mongoose를 활용하여 백엔드에서 `regex`를 활용한 데이터 요청과 반환을 구현해보고자 했으나, 본 프로젝트에서는 mock data를 활용했다.

- **장점**
  - 데이터 `fetch` 로딩 및 렌더링 시간의 단축을 기대할 수 있다.
  - 메모리 공간을 크게 차지하지 않아도 된다.
- **단점**
  - `onChange`이벤트는 너무 잦은 이벤트를 야기하기 때문에, 서버에 너무 많은 요청이 일어나 서버에 과부하가 발생할 수 있다.
  - 서버에서 응답 받은 데이터를 매 응답마다 정렬해줘야 한다.

### 2번 방식 채택

이러한 두 방식의 극명한 장단점의 차이로 고민을 하던 중, 1번 방식의 경우 현재는 데이터의 길이가 600개밖에 안되지만, 추후 확장 가능성을 고려했을 때 효율적이지 못한 방식이 될 것이라 판단하여 2번 data fetch 방식을 활용하기로 결정했다.

<img src="https://user-images.githubusercontent.com/67448481/154735583-8e023314-7f78-4e36-9ca0-46bd0d17e674.png" alt="" width="500" style="margin-left:0" />

우선, 최대한 서버 요청 횟수를 줄이기 위해 많은 고민을 했다. 그리고 정렬 기능의 효율성을 높이기 위해 데이터 정렬에 대한 시간복잡도 또한 고려하여 기능 구현을 했다.

먼저, 잦은 요청과 그에 따른 데이터 처리량의 부하를 예방하기 위하여, 매 요청마다 모든 일치 데이터를 불러오는 것이 아닌, 상위 20개씩의 데이터만 우선적으로 불러와 이후의 데이터 페칭은 ‘무한스크롤'방식을 통해 불러와지도록 기능설계를 했다. 이러한 데이터 간의 우선순위를 매기기 위해 임의로 registCount라는 필드를 DB에 추가했고, 고객이 가장 많이 담은 순서대로 데이터가 먼저 불러와지도록 유도했다.

이를 통해 무작위로 데이터가 20개씩 페칭되는 것이 아닌, 고객이 찾고있을 약일 확률이 높은, 즉 인기가 가장 많은 영양제를 순서대로 불러온 것이다.

이를 위해서는 정렬 기능의 구현이 필요했는데, 시간복잡도를 최소화 하기 위해 **O(nlogn)**의 시간복잡도를 갖는 병합정렬 방식을 채택했다. 사실 현재의 데이터에서는 시간복잡도가 크게 유의미하지는 않지만, 추후 데이터가 방대해질 수도 있기에, 정렬에 투입되는 시간비용을 최소화하고자 했다. 또한, 본 프로젝트에서 데이터를 검색하여 불러오는 방식이 onChange마다 get요청이 이루어지는 것이기에, 정렬기능에서도 최대한의 효율을 고려해야 한다고 판단했다.

이를 통해 버벅임 없이 데이터가 잘 검색되어 화면에 보여질 수 있도록 프로젝트를 잘 마무리 할 수 있었다.

### 검색어 매칭방식 논의

그냥 제품명만 검색한다면 구현이 쉽겠지만, 유저에 따라 브랜드명 + 제품명 또는 그냥 제품명, 브랜드명만 따로따로 검색하는 경우의 수 등이 존재했기에 이러한 경우의 수를 모두 커버하기 위한 검색어 매칭방식의 논의를 진행했다.

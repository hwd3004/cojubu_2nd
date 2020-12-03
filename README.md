# 1. 리액트 설치와 초기 작업

npm install --save firebase

---

# 2. 일단 먼저 배포와 호스팅 해보기

참고 유튜브 - https://youtu.be/RyhG1L0dCZ8

내 사이트 주소 - https://coju-bu.firebaseapp.com/

---

# 3. firebase, dotenv, 부트스트랩 설치

npm install --save firebase

npm install dotenv

npm install react-bootstrap bootstrap

---

# 4. react-router-dom 설치

npm install react-router-dom

구글 api - https://console.developers.google.com/apis/credentials?project=coju-bu&folder=&organizationId=

---

# 5. API 키 보호 완료와 scss 직접 사용해보기

작업 중 문제가 생기면 API 키를 수정해봐야할것이다

npm install node-sass

---

# 6. 가입 작업 시작

---

# 7. 가입 작업에 닉넴 추가, db에 저장, 닉네임 표시까지 완료

---

# 8. CKEditor 설치 전 저장

---

# 9. CKEditor 설치와 사용해보기

리액트에서 CKEditor를 쓰려면 eject를 통한 웹팩 수정을 꼭 해야하기때문에,

안전을 위해 깃을 한번 더 커밋

---

# 10. 웹팩 수정

1. npm run eject

   https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#using-create-react-app2

   config 폴더가 하나 생기고 파일들이 있음

2. npm i @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self

3. npm i raw-loader@3 @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-theme-lark @ckeditor/ckeditor5-react

4. npm i @ckeditor/ckeditor5-editor-classic @ckeditor/ckeditor5-essentials @ckeditor/ckeditor5-paragraph

5. npm i @ckeditor/ckeditor5-basic-styles

6. npm uninstall style-loader 이후 다시 npm i style-loader

7. webpack.config.js에 const { styles } = require( '@ckeditor/ckeditor5-dev-utils' ); 추가

8. ctrl + f로 inputSourceMap 검색해서, {} 닫는 괄호 2개 다음에 코드 추가

9. 주석 다음 test: cssRegex 다음에 코드 추가

10. 9번에서 작업한 곳 아래의 test: cssModuleRegex를 찾은 뒤 코드 추가

11. ctrl+ f로 loader: require.resolve("file-loader") 찾은 뒤, exclude 교체

    이렇게 하면 웹팩 설정 끝

12. npm i @ckeditor/ckeditor5-adapter-ckfinder @ckeditor/ckeditor5-alignment @ckeditor/ckeditor5-autoformat @ckeditor/ckeditor5-basic-styles @ckeditor/ckeditor5-block-quote @ckeditor/ckeditor5-build-balloon @ckeditor/ckeditor5-build-classic @ckeditor/ckeditor5-build-inline @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-dev-webpack-plugin @ckeditor/ckeditor5-easy-image @ckeditor/ckeditor5-editor-balloon @ckeditor/ckeditor5-editor-classic @ckeditor/ckeditor5-essentials @ckeditor/ckeditor5-font @ckeditor/ckeditor5-heading @ckeditor/ckeditor5-image @ckeditor/ckeditor5-indent @ckeditor/ckeditor5-link @ckeditor/ckeditor5-list @ckeditor/ckeditor5-media-embed @ckeditor/ckeditor5-paragraph @ckeditor/ckeditor5-paste-from-office @ckeditor/ckeditor5-react @ckeditor/ckeditor5-table @ckeditor/ckeditor5-theme-lark @ckeditor/ckeditor5-typing @ckeditor/ckeditor5-upload

---

# 11. json 파일로 하던 환경변수 설정을 env로 바꿈

전엔 안되더니... 뭘 빠뜨렸던건지

---

# 12. CKEditor5 EditorConfig

1. https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html

2. \src\components\editor\EditorConfig.js에서

simpleUpload: {
// uploadUrl: `${process.env.REACT_APP_BASIC_SERVER_URL}/api/posts/image`,
uploadUrl: `${process.env.REACT_APP_STORAGE_BUCKET}/images`,

    // Headers sent along with the XMLHttpRequest to the upload server.

    headers: {
      "X-CSRF-TOKEN": "CSFR-Token",
    },

},

우선 임시로 이렇게 해놓았다

---

# 13. CKEditor Final Setting

---

# 14. CKEditor5 For React

CKEditor5의 툴바 아이콘이 크기가 엄청 크게 나오는 현상이 있음

인프런 강의 댓글에 해결법이 있음

style-loader 2.0.0 버전을 지우고, npm i style-loader@1.2.1

---

# 15. CKEditor GetDataFromCKEditor5

1. https://dev.to/suraj975/ckeditor-image-upload-with-firebase-and-react-1pe8

   파이어베이스와 CKEditor를 어떻게 연결시킬것인가에 대한 도움

2. 일단은 파이버에이스와 CKEditor를 연결하여서, 이미지가 파이어베이스 스토리지로 업로드된것 확인하였음

---

# 16. 파이어베이스, 리액트, CKEditor 연결 성공

---

# 18. 16 브랜치에서 출발

npm i moment

닉네임 표시 컴포넌트 수정

---

# 19. 각 게시판마다 글쓰기 기능을 PostWrite 컴포넌트 하나로 할수있도록 작업

PostWrite 안에 UploadAdaptor를 넣는 실험을 해야함

---

# 20. 일단 커밋하여 저장

---

# 21. 커밋

---

# 22. 커밋

---

# 23. 게시판 목록 실시간 아니게 만듬, 이미지 cors 블락 문제가 있음

---

# 24. 임시로 썸네일, 포스트 컨텐츠 페이지 구현

---

# 25. npm i shortid, 회원가입하고 바로 글쓰면 닉넴이 표시안되는 문제

1. 글쓰면 바로 그 글이 생성된 링크로 이동되게 하기 위해, shortid를 이용

2. SignUp.js에서 회원가입 함수에서 useHistory를 window.location.replace("/")로 바꾸면서,

강제로 새로고침을 하게 되면서 닉네임 관련 함수를 한번 실행하게 해주었다

3. 다른 계정으로 로그인 시에도, 이전 계정으로 로그인했던 닉네임이 표시되는 문제가 생겼다

여기도 새로고침을 해줘야한다

---

# 26. 심오한 리액트의 세계

글 쓸때 db에서 닉네임 값 새로 가져오는 식으로 안하고,

처음 로그인할때 그 닉네임 그대로 다른 페이지나 함수 실행할떄 넘겨주는 식으로 하였다

근데 이걸 새로 고침안하면 처음에 넘겨준 닉네임 그대로 갖고 있다

처음 회원가입하면, 회원가입 하기 전에 처음 웹페이지를 불러왔던 상태,

닉넴이 없는 공백상태 ""를 그대로 넘겨주는거같다

---

# 27. html 태그를 조금 다듬음

---

# 28. state 말고 따로 변수 하나 만들어서 업로드어댑터로 DB 이름 변수 넘김

코드 깔끔하게 정리 해줘야함

---

# 29. 코드 수정

---

# 30. npm install node-sass@4.14.1

node-sass의 최신버전 5는 에러가 뜬다

---

# 31. 리덕스 도입

npm i redux react-redux redux-saga connected-react-router

상태 관리의 redux

redux를 리액트에서 사용하기 위한 react-redux

비동기식 상태 관리를 위한 redux-saga

redux를 사용해서 라우터를 관리해주는 connected-react-router

npm i history@4.7.2

src 폴더에 redux 폴더 - reducers, sagas 폴더 만듬

---

# 32. 리덕스, 리덕스 사가 도입 1단계

일단 로그인과 회원가입 부분을 리덕스 사가로 처리하였다

이전에 해두었던 닉네임 관련된 로직들이 작동되지 않으므로 고쳐야하는데,

리덕스로 하면 될듯하다

---

# 33. 리덕스, 리덕스 사가 도입 2단계

로그인, 로그아웃, 닉네임 출력, 글 쓸때 닉네임 값 넘어가기 등등 성공한듯 하다

로그아웃 시 워닝이 뜬다

index.js:1 Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.

---

# 34. 게시글 디테일 페이지의 컨텐츠 표시 방법을 dangerous로 강제하는 것에서 CKEditor로 바꿈

페이지네이션 준비

---

# 35. npm i firestore-pagination-hook

https://www.npmjs.com/package/firestore-pagination-hook

막상 써보니 원하던 결과와 다르다.

구글 검색 - logo generator

https://ko.wix.com/logo/maker

글 삭제 구현했으나, 글을 쓸때 첨부한 이미지 파일들의 삭제는 나중에 구현 예정

---

# 36. DB 구조 변경

---

# 37. 회원가입시 닉네임 중복 체크, npm uninstall firestore-pagination-hook

---

# 38. 파이어베이스 페이지네이션에 대한 몇가지 생각

1. 코인 컬렉션과 주식 컬렉션을 따로 만들기

2. 포스트 컬렉션 하나에 모든 게시글 생성하고 읽기

아직 구현한건 아니지만 대충 생각하기에도 2번 방법이 확실히 쉽다.

1번 방법이 정석이긴하지만, 조인이 없으니 떡상 게시판에서 페이지네이션을 어떻게 해야할지 막막하다.

추천 기준 수를 넘어간 객체들을 페이지네이트하고 싶은 수만큼 끌어와서 배열에 담은 뒤에 페이지네이션을 해야할듯 하다.

그런데 이렇게 하려면 라우트도 다시 설정해야하고... 후...

그런데 이전에 구글링하여 Promise.all([코인게시판, 주식게시판]) 이런식으로 했을때 제대로 되지 않았다.

코인 컬렉션과 주식 컬렉션을 하나로 뭉쳐서 날짜순으로 정렬하고 jsx에서 map함수로 반복문돌려서 렌더링해보았으나,

코인 컬렉션 따로, 주식 컬렉션 따로 날짜순 정렬되어 나타났다.

Promise.all 쓰지말고, 그냥 가져와서 useState 배열에 담아서 한번 정렬해봐야겠다.

라우트 설정도 다시 해야겠지만... 만약 이게 안되면 그냥 2번 방법으로 해야겠다.

---

# 39. 1번 방법 성공

skyrocket.js에 주석만 가득한, 쓰이지 않는 log 함수를 만들어뒀다

1번 방법이 성공하면서 페이지네이션도 이제 쉽게 할 수 있을 듯하다

2번 방법으로 했을때보단 떡상 게시판의 속도가 확실히 느려졌다

데이터가 많아지면 어느쪽이 더 좋을지 모르겠다

---

# 40. 새로운 방법과 렌더링 오류

1. 새로운 방법은 1번 방법대로 각 게시판별로 컬렉션을 가지게 하고, 추천 기준을 달성한 도큐먼트들은

떡상 컬렉션에 ref로 관계형처럼 만들 생각이다. 이러면 매우 효율적일 것으로 예상된다

하지만 몽고db에선 ref로 가져온 것을 populate해야 데이터를 사용할 수 있는데,

파이어베이스에서는 어떨지 아직 찾아보지않았다

그리고 도큐맨트 내 배열에 대한 새로운 오류가 생겼다

PostContent.js에서 인덱스가 하나도 없는 배열의 length가 0으로 나타나지않는다.

Board.js에서는 정상적으로 되고, 0으로 잘 나온다.

아마 이것도 렌더링과 관련된 문제인듯하다...

Board.js에서처럼 렌더링하는 return 안쪽에 해야하는건가하는 생각이 든다

2. 어쩌다보니 추천 기능부터 만들고 있다

화면의 보여지는 입장에서 추천기능의 실시간 갱신을 위해 포스트 관련하여 리덕스와 사가 작업을 시작하였다

---

# 41. 추천 비추 기능 완료, 글 작성시 +5 포인트 완료

추천 시 작성자의 포인트 +5, 비추시 작성의 포인트 -5 완료

---

# 42. 페이지네이션을 위한 라우트 설정 변경 완료, 댓글 기능 완료, 조회수 기능 완료

댓글 기능의 코드와 돌아가는 방식을 갈아엎아야한다

---

# 43. 댓글 코드 수정 중

---

# 44. 댓글 코드 수정 완료

yield put(push("/")) 라는게 있었네

---

# 45. 뭔가 이상함. 치명적인 에러가 발생한거같음

---

# 46. 로컬서버의 포트를 변경하였더니 해결되었다

댓글 구조 변경으로 인한 댓글 삭제 코드 변경

---

# 47. 글 수정 기능 완료

---

# 48. npm install babel-plugin-transform-remove-console --save-dev

1. console.log 지우기

```
                    },
                  ],
                  ["transform-remove-console", { exclude: ["error", "warn"] }],
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
```

2. cli 명령어 firebase use 를 이용하여 디폴트 프로젝트를 바꿀 수 있다

3. firebase deploy 할때 나는 에러 retries exhausted after 6 attempts

.firebase 폴더를 삭제하고 다시 디플로이 했더니 해결되었다

4. 페이지네이션 완료

5. gsutil로 cors 설정, storage.rules 수정 완료

---

# 49. 사용자 가입 시 닉네임 중복 검사하는 코드에 DB 이름 오류 수정
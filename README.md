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
# CRUD and Auth with React.js and Firebase

### 🖥 Get Started

1. Firebase Project 생성, GitHub Auth 연동, Cloud Firestore 및 Cloud Storage 추가

- https://firebase.google.com/?hl=ko

2. `.env` 파일에서 Firebase 정보 환경변수로 관리

```
REACT_APP_FIREBASE_API_KEY = ""
REACT_APP_FIREBASE_AUTH_DOMAIN = ""
REACT_APP_FIREBASE_PROJECT_ID = ""
REACT_APP_FIREBASE_STORAGE_BUCKET = ""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = ""
REACT_APP_FIREBASE_APP_ID = ""
REACT_APP_FIREBASE_MEASUREMENT_ID = ""
```

### 📌 Main Firebase Method

- https://firebase.google.com/docs/build?hl=ko

1. **소셜 로그인**

```js
// GitHub 제공업체 객체의 인스턴스를 생성
let provider = new firebase.auth.GithubAuthProvider()

// GitHub 제공업체 객체를 사용해 Firebase 인증을 진행
await firebase.auth().signInWithRedirect(provider) //방법1. 리디렉션
await firebase.auth().signInWithRedirect(provider) //방법2. 팝업창
```

2. **사용자의 로그인 상태 변경에 대한 관찰자 추가**

```js
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
	}
})
```

3. **Create Data**

```js
firebase.firestore().collection("COLLECTION_ID").add({ FIELD: VALUE })
```

4. **Read Data** (Collection 실시간 업데이트 감지하여 데이터 가져오기)

```js
firebase
	.firestore()
	.collection("COLLECTION_ID")
	.onSnapshot((snapshot) => {
		//snapshot에서 데이터 가져오기
	})
```

5. **Update Data**

```js
firebase
	.firestore()
	.collection("COLLECTION_ID")
	.doc("DOCUMENT_ID")
	.update("DATA")
```

6. **Remove Data**

```js
firebase.firestore().collection("COLLECTION_ID").doc("DOCUMENT_ID").delete()
```

7. **데이터 정렬**

```js
firebase.firestore().collection("COLLECTION_ID").orderBy("DOCUMENT_ID", "desc")
```

8. **데이터 쿼리**

- where() 메서드는 필터링할 필드, 비교 연산, 값의 3가지 매개변수를 사용

```js
firebase
	.firestore()
	.collection("COLLECTION_ID")
	.where("FIELD", "COMPARISON_OPERATOR", "VALUE")
	.get()
```

9. **파일 업로드**

- 파일 이름을 포함하여 파일의 전체 경로를 가리키는 참조 생성

```js
const storageRef = firebase.storage().ref()
const fileRef = storageRef.child("images/sample.jpg")
```

- `putString()` 메서드를 사용하여 원시 문자열, base64, base64url 또는 data_url로 인코딩된 문자열을 Cloud Storage에 추가 가능

```js
// Data URL string
const response = fileRef.putString(data, "data_url")
```

- 파일의 다운로드 URL 가져오기

```js
const url = response.ref.getDownloadURL()
```

10. **파일 삭제**

- 파일을 삭제하려면 먼저 파일을 가리키는 참조(reference doc link)생성
- 그런 다음 참조에 대해 `delete()` 메서드를 호출

```js
firebase.storage().refFromURL("URL").delete()
```

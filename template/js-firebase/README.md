# CRUD and Auth with React.js and Firebase

### ๐ฅ Get Started

1. Firebase Project ์์ฑ, GitHub Auth ์ฐ๋, Cloud Firestore ๋ฐ Cloud Storage ์ถ๊ฐ

- https://firebase.google.com/?hl=ko

2. `.env` ํ์ผ์์ Firebase ์ ๋ณด ํ๊ฒฝ๋ณ์๋ก ๊ด๋ฆฌ

```
REACT_APP_FIREBASE_API_KEY = ""
REACT_APP_FIREBASE_AUTH_DOMAIN = ""
REACT_APP_FIREBASE_PROJECT_ID = ""
REACT_APP_FIREBASE_STORAGE_BUCKET = ""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = ""
REACT_APP_FIREBASE_APP_ID = ""
REACT_APP_FIREBASE_MEASUREMENT_ID = ""
```

### ๐ Main Firebase Method

- https://firebase.google.com/docs/build?hl=ko

1. **์์ ๋ก๊ทธ์ธ**

```js
// GitHub ์ ๊ณต์์ฒด ๊ฐ์ฒด์ ์ธ์คํด์ค๋ฅผ ์์ฑ
let provider = new firebase.auth.GithubAuthProvider()

// GitHub ์ ๊ณต์์ฒด ๊ฐ์ฒด๋ฅผ ์ฌ์ฉํด Firebase ์ธ์ฆ์ ์งํ
await firebase.auth().signInWithRedirect(provider) //๋ฐฉ๋ฒ1. ๋ฆฌ๋๋ ์
await firebase.auth().signInWithRedirect(provider) //๋ฐฉ๋ฒ2. ํ์์ฐฝ
```

2. **์ฌ์ฉ์์ ๋ก๊ทธ์ธ ์ํ ๋ณ๊ฒฝ์ ๋ํ ๊ด์ฐฐ์ ์ถ๊ฐ**

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

4. **Read Data** (Collection ์ค์๊ฐ ์๋ฐ์ดํธ ๊ฐ์งํ์ฌ ๋ฐ์ดํฐ ๊ฐ์ ธ์ค๊ธฐ)

```js
firebase
	.firestore()
	.collection("COLLECTION_ID")
	.onSnapshot((snapshot) => {
		//snapshot์์ ๋ฐ์ดํฐ ๊ฐ์ ธ์ค๊ธฐ
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

7. **๋ฐ์ดํฐ ์ ๋ ฌ**

```js
firebase.firestore().collection("COLLECTION_ID").orderBy("DOCUMENT_ID", "desc")
```

8. **๋ฐ์ดํฐ ์ฟผ๋ฆฌ**

- where() ๋ฉ์๋๋ ํํฐ๋งํ  ํ๋, ๋น๊ต ์ฐ์ฐ, ๊ฐ์ 3๊ฐ์ง ๋งค๊ฐ๋ณ์๋ฅผ ์ฌ์ฉ

```js
firebase
	.firestore()
	.collection("COLLECTION_ID")
	.where("FIELD", "COMPARISON_OPERATOR", "VALUE")
	.get()
```

9. **ํ์ผ ์๋ก๋**

- ํ์ผ ์ด๋ฆ์ ํฌํจํ์ฌ ํ์ผ์ ์ ์ฒด ๊ฒฝ๋ก๋ฅผ ๊ฐ๋ฆฌํค๋ ์ฐธ์กฐ ์์ฑ

```js
const storageRef = firebase.storage().ref()
const fileRef = storageRef.child("images/sample.jpg")
```

- `putString()` ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ์์ ๋ฌธ์์ด, base64, base64url ๋๋ data_url๋ก ์ธ์ฝ๋ฉ๋ ๋ฌธ์์ด์ Cloud Storage์ ์ถ๊ฐ ๊ฐ๋ฅ

```js
// Data URL string
const response = fileRef.putString(data, "data_url")
```

- ํ์ผ์ ๋ค์ด๋ก๋ URL ๊ฐ์ ธ์ค๊ธฐ

```js
const url = response.ref.getDownloadURL()
```

10. **ํ์ผ ์ญ์ **

- ํ์ผ์ ์ญ์ ํ๋ ค๋ฉด ๋จผ์  ํ์ผ์ ๊ฐ๋ฆฌํค๋ ์ฐธ์กฐ(reference doc link)์์ฑ
- ๊ทธ๋ฐ ๋ค์ ์ฐธ์กฐ์ ๋ํด `delete()` ๋ฉ์๋๋ฅผ ํธ์ถ

```js
firebase.storage().refFromURL("URL").delete()
```

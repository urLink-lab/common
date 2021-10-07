import React, { useState, useEffect, useCallback } from "react"
import { dbService } from "firebaseInstance"
import Todo from "components/Todo"
import TodoForm from "components/TodoForm"

function Home({ userObj }) {
	const [todoList, setTodoList] = useState([])

	const getTodoList = useCallback(() => {
		//onSnapshot: collection에 변화가 감지될 때마다 실행해서 todos를 가져온다.
		dbService
			.collection("todos")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				const todoArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				setTodoList(todoArray)
			})
	}, [])

	useEffect(() => {
		getTodoList()
		return () => setTodoList([])
	}, [])

	return (
		<div className="container">
			<TodoForm userObj={userObj} />
			<div style={{ marginTop: 30 }}>
				{todoList.map((todo) => (
					<Todo
						key={todo.id}
						todoObj={todo}
						isOwner={todo.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	)
}
export default Home

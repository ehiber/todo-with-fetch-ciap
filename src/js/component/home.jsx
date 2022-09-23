import React, { useState , useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const URL_API = "https://assets.breatheco.de/apis/fake/todos/user"

//create your first component
const Home = () => {
	const [input, setInput] = useState("")
	const [inputUser, setInputUser] = useState("")
	const [tasks, setTasks] = useState([])
	const [user, setUser] = useState("")
	// [{label:"",status:"to-do"}]
	// const [status, setStatus] = useState("to-do")

	// useEffect(() => {
	// 	getToDo()	
	// }, [])

	const postToDo = async (newUser) =>{
		let response = await fetch(`${URL_API}/${newUser}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"POST",
			body: JSON.stringify( []) 
		})
		let data = await response.json()
		if (response.ok){
			getToDo(newUser)
		}
	}

	const getToDo = async (newUser) =>{
		let response = await fetch(`${URL_API}/${newUser}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
		if (response.ok){
			setTasks(data)
		} else {
			postToDo(newUser)
		}
	}	

	const putToDo = async (newTasks) =>{
		let response = await fetch(`${URL_API}/${user}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(newTasks) 
		})
		let data = await response.json()
		if (response.ok){
			console.log(data)
			getToDo(user)
		}
	}

	const handleDeleteUser= async ()=>{
		let response = await fetch(`${URL_API}/${user}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"DELETE"
		})
		let data = await response.json()
		if (response.status == 200){
			console.log("Eliminado con exito SIIUUU")
		}
	}
	
	
	const handleEnter = (e)=>{
		if (e.key == "Enter"){
			// let newTasks = [...tasks]
			// newTasks.push(input)
			setTasks([...tasks,{label:input,done:false}])
			putToDo([...tasks,{label:input,done:false}])
			setInput("")
		}
	}

	const handleEnterUser = (e)=>{
		if (e.key == "Enter"){
			setInputUser(e.target.value)
			setUser(e.target.value)
			getToDo(e.target.value)
		}
	}

	const handleDelete = (currentIndex)=>{
		let newTasks = tasks.filter((task, index)=> index != currentIndex)
		setTasks(newTasks)
		putToDo(newTasks)
	}

	const handleUpdate = (e,currentIndex)=>{
		let newTasks = tasks.map((task, index)=> {
			if(index == currentIndex) return {...task,status:e.target.value}
			else return task
		})
		setTasks(newTasks)
	}

	return (
		<div className="text-center">
			<input 
			 	type="text" 
				onChange={(e)=>{setInput(e.target.value)}} 
				value={input} 
				onKeyDown={handleEnter}
			/>

			{/* <select onChange={(e)=>{setStatus(e.target.value)}} name="taskStatus" id="taskStatus">
				<option value="to do">To Do</option>
				<option value="progress">In Progress</option>
				<option value="done">Done</option>
			</select> */}

			<button onClick={()=>handleDeleteUser()}>Eliminame</button>

			<input 
			 	type="text" 
				onChange={(e)=>{setInputUser(e.target.value)}} 
				value={inputUser} 
				placeholder="USUAAARIO"
				onKeyDown={handleEnterUser}
			/>
			{/* <button onClick={()=>handleDeleteUser()}>Obtieneme</button> */}

			 <ListGroup>
				{
					tasks.map((task,index)=>{
						return (
							<ListGroup.Item className="d-flex tasks" key={index} >
								<p>
									{task.label}
								</p>
								{/* <select onChange={(e) => handleUpdate(e,index)} name="taskStatus" id="taskStatus">
									<option value="to do">To Do</option>
									<option value="progress">In Progress</option>
									<option value="done">Done</option>
								</select> */}

								<button className="button" onClick={(e) => handleDelete(index)}>
									<span><i>X</i></span>
								</button>
							</ListGroup.Item>
					)})
				}
			</ListGroup>
		</div>
	);
};

export default Home;


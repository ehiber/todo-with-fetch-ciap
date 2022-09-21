import React, { useState , useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [input, setInput] = useState("")
	const [tasks, setTasks] = useState([])
	// [{label:"",status:"to-do"}]
	// const [status, setStatus] = useState("to-do")

	useEffect(() => {
		const postToDo = async () =>{
			let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ehiber",{
				headers:{
					"Content-Type":"application/json"
				},
				method:"POST",
				body: JSON.stringify( []) 
			})
			let data = await response.json()
			console.log(data)
	}
	postToDo()
		
	}, [])

	useEffect(() => {
		const getToDo = async () =>{
			let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ehiber",{
				headers:{
					"Content-Type":"application/json"
				},
				method:"GET",
			})
			let data = await response.json()
			setTasks(data)
		
	}
	getToDo()
		
	}, [])

	
	const handleEnter = (e)=>{
		if (e.key == "Enter"){
			// let newTasks = [...tasks]
			// newTasks.push(input)
			setTasks([...tasks,{label:input,status:status}])
			setInput("")
		}
	}

	const handleDelete = (currentIndex)=>{
		let newTasks = tasks.filter((task, index)=> index != currentIndex)
		setTasks(newTasks)
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

			<select onChange={(e)=>{setStatus(e.target.value)}} name="taskStatus" id="taskStatus">
				<option value="to do">To Do</option>
				<option value="progress">In Progress</option>
				<option value="done">Done</option>
			</select>


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


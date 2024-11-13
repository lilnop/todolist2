import { useEffect, useState } from 'react'
import { Check,Trash2,List } from 'lucide-react';

function App() {

  const [todos,setTodos] = useState(() =>{
    const grabTodos = localStorage.getItem("todo-list");
    return grabTodos ? JSON.parse(grabTodos) : []; // Load from localStorage or start with an empty array
  });
  const [newTodo,setNewTodo] = useState("");
    
  // Step 1: Save todos to localStorage whenever the todos state changes
  useEffect(() =>{
    localStorage.setItem("todo-list", JSON.stringify(todos));
  },[todos])


  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
    addTodo();
    }
  }
  // HANDLE INPUT TO GRAB TEXT
  const handleInput = (e) => {
    setNewTodo(e.target.value)
  }  
  // ADD TASK TO TODO
  const addTodo = () => {
    if(newTodo.trim() == ""){
      alert("Don't leave it empty");
      return;
    }
    // 
    setTodos([...todos,{
          id:Date.now(),
          task:newTodo,
          completed:false}])
// CLEAN INPUT BOX
    setNewTodo("");    
  }
  
// MARK TASK COMPLETE
  const taskStatus = (id) => {
    setTodos(
      todos.map((todo,i) => {
        return i === id ? {...todo,completed:!todo.completed} : todo
       })
    )
  }

// DELETE TASK
  const deleteTask = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    )
  }


  return (
    <section className='container'>
      <h1>Todo List</h1>
      <div id="task-entry">
        <input onKeyDown={handleKeyDown} id='task-input' autoFocus onChange={handleInput} type="text" value={newTodo} placeholder="Eat 500 balls of banku"/>
        <button onClick={addTodo} id='add-task'>Add <List size={14}/></button>
      </div>


      <div className='todo-body'>
        <ul className='todo-list'>
          {todos.map((todo,id) => {
            return <li style={{textDecoration: todo.completed ? "line-through" : ""}}
                        key={todo.id}>
                          <span>
                            {todo.task}  
                          </span>
                          <div>
                            <button style={{backgroundColor: todo.completed ? "#007BFF" : "#4CAF50"}} className='complete' onClick={()=> taskStatus(id)}>Done <Check size={14}/></button>
                            <button className='delete ' onClick={() => deleteTask(todo.id)}>Delete <Trash2 size={14} /></button>
                          </div>    
                    </li>
          })}
        </ul>
      </div>
      
    </section>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai';

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false)
  const [allTodos, setTodos]=useState([]);
  const [newDescription, setNewDescription]= useState("");
  const[newTitle, setNewTitle]=useState("");
  const [completedTodos, setCompletedTodos] =useState([]);
  const [currentEdit, setCurrentEdit]=useState('');
  const [currentEditedItem, setCurrentEditedItem]=useState("")

  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todoitem', JSON.stringify(updatedTodoArr))
  }
  
  const handleDeleteTodo=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1)//imprtant to put 1 meand delete only1 perticular item
    localStorage.setItem('todoitem', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);

  }
  const handleComplete=index=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn= dd + '-' +mm +'-'+yyyy + 'at' +h+":"+ ":"+ m+":"+s;

    let filteredItem ={//object
        ...allTodos[index], //from alltodos select index by vlckig button it will select
        completedOn:completedOn// for displaying the time
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  }
  const handleDeleteCompletedTodo=index=>{
     let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1)
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);

  }
  
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todoitem'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));

    if(savedTodo){
      setTodos(savedTodo)
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo)
    }

  },[])

  const handleEdit=(ind,item)=>{
    setCurrentEdit(ind);
    setCurrentEditedItem(item)
  }
  const handdleUpdateTitle=(value)=>{
    setCurrentEditedItem((prev)=>({
      ...prev,
      title:value
    }))

  }
  const handdleUpdateDescription=(value)=>{
    setCurrentEditedItem((prev)=>({
      ...prev,
      description:value
    }))

  }
const handleUpdateToDo=()=>{
  let newToDo=[...allTodos];
  newToDo[currentEdit]=currentEditedItem;
  setTodos(newToDo);
  localStorage.setItem('todoitem',JSON.stringify(newToDo))
  setCurrentEdit("");

}
  return (
    <div className="App">
      <h3>My Todos</h3>
      <div className='todo-wrapper'>

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} type='text' placeholder="What's the task title?"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} type='text' placeholder="What's the task Description?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>

        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`}  onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`}  onClick={()=>setIsCompleteScreen(true)} >Completed</button>

        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            if(currentEdit===index){
              return(<div className='edit_wrapper' key={index}>
                <input placeholder='"Updated Title' onChange={(e)=>handdleUpdateTitle(e.target.value)} value={currentEditedItem.title}/>
                <textarea placeholder='"Updated Title' rows={4} onChange={(e)=>handdleUpdateDescription(e.target.value)} value={currentEditedItem.description}/>
                  <button type='button' onClick={handleUpdateToDo} className='primaryBtn'>Save</button>
              </div>)

            }else{
              return(
               <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>

            </div>
            
          
          <div>
            <AiOutlineDelete onClick={()=>handleDeleteTodo(index)} className='icon' title='Delete?'/>
              <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>

            <AiOutlineEdit className='check-icon' onClick={()=>handleEdit(index,item)} title='Edit?'/>
          </div>
        </div>
            )
              
            }
            
          })}
           {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
               <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>

            </div>
            
          
          <div>
            <AiOutlineDelete onClick={()=>handleDeleteCompletedTodo(index)} className='icon' title='Delete?'/>
          </div>
        </div>
            )
          })}


         
      </div>
    </div>
    </div>
  );
}

export default App;

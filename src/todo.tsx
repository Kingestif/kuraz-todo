import { useState,useEffect } from 'react';
import './todo.css';
import editIcon from "./assets/edit.png";
import deleteIcon from "./assets/delete.png";

export function Todo(){
    const [add, setAdd] = useState('');
    const [todoList, setTodo] = useState<string[]>([]);
    const [edit, setEdit] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    
    useEffect(() => {
        const todos = localStorage.getItem("todos");

        if(todos){
            setTodo(JSON.parse(todos));
        }
    }, []);

    const addTodo = () => {     
        if (add.trim() === '') return;  //empty todo


        const arrayTodo = [...todoList, add];
        localStorage.setItem("todos", JSON.stringify(arrayTodo));
        
        setTodo(arrayTodo);
        setAdd('');
    }

    const updateTodo = (index: number) =>{
        setIsEdit(true);    //start editing
        setEditIndex(index);    //select specific todo
        setEdit(todoList[index]);       //todoList[index] will update the original todo        
    }

    const Update = () => {
        const updatedTodo = [...todoList];
        if(editIndex != null){
            updatedTodo[editIndex] = edit; 
        }
        localStorage.setItem("todos", JSON.stringify(updatedTodo));
        setTodo(updatedTodo);

        setIsEdit(false);
    }

    const Delete = (index: number) => {
        const deletedList = [...todoList];
        deletedList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(deletedList));
        setTodo(deletedList);
    }
    
    return(
        <>
            <h1 className="todo-text">What To Do🖊️</h1>

            <input className="todo-input" value = {add} onChange = {(e) => setAdd(e.target.value)}></input><br/>
            <button className="todo-button1" onClick={addTodo}>Add Todo</button><br/>


            <ul className ='parentList'>
                {todoList.map((todo, index) => (
                    <li className="todoList" key={index}>
                        {isEdit && editIndex === index? 
                            (<>
                                <input className = "todo-input2" value = {edit} onChange = {(e) => setEdit(e.target.value)}></input>
                                <button className="todo-updatebutton" onClick = {Update}>✔️</button>
                            </>) : 
                            (<>
                            {todo}
                                <div className="button2-parent">
                                    <button className="todo-button2" onClick={() => updateTodo(index)}> <img src={editIcon} alt="Edit" /> </button>
                                    <button className="todo-button2" onClick = {() => Delete(index)}><img src={deleteIcon} alt="Delete" /></button>
                                </div>
                            </>)}
                        
                    </li> 
                ))} 
            </ul>
            
        </>
    )
}
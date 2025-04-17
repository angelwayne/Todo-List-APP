import { useEffect, useState } from "react";
import { getTodos,createTodo, deleteTodo, updateTodo } from "../services/todoService";
import { Todo } from '../types/Todo';
import '../../src/Todo.css'
import { toast } from 'react-toastify';

const showSuccess = (msg: string) => toast.success(msg);

const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
  

    // Estados para edición
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

   /*  const isValidInput = (name: string, desc: string) => {
        return name.trim().length > 0 && name.length <= 100 &&
               desc.trim().length > 0 && desc.length <= 300;
    }; */

    const loadTodos = () => {
        getTodos().then(res => setTodos(res.data));
      };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleAdd = () => {
    
    if (!Name.trim() || !Description.trim()) return;
    const newTodo = { Name, Description, Complete: false };
    createTodo(newTodo).then(() => {
        setName('');
        setDescription('');
        showSuccess("Tarea creada con Exito!");
        loadTodos();
    });
    };
    
      
    const handleEdit = (todo: Todo) => {
        setEditId(todo.id);
        setEditName(todo.Name);
        setEditDescription(todo.Description);
    };

    const handleSaveEdit = () => {
        if (editId === null) return;
    
        const updated = {
          id: editId,
          Name: editName,
          Description: editDescription,
          Complete: todos.find(t => t.id === editId)?.Complete || false,
        };
    
        updateTodo(updated).then(() => {
          setEditId(null);
          setEditName('');
          setEditDescription('');
          loadTodos();
        });
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditName('');
        setEditDescription('');
    };

    

    const handleDelete = (id: number) => {
        deleteTodo(id).then(()=> {
            showSuccess("Tarea elminada!");
            loadTodos();
        });
    };

    return (
    <div className="todo-container">
      <h2 className="text-center">My Todos</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Cual es el nombre para la Tarea?"
          value={Name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caul es la descripcion de la tarea?"
          value={Description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}> Agregar</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            ) : (
              <div className="todo-item">
                <h5>
                  {todo.Name}
                </h5>
                <p>{todo.Description}</p>
              </div>
            )}
            <div className="actions">
              {editId === todo.id ? (
                <>
                  <button className="icon-btn complete" onClick={handleSaveEdit}>💾</button>
                  <button className="icon-btn delete" onClick={handleCancelEdit}>❌</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleDelete(todo.id)} className="icon-btn delete">
                    🗑️
                  </button>
                  <button onClick={() => handleEdit(todo)} className="icon-btn edit">
                    ✏️
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
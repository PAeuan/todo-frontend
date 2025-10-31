import { useState } from 'react'
import './App.css'


type Todo = {
  id: number
  name: string
  completed: boolean
  dueDate: string | null
}

function App() {
  const [inputText, setInputText] = useState<string>('')

  const [todos, setTodos] = useState<Todo[]>([])

  const newTodo = () => {
    const newTodo = {"name" : inputText}
    fetch("/api/todo/new",
    {
      headers: {
        'Accept': '*/*',
        'Content-Type' : 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newTodo)
    }
    ) 
  }

  const updateList = async () => {
    const response = await fetch("/api/todo/getAll")
    const updatedTodos = await response.json()
    setTodos(updatedTodos)
  }

  return (
    <>
      <h1>TODO App</h1>

      {/* CARD: input + button */}
      <div className="card">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={newTodo}>Add</button>
      </div>

      {/* SECOND DIV (list display): shows the list of items */}
      <div>
        {todos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          <ul>
            {todos.map((t) => (
              <li key={t.id}>
                <strong>{t.name}</strong>
              </li>
            ))}
          </ul>
        )}

        {/* Final button that just console.logs for now */}
        <button onClick={updateList}>Update list</button>
      </div>
    </>
  )
}

export default App

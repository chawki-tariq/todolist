import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { FilterMode } from './FilterMode'
import { Todo } from './Todo'
import { getTodosStorage, TodosReducer } from './TodosReducer'

const initialState = {
  todos: getTodosStorage(),
}

export function Todos() {
  const [{ todos }, dispatch] = useReducer(TodosReducer, initialState)
  const inputEl = useRef(null)

  useEffect(() => {
    const input = inputEl.current
    if (input) {
      input.focus()
    }
  }, [])

  const addTodo = function (content) {
    dispatch({ type: 'add', payload: content })
  }

  const removeTodo = useCallback((todoId) => {
    dispatch({ type: 'remove', payload: todoId })
  }, [])

  const completeTodo = useCallback((todoId, completed) => {
    dispatch({ type: 'complete', payload: { todoId, completed } })
  }, [])

  const editTodo = useCallback((todoId, content) => {
    dispatch({ type: 'edit', payload: { todoId, content } })
  }, [])

  const completeAllTodo = function (e) {
    dispatch({ type: 'completeAll', payload: e.target.checked })
  }

  const handleFilter = useCallback((mode) => {
    dispatch({ type: mode })
  }, [])

  const handleRemoveCompleted = function () {
    dispatch({ type: 'removeCompleted' })
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    const input = inputEl.current
    if (input.value) {
      addTodo(input.value)
      input.value = ''
    }
  }

  const modes = useMemo(
    () => [
      { title: 'Toute', action: 'all' },
      { title: 'Commencer', action: 'active' },
      { title: 'Complétés', action: 'done' },
    ],
    []
  )

  const isAllCompleted = todos.every((todo) => todo.completed)
  const isLeastOneCompleted = todos.some((todo) => todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="todos">
      <header>
        <div className="theme">
          <theme-switcher></theme-switcher>
        </div>
        <form onSubmit={handleSubmit}>
          {todos.length > 0 && (
            <input
              type="checkbox"
              checked={isAllCompleted}
              onChange={completeAllTodo}
            />
          )}
          <input type="text" ref={inputEl} placeholder="ajouter une tache..." />
        </form>
      </header>
      <main>
        <ul className="todo-items">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onRemove={removeTodo}
              onComplete={completeTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      </main>
      {getTodosStorage().length > 0 && (
        <footer>
          <p>Complétés {completedTodos.length}</p>
          <FilterMode onFilter={handleFilter} modes={modes} />
          <a aria-hidden={isLeastOneCompleted} onClick={handleRemoveCompleted}>
            Supprimer complétés
          </a>
        </footer>
      )}
    </div>
  )
}

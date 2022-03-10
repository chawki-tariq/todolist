function setTodosStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos || []))
  return todos
}

export function getTodosStorage() {
  return JSON.parse(window.localStorage.getItem('todos')) || []
}

export function TodosReducer(state, action) {
  switch (action.type) {
    case 'add':
      const newTodo = {
        id: Date.now(),
        content: action.payload,
        completed: false,
      }
      return { todos: setTodosStorage([newTodo, ...state.todos]) }

    case 'remove':
      const removeTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      )
      return { todos: setTodosStorage(removeTodos) }

    case 'complete':
      const completeTodos = state.todos.map((todo) => {
        if (todo.id !== action.payload.todoId) {
          return todo
        }
        return {
          ...todo,
          completed: action.payload.completed,
        }
      })
      return { todos: setTodosStorage(completeTodos) }

    case 'edit':
      state.todos.find((todo) => todo.id === action.payload.todoId).content =
        action.payload.content
      return { todos: setTodosStorage([...state.todos]) }

    case 'completeAll':
      const completeAllTodos = state.todos.map((todo) => {
        return {
          ...todo,
          completed: action.payload,
        }
      })
      return { todos: setTodosStorage(completeAllTodos) }

    case 'all':
      return { todos: getTodosStorage() }

    case 'active':
      return { todos: getTodosStorage().filter((todo) => !todo.completed) }

    case 'done':
      return { todos: getTodosStorage().filter((todo) => todo.completed) }

    case 'removeCompleted':
      return {
        todos: setTodosStorage(state.todos.filter((todo) => !todo.completed)),
      }

    default:
      throw new Error(`L'action ${action.type} est inconnu!`)
  }
}

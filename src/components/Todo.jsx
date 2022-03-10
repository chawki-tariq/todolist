import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { OutBoxEvent } from './OutBoxEvent'

export const Todo = memo(({ todo, onRemove, onComplete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const input = inputRef.current
    if (input) {
      input.value = todo.content
      input.focus()
    }
  }, [isEdit])

  const handleRemove = (e) => {
    e.preventDefault()
    onRemove(todo.id)
  }

  const handleComplete = (e) => {
    const completed = e.target.checked
    onComplete(todo.id, completed)
  }

  const handleEdit = useCallback(() => {
    const input = inputRef.current
    if (input && input.value && input.value !== todo.content) {
      onEdit(todo.id, input.value)
    }
    setIsEdit(false)
  }, [todo, inputRef.current])

  const handleDbClick = function () {
    setIsEdit(true)
  }

  const handleEscape = useCallback(() => {
    setIsEdit(false)
  }, [])

  const completedClass = todo.completed ? 'completed' : ''
  const editClass = isEdit ? 'edit' : ''

  return (
    <li className={`todo-item ${editClass}`}>
      {!isEdit ? (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleComplete}
          />
          <label
            onDoubleClick={handleDbClick}
            className={`cross ${completedClass}`}
          >
            {todo.content}
          </label>
          <a href="" onClick={handleRemove}>
            x
          </a>
        </>
      ) : (
        <OutBoxEvent
          onOutClick={handleEdit}
          onEnter={handleEdit}
          onEscape={handleEscape}
        >
          <input type="text" className="edit" ref={inputRef} />
        </OutBoxEvent>
      )}
    </li>
  )
})

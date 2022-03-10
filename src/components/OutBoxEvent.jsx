import { useEffect } from 'react'
import { randomString } from '../utils'

export function OutBoxEvent(props) {
  const randomId = randomString().replaceAll(/\d+/g, '')

  useEffect(() => {
    const divEl = document.querySelector(`#${randomId}`)

    const handleClick = function (e) {
      if (!divEl.contains(e.target)) {
        props.onOutClick(e)
      }
    }

    const handleKeyDown = function (e) {
      if (e.key === 'Escape') {
        props.onEscape(e)
      }
      if (e.key === 'Enter') {
        props.onEnter(e)
      }
    }

    divEl.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClick)

    return () => {
      divEl.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="outBoxEvent" id={randomId}>
      {props.children}
    </div>
  )
}

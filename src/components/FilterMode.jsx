import { memo, useEffect } from 'react'

export const FilterMode = memo(({ modes, onFilter }) => {
  useEffect(() => {
    const filterModesItems = document.querySelectorAll('#filterModes .btn')

    const handleClick = function (e) {
      filterModesItems.forEach((item) => item.classList.remove('active'))
      e.target.classList.add('active')
      onFilter(e.target.dataset.mode)
    }

    filterModesItems.forEach((item) => {
      item.addEventListener('click', handleClick)
    })

    return () => {
      filterModesItems.forEach((item) => {
        item.removeEventListener('click', handleClick)
      })
    }
  }, [])

  return (
    <ul id="filterModes">
      {modes.map((mode) => (
        <li key={mode.action}>
          <button
            className={`btn ${mode.action === 'all' ? 'active' : ''}`}
            data-mode={mode.action}
          >
            {mode.title}
          </button>
        </li>
      ))}
    </ul>
  )
})

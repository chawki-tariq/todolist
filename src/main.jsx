import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { ThemeSwitcher } from './components/ThemeSwitcher'

customElements.define('theme-switcher', ThemeSwitcher)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

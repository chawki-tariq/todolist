export class ThemeSwitcher extends HTMLElement {
  connectedCallback() {
    this.classList.add('theme-switcher')
    this.innerHTML = `
        <input type="checkbox" id="theme-switcher">
        <label for="theme-switcher"></label>
    `
    const input = this.querySelector('input') 
    const body = document.body
    let theme = ''
    const mediaQuery = `prefers-color-scheme: light`
    const themeStorage = window.localStorage.getItem('theme')
    if (window.matchMedia(mediaQuery).matches || themeStorage === 'light') {
      theme = 'light'
      input.checked = false
    } else {
      theme = 'dark'
      input.checked = true
    }
    body.classList.add(theme)
    input.addEventListener('change', (e) => {
      const add = e.target.checked ? 'dark' : 'light'
      const remove = e.target.checked ? 'light' : 'dark'
      body.classList.remove(remove)
      body.classList.add(add)
      window.localStorage.setItem('theme', add)
    })
  }
}

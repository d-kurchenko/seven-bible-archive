import defaultThemes from 'src/themes'

export default () => {
  const getUserThemes = () => window.api.system.GET_THEMES()

  const getAllThemes = async () => {
    return [...defaultThemes, ...(await getUserThemes())]
  }

  const readDefaultTheme = (themeName: string) =>
    import(`../themes/${themeName}.js`).then((res) => res.default)
  const readUserTheme = (themeName: string) => window.api.system.GET_USER_THEMES(themeName)
  const setCssVars = (theme: Record<string, string>) => {
    const body = document.body
    body.removeAttribute('style')

    Object.keys(theme).forEach((key) => {
      body.style.setProperty('--' + key, theme[key])
    })
  }
  const setTheme = async (themeName: string) => {
    if (defaultThemes.includes(themeName)) {
      const theme = await readDefaultTheme(themeName)

      setCssVars(theme)
    } else {
      const userThemes = await getUserThemes()
      if (userThemes.includes(themeName)) {
        const theme = await readUserTheme(themeName)
        setCssVars(theme)
      } else {
        const theme = await readDefaultTheme(defaultThemes[0])
        setCssVars(theme)
      }
    }
  }

  return {
    setTheme,
    getAllThemes,
  }
}

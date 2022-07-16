import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import ContentItem from './ContentItem'

const Content = props => {
  const fs = window.require('fs')
  const isDev = window.require('electron-is-dev')
  const path = window.require('path')

  const file_name = path.join(
    isDev ? '' : window.process.resourcesPath,
    'public/theme1.json'
  )

  const { pathImg, isShowBigImg, themes } = props.state
  const { size, lineHeight, letterSpacing, fontFamily } = props.fontSetting

  let themesArr = Object.keys(themes)

  fs.watchFile(file_name, (curr, prev) => {
    renderContent()
    console.log('file modifecate')
  })

  // функция для заполнения контента
  let renderContent = () => {
    fs.readFile(file_name, 'utf8', (err, content) => {
      fillInitialState(JSON.parse(content))
    })
  }

  // dispatch запрос на замену контента
  let fillInitialState = content => {
    props.dispatch({ type: 'FILL_CONTENT', content: content })
  }

  // проверка на заполнение объекта
  function isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false
      }
    }
    return true
  }

  // проверка наличия и заполнение контента
  if (isEmptyObject(themes)) {
    renderContent()
    console.log('content rerender1')
  }

  // стили для текста в content
  let styleFont = {
    fontFamily: fontFamily + ' ,sans-serif',
    fontSize: size + 'px',
    lineHeight: lineHeight + 'px',
    letterSpacing: letterSpacing + 'px'
  }

  // получаем массив с именами тем

  // отрисовка элементов окна "темы"
  let drowThemeContent = themesArr.map((theme, index) => {
    return (
      <Route
        path={'/' + theme}
        key={index}
        render={() => (
          <ContentItem
            theme={themes[theme]}
            themeName={theme}
            dispatch={props.dispatch}
            stateTest={props.state.stateTest}
          />
        )}
      />
    )
  })

  // выключение режима увеличенной картинки
  let imgIncreaseDisable = () => {
    props.dispatch({ type: 'IMG_INCREASE_DISABLE' })
  }

  return (
    <div className="content" style={styleFont}>
      <div
        onClick={imgIncreaseDisable}
        className={
          'img-increase ' + (isShowBigImg ? 'img-increase__active' : '')
        }
      >
        <img src={pathImg} alt="" />
      </div>

      <div className="content__text">
        {drowThemeContent}
        <Redirect from="/" to={themesArr[0]} />
      </div>
    </div>
  )
}

export default Content

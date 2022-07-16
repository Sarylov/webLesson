import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link, Route } from 'react-router-dom'
import Test from './Test'

const ContentItem = props => {
  let key = 0
  let imgId = 0
  let idStep = 0
  let showDeley = 0.3
  let themeItem = Object.keys(props.theme)
  let getStepNames = () => {
    let stepNames = []
    themeItem.forEach(item => {
      if (!item.includes('test') && item !== 'icon') {
        stepNames.push(item)
      }
    })
    return stepNames
  }

  // функция для уникального key
  let getKey = () => {
    key++
    return key
  }

  // dispatch функции
  let imgIncreaseShow = event => {
    props.dispatch({ type: 'IMG_INCREASE_SHOW', src: event.target.src })
  }

  // функция проверки наличия теста на странице
  let checkTest = () => {
    let isTest = false
    themeItem.forEach(step => {
      if (step.includes('test')) isTest = step
    })
    return isTest
  }
  // нарисовать кнопку тестов
  let drowBtnTest = () => {
    let testName = checkTest().replace('<test>', '')

    return (
      <div
        key={getKey()}
        style={animationIncrement()}
        className="btn-test__wrapper"
      >
        <Link
          id="test"
          className="btn-test button"
          onClick={() => window.scrollTo(0, 0)}
          to={'/' + props.themeName + '/test'}
        >
          тест {testName}
        </Link>
      </div>
    )
  }

  // функция для садания анимации при появлении
  let animationIncrement = () => {
    let show = {
      animation: 'fadeInUpBig',
      animationDuration: showDeley + 's'
    }
    if (showDeley < .5) showDeley += 0.1
    return show
  }

  // парсеры контента
  let imgParse = str => {
    const fs = window.require('fs')
    const isDev = window.require('electron-is-dev')
    const path = window.require('path')

    imgId++
    let size = ''
    let sizeClassName = 'img__middle'
    let imgLink = ''

    if (str.includes('small') || str.includes('big')) {
      if (str.includes('small')) size = 'small'
      else size = 'big'

      switch (size) {
        case 'small':
          sizeClassName = 'img__small'
          break
        case 'big':
          sizeClassName = 'img__big'
          break
        default:
          sizeClassName = 'img__middle'
      }

      imgLink = str.replace(size, '')
    } else imgLink = str

    let file_path = isDev
      ? imgLink
      : path.join(window.process.resourcesPath, 'public/' + imgLink)

    return (
      <div
        key={getKey()}
        style={animationIncrement()}
        className={sizeClassName}
      >
        <img
          onClick={imgIncreaseShow}
          src={file_path}
          id={'img' + imgId}
          alt="картинка"
        ></img>
      </div>
    )
  }
  let linkParce = str => {
    let res
    let newStr = str.replace('<a', "<a target='_blank'")

    if (str.includes('<s>')) {
      res = (
        <div
          key={getKey()}
          style={animationIncrement()}
          className="selection-text"
        >
          <p>{ReactHtmlParser(newStr.replace('<s>', ''))}</p>
        </div>
      )
    } else
      res = (
        <p key={getKey()} style={animationIncrement()}>
          {ReactHtmlParser(newStr)}
        </p>
      )

    return res
  }
  let specialTextParse = str => {
    return (
      <div
        key={getKey()}
        style={animationIncrement()}
        className="selection-text"
      >
        <p>{str.replace('<s>', '')}</p>
      </div>
    )
  }
  let youtubeVideoParse = str => {
    let link = ''
    for (let i = str.indexOf('=') + 1; i < str.length; i++) {
      link += str[i]
    }
    return (
      <div
        key={getKey()}
        style={animationIncrement()}
        className="youtube-video"
      >
        <iframe
          width="100%"
          height="100%"
          src={'https://www.youtube.com/embed/' + link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  // разбивает данные разделов на html элементы
  let stepItemsParse = stepName => {
    let stepItems = []

    props.theme[stepName].forEach(str => {
      if (str.includes('img/')) {
        stepItems.push(imgParse(str))
      } else if (str.includes('<a') && str.includes('</a>')) {
        stepItems.push(linkParce(str))
      } else if (str.includes('<s>')) {
        stepItems.push(specialTextParse(str))
      } else if (str.includes('www.youtube.com/')) {
        stepItems.push(youtubeVideoParse(str))
      } else
        stepItems.push(
          <p key={getKey()} style={animationIncrement()}>
            {str}
          </p>
        )
    })

    return stepItems
  }
  // разбивает входящие данные темы на разделы (content__item)
  let contentParse = () => {
    let res = []
    getStepNames().forEach(stepName => {
      let contentItems = []

      contentItems.push(
        <h2
          style={animationIncrement()}
          key={getKey()}
          className="content__title"
        >
          {stepName}
        </h2>
      )
      contentItems.push(stepItemsParse(stepName))

      res.push(
        <div key={getKey()} id={idStep} className="content__item">
          {contentItems}
          {/* <div className="bottom-indent"></div> */}
        </div>
      )

      contentItems = []
      idStep++
    })

    if (checkTest()) {
      res.push(drowBtnTest())
    }

    return res
  }

  // рисует содержимое контента в зависимости от содержания в ней теста
  let drowContent = () => {
    if (checkTest()) {
      let res = []

      res.push(
        <Route
          exact
          path={'/' + props.themeName}
          render={() => contentParse()}
        />
      )

      res.push(
        <Route
          path={'/' + props.themeName + '/test'}
          render={() => (
            <Test
              stateTest={props.stateTest}
              dispatch={props.dispatch}
              test={props.theme[checkTest()]}
            />
          )}
        />
      )

      return res
    } else return contentParse()
  }

  return <div className="container">{drowContent()}</div>
}

export default ContentItem

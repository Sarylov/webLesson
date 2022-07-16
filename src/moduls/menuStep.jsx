import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-scroll'

const MenuStep = props => {
  let key = 0
  let themeItem = Object.keys(props.theme)
  let showDeley = 0.3
  let idSteps = []

  // функция для уникального key
  let getKey = () => {
    key++
    return key
  }

  let qsnQuantity = () => {
    let qsns
    let res

    themeItem.forEach(item => {
      qsns = Object.keys(props.theme[item])
      if (item.includes('<test>')) res = qsns.length
      else res = 0
    })

    return res
  }

  let searchStep = () => {
    let steps = []

    if (props.search === '') {
      idSteps = []
      themeItem.forEach((item, index) => {
        if (item !== 'id' && !item.includes('test') && item !== 'icon') {
          steps.push(item)
          idSteps.push(index)
        }
      })
    } else {
      idSteps = []
      let str = props.search
      themeItem.forEach((item, index) => {
        if (
          item.includes(str) &&
          !item.includes('test') &&
          item !== 'icon' &&
          item !== 'id'
        ) {
          idSteps.push(index)
          steps.push(item)
        }
      })
    }

    return steps
  }

  let drowQsn = () => {
    let res = []
    for (let i = 1; i <= qsnQuantity(); i++) {
      let show = {
        animation: 'fadeIn',
        animationDuration: showDeley + 's'
      }
      showDeley += 0.1

      res.push(
        <Link
          title={'Вопрос' + i}
          style={show}
          activeClass="active"
          smooth={true}
          offset={-70}
          duration={500}
          to={i}
          spy={true}
          className="step__link"
        >
          Вопрос {i}
        </Link>
      )
    }
    return res
  }

  let drowSteps = searchStep().map((step, index) => {
    let show = {
      animation: 'fadeIn',
      animationDuration: showDeley + 's'
    }
    showDeley += 0.2
    return (
      <Link
        key={getKey()}
        title={step}
        style={show}
        activeClass="active"
        to={idSteps[index] - 1}
        spy={true}
        smooth={true}
        offset={-30}
        duration={500}
        className="step__link"
      >
        {step}
      </Link>

      // <a className="step__link" href={'#'+index}>{step}</a>
    )
  })

  let drowMenuItem = () => {
    let res = []

    if (qsnQuantity() === 0) {
      res = drowSteps
    } else {
      res.push(
        <Route exact path={'/' + props.themeName} render={() => drowSteps} />
      )

      res.push(
        <Route
          path={'/' + props.themeName + '/test'}
          render={() => drowQsn()}
        />
      )
    }

    return res
  }

  return <div className="step__chapter fadeIn">{drowMenuItem()}</div>
}

export default MenuStep

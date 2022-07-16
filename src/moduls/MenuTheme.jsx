import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuTheme = props => {
  const { icon } = props
  let drowIcon = () => {
    const fs = window.require('fs')
    const isDev = window.require('electron-is-dev')
    const path = window.require('path')

    let file_path = isDev
      ? icon
      : path.join(window.process.resourcesPath, 'public/' + icon)

    if (icon !== '') {
      return (
        <div className="theme-icon">
          <img src={file_path} alt="иконка" />
        </div>
      )
    } else {
      return (
        <div className="theme-icon">
          <p>{props.title[0]}</p>
        </div>
      )
    }
  }

  return (
    <NavLink
      className="theme__item"
      onClick={() => {
        window.scrollTo(0, 0)
      }}
      to={'/' + props.title}
    >
      {drowIcon()}

      <span className="theme__name">
        <p>{props.title}</p>
      </span>
    </NavLink>
  )
}

export default MenuTheme

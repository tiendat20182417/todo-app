import React from 'react'
import style from '../styles/modules/button.module.scss'

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
}

const Button = ({ children, variant, type, ...rest }) => (
  <button
    className={`${style.button} ${style[`button--${buttonTypes[variant]}`]}`}
    type={type === 'submit' ? 'submit' : 'button'}
    {...rest}
  >
    {children}
  </button>
)

export default Button

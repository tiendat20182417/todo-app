/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import style from '../styles/modules/modal.module.scss'
import Button from './Button'
import { addTodo, updateTodo } from '../slices/todoSlice'

const TodoModal = ({ setModalOpen, type, todo }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        )
      }
      if (type === 'update') {
        dispatch(
          updateTodo({
            ...todo,
            title,
            status,
            time: new Date().toLocaleString(),
          })
        )
      }
    }
    setModalOpen(false)
  }

  useEffect(() => {
    if (type === 'update') {
      setTitle(todo.title)
      setStatus(todo.status)
    } else {
      setTitle('')
      setStatus('incomplete')
    }
  }, [])

  useEffect(() => {
    const closeShow = (e) => {
      // eslint-disable-next-line no-empty
      if (e.target.closest('.modal-container')) {
      } else {
        setModalOpen(false)
      }
    }
    const wrapper = document.querySelector(`.${style.wrapper}`)
    wrapper.addEventListener('click', closeShow)
    return () => wrapper.removeEventListener('click', closeShow)
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={`${style.container} modal-container`}>
        <button
          className={style.closeButton}
          onClick={() => setModalOpen(false)}
        >
          <MdOutlineClose />
        </button>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <h1 className={style.formTitle}>
            {type === 'add' ? 'Add' : 'Update'} TODO
          </h1>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="status">
            Status
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <div className={style.buttonContainer}>
            <Button type="submit" variant="primary">
              {type === 'add' ? 'Add' : 'Update'} Task
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoModal

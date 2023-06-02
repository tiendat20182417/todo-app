/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react'
import { format } from 'date-fns'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import style from '../styles/modules/todoItem.module.scss'
import { checkStatusTodo, deleteTodo } from '../slices/todoSlice'
import TodoModal from './TodoModal'

const TodoItem = ({ todo }) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleEdit = () => {
    setIsOpenUpdate(true)
  }

  const handleCheckBox = (todo) => {
    dispatch(checkStatusTodo(todo))
  }

  return (
    <>
      <div className={style.item}>
        <div className={style.todoDetails}>
          <input
            type="checkbox"
            className={style.checkBox}
            checked={todo.status === 'complete'}
            onChange={() => handleCheckBox(todo)}
          />
          <div className={style.texts}>
            <p
              className={`${style.todoText} ${
                todo.status === 'complete' && style['todoText--completed']
              }`}
            >
              {todo.title}
            </p>
            <p className={style.time}>
              {format(new Date(todo.time), 'p, dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className={style.todoActions}>
          <button className={style.icon} onClick={() => handleDelete(todo.id)}>
            <MdDelete />
          </button>
          <button className={style.icon} onClick={() => handleEdit(todo.id)}>
            <MdEdit />
          </button>
        </div>
      </div>

      {isOpenUpdate && (
        <TodoModal type="update" setModalOpen={setIsOpenUpdate} todo={todo} />
      )}
    </>
  )
}

export default TodoItem

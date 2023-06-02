import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import style from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatusTodo } from '../slices/todoSlice'

const AppHeader = () => {
  const dispatch = useDispatch()
  const selectStatus = useSelector((state) => state.todo.filterStatus)
  const handleFilterStatus = (e) => {
    dispatch(updateFilterStatusTodo(e.target.value))
  }
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={style.appHeader}>
      <Button onClick={() => setModalOpen(true)} variant="primary">
        Add Task
      </Button>
      <select
        className={style.status}
        value={selectStatus}
        onChange={handleFilterStatus}
      >
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
      {modalOpen && <TodoModal type="add" setModalOpen={setModalOpen} />}
    </div>
  )
}

export default AppHeader

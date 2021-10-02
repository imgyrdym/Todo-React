// this is a form for adding a task into the chosen list

import React, {useState} from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/plus.svg';

const AddTask = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');

  //form is not visible before been called
  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  }

  const addTask =() => {
    const obj = {
      listId: list.id,
      text: inputValue,
      comleted: false
    };

    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data)
        onAddTask(list.id, data)
        toggleFormVisible()
      .catch(() => {
        alert('Ошибка при добавлении задачи')
      })
      .finally(() => {
        setIsSubmitting(false);
      })
    });
  };

  return (
		<div className="tasks__form">
			{!visibleForm ? (
				<div onClick={toggleFormVisible} className="tasks__form-new">
					<img src={addSvg} alt="addtask" />
					<span>Новая задача</span>
				</div>
			) : (
				<div className="tasks__form-create">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Введите задачу"
            onChange={e => setInputValue(e.target.value)}
          />
					<button onClick={addTask} className="button">
            {isSubmitting ? 'Добавление' : 'Добавить задачу'}
          </button>
					<button onClick={toggleFormVisible} className="button button--grey">
						Отмена
					</button>
				</div>
			)}
		</div>
	);
}

export default AddTask;
import React, {useState} from 'react';

import addSvg from '../../assets/img/plus.svg';

const AddTask = () => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  }

  const addTask =() => {

  }

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
					<button onClick={addTask} className="button">Добавить задачу</button>
					<button onClick={toggleFormVisible} className="button button--grey">
						Отмена
					</button>
				</div>
			)}
		</div>
	);
}

export default AddTask;

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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
		<div className="tasks__form">
			{!visibleForm ? (
				<div onClick={toggleFormVisible} className="tasks__form-new">
					<img src={addSvg} alt="addtask" />
					<span>New task</span>
				</div>
			) : (
				<div className="tasks__form-create">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Enter your task"
            onChange={e => setInputValue(e.target.value)}
          />
					<button onClick={addTask} className="button">
            {isSubmitting ? 'Submitting' : 'Add task'}
          </button>
					<button onClick={toggleFormVisible} className="button button--grey">
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}

export default AddTask;
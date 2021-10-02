import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';

import "./AddList.scss";

import plusSvg from "../../assets/img/plus.svg";
import crossSvg from "../../assets/img/cross.svg";

const AddList = ({ colors, onAdd }) => {
  //visiblePopup хранит значения true/false, setVisiblePopup - их задает. useState = initialState, т.е. начальное значение сосотояния
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    // selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    };

    setIsLoading(true);

    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then (({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        // 1. передаем здесь функцию (см дальше в List)
        //если в функцию просто передать тру/фолз, то попап появится при клике, но уходить не будет. !visiblePopup передает же значения, противоположные актуальному состоянию
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: "allists__add-btn",
            icon: plusSvg,
            name: "Добавить список",
          },
        ]}
      />
      {/* если visiblePopup === true, то отобрази мне див (по факту "если визибл и див тру, то отобрази" - но див в любом случае будет тру, потому что ну...всегда положительно). Если false - реакт просто не отрендерит ничего  */}
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={crossSvg}
            alt="close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors? (colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))) : null}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
import React from 'react';
import classNames from 'classnames';
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge';

import './List.scss';

//2. эта функция у нас теперь в пропсах к List
const List = ({ items, isRemovable, onClick, onRemove }) => {

  const removeList = (item) => {
    if (window.confirm('Вы правда хотите удалить список?')) {
      axios
        .delete("http://localhost:3001/lists/" + item.id)
        .then(() => {
        onRemove(item.id);
        });
    }
  }

  return (
    //3. знакомим ul с онкликом и он понимает, че от него хотят
    <ul onClick={onClick} className="allists">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { isActive: item.isActive })}
        >
          <i>
            {item.icon ? (
                  <img src={item.icon} alt="todo img" className="allists__img" />
                ) : (
                  <Badge color={item.color} />
                )
            }
          </i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="allists__remove-icon"
              src={removeSvg} alt="remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;

import React from 'react';
import classNames from 'classnames';
import axios from "axios";

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

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

		<ul onClick={onClick} className="allists">
			{items.map((item, index) => (
				<li
					key={index}
          className={classNames(item.className, { isActive: activeItem && activeItem.id === item.id })}
          onClick={onClickItem ? () => onClickItem(item) : null}
				>
					<i>
						{item.icon ? (
							<img src={item.icon} alt="todo img" className="allists__img" />
						) : (
							<Badge color={item.color.name} />
						)}
					</i>
					<span>
						{item.name}
						{item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
					</span>
					{isRemovable && (
						<img
							className="allists__remove-icon"
							src={removeSvg}
							alt="remove icon"
							onClick={() => removeList(item)}
						/>
					)}
				</li>
			))}
		</ul>
	);
}

export default List;
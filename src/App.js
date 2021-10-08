import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { List, AddList, Tasks } from './components';

import listSvg from "./assets/img/list.svg";

function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
        return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item
    })
		setLists(newList);
  }

  return (
		<div className="todo">
			<aside className="todo__sidebar">
				<List
          onClickItem={list => {
            history.push(`/`);
          }}
          items={[
            {
              active: history.location.pathname === '/',
              icon: listSvg,
              name: 'Task lists'
            }
          ]}
				/>
				{lists ? (
					<List
						items={lists}
						onRemove={(id) => {
							const newLists = lists.filter((list) => list.id !== id);
							setLists(newLists);
						}}
						onClickItem={(list) => {
							history.push(`/lists/${list.id}`);
              setActiveItem(list);
            }}
						activeItem={activeItem}
						isRemovable
					/>
				) : (
					"Loading..."
				)}
				<AddList onAdd={onAddList} colors={colors} />
			</aside>

			<main className="todo__tasks">
        <Route exact path="/">
          {/* при первом рендере lists=null, поэтому сначала мы проверяем, что он не null, и когда проверили, что идем по нему мапом  */}
          Choose a task list in menu or create a new one
        </Route>
        <Route path="/lists/:id">
				{lists && activeItem && (
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
				)}
        </Route>
			</main>
		</div>
	);
}

export default App;

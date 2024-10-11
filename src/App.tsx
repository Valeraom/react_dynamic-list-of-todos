/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/getPreparedTodos';
import { getTodoById } from './utils/getTodoById';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [searchQuery, setSearchQuery] = useState('');
  const [completionQuery, setCompletionQuery] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    setFilteredTodos(getPreparedTodos(todos, { searchQuery, completionQuery }));
  }, [todos, searchQuery, completionQuery]);

  const selectedTodo = getTodoById(filteredTodos, selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                completionQuery={completionQuery}
                onAddSearchQuery={setSearchQuery}
                onAddCompletionQuery={setCompletionQuery}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  onSelect={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal todo={selectedTodo} onSelect={setSelectedTodoId} />
      )}
    </>
  );
};

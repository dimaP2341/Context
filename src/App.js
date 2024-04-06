import React from 'react';
import './App.css';

const defaultState = {
  todos: []
}

const AppContext = React.createContext(defaultState);
const ADD_TODO = 'ADD_TODO', DELETE_TODO = 'DELETE_TODO';

const reducer = (state = defaultState, action) => {
  //type payload
  const {type, payload} = action
  switch (type) {
    case ADD_TODO:
      return {todos: [payload, ...state.todos]}
    case DELETE_TODO:
      return {todos: state.todos.filter(todo => todo.id !== payload)}
    default:
      return state
  }
}

const TodoForm = () => {
  const [title, setTitle] = React.useState('');
  const {dispatch} = React.useContext(AppContext);

  const handleChange = ({target: {value}}) => {
    setTitle(value);
  }

  const handleClick = () => {
    setTitle('');
    dispatch({
      type: ADD_TODO,
      payload: {
        id: crypto.randomUUID(),
        title
      }
    })
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div>
      <input type='text' placeholder='Enter title' value={title} onKeyDown={handleEnter} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

const TodoList = () => {
  const {state: {todos}, dispatch} = React.useContext(AppContext);

  const handleDelete = id => () => {
     dispatch({
      type: DELETE_TODO,
      payload: id,
     })
  }

  return (
    <ul>
      {todos.map(todo => {
        return <li key={todo.id}>
          {todo.title}
          <button onClick={handleDelete(todo.id)}>X</button>
        </li>
      })}
    </ul>
  )
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <div className="App">
      <h1>Todo App</h1>
      <AppContext.Provider value={{state, dispatch}}>
        <TodoForm />
        <TodoList />
      </AppContext.Provider>
    </div>
  );
}

export default App;

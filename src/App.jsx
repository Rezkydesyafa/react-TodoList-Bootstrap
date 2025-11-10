import { useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import useLocalStorage from './hooks/useLocalStorage';
import { applyFilter, sortTodos } from './utils/todos';
import TodoFooter from './components/TodoFooter';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [
    // Example
    // { id: 1, text: 'This is an example of task #1', completed: true },
    // { id: 2, text: 'This is an example of task #2', completed: false },
  ]);
  const [filter, setFilter] = useLocalStorage('filter', 'all');
  const [sortBy, setSortBy] = useLocalStorage('sortBy', 'dueDate');
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addTodo = (formData) => {
    const newTodo = {
      id: Date.now(),
      text: formData.text,
      completed: false,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const startEdit = (todo) => {
    setEditing(todo);
    setShowModal(true);
  };
  const saveEdit = (updated) => {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setShowModal(false);
    setEditing(null);
  };

  const filtered = useMemo(() => {
    const result = applyFilter(todos, filter);
    return sortTodos(result, sortBy);
  }, [todos, filter, sortBy]);

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div>
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col xs={12} md={10} lg={8} xl={6}>
            <div className='todo-container'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='app-title mb-0'>Your To Do</h1>
              </div>

              <div className='todo-main-content'>
                <TodoInput onAdd={addTodo} />
                <div className='filter-sort-wrapper'>
                  <FilterBar filter={filter} setFilter={setFilter} />
                  <SortBar sortBy={sortBy} onSortChange={setSortBy} />
                </div>

                <motion.div layout className='todo-list-container'>
                  <TodoList
                    todos={filtered}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={startEdit}
                  />
                </motion.div>

                <TodoFooter remaining={remaining} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>{' '}
      <EditModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={saveEdit}
        initial={editing}
      />
    </div>
  );
}

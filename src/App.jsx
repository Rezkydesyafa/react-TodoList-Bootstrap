import { useMemo, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';
import FilterBar from './components/FilterBar';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [
    // Example seed (you can clear this after first run)
    // { id: 1, text: 'This is an example of task #1', completed: true },
    // { id: 2, text: 'This is an example of task #2', completed: false },
  ]);
  const [filter, setFilter] = useLocalStorage('filter', 'all');
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addTodo = (formData) => {
    const newTodo = {
      id: Date.now(),
      text: formData.text,
      completed: false,
      priority: formData.priority,
      status: formData.status,
    };
    setTodos([...todos, newTodo]);
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const startEdit = (todo) => {
    setEditing(todo);
    setShowModal(true);
  };
  const saveEdit = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    setShowModal(false);
    setEditing(null);
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

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
                <FilterBar filter={filter} setFilter={setFilter} />

                <motion.div layout className='todo-list-container'>
                  <TodoList
                    todos={filtered}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={startEdit}
                  />
                </motion.div>

                <div className='todo-footer'>
                  <div className='todo-count'>
                    Your remaining todos : {remaining}
                  </div>
                  <div className='todo-quote'>
                    "Doing what you love is the cornerstone of having abundance
                    in your life." – Wayne Dyer
                  </div>
                </div>
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

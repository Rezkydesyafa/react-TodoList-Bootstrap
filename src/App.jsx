import { useMemo, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [
    // Example seed (you can clear this after first run)
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
    // First apply filters
    let result = todos;
    if (filter === 'active') result = result.filter((t) => !t.completed);
    if (filter === 'completed') result = result.filter((t) => t.completed);

    // Then apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          const statusOrder = { 'To Do': 1, 'In Progress': 2, Done: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
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

                <div className='todo-footer'>
                  <div className='todo-count'>
                    Your remaining todos : {remaining}
                  </div>
                  <div className='todo-quote'>
                    "Doing what you love is the cornerstone of having abundance
                    in your life." - Wayne Dyer
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

import { useState } from 'react';
import { Button, Form, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [showConfirm, setShowConfirm] = useState(false); // modal state

  const handleDeleteClick = () => {
    setShowConfirm(true); // tampilkan modal
  };

  const handleConfirmDelete = () => {
    onDelete(todo.id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'to do':
        return 'status-to-do';
      case 'in progress':
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return 'status-to-do';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <>
      {/* Todo Item */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className='todo-item-card'
      >
        <div className='todo-item-row'>
          {/* Task Section */}
          <div className='todo-task'>
            <Form.Check
              type='checkbox'
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className='todo-checkbox'
            />
            <div>
              <h6
                className={`todo-text mb-0 ${
                  todo.completed ? 'strike' : ''
                } text-break`}
              >
                {todo.text}
              </h6>
            </div>
          </div>

          {/* Priority + Status Section */}
          <div className='todo-meta'>
            {/* Bagian tanggal di kiri */}
            {todo.dueDate && (
              <div className='due-date-column text-center'>
                <i className='bi bi-calendar-event'></i>
                <div className='due-date-text'>
                  <div className='due-day'>
                    {new Date(todo.dueDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                    })}
                  </div>
                  <div className='due-month'>
                    {new Date(todo.dueDate).toLocaleDateString('id-ID', {
                      month: 'short',
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Bagian badges di kanan */}
            <div className='meta-badges'>
              <Badge
                className={`priority-badge ${getPriorityClass(todo.priority)}`}
              >
                {todo.priority || 'Medium'}
              </Badge>

              <Badge className={`status-badge ${getStatusClass(todo.status)}`}>
                {todo.status || 'To Do'}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='action-buttons'>
            <Button
              className='btn-icon-dark'
              onClick={() => onEdit(todo)}
              aria-label='Edit task'
            >
              <i className='bi bi-pencil-square fs-6'></i>
            </Button>
            <Button
              className='btn-icon-dark'
              onClick={handleDeleteClick}
              aria-label='Delete task'
            >
              <i className='bi bi-trash3-fill fs-6'></i>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modal Konfirmasi Delete */}
      <Modal
        show={showConfirm}
        onHide={handleCancelDelete}
        centered
        className='delete-confirm-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
          <br />
          <strong>"{todo.text}"</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

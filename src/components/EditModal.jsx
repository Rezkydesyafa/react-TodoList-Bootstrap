import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PRIORITIES, STATUSES } from '../utils/constants';

export default function EditModal({ show, onHide, onSave, initial }) {
  const [text, setText] = useState(initial?.text ?? '');
  const [priority, setPriority] = useState(initial?.priority ?? 'Medium');
  const [status, setStatus] = useState(initial?.status ?? 'To Do');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');

  useEffect(() => {
    setText(initial?.text ?? '');
    setPriority(initial?.priority ?? 'Medium');
    setStatus(initial?.status ?? 'To Do');
    setDueDate(initial?.dueDate ?? '');
  }, [initial]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({
      ...initial,
      text: text.trim(),
      priority,
      status,
      dueDate,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered className='edit-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label>Task</Form.Label>
          <Form.Control
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter task name'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Priority</Form.Label>
          <Form.Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='dark' onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

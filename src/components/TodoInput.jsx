import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function TodoInput({ onAdd }) {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'Medium',
    status: 'To Do',
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity() || !formData.text.trim()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onAdd(formData);
    setFormData({
      text: '',
      priority: 'Medium',
      status: 'To Do',
    });
    setValidated(false);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className='todo-input-form'
    >
      <Row className='g-3'>
        <Col xs={12}>
          <Form.Control
            type='text'
            placeholder='Add new task'
            name='text'
            value={formData.text}
            onChange={handleChange}
            className='todo-input'
            required
            minLength={3}
          />
          <Form.Control.Feedback type='invalid'>
            Please enter a task with at least 3 characters.
          </Form.Control.Feedback>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Select
            name='priority'
            value={formData.priority}
            onChange={handleChange}
            className='todo-select'
          >
            <option value='High'>High Priority</option>
            <option value='Medium'>Medium Priority</option>
            <option value='Low'>Low Priority</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6}>
          <div className='d-flex gap-2'>
            <Form.Select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='todo-select'
            >
              <option value='To Do'>To Do</option>
              <option value='In Progress'>In Progress</option>
              <option value='Done'>Done</option>
            </Form.Select>
            <Button variant='dark' type='submit' className='add-todo-btn'>
              <i className='bi bi-plus-lg'></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

import { Form } from 'react-bootstrap';

export default function SortBar({ sortBy, onSortChange }) {
  return (
    <div className='sort-bar'>
      <span className='sort-label'>Sort by:</span>
      <Form.Select
        size='sm'
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className='form-select'
      >
        <option value='dueDate'>Due Date</option>
        <option value='priority'>Priority</option>
        <option value='status'>Status</option>
        <option value='createdAt'>Created Date</option>
      </Form.Select>
    </div>
  );
}

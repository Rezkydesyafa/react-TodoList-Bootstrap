import MotionWrapper from './MotionWrapper';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FILTER_OPTIONS } from '../utils/constants';

export default function FilterBar({ filter, setFilter }) {
  return (
    <MotionWrapper type='scale'>
      <div className='d-flex justify-content-center my-4'>
        <ButtonGroup role='group' aria-label='Filter todos'>
          {FILTER_OPTIONS.map((opt) => (
            <ToggleButton
              key={opt.value}
              id={`filter-${opt.value}`}
              type='radio'
              name='filter'
              value={opt.value}
              variant={filter === opt.value ? 'dark' : 'outline-dark'}
              checked={filter === opt.value}
              onChange={(e) => setFilter(e.currentTarget.value)}
              className='px-4 btn-filter'
            >
              {opt.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
    </MotionWrapper>
  );
}

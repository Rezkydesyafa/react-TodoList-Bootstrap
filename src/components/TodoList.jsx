import MotionWrapper from './MotionWrapper';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <MotionWrapper type='fade-slide'>
      <div className='todo-list-container'>
        {todos.map((todo) => (
          <MotionWrapper key={todo.id} type='fade-slide'>
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </MotionWrapper>
        ))}
      </div>
    </MotionWrapper>
  );
}

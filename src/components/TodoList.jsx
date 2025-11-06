import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <AnimatePresence>
      {todos.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className='text-muted mt-3'
        >
          No tasks. Add one above.
        </motion.p>
      ) : (
        todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </AnimatePresence>
  );
}

import { PRIORITY_ORDER, STATUS_ORDER } from './constants';

export function applyFilter(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed);
  if (filter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

export function sortTodos(todos, sortBy) {
  const list = [...todos];
  return list.sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        return (
          (PRIORITY_ORDER[a.priority] ?? 0) - (PRIORITY_ORDER[b.priority] ?? 0)
        );
      case 'status':
        return (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0);
      case 'createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });
}

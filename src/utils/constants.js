export const PRIORITIES = ['High', 'Medium', 'Low'];
export const STATUSES = ['To Do', 'In Progress', 'Done'];

export const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3 };
export const STATUS_ORDER = { 'To Do': 1, 'In Progress': 2, Done: 3 };

export const FILTER_OPTIONS = [
  { name: 'All', value: 'all' },
  { name: 'Active', value: 'active' },
  { name: 'Completed', value: 'completed' },
];

export const DEFAULT_TODO_FIELDS = {
  text: '',
  priority: 'Medium',
  status: 'To Do',
  dueDate: '',
};


export const categories = ['Road', 'Water Supply', 'Electricity', 'Sanitation', 'Other'];
export const statuses = ['Pending', 'In Review', 'In Progress', 'Resolved'];
export const priorities = ['Low', 'Medium', 'High', 'Critical'];

export const statusStyles = {
  Pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  'In Review': 'bg-sky-100 text-sky-800 ring-sky-200',
  'In Progress': 'bg-orange-100 text-orange-800 ring-orange-200',
  Resolved: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
};

export const priorityStyles = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-blue-100 text-blue-700',
  High: 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-100 text-red-800',
};

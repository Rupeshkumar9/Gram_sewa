import { statusStyles } from '../constants';

export default function StatusBadge({ status }) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}>{status}</span>;
}

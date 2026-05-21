import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { priorities, priorityStyles, statuses } from '../constants';
import StatusBadge from './StatusBadge';

export default function AdminComplaintRow({ complaint, onUpdate }) {
  const [remarks, setRemarks] = useState(complaint.remarks || '');

  return (
    <article className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[130px_1fr_260px]">
      {complaint.imageBase64 ? (
        <img className="h-32 w-full rounded-md object-cover lg:h-full" src={complaint.imageBase64} alt={complaint.title} />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-md bg-leaf-100 text-leaf-700">
          <MapPin size={30} />
        </div>
      )}
      <div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={complaint.status} />
          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${priorityStyles[complaint.priority]}`}>
            {complaint.priority}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{complaint.category}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold">{complaint.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{complaint.description}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} /> {complaint.village}, {complaint.ward} | Filed by {complaint.filedByName}
        </p>
      </div>
      <div className="space-y-3">
        <select className="field-input" value={complaint.status} onChange={(event) => onUpdate(complaint, { status: event.target.value })}>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <select className="field-input" value={complaint.priority} onChange={(event) => onUpdate(complaint, { priority: event.target.value })}>
          {priorities.map((priority) => (
            <option key={priority}>{priority}</option>
          ))}
        </select>
        <textarea
          className="field-input min-h-24"
          placeholder="Resolution remarks"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
          onBlur={() => onUpdate(complaint, { remarks })}
        />
      </div>
    </article>
  );
}

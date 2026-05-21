import { AlertTriangle, MapPin, Plus } from 'lucide-react';
import StatusBadge from './StatusBadge';

export function ComplaintGrid({ complaints, emptyAction }) {
  if (!complaints.length) {
    return (
      <section className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <AlertTriangle className="text-earth-500" size={38} />
        <h2 className="mt-4 text-xl font-semibold">No complaints found</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Start by filing a complaint with a category, location, and photo proof.</p>
        <button className="primary-button mt-5" onClick={emptyAction}>
          <Plus size={18} /> Report Issue
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.id} complaint={complaint} />
      ))}
    </section>
  );
}

export default function ComplaintCard({ complaint }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {complaint.imageBase64 ? (
        <img className="h-44 w-full object-cover" src={complaint.imageBase64} alt={complaint.title} />
      ) : (
        <div className="flex h-44 items-center justify-center bg-leaf-100 text-leaf-700">
          <MapPin size={34} />
        </div>
      )}
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={complaint.status} />
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{complaint.category}</span>
        </div>
        <h3 className="text-lg font-semibold">{complaint.title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{complaint.description}</p>
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} /> {complaint.village}, {complaint.ward}
        </p>
        {complaint.remarks && <p className="rounded-md bg-leaf-50 p-3 text-sm text-leaf-800">{complaint.remarks}</p>}
      </div>
    </article>
  );
}

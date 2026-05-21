import { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { statuses } from '../constants';
import { ComplaintGrid } from './ComplaintCard';
import DashboardHero from './DashboardHero';

export default function CitizenDashboard({ user, complaints, onRoute }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const myComplaints = complaints.filter((complaint) => complaint.filedBy === user.id);
  const visibleComplaints = filterStatus === 'All' ? myComplaints : myComplaints.filter((item) => item.status === filterStatus);
  const resolved = myComplaints.filter((item) => item.status === 'Resolved').length;

  return (
    <>
      <DashboardHero
        title="Citizen Dashboard"
        description="Track every complaint you have filed and see authority updates as they happen in this browser."
        stats={[
          ['Total', myComplaints.length],
          ['Pending', myComplaints.filter((item) => item.status === 'Pending').length],
          ['Resolved', resolved],
        ]}
      />

      <section className="toolbar">
        <label className="compact-field">
          <Filter size={18} />
          <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <button className="primary-button" onClick={() => onRoute('report')}>
          <Plus size={18} /> New Complaint
        </button>
      </section>

      <ComplaintGrid complaints={visibleComplaints} emptyAction={() => onRoute('report')} />
    </>
  );
}

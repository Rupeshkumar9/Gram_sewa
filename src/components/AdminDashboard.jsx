import { useState } from 'react';
import { Download, FileUp, Filter } from 'lucide-react';
import { categories, statuses } from '../constants';
import { csvToComplaints, downloadCsv } from '../csv';
import { saveComplaints, upsertComplaint } from '../storage';
import AdminComplaintRow from './AdminComplaintRow';
import DashboardHero from './DashboardHero';

const emptyFilters = { status: 'All', category: 'All', village: '' };

export default function AdminDashboard({ complaints, onRefresh }) {
  const [filters, setFilters] = useState(emptyFilters);
  const visibleComplaints = complaints.filter((complaint) => {
    const byStatus = filters.status === 'All' || complaint.status === filters.status;
    const byCategory = filters.category === 'All' || complaint.category === filters.category;
    const byVillage = !filters.village || complaint.village.toLowerCase().includes(filters.village.toLowerCase());
    return byStatus && byCategory && byVillage;
  });

  const updateComplaint = (complaint, patch) => {
    upsertComplaint({ ...complaint, ...patch, updatedAt: new Date().toISOString() });
    onRefresh();
  };

  const importCsv = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imported = csvToComplaints(String(reader.result));
      const mode = window.confirm('Merge imported data with existing complaints? Select Cancel to replace all complaints.');
      saveComplaints(mode ? [...imported, ...complaints] : imported);
      onRefresh();
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <>
      <DashboardHero
        title="Authority Dashboard"
        description="Review complaints, assign priority, update progress, and export records for reporting."
        stats={[
          ['Total', complaints.length],
          ['Pending', complaints.filter((item) => item.status === 'Pending').length],
          ['Resolved', complaints.filter((item) => item.status === 'Resolved').length],
        ]}
      />

      <section className="toolbar">
        <label className="compact-field">
          <Filter size={18} />
          <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <label className="compact-field">
          <select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
            <option>All</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <input
          className="compact-input"
          placeholder="Filter village"
          value={filters.village}
          onChange={(event) => setFilters({ ...filters, village: event.target.value })}
        />
        <button className="secondary-button" onClick={() => downloadCsv(complaints)}>
          <Download size={18} /> Export CSV
        </button>
        <label className="secondary-button cursor-pointer">
          <FileUp size={18} /> Import CSV
          <input className="hidden" type="file" accept=".csv,text/csv" onChange={importCsv} />
        </label>
      </section>

      <div className="grid gap-4">
        {visibleComplaints.map((complaint) => (
          <AdminComplaintRow key={complaint.id} complaint={complaint} onUpdate={updateComplaint} />
        ))}
      </div>
    </>
  );
}

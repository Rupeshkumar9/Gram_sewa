import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { categories } from '../constants';
import { upsertComplaint } from '../storage';
import { FormTitle, TextInput } from './ui';

export default function ComplaintForm({ user, onCreated }) {
  const [form, setForm] = useState({
    category: 'Road',
    title: '',
    description: '',
    village: '',
    ward: '',
    imageBase64: '',
  });

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, imageBase64: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    const now = new Date().toISOString();
    upsertComplaint({
      ...form,
      id: `CMP-${Date.now()}`,
      status: 'Pending',
      priority: 'Medium',
      filedBy: user.id,
      filedByName: user.name,
      remarks: '',
      createdAt: now,
      updatedAt: now,
    });
    onCreated();
  };

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-7" onSubmit={submit}>
      <FormTitle title="Report Issue" subtitle="File a structured complaint with category, location, and photo evidence." />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="field-label">
          Category
          <select className="field-input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <TextInput label="Complaint title" value={form.title} onChange={(title) => setForm({ ...form, title })} required />
        <TextInput label="Village" value={form.village} onChange={(village) => setForm({ ...form, village })} required />
        <TextInput label="Ward" value={form.ward} onChange={(ward) => setForm({ ...form, ward })} required />
        <label className="field-label md:col-span-2">
          Description
          <textarea
            className="field-input min-h-32"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            required
          />
        </label>
        <label className="field-label md:col-span-2">
          Photo evidence
          <input className="field-input" type="file" accept="image/*" onChange={handleImage} />
        </label>
      </div>
      {form.imageBase64 && <img className="mt-4 h-44 w-full rounded-md object-cover" src={form.imageBase64} alt="Uploaded issue" />}
      <button className="primary-button mt-6">
        <CheckCircle2 size={18} /> Submit Complaint
      </button>
    </form>
  );
}

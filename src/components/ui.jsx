export function TextInput({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}

export function FormTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
    </div>
  );
}

export function ErrorText({ error }) {
  return error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null;
}

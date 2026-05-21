export default function LanguageSwitch({ language, onLanguageChange, t }) {
  return (
    <label className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700">
      <span className="sr-only">{t.language}</span>
      <select className="bg-transparent outline-none" value={language} onChange={(event) => onLanguageChange(event.target.value)}>
        <option value="en">{t.english}</option>
        <option value="hi">{t.hindi}</option>
      </select>
    </label>
  );
}

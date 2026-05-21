import { useState } from 'react';
import { ErrorText, FormTitle, TextInput } from './ui';
import { loginUser, registerUser } from '../storage';
import LanguageSwitch from './LanguageSwitch';

const tabClass = (active) =>
  `flex-1 rounded px-3 py-2 text-sm font-semibold transition ${active ? 'bg-white text-leaf-700 shadow-sm' : 'text-slate-500'}`;

export default function AuthShell({ route, onRoute, onLogin, language, onLanguageChange, t }) {
  return (
    <main className="grid min-h-screen bg-leaf-50 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative flex min-h-[320px] items-end overflow-hidden bg-[url('https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-6 text-white sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
        <div className="relative max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf-100">{t.phase}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal sm:text-6xl">Gram-Sewa</h1>
          <p className="mt-4 text-base leading-7 text-slate-100 sm:text-lg">{t.hero}</p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-soft sm:p-7">
          <div className="mb-4 flex justify-end">
            <LanguageSwitch language={language} onLanguageChange={onLanguageChange} t={t} />
          </div>
          <div className="mb-6 flex rounded-md bg-slate-100 p-1">
            <button className={tabClass(route === 'login')} onClick={() => onRoute('login')}>
              {t.login}
            </button>
            <button className={tabClass(route === 'register')} onClick={() => onRoute('register')}>
              {t.register}
            </button>
          </div>
          {route === 'register' ? <RegisterForm onLogin={onLogin} t={t} /> : <LoginForm onLogin={onLogin} t={t} />}
        </div>
      </section>
    </main>
  );
}

function LoginForm({ onLogin, t }) {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      onLogin(await loginUser(form));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <FormTitle title={t.welcomeBack} subtitle={t.loginHelp} />
      <TextInput label={t.phone} value={form.phone} onChange={(phone) => setForm({ ...form, phone })} required />
      <TextInput
        label={t.password}
        type="password"
        value={form.password}
        onChange={(password) => setForm({ ...form, password })}
        required
      />
      <ErrorText error={error} />
      <button className="primary-button w-full">{t.login}</button>
    </form>
  );
}

function RegisterForm({ onLogin, t }) {
  const [form, setForm] = useState({ name: '', phone: '', password: '', role: 'citizen' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      onLogin(await registerUser(form));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <FormTitle title={t.createAccount} subtitle={t.registerHelp} />
      <TextInput label={t.name} value={form.name} onChange={(name) => setForm({ ...form, name })} required />
      <TextInput label={t.phone} value={form.phone} onChange={(phone) => setForm({ ...form, phone })} required />
      <TextInput
        label={t.password}
        type="password"
        value={form.password}
        onChange={(password) => setForm({ ...form, password })}
        required
      />
      <label className="field-label">
        {t.role}
        <select className="field-input" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
          <option value="citizen">{t.citizen}</option>
          <option value="authority">{t.authority}</option>
        </select>
      </label>
      <ErrorText error={error} />
      <button className="primary-button w-full">{t.register}</button>
    </form>
  );
}

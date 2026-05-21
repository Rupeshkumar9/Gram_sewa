import { BarChart3, Info, LogOut, Plus, ShieldCheck, UserRound } from 'lucide-react';
import logo from '../Assets/logo.png';
import LanguageSwitch from './LanguageSwitch';

const navClass = (active) =>
  `inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
    active ? 'bg-leaf-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
  }`;

export default function Header({ user, route, onRoute, onLogout, language, onLanguageChange, t }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => onRoute('dashboard')}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-leaf-50 ring-1 ring-leaf-100">
            <img src={logo} alt="Gram-Sewa" className="h-full w-full object-contain p-1.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xl font-bold">Gram-Sewa</span>
            <span className="text-sm text-slate-500">{t.subtitle}</span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {user.role === 'citizen' && (
            <button className={navClass(route === 'report')} onClick={() => onRoute('report')}>
              <Plus size={18} /> {t.reportIssue}
            </button>
          )}
          <button className={navClass(route === 'dashboard')} onClick={() => onRoute('dashboard')}>
            <BarChart3 size={18} /> {t.dashboard}
          </button>
          <button className={navClass(route === 'about')} onClick={() => onRoute('about')}>
            <Info size={18} /> {t.about}
          </button>
          <LanguageSwitch language={language} onLanguageChange={onLanguageChange} t={t} />
          <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {user.role === 'authority' ? <ShieldCheck size={16} /> : <UserRound size={16} />}
            {user.name}
          </span>
          <button className="icon-button" onClick={onLogout} title={t.logout} aria-label={t.logout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

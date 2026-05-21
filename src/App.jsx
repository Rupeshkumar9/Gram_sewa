import { useEffect, useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import AboutPage from './components/AboutPage';
import AuthShell from './components/AuthShell';
import CitizenDashboard from './components/CitizenDashboard';
import ComplaintForm from './components/ComplaintForm';
import Header from './components/Header';
import { translations } from './i18n';
import { initializeSeedData } from './seedData';
import { clearSession, getComplaints, getSession, setSession } from './storage';

function App() {
  const [user, setUser] = useState(getSession());
  const [route, setRoute] = useState(user ? 'dashboard' : 'login');
  const [complaints, setComplaints] = useState(getComplaints());
  const [language, setLanguage] = useState(localStorage.getItem('gramsewa_language') || 'en');
  const t = translations[language];

  const refreshComplaints = () => setComplaints(getComplaints());

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setRoute('login');
  };

  const handleAuth = (nextUser) => {
    setUser(nextUser);
    setSession(nextUser);
    setRoute('dashboard');
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem('gramsewa_language', nextLanguage);
  };

  useEffect(() => {
    initializeSeedData().then(refreshComplaints);

    const onStorage = () => refreshComplaints();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!user) {
    return (
      <AuthShell
        route={route}
        onRoute={setRoute}
        onLogin={handleAuth}
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Header
        user={user}
        route={route}
        onRoute={setRoute}
        onLogout={handleLogout}
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {route === 'about' ? (
          <AboutPage language={language} />
        ) : route === 'report' && user.role === 'citizen' ? (
          <ComplaintForm
            user={user}
            onCreated={() => {
              refreshComplaints();
              setRoute('dashboard');
            }}
          />
        ) : user.role === 'authority' ? (
          <AdminDashboard complaints={complaints} onRefresh={refreshComplaints} />
        ) : (
          <CitizenDashboard user={user} complaints={complaints} onRoute={setRoute} />
        )}
      </main>
    </div>
  );
}

export default App;

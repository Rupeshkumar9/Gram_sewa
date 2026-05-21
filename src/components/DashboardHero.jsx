export default function DashboardHero({ title, description, stats }) {
  return (
    <section className="rounded-lg bg-leaf-700 p-5 text-white shadow-soft sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf-100">Gram Panchayat workflow</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-leaf-50 sm:text-base">{description}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-md bg-white/12 p-4 text-center ring-1 ring-white/20">
              <span className="block text-2xl font-bold">{value}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-leaf-100">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

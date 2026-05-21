const content = {
  en: {
    eyebrow: 'About Gram-Sewa',
    title: 'A simple civic complaint system for village communities',
    intro:
      'Gram-Sewa helps citizens report local infrastructure problems such as damaged roads, water supply issues, electricity faults, and sanitation complaints. Authorities can review every complaint, assign priority, update progress, and add resolution remarks.',
    featuresTitle: 'Key Features',
    features: [
      'Citizen registration and login',
      'Complaint filing with category, location, description, and image upload',
      'Citizen dashboard to track personal complaints',
      'Authority dashboard to manage all complaints',
      'Status tracking from filing to resolution',
      'Priority assignment and authority remarks',
      'CSV import/export for portable data backup',
      'Frontend-only storage using browser localStorage',
    ],
    statusTitle: 'Complaint Status Meaning',
    statuses: [
      ['Pending', 'The complaint has been submitted but authority review has not started yet.'],
      ['In Review', 'The authority has seen the complaint and is checking the issue details.'],
      ['In Progress', 'Action has started, such as inspection, repair planning, or team assignment.'],
      ['Resolved', 'The reported issue has been completed or closed with authority remarks.'],
    ],
  },
  hi: {
    eyebrow: 'ग्राम-सेवा के बारे में',
    title: 'गांवों के लिए सरल नागरिक शिकायत प्रणाली',
    intro:
      'ग्राम-सेवा नागरिकों को टूटी सड़क, पानी की समस्या, बिजली खराबी और सफाई जैसी स्थानीय समस्याएं दर्ज करने में मदद करता है। अधिकारी हर शिकायत की समीक्षा कर सकते हैं, प्राथमिकता तय कर सकते हैं, स्थिति अपडेट कर सकते हैं और समाधान टिप्पणी जोड़ सकते हैं।',
    featuresTitle: 'मुख्य सुविधाएं',
    features: [
      'नागरिक रजिस्ट्रेशन और लॉगिन',
      'श्रेणी, स्थान, विवरण और फोटो के साथ शिकायत दर्ज करना',
      'अपनी शिकायतें ट्रैक करने के लिए नागरिक डैशबोर्ड',
      'सभी शिकायतों को संभालने के लिए अधिकारी डैशबोर्ड',
      'शिकायत दर्ज होने से समाधान तक स्थिति ट्रैकिंग',
      'प्राथमिकता तय करना और अधिकारी टिप्पणी',
      'डेटा बैकअप के लिए CSV इम्पोर्ट/एक्सपोर्ट',
      'ब्राउज़र localStorage पर आधारित फ्रंटेंड-ओनली स्टोरेज',
    ],
    statusTitle: 'शिकायत स्थिति का अर्थ',
    statuses: [
      ['Pending', 'शिकायत जमा हो गई है, लेकिन अधिकारी समीक्षा अभी शुरू नहीं हुई है।'],
      ['In Review', 'अधिकारी ने शिकायत देख ली है और विवरण जांचे जा रहे हैं।'],
      ['In Progress', 'कार्रवाई शुरू हो गई है, जैसे निरीक्षण, मरम्मत योजना या टीम असाइनमेंट।'],
      ['Resolved', 'समस्या का समाधान हो गया है या अधिकारी टिप्पणी के साथ बंद कर दी गई है।'],
    ],
  },
};

export default function AboutPage({ language }) {
  const copy = content[language];

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-leaf-700 p-5 text-white shadow-soft sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf-100">{copy.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-leaf-50 sm:text-base">{copy.intro}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">{copy.featuresTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {copy.features.map((feature) => (
              <li key={feature} className="rounded-md bg-slate-50 px-3 py-2">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">{copy.statusTitle}</h2>
          <div className="mt-4 space-y-3">
            {copy.statuses.map(([status, meaning]) => (
              <div key={status} className="rounded-md border border-slate-200 p-3">
                <h3 className="font-semibold text-slate-950">{status}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

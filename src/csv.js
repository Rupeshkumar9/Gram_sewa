const columns = [
  'ID',
  'Title',
  'Description',
  'Category',
  'Status',
  'Priority',
  'Village',
  'Ward',
  'Filed By',
  'Date',
  'Remarks',
];

const escapeCsv = (value = '') => `"${String(value).replaceAll('"', '""')}"`;

export const complaintsToCsv = (complaints) => {
  const rows = complaints.map((complaint) => [
    complaint.id,
    complaint.title,
    complaint.description,
    complaint.category,
    complaint.status,
    complaint.priority,
    complaint.village,
    complaint.ward,
    complaint.filedByName,
    complaint.createdAt,
    complaint.remarks,
  ]);

  return [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
};

export const downloadCsv = (complaints) => {
  const blob = new Blob([complaintsToCsv(complaints)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `gramsewa_complaints_${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const parseCsvLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
};

export const csvToComplaints = (csvText) => {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const [, ...rows] = lines;

  return rows.map((line) => {
    const [id, title, description, category, status, priority, village, ward, filedByName, createdAt, remarks] =
      parseCsvLine(line);

    return {
      id,
      title,
      description,
      category,
      status,
      priority,
      village,
      ward,
      filedByName,
      filedBy: 'imported',
      createdAt,
      updatedAt: new Date().toISOString(),
      remarks,
      imageBase64: '',
    };
  });
};

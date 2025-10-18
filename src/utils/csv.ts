import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const parseCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    });
  });
};

export const exportCSV = (rows: any[], columns: string[], filename = 'data.csv') => {
  const header = columns.join(',');
  const csvRows = rows.map(r =>
    columns.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
  );
  const csv = [header, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

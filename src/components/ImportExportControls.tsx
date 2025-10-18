'use client';
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { parseCSV, exportCSV } from '../utils/csv';
import { setRows } from '../store/tableSlice';
import { RootState } from '../store/store';

export default function ImportExportControls() {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector((state: RootState) => state.table);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = await parseCSV(file);
      if (data && Array.isArray(data)) {
        dispatch(setRows(data));
      }
    } catch (error) {
      alert('Invalid CSV format.');
    }
  };

  const handleExport = () => {
    const visibleCols = columns.filter(c => c.visible).map(c => c.id);
    exportCSV(rows, visibleCols, 'export.csv');
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
      <input
        type="file"
        accept=".csv"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      <Button
        variant="contained"
        onClick={() => fileRef.current?.click()}
      >
        Import CSV
      </Button>
      <Button
        variant="outlined"
        onClick={handleExport}
      >
        Export CSV
      </Button>
    </div>
  );
}

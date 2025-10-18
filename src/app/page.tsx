'use client';
import React from 'react';
import DataTable from '../components/DataTable';

export default function HomePage() {
  return (
    <main style={{ padding: 20 }}>
      <h2>Dynamic Data Table Manager</h2>
      <DataTable />
    </main>
  );
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Column {
  id: string;
  label: string;
  visible: boolean;
}

export interface Row {
  id: string;
  [key: string]: any;
}

interface TableState {
  rows: Row[];
  columns: Column[];
  sortBy: { id: string; desc: boolean } | null;
  searchQuery: string;
  page: number;
}

const initialState: TableState = {
  rows: [
    { id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 29, role: 'Frontend Developer' },
    { id: '2', name: 'Bob Smith', email: 'bob.smith@example.com', age: 34, role: 'UI/UX Designer' },
    { id: '3', name: 'Charlie Brown', email: 'charlie.brown@example.com', age: 41, role: 'Project Manager' },
    { id: '4', name: 'Diana Prince', email: 'diana.prince@example.com', age: 27, role: 'Backend Engineer' },
    { id: '5', name: 'Ethan Hunt', email: 'ethan.hunt@example.com', age: 31, role: 'DevOps Engineer' },
    { id: '6', name: 'Fiona Green', email: 'fiona.green@example.com', age: 25, role: 'QA Tester' },
    { id: '7', name: 'George Miller', email: 'george.miller@example.com', age: 37, role: 'Full Stack Developer' },
    { id: '8', name: 'Hannah Adams', email: 'hannah.adams@example.com', age: 30, role: 'Product Owner' },
    { id: '9', name: 'Ian Curtis', email: 'ian.curtis@example.com', age: 28, role: 'Frontend Developer' },
    { id: '10', name: 'Julia Roberts', email: 'julia.roberts@example.com', age: 35, role: 'UI Designer' },
    { id: '11', name: 'Kevin Patel', email: 'kevin.patel@example.com', age: 33, role: 'Data Engineer' },
    { id: '12', name: 'Laura Chen', email: 'laura.chen@example.com', age: 26, role: 'Mobile Developer' },
    { id: '13', name: 'Mike Johnson', email: 'mike.johnson@example.com', age: 40, role: 'Tech Lead' },
    { id: '14', name: 'Nina Gomez', email: 'nina.gomez@example.com', age: 29, role: 'Scrum Master' },
    { id: '15', name: 'Oscar Wilde', email: 'oscar.wilde@example.com', age: 38, role: 'Cloud Architect' },
  ],
  columns: [
    { id: 'name', label: 'Name', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'age', label: 'Age', visible: true },
    { id: 'role', label: 'Role', visible: true },
  ],
  sortBy: null,
  searchQuery: '',
  page: 0,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<Row[]>) => { state.rows = action.payload; },
    addRow: (state, action: PayloadAction<Row>) => { state.rows.push(action.payload); },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(r => r.id !== action.payload);
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const col = state.columns.find(c => c.id === action.payload);
      if (col) col.visible = !col.visible;
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => { state.searchQuery = action.payload; },
    setSort: (state, action: PayloadAction<{ id: string; desc: boolean } | null>) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => { state.page = action.payload; },
  }
});

export const {
  setRows, addRow, deleteRow,
  toggleColumnVisibility, addColumn,
  setSearch, setSort, setPage
} = tableSlice.actions;

export default tableSlice.reducer;

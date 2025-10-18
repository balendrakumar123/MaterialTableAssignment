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
  rows: [],
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

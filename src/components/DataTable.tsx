'use client';
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  setSort,
  setSearch,
  setPage,
  deleteRow
} from '../store/tableSlice';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageColumnsModal from './ManageColumnsModal';
import ImportExportControls from './ImportExportControls';

const ROWS_PER_PAGE = 10;

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, sortBy, searchQuery, page } = useSelector(
    (state: RootState) => state.table
  );

  const [open, setOpen] = useState(false);

  const visibleCols = columns.filter((c) => c.visible);

  // 🔍 Filter rows by search
  const filtered = useMemo(() => {
    if (!searchQuery) return rows;
    return rows.filter((r) =>
      visibleCols.some((c) =>
        String(r[c.id] ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [rows, searchQuery, visibleCols]);

  // ↕️ Sort rows by selected column
  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortBy.id] ?? '';
      const vb = b[sortBy.id] ?? '';
      if (va < vb) return sortBy.desc ? 1 : -1;
      if (va > vb) return sortBy.desc ? -1 : 1;
      return 0;
    });
    return arr;
  }, [filtered, sortBy]);

  // 📄 Paginate rows
  const paged = useMemo(() => {
    const start = page * ROWS_PER_PAGE;
    return sorted.slice(start, start + ROWS_PER_PAGE);
  }, [sorted, page]);

  const handleSort = (colId: string) => {
    if (sortBy?.id === colId)
      dispatch(setSort({ id: colId, desc: !sortBy.desc }));
    else dispatch(setSort({ id: colId, desc: false }));
  };

  return (
    <Paper>
      {/* Top controls: Search, Manage Columns, Import/Export */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          padding: '12px',
          flexWrap: 'wrap'
        }}
      >
        <TextField
          placeholder="Search all fields"
          size="small"
          value={searchQuery}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Manage Columns
        </Button>
        <ImportExportControls />
      </div>

      {/* Manage Columns Modal */}
      <ManageColumnsModal open={open} onClose={() => setOpen(false)} />

      {/* Data Table */}
      <Table>
        <TableHead>
          <TableRow>
            {visibleCols.map((col) => (
              <TableCell key={col.id}>
                <TableSortLabel
                  active={sortBy?.id === col.id}
                  direction={
                    sortBy?.id === col.id && !sortBy?.desc ? 'asc' : 'desc'
                  }
                  onClick={() => handleSort(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paged.map((row) => (
            <TableRow key={row.id}>
              {visibleCols.map((col) => (
                <TableCell key={col.id}>{row[col.id]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => dispatch(deleteRow(row.id))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, p) => dispatch(setPage(p))}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
      />
    </Paper>
  );
}


// 'use client';
// import React, { useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store/store';
// import { setSort, setSearch, setPage, deleteRow } from '../store/tableSlice';
// import {
//   Paper, Table, TableHead, TableRow, TableCell, TableBody,
//   TableSortLabel, TablePagination, TextField, IconButton
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const ROWS_PER_PAGE = 10;

// export default function DataTable() {
//   const dispatch = useDispatch();
//   const { rows, columns, sortBy, searchQuery, page } = useSelector((s: RootState) => s.table);

//   const visibleCols = columns.filter(c => c.visible);

//   const filtered = useMemo(() => {
//     if (!searchQuery) return rows;
//     return rows.filter(r =>
//       visibleCols.some(c => String(r[c.id] ?? '').toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//   }, [rows, searchQuery, visibleCols]);

//   const sorted = useMemo(() => {
//     if (!sortBy) return filtered;
//     const arr = [...filtered];
//     arr.sort((a, b) => {
//       const va = a[sortBy.id] ?? '';
//       const vb = b[sortBy.id] ?? '';
//       if (va < vb) return sortBy.desc ? 1 : -1;
//       if (va > vb) return sortBy.desc ? -1 : 1;
//       return 0;
//     });
//     return arr;
//   }, [filtered, sortBy]);

//   const paged = useMemo(() => {
//     const start = page * ROWS_PER_PAGE;
//     return sorted.slice(start, start + ROWS_PER_PAGE);
//   }, [sorted, page]);

//   const handleSort = (colId: string) => {
//     if (sortBy?.id === colId) dispatch(setSort({ id: colId, desc: !sortBy.desc }));
//     else dispatch(setSort({ id: colId, desc: false }));
//   };

//   return (
//     <Paper>
//       <div style={{ padding: 12 }}>
//         <TextField
//           placeholder="Search all fields"
//           size="small"
//           value={searchQuery}
//           onChange={(e) => dispatch(setSearch(e.target.value))}
//         />
//       </div>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {visibleCols.map(col => (
//               <TableCell key={col.id}>
//                 <TableSortLabel
//                   active={sortBy?.id === col.id}
//                   direction={sortBy?.id === col.id && !sortBy?.desc ? 'asc' : 'desc'}
//                   onClick={() => handleSort(col.id)}
//                 >
//                   {col.label}
//                 </TableSortLabel>
//               </TableCell>
//             ))}
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {paged.map(row => (
//             <TableRow key={row.id}>
//               {visibleCols.map(col => (
//                 <TableCell key={col.id}>{row[col.id]}</TableCell>
//               ))}
//               <TableCell>
//                 <IconButton onClick={() => dispatch(deleteRow(row.id))}>
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         component="div"
//         count={sorted.length}
//         page={page}
//         onPageChange={(_, p) => dispatch(setPage(p))}
//         rowsPerPage={ROWS_PER_PAGE}
//         rowsPerPageOptions={[ROWS_PER_PAGE]}
//       />
//     </Paper>
//   );
// }

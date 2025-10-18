'use client';
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, List, ListItem, ListItemText, Checkbox, TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleColumnVisibility, addColumn } from '../store/tableSlice';
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  id: string;
  label: string;
}

export default function ManageColumnsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    dispatch(addColumn({ id: data.id, label: data.label, visible: true }));
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <List>
          {columns.map((col) => (
            <ListItem key={col.id}>
              <Checkbox
                checked={col.visible}
                onChange={() => dispatch(toggleColumnVisibility(col.id))}
              />
              <ListItemText primary={col.label} secondary={col.id} />
            </ListItem>
          ))}
        </List>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <TextField
            size="small"
            label="Field ID"
            {...register('id', { required: true })}
          />
          <TextField
            size="small"
            label="Label"
            {...register('label', { required: true })}
          />
          <Button type="submit" variant="contained">Add</Button>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

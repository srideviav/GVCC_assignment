import React from 'react';
import { TextField } from '@mui/material';

const Filter = ({ filterText, setFilterText }) => (
    <TextField
        label="Search by name/email"
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ margin: 2 }}
    />
);

export default Filter;

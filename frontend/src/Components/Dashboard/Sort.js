import React from 'react';
import { TableSortLabel, TableCell } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const Sort = ({ column, order, orderBy, handleRequestSort }) => (
    <TableCell>
        <TableSortLabel
            active={orderBy === column}
            direction={orderBy === column ? order : 'asc'}
            onClick={(event) => handleRequestSort(event, column)}
        >
            {column.charAt(0).toUpperCase() + column.slice(1)} {/* Capitalize the first letter */}
            {orderBy === column ? (
                <span style={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
            ) : null}
        </TableSortLabel>
    </TableCell>
);

export default Sort;

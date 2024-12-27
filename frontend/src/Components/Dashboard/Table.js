// EnhancedTable.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDemoApiUserQuery } from '../../Features/demoApiSlice'; // Adjust the import based on your file structure
import Filter from './Filter';
import Sort from './Sort';
import Pagination from './Pagination';

// Sorting Functions
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

// Main Table Component
const Dashboard = () => {
    const { data: userData, error, isError, isLoading, isSuccess } = useDemoApiUserQuery();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterText, setFilterText] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRows = userData?.filter((row) => {
        return row.name.toLowerCase().includes(filterText.toLowerCase()) ||
             row.email.toLowerCase().includes(filterText.toLowerCase());
    }) || [];

    const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            {/* Filter Component */}
            <Filter filterText={filterText} setFilterText={setFilterText} />

            {/* Table Component */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            {/* Sort Component for Name */}
                            <Sort order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} column="name" />
                            {/* Sort Component for Company */}
                            <Sort order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} column="company" />
                            {/* Sort Component for Email */}
                            <Sort order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} column="email" />
                            {/* Sort Component for Website */}
                            <Sort order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} column="website" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover tabIndex={-1} key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.company.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.website}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            <Pagination
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                count={filteredRows.length}
            />
        </Paper>
    );
};

export default Dashboard;

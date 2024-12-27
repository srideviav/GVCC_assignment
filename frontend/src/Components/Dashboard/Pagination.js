import React from 'react';
import { TablePagination } from '@mui/material';

const Pagination = ({ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, count }) => (
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />
);

export default Pagination;

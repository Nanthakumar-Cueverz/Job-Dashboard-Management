import React from 'react';
import DataTable from 'react-data-table-component';
const customStyles = {
    rows: {
        style: {
            minHeight: '70px',
            textAlign: 'center',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            minHeight: '70px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 'medium',
            width: '100%',
            fontSize: '14px',
            backgroundColor: '#f8f8f8',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            textAlign: 'center',
            justifyContent: 'center',
        },
    },
};

const ReusableDataTable = ({ columns = [], data = [] }) => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("🚨 DataTable Error: 'data' is empty or not an array", data);
    }

    if (!Array.isArray(columns) || columns.length === 0) {
        console.error("🚨 DataTable Error: 'columns' is empty or not an array", columns);
    }

    return (
        <div className='overflow-x-auto rounded-lg'>
            {data.length > 0 && columns.length > 0 ? (
                <DataTable
                    customStyles={customStyles}
                    data={data}
                    // pagination
                    // paginationPerPage={5}
                    // paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    columns={columns}
                    striped={false}
                    highlightOnHover
                    options={{
                        lengthMenu: [[5, 10, 15, 20]],
                        pageLength: 10,
                    }}
                    className='display w-full border border-border-primary rounded-lg text-center '
                />
            ) : (
                <p className='text-center text-red-500'>No data available</p>
            )}
        </div>
    );
};

export default ReusableDataTable;

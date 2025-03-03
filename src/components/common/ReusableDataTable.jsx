import React from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);

const ReusableDataTable = ({ columns, data }) => {
    return (
        <div className='overflow-x-auto rounded-lg'>
            <DataTable
                data={data}
                columns={columns}
                striped={false}
                options={{
                    // dom: 't',
                    // paging: true,
                    // ordering: true,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20],
                    ], // Custom entries
                    pageLength: 10, // Default page length
                }}
                className='display w-full border border-border-primary rounded-lg'
            >
                <thead className='bg-table-background text-black rounded-lg'>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className='px-4 py-5 text-center font-medium text-black rounded-t-lg'
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
};

export default ReusableDataTable;

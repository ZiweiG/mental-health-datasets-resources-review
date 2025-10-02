import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Papa from "papaparse";

export default function MainTable() {

    const [rows, setRows] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<GridColDef[]>([]);
    React.useEffect(() => {
      fetch(`${process.env.PUBLIC_URL}/data/dataset1.csv`) // CSV in public/data/fakeData.csv
        .then((res) => res.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            quoteChar: '"',
            dynamicTyping: true,
            complete: (results) => {
              const data = results.data as any[];
              if (data.length > 0) {
                const cols: GridColDef[] = Object.keys(data[0]).map((key) => ({
                  field: key,
                  headerName: key,
                  width: 200,
                }));
                setColumns(cols);
              }
  
              const rowsWithId = data.map((row, index) => ({ id: index + 1, ...row }));
              setRows(rowsWithId);
            },
          });
        })
        .catch((err) => console.error("Error loading CSV:", err));
    }, []);

  return (
    <div>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        showToolbar
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}  // options user can select
      />
    </div>
  );
}

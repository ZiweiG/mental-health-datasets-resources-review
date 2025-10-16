import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import MainTable from './Tables/MainTable'
import GoalChart from './Charts/GoalChart'
import Papa from "papaparse";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function App() {

  const [dataTable, setDataTable] = React.useState<{
    cols: GridColDef[];
    rows: GridRowsProp;
  }>({
    cols: [],
    rows: [],
  });

  const [dataForGoalChart, setDataForGoalChart] = React.useState<any>({
    uniqueGoals: [],
    counts: [],
  })

  const dataTableFunc = (data: any) => { 
    const cols: GridColDef[] = Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key,
      width: 200,
    }));
    setDataTable((prev) => ({
      ...prev,
      cols: cols,
    }));

    const rowsWithId: GridRowsProp[] = data.map((row: any, index: any) => ({ id: index + 1, ...row }));
    setDataTable((prev) => ({
      ...prev,
      rows: rowsWithId,
    }));
  }

  const dataForGoalChartFunc = (data: any) => {
    const goalCounts = data.reduce((acc: any, row: any) => {
      const goal = row.Goal;
      acc[goal] = (acc[goal] || 0) + 1;
      return acc;
    }, {})
    const entries = Object.entries(goalCounts);
    const uniqueGoals = entries.map(([goal]) => goal);
    const counts = entries.map(([_, count]) => count);
    setDataForGoalChart((prev: any) => ({... prev, uniqueGoals: uniqueGoals, counts: counts }))
  }

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
              dataTableFunc(data)
              dataForGoalChartFunc(data)
            }
          },
        });
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  return (
    <Box sx={styles.appContainer}>
      <Box sx={styles.headerContainer}>
        Mental Health Dataset Tracker
      </Box>
      <Box>
        Add description here!
      </Box>
      <Box sx={styles.tableContainer}>
        <MainTable rows={dataTable.rows} columns={dataTable.cols}/>
      </Box>
      <Box>
        <GoalChart x={dataForGoalChart.uniqueGoals} y={dataForGoalChart.counts}/>
      </Box>
    </Box>
  );
}

interface StyleTypes {
  appContainer: React.CSSProperties;
  headerContainer: React.CSSProperties;
  tableContainer: React.CSSProperties;
}

const styles: StyleTypes ={
  appContainer: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    textAlign: "center",
  },
  headerContainer: {
    margin: "15px",
  },
  tableContainer: {
    margin: "15px",
  }
}
export default App;

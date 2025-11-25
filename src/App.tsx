import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { getChipColor, parseDisorders } from './utils/utils';
import MainTable from './Tables/MainTable'
import GoalChart from './Charts/GoalChart'
import YearGraph from './Charts/YearGraph'
import Papa from "papaparse";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DisorderCountChart from './Charts/DisorderCountChart';

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

  const [dataForYearGraph, setDataForYearGraph] = React.useState<any>({
    years: [],
    counts: [],
  })

  const [dataForDisorderCountChart, setDataForDisorderCountChart] = React.useState<any>({
    labels: [],
    counts: [],
  })

  const dataTableFunc = (data: any) => { 
    let keys = Object.keys(data[0])
      .filter((key) => !["Cited by", "Turn of Spans"].includes(key));

    // Insert Disorders Count column after Mental Disorder Type
    const disorderTypeIdx = keys.indexOf("Mental Disorder Type");
    if (disorderTypeIdx !== -1) {
      keys.splice(disorderTypeIdx + 1, 0, "Disorders Count");
    }

    const cols: GridColDef[] = keys.map((key) => {
      if (key === "Mental Disorder Type") {
        return {
          field: key,
          headerName: key,
          width: 300,
          renderCell: (params: any) => {
            const chips = parseDisorders(params.value).map((d) => (
              <Chip
                key={d}
                label={d}
                color={getChipColor(d) as any}
                size="small"
                style={{ marginRight: 4 }}
              />
            ));
            return (
              <div 
                style={{ 
                  display: 'flex', 
                  overflowX: 'auto', 
                  whiteSpace: 'nowrap', 
                  width: '100%' 
                }}
              >
                {chips}
              </div>
            );
          },
        };
      }
      if (key === "Disorders Count") {
        return {
          field: key,
          headerName: key,
          width: 150,
          type: 'number',
        };
      }
      return {
        field: key,
        headerName: key,
        width: 200,
      };
    });

    setDataTable((prev) => ({
      ...prev,
      cols: cols,
    }));

    // Add Disorders Count to each row
    const rowsWithId: GridRowsProp[] = data.map((row: any, index: any) => {
      const disorderCount = parseDisorders(row["Mental Disorder Type"] || "").length;
      return { id: index + 1, ...row, "Disorders Count": disorderCount };
    });
    setDataTable((prev) => ({
      ...prev,
      rows: rowsWithId,
    }));
  }

  const dataForGoalChartFunc = (data: any) => {
    const goalCounts: Record<string, number> = {};

    data.forEach((row: any) => {
      const disorders = parseDisorders(row["Mental Disorder Type"] || "");
      
      disorders.forEach((d) => {
        goalCounts[d] = (goalCounts[d] || 0) + 1;
      });
    });

    const entries = Object.entries(goalCounts);
    const uniqueGoals = entries.map(([goal]) => goal);
    const counts = entries.map(([_, count]) => count);

    setDataForGoalChart((prev: any) => ({
      ...prev,
      uniqueGoals,
      counts,
    }));
  };

  const dataForDisorderCountChartFunc = (data: any) => {
    const countBuckets: Record<number, number> = {};

    data.forEach((row: any) => {
      const disorders = parseDisorders(row["Mental Disorder Type"] || "");
      const n = disorders.length;

      if (n > 0) {
        countBuckets[n] = (countBuckets[n] || 0) + 1;
      }
    });

    // Sort keys numerically
    const sortedCounts = Object.keys(countBuckets)
      .map((k) => parseInt(k))
      .sort((a, b) => a - b);

    const labels = sortedCounts.map((n) => `${n} Disorder${n > 1 ? "s" : ""}`);
    const counts = sortedCounts.map((n) => countBuckets[n]);

    setDataForDisorderCountChart((prev: any) => ({
      ...prev,
      labels,
      counts,
    }));
  };


  const dataForYearGraphFunc = (data: any) => {
    const goalCounts = data.reduce((acc: any, row: any) => {
      const goal = row["Year Published"];
      if (goal == null || goal === "") return acc;
      acc[goal] = (acc[goal] || 0) + 1;
      return acc;
    }, {})
    const entries = Object.entries(goalCounts);
    const years = entries.map(([goal]) => goal);
    const counts = entries.map(([_, count]) => count);
    setDataForYearGraph((prev: any) => ({... prev, years: years, counts: counts }))
  }

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/final.csv`) // CSV in public/data/fakeData.csv
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
              dataForYearGraphFunc(data)
              dataForDisorderCountChartFunc(data)
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
      <Box>
        <DisorderCountChart x={dataForDisorderCountChart.labels} y={dataForDisorderCountChart.counts}/>
      </Box>
      <Box>
        <YearGraph x={dataForYearGraph.years} y={dataForYearGraph.counts}/>
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

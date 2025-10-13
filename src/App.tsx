import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import MainTable from './Tables/MainTable'

function App() {
  return (
    <Box sx={styles.appContainer}>
      <Box sx={styles.headerContainer}>
        Mental Health Dataset Tracker
      </Box>
      <Box>
        Add description here!
      </Box>
      <Box sx={styles.tableContainer}>
        <MainTable/>
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

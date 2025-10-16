import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip';

export default function GoalChart({x, y}: any) {
  return (
    <Box>
      
      <BarChart
        layout="horizontal" 
        xAxis={[
          { 
            data: y,
            label: 'Paper Counts',
            labelStyle: { fontSize: 12 }        
          },
        ]}
        yAxis={[
          {
            data: x,
            scaleType: 'band',
            label: 'Goal',
            labelStyle: { fontSize: 12 },    
            width: 200,
          }
        ]}
        series={[{ data: y }]}
        height={300}
        slotProps={{
          tooltip: {
            sx: {
              // [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.table}`]: {
              //   fontSize: 12,
              // },
            },
          },
        }}
      />
      <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
        This chart shows the number of papers associated with each goal category.
      </Typography>
    </Box>
  );
}
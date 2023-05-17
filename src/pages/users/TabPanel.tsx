import React from 'react';
import Typography from '@mui/material/Typography';

type TabPanelProps = {
  value?: number;
  index?: number;
  children?: JSX.Element;
};

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && <Typography variant='h1'>{children} </Typography>}
    </div>
  );
}

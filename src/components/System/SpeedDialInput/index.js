import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useState } from 'react';

export default function SpeedDialInput({ actions, ...props }) {
  const [toolTipOpen, seToolTipOpen] = useState(false);
  const handleToolTipOpen = () => seToolTipOpen(true);
  const handleToolTipClose = () => seToolTipOpen(false);

  return (
    <>
      <SpeedDial
        direction='up'
        sx={{ position: 'fixed', bottom: 64, right: { xs: 24, sm: 24, md: 24, xl: 32, lg: 32 } }}
        icon={<SpeedDialIcon />}
        onClose={handleToolTipClose}
        onOpen={handleToolTipOpen}
        open={toolTipOpen}
        {...props}
      >
        {actions &&
          actions.map(action => (
            <SpeedDialAction
              icon={action.icon}
              key={action.key}
              tooltipTitle={action.toolTip}
              sx={{ backgroundColor: 'text.disabled' }}
              onClick={() => {
                action.action();
                handleToolTipClose();
              }}
              {...action.props}
            />
          ))}
      </SpeedDial>
    </>
  );
}

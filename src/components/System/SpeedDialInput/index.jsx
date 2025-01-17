import { Add, PlusOne } from '@mui/icons-material';
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
				icon={<SpeedDialIcon icon={<Add color='#ff0' />} />}
				onClose={handleToolTipClose}
				onOpen={handleToolTipOpen}
				open={toolTipOpen}
				FabProps={{ variant: 'circular' }}
				{...props}
			>
				{actions &&
					actions.map(action => (
						<SpeedDialAction
							icon={action.icon}
							key={action.key}
							tooltipTitle={action.toolTip}
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

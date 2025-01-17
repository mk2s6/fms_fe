import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function MyLineChart({ xLabels, dataSeries }) {
	return (
		<LineChart
			xAxis={[
				{
					scaleType: 'point',
					data: xLabels,
				},
			]}
			series={dataSeries.map(_ => ({ data: _ }))}
		/>
	);
}

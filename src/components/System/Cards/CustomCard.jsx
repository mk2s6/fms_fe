import { Card, Paper } from '@mui/material';

export default function CustomCard({ children, ...props }) {
	return <Card {...props}>{children}</Card>;
}

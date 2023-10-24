import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export default function ComingSoon() {
	return (
		<Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
			<Box component={Paper} sx={{ width: '70%', m: 'auto' }} justifyContent='center' alignItems='center'>
				<Stack sx={{ width: '100%', height: '100px' }} direction={'column'} justifyContent='center' alignItems='center'>
					<Typography variant='button' sx={{ fontSize: 16 }}>
						PAGE COMING SOON.
					</Typography>
				</Stack>
			</Box>
		</Container>
	);
}

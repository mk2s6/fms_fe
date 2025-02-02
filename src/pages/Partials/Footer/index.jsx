import { AppBar, Container, Divider, Stack, Typography } from '@mui/material';

function Footer() {
	return (
		<>
			<Container sx={{ height: '64px' }} />
			<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0, border: 'none', height: '48px' }}>
				{/* <Paper variant='footer' square sx={{ position: 'fixed', flexGrow: 1, top: 'auto', bottom: 0, left: 0, right: 0, height: '50px' }}> */}
				<Stack
					divider={<Divider orientation='vertical' flexItem />}
					direction='row'
					justifyContent='center'
					alignItems='center'
					spacing={2}
					sx={{ m: 1, p: 1 }}
				>
					<Typography variant='button'>All Rights Reserved&copy;</Typography>
					<Typography variant='button'>Powered By MK2S&reg;</Typography>
				</Stack>
				{/* </Paper> */}
			</AppBar>
		</>
	);
}

export default Footer;

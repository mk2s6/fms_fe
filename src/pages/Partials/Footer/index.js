import { Container, Divider, Paper, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <>
      <Container sx={{ height: '63px' }} />
      <Container sx={{ position: 'fixed', top: 'auto', bottom: 0, left: 0, right: 0 }}>
        <Paper square sx={{ position: 'fixed', flexGrow: 1, top: 'auto', bottom: 0, left: 0, right: 0, height: '50px' }} elevation={24}>
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
        </Paper>
      </Container>
    </>
  );
}

export default Footer;

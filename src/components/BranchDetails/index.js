import { Container, Divider, Grid, Typography } from '@mui/material';
import { getLocalDateTime } from '../../commons/dates';

function BranchDetails({ details }) {
  return (
    <>
      <Container component="div" sx={{ m: 1, mt: 2 }}>
        <Grid sx={{ p: 1 }} container direction="column" spacing={2} columnSpacing={2}>
          <Grid container direction="column" sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
              Branch Details
            </Typography>
          </Grid>
          <Divider sx={{ m: 1 }} />
          <Grid container direction="row" spacing={1} rowSpacing={2} sx={{ p: 0.5 }}>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Code
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.code}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.name}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'lowercase' }}>
                {details.email}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Phone
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.mobile}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                SPOC Name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.SPOCName}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                SPOC Email
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.SPOCEmail}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                SPOC Phone
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {details.SPOCMobile}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" component="b" sx={{ textTransform: 'capitalize' }}>
                Currency Code
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {details.currencyCode}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Open Status
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1">{details.isOpen ? 'Opened' : 'Closed'}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Active Status
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1">{details.isActive ? 'Active' : 'InActive'}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={8} sm={10} md={10} lg={10} xl={10}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {[details.address.address, details.address.city, details.address.state, details.address.country, details.address.zipCode].filter((i) => !!i).join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Last Opened
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1">{getLocalDateTime(details.lastOpenedAt)}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={4} lg={2} xl={2}>
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                Last Closed
              </Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="subtitle1">{getLocalDateTime(details.lastClosedAt)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BranchDetails;

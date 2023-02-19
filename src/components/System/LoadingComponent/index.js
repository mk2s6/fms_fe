import { CircularProgress } from '@mui/material';
import TimeCapsule from './TimeCapsule';
import HoneyHive from './HoneyHive';
export default function LoadingComponent() {
  return (
    <>
      <CircularProgress color='inherit' />
    </>
  );
}

export { TimeCapsule, HoneyHive };

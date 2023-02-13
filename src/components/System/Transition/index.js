import { Grow } from '@mui/material';
import { useState } from 'react';

function Transition(props) {
  // eslint-disable-next-line no-unused-vars
  const [transition, setTransition] = useState(true);

  return (
    <>
      <Grow in={transition} timeout={700}>
        {props.children}
      </Grow>
    </>
  );
}
export default Transition;

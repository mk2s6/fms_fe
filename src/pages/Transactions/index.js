import { Container } from '@mui/material';
import Transition from '../../components/System/Transition';
import TransactionsList from '../../components/Transactions/TransactionList';

function Transactions() {
  return (
    <>
      <Transition>
        <Container maxWidth='lg' sx={{ mt: 1, p: 2 }}>
          <TransactionsList API={'GET_TRANSACTIONS_LIST'} />
        </Container>
      </Transition>
    </>
  );
}

export default Transactions;

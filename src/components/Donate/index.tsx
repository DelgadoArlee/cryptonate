import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Stack,
} from '@mui/material';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'viem';
import Loading from '../Loading';
import { fireDb } from '../../api/firebase.main';

interface DonateProps {
  address: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Donate(props: DonateProps) {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [disableSubmit, setdisableSubmit] = useState(true);
  const [debouncedAmount] = useDebounce(amount, 500);

  const { address } = props;

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSuccessOpen = () => setOpenSuccess(true);

  const handleSuccessClose = () => setOpenSuccess(false);

  const closeModal = useDebouncedCallback(handleSuccessClose, 3000);

  const saveToDb = async () => {
    console.log('run');
    await fireDb
      .addDonor(address, name, parseFloat(amount))
      .then(() => {
        handleSuccessOpen();
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const { config } = usePrepareSendTransaction({
    to: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      saveToDb();
    },
  });

  const isValidAmount = (input: string) => {
    const amount = parseFloat(input);

    if (Number.isNaN(amount) || amount < 0 || amount == 0) {
      setAmountError(true);
      setdisableSubmit(true);
    } else {
      setAmountError(false);
      setdisableSubmit(false);
    }
  };

  const onNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setName(e.target.value);

  const onAmountChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let input = e.target.value;
    const nonNumeric = /-?[A-Za-z\s]*(?:\.{2})?$/g;
    const isNonNumeric = nonNumeric.test(input);

    if (isNonNumeric) {
      input = input.replaceAll(nonNumeric, '');
      e.target.value = input;
    }
    setAmount(input);
    isValidAmount(input);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(amountError);
    if (!amountError) {
      handleClose();
      sendTransaction?.();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Donate
      </Button>
      <Modal
        open={open}
        onClose={isLoading ? undefined : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={submit} sx={style}>
          <Stack
            spacing={3}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h4" fontWeight="bold" align="center">
              DONATE CRYPTO
            </Typography>
            <TextField
              id="donate-name"
              label="Name"
              placeholder="John"
              variant="outlined"
              onChange={onNameChange}
            />
            <TextField
              onChange={onAmountChange}
              id="donate-amount"
              label="Amount"
              placeholder="0.00"
              variant="outlined"
              error={amountError}
              helperText={amountError ? 'Invalid amount' : ''}
            />
            <Button disabled={disableSubmit} type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={submit} sx={style}>
          <Stack
            spacing={3}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h4" fontWeight="bold" align="center">
              Processing Donation...
            </Typography>
            <Loading />
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openSuccess}
        onClose={handleSuccessClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={submit} sx={style}>
          <Stack
            spacing={3}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h3">Thank You!!!</Typography>
            <Typography variant="h5">Transaction Successful!!!</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Donate;

import React, { ChangeEvent, FormEvent, useState } from 'react';
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

function Donate() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [debouncedAmount] = useDebounce(amount, 500);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const closeModal = useDebouncedCallback(handleClose, 3000);

  const { config } = usePrepareSendTransaction({
    to: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      closeModal();
    },
  });

  const isValidAmount = (input: string) => {
    const amount = parseFloat(input);

    if (Number.isNaN(amount) || amount < 0) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  };

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
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    isValidAmount(amount);
    console.log(amountError);
    if (!amountError) {
      sendTransaction?.();
    }
  };

  const modalContent = () => {
    if (isLoading) {
      return (
        <>
          <Typography variant="h4" fontWeight="bold" align="center">
            Processing Donation...
          </Typography>
          <Loading />
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <Typography variant="h3">Thank You!!!</Typography>
          <Typography variant="h5">Transaction Successful!!!</Typography>
        </>
      );
    }

    return (
      <>
        <Typography variant="h4" fontWeight="bold" align="center">
          DONATE CRYPTO
        </Typography>
        <TextField
          id="donate-name"
          label="Name"
          placeholder="John"
          variant="outlined"
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </>
    );
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
            {modalContent()}
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Donate;

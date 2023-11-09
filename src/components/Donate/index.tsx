import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem'
import Loading from "../Loading";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Donate(){
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const [debouncedAmount] = useDebounce(amount, 500)

    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);

    const { config } = usePrepareSendTransaction({
      to: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    })
  
    const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    const onAmountChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAmount(e.target.value)


    const closeModal = useDebouncedCallback(handleClose, 1000);
  
    const submit = (e: FormEvent) => {
      e.preventDefault();
      sendTransaction?.();

      if(isSuccess){
        closeModal()
      }

    }

    const modalContent = () => {
      if(isLoading){
        return <Loading/>
      }

      if(isSuccess){
        return <Typography>Transaction Successful!!!</Typography>
      }
      
      return(
        <Box component="form" onSubmit={submit} sx={style}>
          <TextField onChange={onAmountChange}  id="outlined-basic" label="Amount"  placeholder="0.00" variant="outlined" />
        <Button type="submit" variant="contained" >Submit</Button>
        </Box>
      )
      
    }

    return (
    <>
      <Button  variant="contained" onClick={handleOpen}>Donate</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent()}
      </Modal>
    </>
)

}


export default Donate;
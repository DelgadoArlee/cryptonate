import React, { useState } from "react";
import { Button,  Modal } from "@mui/material"
import { DonationForm } from "../Form/DonationForm";



function DonateButton(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <>
        <Button  variant="contained" onClick={handleOpen}>Donate</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DonationForm/>
      </Modal>
    </>
)

}


export { DonateButton }
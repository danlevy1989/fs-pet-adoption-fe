import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SignUpForm from "../forms/SignUpForm";
import {useModalContext} from "../context/ModalContext"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignUpModal() {
  const {openSignUpModal, handleCloseSignUp} = useModalContext()
  return (
    <div>
      <Modal
        open={openSignUpModal}
        onClose={()=> handleCloseSignUp()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      <SignUpForm/>
        </Box>
      </Modal>
    </div>
  );
}

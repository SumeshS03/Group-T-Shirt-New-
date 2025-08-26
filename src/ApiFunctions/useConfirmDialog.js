// useConfirmDialog.js
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState(null);

  const confirm = (message) => {
    return new Promise((resolve) => {
      setResolver(() => resolve);
      setOpen(true);
    });
  };

  const handleClose = (result) => {
    setOpen(false);
    resolver(result);
  };

  // ✅ The actual Dialog component
  const ConfirmDialog = ({ message }) => (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>Confirm Navigation</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)} color="primary" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { confirm, ConfirmDialog };
}

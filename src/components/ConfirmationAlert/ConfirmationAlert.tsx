import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlertDialog(props: any) {
  return (
    <div>
      <Dialog
        open={props.toggle}
        onClose={() => props.onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ width: "400px", height: "60px", "marginBottom": "-20px" }}
          >
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()}>No</Button>
          <Button onClick={() => props.onClick()} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

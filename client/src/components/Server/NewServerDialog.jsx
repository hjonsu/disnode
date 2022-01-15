import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from "../Button/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadButton from "./UploadButton";
import Tags from "./Tags";
import Avatar from "@mui/material/Avatar";
import { Alert } from "@mui/material";

// styles
import { newServerUseStyles } from "../styles/newServerUseStyles";

export default function NewServerDialog({ onClick: addServer }) {
  const classes = newServerUseStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleChange = (e) => {
    setTitle((prev) => e.target.value);
  };

  const handleAdd = () => {
    // setOpen(false);
    // addServer(title);
    setError("Server creation failed. Please try again later.");
  };
  return (
    <div>
      <Button
        className={classes.addButton}
        disableRipple
        disableFocusRipple
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="large" />
      </Button>

      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Create Server</DialogTitle>
        <DialogContent className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              style={{
                width: "62px",
                height: "62px",
              }}
              alt="stock"
              src="https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86"
            />
          </div>
          <UploadButton />
          <TextField
            autoFocus
            margin="normal"
            multiline
            id="title"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            onChange={handleChange}
            InputProps={{
              className: classes.root,
            }}
          />
          <Tags />
        </DialogContent>
        <DialogActions>
          <CustomButton variant="text" onClick={handleClose} name="Cancel" />
          <CustomButton variant="contained" onClick={handleAdd} name="Create" />
        </DialogActions>
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </div>
  );
}

// // for handling errors
// const [error, setError] = useState(null);
// // in the form for creating a server
// const handleSubmit = () => {
//   const body = {
//     title: serverName,
//     image: imageUrl,
//     creatorId: creatorId,
//   };

//   // need to look up syntax for axios post calls
//   axios.post("/api/servers/create", body).then((res) => {
//     if (res.status === 200) {
//       // redirect to the new server home channel (i.e. #general)
//     } else {
//       setError('Server creation failed. Please try again later.')
//     }
//   });
// };

// return (
//   <form></form>

//   // conditionally show the error under the form
//   {error && <Alert severity="error">{error}</Alert>}
// )

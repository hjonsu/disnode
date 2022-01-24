import Tags from "./Tags";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import SelectButton from "./SelectButton";
import Avatar from "@mui/material/Avatar";
import { Alert, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DisButton from "../Button/DisButton";
import DisTextField from "../Inputs/DisTextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// styles
import { useServerDialogStyles } from "../styles/useServerDialogStyles";
import { useContext } from "react";
import ServerContext from "../../contexts/ServerContext";

export default function NewServerDialog(props) {
  const { onClick: createServer } = props;
  const classes = useServerDialogStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const { setServer } = useContext(ServerContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setTitle("");
    setTags([]);
    setFile(null);
  };

  const handleChange = (e) => {
    setTitle((prev) => e.target.value);
  };

  const handleCreate = () => {
    if (!tags.length) return setError("Please include at least one tag");
    createServer({ title, tags, file });
    handleClose();
    // setServer(server);
  };
  return (
    <div>
      <Tooltip title={"Create Server"} arrow placement="top">
        <IconButton className={classes.addButton} onClick={handleClickOpen}>
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

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
                width: "85px",
                height: "85px",
              }}
              imgProps={{ id: "image-preview" }}
              src="/images/Disnode-red.png"
            />
          </div>
          <SelectButton setFile={setFile} />
          <DisTextField
            autoFocus
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Title"
            onChange={handleChange}
          />
          <Tags setTags={setTags} />
        </DialogContent>
        <DialogActions>
          <DisButton disStyle="cancel" onClick={handleClose}>
            Cancel
          </DisButton>
          <DisButton disStyle="submit" onClick={handleCreate}>
            Create
          </DisButton>
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
//       // redirect to the new server (i.e. #general)
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

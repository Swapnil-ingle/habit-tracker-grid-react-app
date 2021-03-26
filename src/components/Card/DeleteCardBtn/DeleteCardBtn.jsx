import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGlobalContext } from "../../../context/context";

import "./DeleteCardBtn.css";

toast.configure();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    "&:hover": {
      cursor: "pointer",
      color: "#2ecc71",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DeleteCardBtn = ({ id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button id="remove-card" type="button" onClick={handleOpen}>
        <CancelIcon style={{ fontSize: 30 }} />
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <DeleteCardDialogBoxWithRef handleClose={handleClose} id={id} />
        </Fade>
      </Modal>
    </div>
  );
};

const DeleteCardDialogBox = ({ handleClose, id }) => {
  const { deleteHabit } = useGlobalContext();

  return (
    <div className="delete-card-dialog-container">
      <h2>Are you sure?</h2>
      <p>This action will remove all your progress</p>
      <section className="delete-card-dialog-btns-container">
        <button
          onClick={() => {
            deleteHabit(id);
            toast.success("Removed habit-card!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }}
          className="delete-card-btn"
        >
          Yes, I am
        </button>
        <button onClick={handleClose} className="cancel-delete-card-btn">
          Cancle
        </button>
      </section>
    </div>
  );
};

const DeleteCardDialogBoxWithRef = React.forwardRef((props, ref) => {
  return <DeleteCardDialogBox {...props} innerRef={ref} />;
});

export default React.forwardRef((props, ref) => {
  return <DeleteCardBtn {...props} innerRef={ref} />;
});

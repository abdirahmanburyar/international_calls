import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { fetchUser } from "../../../redux/user/actions";
import "./user.styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function UpdateUser(props) {
  const { fetchUser } = props;

  const systemModal = useSelector((state) => state.system);

  const [field, setField] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className="user_modal">
      <Modal
        open={systemModal.updateModal}
        onClose={() => dispatch({ type: "UPDATE_USER_MODAL" })}
        center
        classNames={{
          overlay: "customOverlayUpdate",
          modal: "customModalUpdate",
        }}
      >
        <div>
          <div>
            <h3 className="user_name_update">
              Update User -{" "}
              {systemModal.user && <span>{systemModal.user.fullName}</span>}
            </h3>
            <hr />
          </div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-error"
                label="Error"
                defaultValue="Hello World"
                variant="outlined"
              />
              <TextField
                id="outlined-error-helper-text"
                label="Error"
                defaultValue="Hello World"
                variant="outlined"
              />
            </div>
          </form>
          <pre>
            <code>
              {systemModal.user &&
                JSON.stringify({ user: systemModal }, null, 2)}
            </code>
          </pre>
        </div>
      </Modal>
    </div>
  );
}

export default connect(null, { fetchUser })(UpdateUser);

import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./user.styles.css";
const DeleteModal = () => {
  const [field, setField] = useState({});

  const systemModal = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const _onDeleteUserHandle = () => {
    if (_.isEmpty(field.status)) return false;
    let data = {
      status: field.status,
      userId: systemModal.user.id,
    };
    console.log(data);
  };

  const _handleChangeSelected = (e) => {
    const { name, value } = e.target;
    setField({
      ...field,
      [name]: value,
    });
  };

  return (
    <div className="user_modal">
      <Modal
        open={systemModal.deleteModal}
        onClose={() => dispatch({ type: "DELETE_USER_MODAL" })}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <div>
          <h4>Are You Sure To Delete This User 🔔</h4>
          <hr />
          <p className="ensuring_delete">
            we hope you know what you are doing!
          </p>
          <hr />
          <div className="actions">
            <select
              style={{ width: "100%" }}
              name="status"
              onChange={_handleChangeSelected}
            >
              <option value="">Choose An Action</option>
              {systemModal.user && systemModal.user.status == 0 ? (
                <option value="1">Deactivate</option>
              ) : (
                <option value="0">Suspend</option>
              )}
            </select>
            <button className="btn btn-danger" onClick={_onDeleteUserHandle}>
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => dispatch({ type: "DELETE_USER_MODAL" })}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;

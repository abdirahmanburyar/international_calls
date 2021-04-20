import { faEye, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/user/actions";
import ColumnFilter from "./ColumnFilter";
import DeleteModal from "./DeleteModal";
import UpdateUser from "./UpdateUser";
import "./user.styles.css";
import UsersTable from "./UsersTable";
const UserManagement = (props) => {
  const dispatch = useDispatch();
  const { getAllUsers, location } = props;

  useEffect(() => {
    getAllUsers();
  }, [location.pathname]);
  const usersActions = (original) => {
    return (
      <div className="_userAction">
        <FontAwesomeIcon
          icon={faEye}
          className="moverHover"
          size="3x"
          onClick={(e) => console.log(original)}
          title="View"
        />
        <FontAwesomeIcon
          icon={faUserEdit}
          className="moverHover"
          size="3x"
          onClick={(e) =>
            dispatch({ type: "UPDATE_USER_MODAL", payload: original })
          }
          title="Edit"
        />
        <FontAwesomeIcon
          className="moverHover"
          icon={faTrash}
          size="2x"
          onClick={(e) =>
            dispatch({ type: "DELETE_USER_MODAL", payload: original })
          }
          title="Delete"
        />
        <DeleteModal />
        <UpdateUser user={original} />
      </div>
    );
  };

  const _selectBoxFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    return (
      <select
        className="form-control"
        type="select"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        <option value="0">Suspended</option>
        <option value="1">Active</option>
      </select>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander",
        Expander: ({ isExpanded, ...rest }) => {
          if (1 === 0) {
            return null;
          } else {
            return <div>{isExpanded ? <span>-</span> : <span>+</span>}</div>;
          }
        },
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "-" : "+"}
          </span>
        ),
      },
      {
        Header: "ID",
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
        filterable: false,
      },
      {
        Header: "Name",
        accessor: "fullName",
        collapse: true,
        Filter: ColumnFilter,
      },
      {
        Header: "Email",
        accessor: "email",
        collapse: true,
        Filter: ColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "phone",
        collapse: true,
        Filter: ColumnFilter,
      },
      {
        Header: "Role",
        accessor: "role",
        collapse: true,
        Filter: ColumnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        collapse: true,
        Cell: ({ value }) => {
          if (value == 1) {
            return "Active";
          } else if (value == 0) {
            return "Inactive";
          } else {
            return "A/N";
          }
        },
        Filter: _selectBoxFilter,
        getCellExportValue: ({ original }) => {
          if (original.status == 1) {
            return "Active";
          } else if (original.status == 0) {
            return "Inactive";
          } else {
            return "A/N";
          }
        },
      },
      {
        Header: "Action",
        collapse: true,
        Cell: ({ row: { original } }) => {
          return usersActions(original);
        },
        filterable: false,
      },
    ],
    []
  );

  const _users = useSelector((state) => state.users);
  const data = useMemo(() => _users.users, [_users.loading]);
  return (
    <div>
      <UsersTable columns={columns} data={data} loading={_users.loading} />
    </div>
  );
};

export default connect(null, { getAllUsers })(UserManagement);

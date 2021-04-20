import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

function CustomHideColumns({ allColumns, getToggle }) {
  const [show, setShow] = useState(false);
  const _onBtnHide = () => {
    setShow(!show);
  };
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );

  return (
    <>
      <Dropdown isOpen={show} toggle={_onBtnHide}>
        <DropdownToggle caret>{show ? "Hide" : "Show"}</DropdownToggle>
        <DropdownMenu>
          <div className="show_and_hide">
            <div>
              <IndeterminateCheckbox {...getToggle()} /> Toggle All
            </div>
            {allColumns.map((column) => (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.id}
                </label>
              </div>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default CustomHideColumns;

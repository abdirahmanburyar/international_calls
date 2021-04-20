import React from "react";

function ColumnFilter({ column }) {
  const {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  } = column;
  return (
    <input
      type="text"
      className="form-control"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search (${length})`}
    />
  );
}

export default ColumnFilter;

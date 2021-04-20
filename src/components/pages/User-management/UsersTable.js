import React, { Fragment, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useExpanded, useFilters, usePagination, useTable } from "react-table";
import { useExportData } from "react-table-plugins";
import CustomHideColumns from "./CustomHideColumns";
import FileExportData from "./FileExportData";
import { getExportFileBlob } from "./getExportFileBlob";
function UserTable({ columns, data, loading }) {
  const [eventKey, setEventKey] = useState("Home");
  const renderRowSubComponent = ({ original }) => {
    return (
      <div className="tabs">
        <Tabs
          id="controlled-tab-example"
          activeKey={eventKey}
          onSelect={(key) => setEventKey(key)}
        >
          <Tab eventKey="home" title="Home">
            Home content
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Profile content
          </Tab>
        </Tabs>
      </div>
    );
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    allColumns,
    gotoPage,
    nextPage,
    previousPage,
    exportData,
    getToggleHideAllColumnsProps,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    { columns, data, getExportFileBlob },
    useFilters,
    useExpanded,
    usePagination,
    useExportData
  );

  return (
    <div
      style={{
        width: "97%",
        margin: "0 auto",
        boxShadow: "grey 2px 6px 4px -6px",
      }}
    >
      {loading && <p>Loading...</p>}
      <div className="_user_header">
        <CustomHideColumns
          getToggle={getToggleHideAllColumnsProps}
          allColumns={allColumns}
        />
        <FileExportData exportData={exportData} />
      </div>
      <table className="table table-bordered" {...getTableProps()}>
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
          <tr>
            {page.length === 0 ? (
              <td colSpan="7" className="no-record">
                No Record Found
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="btn btn-primary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="btn btn-primary"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="btn btn-primary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* <pre>
        <code>{JSON.stringify({ expanded }, null, 2)}</code>
      </pre> */}
    </div>
  );
}
export default UserTable;

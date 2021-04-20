import { faFileCsv, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./user.styles.css";
function FileExportData({ exportData }) {
  return (
    <>
      <div className="export_data">
        <FontAwesomeIcon
          icon={faFileCsv}
          onClick={() => {
            exportData("xlsx", false);
          }}
          title=" Export Current View as xlsx"
        />
        <FontAwesomeIcon
          icon={faFileCsv}
          onClick={() => {
            exportData("xlsx", true);
          }}
          title=" Export All as xlsx"
        />
        <FontAwesomeIcon
          icon={faFilePdf}
          onClick={() => {
            exportData("pdf", false);
          }}
          title=" Export Current View as pdf"
        />
        <FontAwesomeIcon
          icon={faFilePdf}
          onClick={() => {
            exportData("pdf", true);
          }}
          title=" Export all as pdf"
        />
      </div>
    </>
  );
}

export default FileExportData;

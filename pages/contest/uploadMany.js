import React, { useState, useRef } from "react";
import Papa from "papaparse";
import moment from "moment";

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleUploadCSV = () => {
    setUploading(true);

    const input = inputRef?.current;
    const reader = new FileReader();
    const [file] = input.files;

    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      csv.data.map(async (d) => {
        if (d.contest_name === "") {
          return;
        }

        const body = {
          contest_name: d.contest_name,
          content: "test",
          prize: parseInt(d.prize),
          start_period: moment(d.start_period).toISOString(),
          end_period: moment(d.end_period).toISOString(),
          spcialization: d.spcialization.split(", "),
          corporate_type: d.corporate_type,
        };
        await fetch(`http://localhost:3000/api/post/contest/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      });
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h4 className="page-header mb-4">Upload a CSV</h4>
      <div className="mb-4">
        <input
          ref={inputRef}
          disabled={uploading}
          type="file"
          className="form-control"
        />
      </div>
      <button
        onClick={handleUploadCSV}
        disabled={uploading}
        className="btn btn-primary"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

Upload.propTypes = {};

export default Upload;

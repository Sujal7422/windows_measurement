import { useState } from "react";

const fractionOptions = [
  "",
  "1/16", "1/8", "3/16", "1/4", "5/16", "3/8", "7/16",
  "1/2", "9/16", "5/8", "11/16", "3/4", "13/16", "7/8", "15/16"
];

const wTypeOptions = [
  "Select Type",
  "Standard",
  "Premium",
  "Commercial",
  "Custom Order",
];

const formatMeasurement = (whole, fraction) => {
  if (!whole && !fraction) return "";
  if (!fraction) return whole;
  return whole ? `${whole} ${fraction}` : fraction;
};

export default function Table() {
  const [rows, setRows] = useState([
    {
      horizontalWhole: "",
      horizontalFraction: "",
      verticalWhole: "",
      verticalFraction: "",
      wType: wTypeOptions[0],
    },
  ]);

  const handleChange = (index, field, value) => {
    setRows(prev =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setRows(prev => [
      ...prev,
      {
        horizontalWhole: "",
        horizontalFraction: "",
        verticalWhole: "",
        verticalFraction: "",
        wType: wTypeOptions[0],
      },
    ]);
  };

  const numberInputProps = (row, index, fieldName) => ({
    className: "w-1/2 border rounded px-2 py-1",
    value: row[fieldName],
    placeholder: "Whole",
    type: "number",
    min: "0",
    step: "1",
    onWheel: (e) => e.preventDefault(),
    onKeyDown: (e) => {
      if (["-", "+", "e", "E", "."].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowDown" && Number(row[fieldName]) <= 0) e.preventDefault();
    },
    onChange: (e) => {
      const numeric = Number(e.target.value);
      if (e.target.value === "") {
        handleChange(index, fieldName, "");
        return;
      }
      handleChange(index, fieldName, Math.max(0, numeric));
    },
  });

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Measurement Entry
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 text-left">Horizontal (in)</th>
            <th className="p-3 text-left">Vertical (in)</th>
            <th className="p-3 text-left">W Type</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const horizontalFormatted = formatMeasurement(row.horizontalWhole, row.horizontalFraction);
            const verticalFormatted = formatMeasurement(row.verticalWhole, row.verticalFraction);

            return (
              <tr key={index} className="odd:bg-gray-50 even:bg-white hover:bg-blue-50">
                
                {/* ---- HORIZONTAL ---- */}
                <td className="border p-2">
                  <div className="flex gap-2">
                    <input {...numberInputProps(row, index, "horizontalWhole")} />

                    <select
                      className="w-1/2 border rounded px-2 py-1 cursor-pointer"
                      value={row.horizontalFraction}
                      onChange={(e) => handleChange(index, "horizontalFraction", e.target.value)}
                    >
                      {fractionOptions.map(f => (
                        <option key={f} value={f}>{f || "—"}</option>
                      ))}
                    </select>
                  </div>
                  {horizontalFormatted && (
                    <span className="text-xs text-gray-500">= {horizontalFormatted} in</span>
                  )}
                </td>

                {/* ---- VERTICAL ---- */}
                <td className="border p-2">
                  <div className="flex gap-2">
                    <input {...numberInputProps(row, index, "verticalWhole")} />

                    <select
                      className="w-1/2 border rounded px-2 py-1 cursor-pointer"
                      value={row.verticalFraction}
                      onChange={(e) => handleChange(index, "verticalFraction", e.target.value)}
                    >
                      {fractionOptions.map(f => (
                        <option key={f} value={f}>{f || "—"}</option>
                      ))}
                    </select>
                  </div>
                  {verticalFormatted && (
                    <span className="text-xs text-gray-500">= {verticalFormatted} in</span>
                  )}
                </td>

                {/* ---- W TYPE ---- */}
                <td className="border p-2">
                  <select
                    className="w-full border rounded px-2 py-1 cursor-pointer"
                    value={row.wType}
                    onChange={(e) => handleChange(index, "wType", e.target.value)}
                  >
                    {wTypeOptions.map(opt => (
                      <option key={opt} value={opt} disabled={opt === "Select Type"}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        + Add Row
      </button>
    </div>
  );
}

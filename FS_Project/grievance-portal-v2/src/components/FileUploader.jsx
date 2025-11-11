// src/components/FileUploader.jsx
import React, { useRef } from "react";

export default function FileUploader({ files, setFiles, maxFiles = 5, maxSizeMB = 10 }) {
  const inputRef = useRef(null);

  const onSelect = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(
      (f) => f.size <= maxSizeMB * 1024 * 1024
    );
    setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles));
  };

  const removeFile = (i) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition">
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={onSelect}
        className="hidden"
        accept="image/*,application/pdf"
      />
      <div onClick={() => inputRef.current.click()}>
        <p className="text-4xl mb-2">📄</p>
        <p className="text-sm text-gray-600">
          Click to upload or drag & drop (max {maxFiles} files, {maxSizeMB}MB each)
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 text-sm text-gray-700 text-left">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b py-1"
            >
              {f.name}
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => removeFile(i)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

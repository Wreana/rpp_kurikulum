"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return RQ;
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: number | string;
  placeholder?: string;
  modules?: ReactQuillProps["modules"];
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  height = 300,
  placeholder = "Masukkan Sesuatus...",
  modules,
  readOnly = false,
}) => {
  const defaultModules: ReactQuillProps["modules"] = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div
      style={{
        height,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        placeholder={placeholder}
        modules={modules ?? defaultModules}
        readOnly={readOnly}
        style={{ height: "100%" }}
      />

      <style>
        {`
          .ql-container {
            height: 100%;
          }

          .ql-editor {
            overflow-y: auto;   
            max-height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default RichTextEditor;


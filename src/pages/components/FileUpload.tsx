import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection, Accept, DropEvent } from "react-dropzone";

interface DropzoneProps {
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  accept?: Accept;
  open?: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ accept, open }) => {
  const onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void)
    | undefined = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
      };
    });
  };
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg"],
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
      },
      onDrop,
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className="w-full min-h-[100px] grid place-items-center border-[#3B82F6] border-spacing-3 rounded py-4 border-dashed border-[4px] transition hover:scale-[1.01] cursor-pointer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Suelta el archivo aqui </p>
          ) : (
            <p className="dropzone-content">
              Arrastra tus imagenes para subir al mensaje
            </p>
          )}
          <button type="button" onClick={open} className="btn">
            Click to select files
          </button>
        </div>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Dropzone;

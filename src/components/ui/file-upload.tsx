import type { BaseUIEvent } from "@base-ui/react/types";
import { FileIcon, UploadIcon } from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "#/lib/utils";
import { friendlyFileSize } from "#/utilities/basic";
import { Button } from "./button";

type SingleFileUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  acceptedFileTypes?: string[];
  className?: string;
};

function SingleFileUpload(props: SingleFileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      props.onChange(acceptedFiles.length > 0 ? acceptedFiles[0] : null);
    },
    accept: props.acceptedFileTypes
      ? Object.fromEntries(props.acceptedFileTypes.map((x) => [x, []]))
      : undefined,
  });

  const handleRemoveFile = (event: BaseUIEvent<ReactMouseEvent<HTMLButtonElement, MouseEvent>>) => {
    event.preventDefault();
    event.stopPropagation();
    props.onChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn("flex flex-col rounded-sm cursor-pointer min-h-30 justify-center transition-all", props.className, {
        // Idle
        "hover:bg-gray-800/50": !isDragActive,

        // Not Idle
        "bg-gray-800/50": isDragActive,

        // No file
        "border border-dashed border-gray-300/40": props.value === null,

        // With file
        "border border-solid border-gray-300/40": props.value !== null,
      })}
    >
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        {!isDragActive && props.value === null && (
          <>
            <UploadIcon className="text-muted-foreground"/>
            <span className="text-sm text-muted-foreground">
              Drag and drop a file here or click to select
            </span>
          </>
        )}
        {!isDragActive && props.value !== null && (
          <>
            <FileIcon className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              File selected: {props.value.name} ({friendlyFileSize(props.value.size)})
            </span>
            <Button onClick={handleRemoveFile}>Remove file</Button>
          </>
        )}
        {isDragActive && (
          <span className="text-sm text-muted-foreground">
            Drop the file here...
          </span>
        )}
      </div>
      <input {...getInputProps()} />
    </div>
  );
}

export { SingleFileUpload };
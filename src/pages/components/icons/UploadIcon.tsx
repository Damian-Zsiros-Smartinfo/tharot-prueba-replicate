import React from "react";

export default function UploadIcon({
  onClick,
  title,
}: {
  onClick: React.MouseEventHandler<SVGGElement>;
  title: string;
}) {
  return (
    <button title={title}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80 hover:opacity-100 transition min-w-8 w-8 cursor-pointer"
        onClick={onClick}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />{" "}
        </g>
      </svg>
    </button>
  );
}

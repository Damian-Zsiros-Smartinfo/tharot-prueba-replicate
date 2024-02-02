/** @format */

import React, { LegacyRef, MutableRefObject, RefObject, useRef } from "react";

interface Props {
  visible: boolean;
}

export default function LateralMenu({ visible = false }: Props) {
  const asideRef = useRef(null);
  return (
    <aside
      className={`bg-[#fc246c]  ${
        !visible ? "slide-right-animate" : "slide-left-animate"
      }  w-[300px] px-4 transition min-h-[90vh]`}
      ref={asideRef}
    >
      <button type="button">Usuarios</button>
    </aside>
  );
}

import { useSelf, useStorage } from "@liveblocks/react";
import { memo, useEffect, useRef, useState } from "react";
import useSelectionBounds from "~/hooks/useSelectionBounds";
import { LayerType, Side, type XYWH } from "~/types";

const handleWidth = 10;

const SelectioBox = memo(
  ({
    onResizeHandlePointerDown,
  }: {
    onResizeHandlePointerDown: (corner: Side, initalBuild: XYWH) => void;
  }) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
    );

    const textRef = useRef<SVGTextElement>(null);
    const [textWidth, setTextWidth] = useState(0);

    const padding = 16;

    // const layers = useStorage((root) => root.layers);
    // const layer = soleLayerId ? layers?.get(soleLayerId) : null;

    const bounds = useSelectionBounds();

    useEffect(() => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        setTextWidth(bbox.width);
      }
    }, [bounds]);

    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          style={{
            transform: `translate(${bounds.x}px,${bounds.y}px)`,
          }}
          width={bounds.width}
          height={bounds.height}
          className="pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]"
        />
        <rect
          className="fill-[#ob99ff]"
          x={bounds.x + bounds.width / 2 - (textWidth + padding) / 2}
          y={bounds.y + bounds.height + 10}
          width={textWidth + padding}
          height={20}
          rx={4}
        />
        <text
          ref={textRef}
          style={{
            transform: `translate(${bounds.x + bounds.width / 2}px,${bounds.y + bounds.height + 25}px)`,
          }}
          textAnchor="middle"
          className="pointer-events-none fill-white text-[11px] select-none"
        >
          {Math.round(bounds.width)} x {Math.round(bounds.height)}
        </text>

        {isShowingHandles && (
          <>
            <rect
              style={{
                cursor: "nwse-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x - handleWidth / 2}px,${bounds.y - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            <rect
              style={{
                cursor: "ns-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width / 2 - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nesw-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            <rect
              style={{
                cursor: "ew-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y + bounds.height / 2 - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Left, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nesw-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            <rect
              style={{
                cursor: "ew-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y + bounds.height / 2 - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nwse-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
            <rect
              style={{
                cursor: "ns-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width / 2 - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />
          </>
        )}
      </>
    );
  },
);

SelectioBox.displayName = "SelectioBox";

export default SelectioBox;

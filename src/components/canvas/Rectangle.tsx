import type { RectangleLayer } from "~/types";
import { colorToCss } from "~/utils";

export default function Rectangle({
  id,
  layer,
  onPointerDown,
}: {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
}) {
  const { fill, height, opacity, stroke, type, width, x, y, cornerRadius } =
    layer;

  return (
    <g>
      <rect
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          transform: `translate(${x}px,${y}px)`,
        }}
        height={height}
        width={width}
        fill={fill ? colorToCss(fill) : "#ccc"}
        strokeWidth={1}
        stroke={stroke ? colorToCss(stroke) : "#ccc"}
        opacity={`${opacity ?? 100}%`}
        rx={cornerRadius ?? 0}
        ry={cornerRadius ?? 0}
      />
    </g>
  );
}

import type { EllipseLayer, RectangleLayer } from "~/types";
import { colorToCss } from "~/utils";

export default function Ellipse({
  id,
  layer,
}: {
  id: string;
  layer: EllipseLayer;
}) {
  const { fill, height, opacity, stroke, type, width, x, y } = layer;

  return (
    <g>
      <ellipse
        style={{
          transform: `translate(${x}px,${y}px)`,
        }}
        fill={fill ? colorToCss(fill) : "#ccc"}
        stroke={stroke ? colorToCss(stroke) : "#ccc"}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        strokeWidth={1}
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  );
}

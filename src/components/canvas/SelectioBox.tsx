import { useSelf, useStorage } from "@liveblocks/react";
import { LayerType } from "~/types";

export default function SelectioBox() {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null,
  );

  const isShowingHandles = useStorage(
    (root) =>
      soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
  );

  const layers = useStorage((root) => root.layers);
  const layer = soleLayerId ? layers?.get(soleLayerId) : null;

  return (
    <>
      <rect
        style={{
          transform: `translate(${layer?.x}px,${layer?.y}px)`,
        }}
        width={layer?.width}
        height={layer?.height}
        className="pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]"
      />
    </>
  );
}

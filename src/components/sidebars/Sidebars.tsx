"use client";

import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react";
import Link from "next/link";
import { hexToRgb } from "~/utils";
import { PiPathLight, PiSidebarSimpleThin } from "react-icons/pi";
import { LayerType } from "~/types";
import { IoEllipseOutline, IoSquareOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import LayerButton from "./LayerButton";

export default function Sidebars({
  leftIsMinimized,
  setLeftIsMinimized,
}: {
  leftIsMinimized: boolean;
  setLeftIsMinimized: (value: boolean) => void;
}) {
  const me = useSelf();
  const others = useOthers();

  const selectedLayer = useSelf((me) => {
    const selection = me.presence.selection;

    return selection.length === 1 ? selection[0] : null;
  });

  const layer = useStorage((root) => {
    if (!selectedLayer) {
      return null;
    }
    return root.layers.get(selectedLayer);
  });

  const roomColor = useStorage((root) => root.roomColor);
  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);

  const reversedLayerIds = [...(layerIds ?? [])].reverse();
  const selection = useSelf((me) => me.presence.selection);

  const updateLayer = useMutation(
    (
      { storage },
      updates: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        opacity?: number;
        cornerRadius?: number;
        fill?: string;
        stroke?: string;
        fontSize?: number;
        fontWeight?: number;
        fontFamily?: string;
      },
    ) => {
      if (!selectedLayer) {
        return;
      }

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(selectedLayer);

      if (layer) {
        layer.update({
          ...(updates.x !== undefined && { x: updates.x }),
          ...(updates.y !== undefined && { y: updates.y }),
          ...(updates.width !== undefined && { width: updates.width }),
          ...(updates.height !== undefined && { height: updates.height }),
          ...(updates.opacity !== undefined && { opacity: updates.opacity }),
          ...(updates.cornerRadius !== undefined && {
            cornerRadius: updates.cornerRadius,
          }),
          ...(updates.fill !== undefined && { fill: hexToRgb(updates.fill) }),
          ...(updates.stroke !== undefined && {
            stroke: hexToRgb(updates.stroke),
          }),
          ...(updates.fontSize !== undefined && {
            fontSize: updates.fontSize,
          }),
          ...(updates.fontWeight !== undefined && {
            fontWeight: updates.fontWeight,
          }),
          ...(updates.fontFamily !== undefined && {
            fontFamily: updates.fontFamily,
          }),
        });
      }
    },
    [selectedLayer],
  );

  return (
    <>
      {!leftIsMinimized ? (
        <div className="fixed left-0 flex h-screen w-[240px] flex-col border-r border-gray-200 bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <Link href="/dashboard">
                <img
                  src="/figma-logo.svg"
                  alt="logo"
                  className="h-[18px] w-[18px]"
                />
              </Link>
              <PiSidebarSimpleThin
                className="h-5 w-5 cursor-pointer"
                onClick={() => setLeftIsMinimized(true)}
              />
            </div>
            <h2 className="mt-2 scroll-m-20 text-[13px] font-medium">
              RoomName
            </h2>
          </div>
          <div className="border-b border-gray-200" />
          <div className="flex flex-col gap-1 p-4">
            <span className="mb-2 text-[11px] font-medium">Layers</span>

            {layerIds &&
              reversedLayerIds.map((id) => {
                const layer = layers?.get(id);
                const isSelected = selection?.includes(id);

                if (layer?.type === LayerType.Rectangle) {
                  return (
                    <LayerButton
                      key={id}
                      layerId={id}
                      icon={
                        <IoSquareOutline className="h-3 w-3 text-gray-500" />
                      }
                      isSelected={isSelected ?? false}
                      text="Rectangle"
                    />
                  );
                } else if (layer?.type === LayerType.Ellipse) {
                  return (
                    <LayerButton
                      key={id}
                      layerId={id}
                      icon={
                        <IoEllipseOutline className="h-3 w-3 text-gray-500" />
                      }
                      isSelected={isSelected ?? false}
                      text="Ellipse"
                    />
                  );
                } else if (layer?.type === LayerType.Path) {
                  return (
                    <LayerButton
                      key={id}
                      layerId={id}
                      icon={<PiPathLight className="h-3 w-3 text-gray-500" />}
                      isSelected={isSelected ?? false}
                      text="Drawing"
                    />
                  );
                } else if (layer?.type === LayerType.Text) {
                  return (
                    <LayerButton
                      key={id}
                      layerId={id}
                      icon={
                        <AiOutlineFontSize className="h-3 w-3 text-gray-500" />
                      }
                      isSelected={isSelected ?? false}
                      text="Text"
                    />
                  );
                }
              })}
          </div>
        </div>
      ) : (
        <div className="fixed top-3 left-3 flex h-[48px] w-[250px] items-center justify-between rounded-xl border bg-white p-4">
          <Link href="/dashboard">
            <img
              src="/figma-logo.svg"
              alt="logo"
              className="h-[18px] w-[18px]"
            />
          </Link>
          <h2 className="scroll-m-20 text-[13px] font-medium">RoomName</h2>
          <PiSidebarSimpleThin
            className="h-5 w-5 cursor-pointer"
            onClick={() => setLeftIsMinimized(false)}
          />
        </div>
      )}

      {/* Right side bar */}
    </>
  );
}

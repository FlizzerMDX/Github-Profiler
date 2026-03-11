"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { Pipette } from "lucide-react"
import {
  Color,
  ColorPickerStateContext,
  getColorChannels,
  parseColor,
  type ColorSpace,
} from "react-aria-components"

import { Button } from "@/components/ui/button-jellyui"
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  SliderTrack,
} from "@/components/ui/color"
import { Dialog, DialogTrigger } from "@/components/ui/dialog-jollyui"
import { Popover } from "@/components/ui/popover-jollyui"
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-jollyui"
import { Input } from "../ui/textfield"

function EyeDropperButton() {
  const state = React.useContext(ColorPickerStateContext)!

  // Check browser support.
  // @ts-expect-error from packages - to avoid error if browser doesn't support EyeDropper
  if (typeof EyeDropper === "undefined") {
    return null
  }

  return (
    <Button
      aria-label="Eye dropper"
      size="icon"
      variant="outline"
      onPress={() => {
        // @ts-expect-error from packages - to avoid error if browser doesn't support EyeDropper
        new EyeDropper()
          .open()
          .then((result: { sRGBHex: string }) =>
            state.setColor(parseColor(result.sRGBHex))
          )
      }}
    >
      <Pipette />
    </Button>
  )
}

export function ComponantColorPicker({color, setColor}: {color: Color | undefined, setColor: Dispatch<SetStateAction<Color | undefined>>}) {
  const [space, setSpace] = useState<string>("hex")

  return (
    <ColorPicker value={color} onChange={setColor}>
      <DialogTrigger>
        <div>
          <Button variant="ghost" className="flex h-fit items-center gap-2 p-1 mx-auto">
            <ColorSwatch className="size-8 rounded-md border-2 border-gray-800" />
          </Button>
        </div>
        <Popover placement="bottom start" className="w-fit">
          <Dialog className="flex flex-col gap-4 p-3 outline-none">
            <div>
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                className="h-[164px] rounded-b-none border-b-0"
              >
                <ColorThumb className="z-50" />
              </ColorArea>
              <ColorSlider colorSpace="hsb" channel="hue">
                <SliderTrack className="rounded-t-none border-t-0">
                  <ColorThumb className="top-1/2" />
                </SliderTrack>
              </ColorSlider>
            </div>
            <Select
              selectedKey={space}
              onSelectionChange={(s) => setSpace(s as ColorSpace)}
              aria-label="Color Space"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectPopover>
                <SelectListBox aria-label="items">
                  <SelectItem id="hex" textValue="hex">
                    HEX
                  </SelectItem>
                  <SelectItem id="rgb" textValue="rgb">
                    RGB
                  </SelectItem>
                  <SelectItem id="hsl" textValue="hsl">
                    HSL
                  </SelectItem>
                  <SelectItem id="hsb" textValue="hsb">
                    HSB
                  </SelectItem>
                </SelectListBox>
              </SelectPopover>
            </Select>
            <div className="w-48 flex flex-row gap-1">
              {
                space != "hex" ? 
                  getColorChannels(space as ColorSpace).map((channel) => (
                    <ColorField colorSpace={space as ColorSpace} channel={channel} key={channel}>
                      <Input aria-label={channel.toString()} />
                    </ColorField>
                  ))
                  :
                    <ColorField colorSpace="hsb" className="w-48">
                      <Input className="" />
                    </ColorField>
              }
            </div>

            <ColorSwatchPicker className="w-48">
              <ColorSwatchPickerItem color="#F00">
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#f90">
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#0F0">
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#08f">
                <ColorSwatch />
              </ColorSwatchPickerItem>
              <ColorSwatchPickerItem color="#00f">
                <ColorSwatch />
              </ColorSwatchPickerItem>
            </ColorSwatchPicker>
            <EyeDropperButton />
          </Dialog>
        </Popover>
      </DialogTrigger>
    </ColorPicker>
  )
}

export default ComponantColorPicker;
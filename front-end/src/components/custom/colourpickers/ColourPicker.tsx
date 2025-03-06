import { MutableRefObject, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  oldColour: string;
  colourRef: MutableRefObject<string>;
  className?: string; 
}

export const ColourPicker = ({ oldColour, colourRef, className }: Props) => {
  const [colour, setColour] = useState(oldColour);
  useEffect(() => {
    colourRef.current = colour;
  }, [colour]);
  return <HexColorPicker color={colour} onChange={setColour} className={className} />;
};


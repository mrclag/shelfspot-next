import React from "react";
import { EditorState } from "draft-js";

import StyleButton from "./StyleButton";
import Image from "next/image";
import bold from "../../public/static/icons/type-bold.svg";
import italic from "../../public/static/icons/type-italic.svg";
import underline from "../../public/static/icons/type-underline.svg";
import mono from "../../public/static/icons/chat-square-quote.svg";

const INLINE_STYLES = [
  { label: <Image src={bold} alt="bold" />, style: "BOLD" },
  { label: <Image src={italic} />, style: "ITALIC" },
  { label: <Image src={underline} />, style: "UNDERLINE" },
];

type Props = {
  editorState: EditorState;
  onToggle: (bockType: string) => void;
};

const InlineStyleControls = ({ editorState, onToggle }: Props) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          active={currentStyle.has(type.style)}
          // @ts-ignore
          key={type.label}
          // @ts-ignoreß
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default React.memo(InlineStyleControls);

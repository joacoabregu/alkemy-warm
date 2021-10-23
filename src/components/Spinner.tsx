import { css } from "@emotion/react";
import BeatLoader from "react-spinners/DotLoader";
export default function Spinner() {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return <BeatLoader css={override} size={50} />;
}

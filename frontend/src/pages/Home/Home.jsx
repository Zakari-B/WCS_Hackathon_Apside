import React from "react";
import * as d3 from "d3";
import ClusteredBubbles from "@components/ClusteredBubbles";
import InfoModal from "../../components/InfoModal";

const dimensions = {
  width: 600,
  height: 600,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};
const n = 75; // number of nodes
const m = 8; // number of groups
const data = {
  children: Array.from(
    d3.group(
      // eslint-disable-next-line no-unused-vars
      Array.from({ length: n }, (_, i) => ({
        // eslint-disable-next-line no-bitwise
        group: (Math.random() * m) | 0,
        value: -Math.log(Math.random()),
      })),
      (d) => d.group
    ),
    ([, children]) => ({ children })
  ),
};
export default function Home() {
  return (
    <>
      <InfoModal />
      <ClusteredBubbles data={data} dimensions={dimensions} />
    </>
  );
}

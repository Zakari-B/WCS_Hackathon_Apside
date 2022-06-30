/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */

/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable one-var */
/* eslint-disable no-return-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/** MultilineChart.js */
import React, { useState, useContext, useEffect } from "react";
import * as d3 from "d3";
import filterImg from "@assets/svg/filter.svg";
import logoApside from "@assets/logo/apside.png";
import logoApsidea from "@assets/logo/logo-transparent-light.png";
import "@styles/ClusteredBubbles.scss";
import ExportContext from "../contexts/BubbleContext";

let nodeBackup;
const colorPalette = [
  "#183650",
  // "#FF0000",
  "#5ABDB2",
  "#E79759",
  "#F0F0F0",
  "#8493A0",
  "#586994",
];

const workflowList = ["Idea", "Team Building", "Coding", "Review", "Finished"];
const POPUP_HEIGHT = 155;
const POPUP_WIDTH = 200;

export default function ClusteredBubbles({
  data,
  dimensions,
  // reloadBigBubble,
}) {
  const { isOpenFilter } = useContext(ExportContext.BubbleContext);
  const [hoverData, setHoverData] = useState(false);
  const { modalCommon, setModalCommon, setBubble } = useContext(
    ExportContext.BubbleContext
  );
  const isDragging = React.useRef(false);
  const svgRef = React.useRef(null);
  const nodesGlobal = React.useRef(null);
  const firstLoadingDone = React.useRef(false);

  const userId = parseInt(window.localStorage.getItem("userId"), 10);

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  // console.warn("data", data);

  const handlePopupClick = () => setHoverData(false);

  const calcPosition = () => {
    const top =
      hoverData.y > height / 2
        ? Math.min(hoverData.y, height - POPUP_HEIGHT)
        : Math.max(hoverData.y - POPUP_HEIGHT, 0);
    const left =
      hoverData.x > width / 2
        ? Math.min(hoverData.x, width - POPUP_WIDTH)
        : Math.max(hoverData.x - POPUP_WIDTH, 0);

    return { top, left };
  };

  const color = (m) => {
    // console.log("d3.schemeCategory10[d3.range(m).length]", d3.range(m).length);
    return colorPalette[d3.range(m).length];
    // return d3.schemeCategory10[d3.range(m).length];
  };

  const stroke = (m) => {
    if (m.participantsIds.includes(userId)) return "#000";

    // return d3.schemeCategory10[d3.range(m).length];
  };

  const strokeWidth = (m) => {
    if (m.participantsIds.includes(userId)) return 3;
  };

  const centroid = (nodes) => {
    // if (nodes[0].data.group === -1) console.log("nodes", nodes);
    let x = 0;
    let y = 0;
    let z = 0;
    for (const d of nodes) {
      const k = d.r ** 2;
      x += d.x * k;
      y += d.y * k;
      z += k;
    }
    // if (nodes[0].data.group === -1) {
    //   console.log("wxcvbn", { x: x / z, y: y / z });
    //   return { x: 585, y: 660 };
    // }

    return { x: x / z, y: y / z };
  };

  const forceCluster = () => {
    const strength = 0.2;
    let nodes;

    function force(alpha) {
      const centroids = d3.rollup(nodes, centroid, (d) => d.data.group);
      const l = alpha * strength;
      for (const d of nodes) {
        const { x: cx, y: cy } = centroids.get(d.data.group);

        let mul = 1;
        if (d.data.group === -1) {
          mul = 0;
          d.x = d.data.x;
          d.y = d.data.y;
        }
        // if (d.data.group === -1) console.log(d);

        d.vx -= (d.x - cx) * l * mul;
        d.vy -= (d.y - cy) * l * mul;
      }
    }

    force.initialize = (_) => (nodes = _);

    return force;
  };

  const forceCollide = () => {
    const alpha = 0.4; // fixed for greater rigidity!
    const padding1 = 10; // separation between same-color nodes
    const padding2 = 60; // separation between different-color nodes
    let nodes;
    let maxRadius;

    function force() {
      const quadtree = d3.quadtree(
        nodes,
        (d) => d.x,
        (d) => d.y
      );
      for (const d of nodes) {
        const r = d.r + maxRadius;
        const nx1 = d.x - r,
          ny1 = d.y - r;
        const nx2 = d.x + r,
          ny2 = d.y + r;
        quadtree.visit((q, x1, y1, x2, y2) => {
          if (!q.length)
            do {
              if (q.data !== d) {
                // eslint-disable-next-line no-shadow
                const r =
                  d.r +
                  q.data.r +
                  (d.data.group === q.data.data.group ? padding1 : padding2);
                let x = d.x - q.data.x,
                  y = d.y - q.data.y,
                  l = Math.hypot(x, y);
                if (l < r) {
                  l = ((l - r) / l) * alpha;
                  (d.x -= x *= l), (d.y -= y *= l);
                  (q.data.x += x), (q.data.y += y);
                }
              }
            } while ((q = q.next));
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      }
    }

    force.initialize = (_) =>
      (maxRadius =
        d3.max((nodes = _), (d) => d.r) + Math.max(padding1, padding2));

    return force;
  };

  const pack = () =>
    d3.pack().size([width, height]).padding(1)(
      d3.hierarchy(data).sum((d) => d.value)
    );

  const drag = (simulation) => {
    function dragstarted(event, d) {
      isDragging.current = true;
      // console.warn("baltringue", d.data.city, d.data);
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      isDragging.current = false;
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const shrinkBubbles = (beCrazy = true) => {
    console.warn("shrinkBubbles");
    // simulation;
    if (beCrazy) {
      nodesGlobal.current = nodeBackup;
      d3.forceSimulation(nodesGlobal.current)
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1))
        .force("cluster", forceCluster())
        .force("collide", forceCollide());
      // .forceCenter([width / 2, height / 2]);
      // simulation.alpha(0.5).alphaTarget(0.3).restart();
      nodeBackup = undefined;
    }

    nodeBackup = nodesGlobal.current;

    // eslint-disable-next-line
    nodesGlobal.current.map((node) => {
      if (node.data.group === -1) {
        if (node.value < 1) {
          node.value = Math.min(height, width) / 2.35;
          node.r = Math.min(height, width) / 2.35;
        } else {
          node.value = 0.1;
          node.r = 0.1;
        }
      } else return node;
    });

    if (beCrazy) {
      nodesGlobal.current = nodeBackup;
      d3.forceSimulation(nodesGlobal.current)
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1))
        .force("cluster", forceCluster())
        .force("collide", forceCollide());
      // .forceCenter([width / 2, height / 2]);
      // simulation.alpha(0.5).alphaTarget(0.3).restart();
      nodeBackup = undefined;
    }

    // svg.call(drag(simulation));
  };

  const pushBubbles = () => {
    console.warn("pushBubbles()");

    nodeBackup = nodesGlobal.current;

    // eslint-disable-next-line
    nodesGlobal.current.map((node) => {
      if (node.data.group === -1) {
        if (node.value < 1) {
          node.value = Math.min(height, width) / 2.35;
          node.r = Math.min(height, width) / 2.35;
        } else {
          node.value = 0.1;
          node.r = 0.1;
        }
      } else return node;
    });
    // console.log("abcdef !", nodes);
  };

  useEffect(() => {
    console.warn("useEffect D3");

    nodesGlobal.current = pack().leaves();

    const simulation = d3
      .forceSimulation(nodesGlobal.current)
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2).strength(0.01))
      .force("cluster", forceCluster())
      .force("collide", forceCollide());

    const svg = d3.select(svgRef.current);

    const nbG = svg.selectAll("g")._groups[0].length;

    if (nbG) svg.selectAll("g").remove();

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodesGlobal.current)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      //   .attr("fill", (d) => "#FF0000")
      .attr("fill", (d) => color(d.data.workflow))
      .attr("stroke", (d) => stroke(d.data))
      .attr("stroke-width", (d) => strokeWidth(d.data))
      .call(drag(simulation))
      // eslint-disable-next-line func-names
      .on("mouseover", function (d) {
        // d3.select(this).attr("fill", "rgb(0,255,0)");
        // console.log("qsdfgh !", d, this);

        // console.warn("mouseover", d, isDragging.current);

        if (!isDragging.current && d.target.__data__.data.group !== -1)
          setHoverData({ ...d.target.__data__.data, x: d.x, y: d.y });
      })
      .on("mouseleave", function (d) {
        // console.warn("mouseleave");
        if (!modalCommon) setHoverData(false);
      })
      // eslint-disable-next-line func-names
      .on("click", function (d) {
        // d3.select(this).attr("value", 100);
        if (nodeBackup) {
          // shrinkBubbles();
          setModalCommon("");
          setBubble(false);
        } else if (d.target.__data__.data.group !== -1) {
          setModalCommon("bubble");
          setBubble(d.target.__data__.data);
        }

        // pushBubbles();
      }); // .on("mouseover", () => console.log("qsdfgh !"));

    node
      .transition()
      // eslint-disable-next-line no-unused-vars
      .delay((d, i) => Math.random() * 500)
      .duration(750)
      .attrTween("r", (d) => {
        const i = d3.interpolate(0, d.r);
        return (t) => (d.r = i(t));
      });

    simulation.on("tick", () => {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    svg.node();

    return () => simulation.stop();
  }, [data]); // Redraw chart if data changes

  useEffect(() => {
    console.warn("useEffect modalCommon");
    if (firstLoadingDone.current) {
      if (modalCommon) pushBubbles();
      else shrinkBubbles();

      const simulation = d3
        .forceSimulation(nodesGlobal.current)
        .force("x", d3.forceX(width / 2).strength(0.01))
        .force("y", d3.forceY(height / 2).strength(0.01))
        .force("cluster", forceCluster())
        .force("collide", forceCollide());

      const svg = d3.select(svgRef.current);
      const node = svg.selectAll("circle");

      node
        .transition()
        // eslint-disable-next-line no-unused-vars
        .delay((d, i) => Math.random() * 500)
        .duration(750)
        .attrTween("r", (d) => {
          const i = d3.interpolate(0, d.r);
          return (t) => (d.r = i(t));
        });

      simulation.on("tick", () => {
        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });

      svg.node();
    } else firstLoadingDone.current = true;
  }, [modalCommon]);

  return (
    <div className="bubbleContainer">
      {isOpenFilter ? (
        <div className="hudContainer">
          {data.children.reduce(
            (acc, group) => acc + group.children.length,
            0
          ) - 1}{" "}
          Bubbles
          <img src={filterImg} className="filterIcon" alt="filterIcon" />
        </div>
      ) : (
        ""
      )}
      <svg ref={svgRef} width={svgWidth} height={svgHeight} />
      {hoverData && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className="popup"
          style={calcPosition()}
          onClick={handlePopupClick}
        >
          <span className="popup-name">{hoverData.name}</span>
          {/* <span className="popup-description">{hoverData.description}</span> */}
          <div className="popup-content">
            <div>
              <div className="popup-likes-container">
                <span className="popup-likes">{hoverData.likes}</span>
                <div className="popup-likes-heart" />
              </div>
              <span className="popup-city">{hoverData.city}</span>
            </div>
            <span className="popup-nb_participants">
              {hoverData.nb_participants} Participants / {hoverData.nb_agences}{" "}
              Agences
            </span>
            <span className="popup-workflow">
              status : {workflowList[hoverData.workflow - 1]}
            </span>
            <span className="popup-create_time">
              date de création : {hoverData.create_time.split("T")[0]}
            </span>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 right-5 apsideIconContainer">
        <div className="flex items-center">
          <p className="text-white text-3xl font-bold">APS</p>
          <p className="text-orange text-3xl font-bold mr-3">IDEA</p>
          <p className="text-white text-3xl font-bold mr-2">BY</p>
          <img
            src={logoApside}
            className="max-h-9"
            alt="apsideIcon"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

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
import React from "react";
import * as d3 from "d3";

let nodeBackup;
const colorPalette = [
  "#183650",
  // "#FF0000",
  "#5ABDB2",
  "#E79759",
  "#FFFFFF",
  "#F0F0F0",
  "#586994",
];

export default function ClusteredBubbles({ data, dimensions }) {
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  console.warn("data", data);

  const color = (m) => {
    // console.log("d3.schemeCategory10[d3.range(m).length]", d3.range(m).length);
    return colorPalette[d3.range(m).length];
    // return d3.schemeCategory10[d3.range(m).length];
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
    //   console.log("boloss", { x: x / z, y: y / z });
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
    const padding1 = 0; // separation between same-color nodes
    const padding2 = 30; // separation between different-color nodes
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

  React.useEffect(() => {
    let nodes = pack().leaves();

    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2).strength(0.01))
      .force("cluster", forceCluster())
      .force("collide", forceCollide());

    const svg = d3.select(svgRef.current);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      //   .attr("fill", (d) => "#FF0000")
      .attr("fill", (d) => color(d.data.workflow))
      .call(drag(simulation))
      .on("mouseover", function (d) {
        // d3.select(this).attr("fill", "rgb(0,255,0)");
        // console.log("baltringue !", d, this);
      })
      .on("click", function (d) {
        // d3.select(this).attr("value", 100);

        if (nodeBackup) {
          // console.log("nodeBackup");
          nodes = nodeBackup;
          // simulation;
          d3.forceSimulation(nodes)
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force("y", d3.forceY(height / 2).strength(0.1))
            .force("cluster", forceCluster())
            .force("collide", forceCollide());
          // .forceCenter([width / 2, height / 2]);
          // simulation.alpha(0.5).alphaTarget(0.3).restart();
          nodeBackup = undefined;

          nodeBackup = nodes;

          nodes.map((node) => {
            if (node.data.group === -1) {
              if (node.value < 1) {
                node.value = 300;
                node.r = 300;
              } else {
                node.value = 0.1;
                node.r = 0.1;
              }
            } else return node;
          });

          nodes = nodeBackup;
          // simulation;
          d3.forceSimulation(nodes)
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force("y", d3.forceY(height / 2).strength(0.1))
            .force("cluster", forceCluster())
            .force("collide", forceCollide());
          // .forceCenter([width / 2, height / 2]);
          // simulation.alpha(0.5).alphaTarget(0.3).restart();
          nodeBackup = undefined;

          // svg.call(drag(simulation));
        } else {
          nodeBackup = nodes;

          nodes.map((node) => {
            if (node.data.group === -1) {
              if (node.value < 1) {
                node.value = 300;
                node.r = 300;
              } else {
                node.value = 0.1;
                node.r = 0.1;
              }
            } else return node;
          });
          // console.log("tocard !", nodes);
        }
      }); // .on("mouseover", () => console.log("baltringue !"));

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

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}

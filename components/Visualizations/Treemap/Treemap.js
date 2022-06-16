/*
정도현
*/


import React, {
  Fragment,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeStyles } from "@material-ui/styles";

import * as d3 from "d3";
import { useRouter } from "next/router";

const styles = {
  root: {
    display: "none",
  },
};
const useStyles = makeStyles(styles);
const TreeMapBackground = forwardRef((props, ref) => (
  <div id="my_dataviz" ref={ref}>
    <svg className={props.className} />
  </div>
));
TreeMapBackground.displayName = "TreeMapBackground";

const Treemap = ({ handle, value }) => {
  const classes = useStyles();
  const svgRef = React.createRef();
  const router = useRouter();

  useEffect(() => {
    if (svgRef.current && value?.length !== 1) {
      const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
      // append the svg object to the body of the page
      const svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Read data
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv"
      ).then(function (data) {
        // stratify the data: reformatting for d3.js
        const root = d3
          .stratify()
          .id(function (d) {
            return d.name;
          }) // Name of the entity (column name is name in csv)
          .parentId(function (d) {
            return d.parent;
          })(
          // Name of the parent (column name is parent in csv)
          value
        );
        console.log(data);
        root.sum(function (d) {
          return +d.value;
        }); // Compute the numeric value for each entity

        // Then d3.treemap computes the position of each element of the hierarchy
        // The coordinates are added to the root object above
        d3.treemap().size([width, height]).padding(4)(root);

        // use this information to add rectangles:
        svg
          .selectAll("rect")
          .data(root.leaves())
          .join("rect")
          .attr("x", function (d) {
            return d.x0;
          })
          .attr("y", function (d) {
            return d.y0;
          })
          .attr("width", function (d) {
            return d.x1 - d.x0;
          })
          .attr("height", function (d) {
            return d.y1 - d.y0;
          })
          .style("fill", "#88b9ff")
          .on("click", function (d, i) {
            router.push(`/contest/1?&currentProfession=${i.data.name}`);
          })
          .on("mousemove", async (d, i) => {
            handle(i.data.name);
          });
        // and to add the text labels
        svg
          .selectAll("text")
          .data(root.leaves())
          .join("text")
          .attr("x", function (d) {
            return d.x0 + 10;
          }) // +10 to adjust position (more right)
          .attr("y", function (d) {
            return d.y0 + 20;
          }) // +20 to adjust position (lower)
          .text(function (d) {
            console.log(d);
            return d.data.name;
          })
          .attr("font-size", "15px")
          .attr("fill", "white");
      });
    }
  }, [svgRef.current, value]);

  return (
    <Fragment>
      <TreeMapBackground
        ref={svgRef}
        style={{ display: "none " }}
        className={classes.root}
      />
    </Fragment>
  );
};

export default Treemap;

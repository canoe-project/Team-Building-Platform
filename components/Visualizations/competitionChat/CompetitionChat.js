import { Fragment, forwardRef, useEffect, useRef, useState } from "react";

import CompetitionBackgorund from "./competitionBackgorund.svg";
import * as d3 from "d3";
import styles from "../../../styles/jss/nextjs-material-kit/pages/image/chart";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);

const outSideRadius = 15;
const inSideRadius = 7.5;
const re = /^M(?<x>\d+.?\d)\s(?<y>\d+.?\d+)/i;

const pathTween = (path, previous, length) => {
  //   var length = path.node().getTotalLength(); // Get the length of the path
  var r = d3.interpolate(previous, length); //Set up interpolation from 0 to the path length
  return function (t) {
    var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
    d3.select(this) // Select the circle
      .attr("cx", point.x) // Set the cx
      .attr("cy", point.y); // Set the cy
  };
};

const pathTweenTooltip = (path, previous, length) => {
  //   var length = path.node().getTotalLength(); // Get the length of the path
  var r = d3.interpolate(previous, length); //Set up interpolation from 0 to the path length
  return function (t) {
    var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
    d3.select(this) // Select the circle
      .attr("x", point.x) // Set the cx
      .attr("y", point.y); // Set the cy
  };
};

const pathTweenLabel = (path, previous, length) => {
  //   var length = path.node().getTotalLength(); // Get the length of the path
  var r = d3.interpolate(previous, length); //Set up interpolation from 0 to the path length
  return function (t) {
    var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
    d3.select(this) // Select the circle
      .attr("x", point.x + 500) // Set the cx
      .attr("y", point.y); // Set the cy
  };
};

const SVGBackground = forwardRef((props, ref) => (
  <div id="CompetitionRoot" className={props.className} ref={ref}>
    <CompetitionBackgorund className={props.localClassName} />
  </div>
));
SVGBackground.displayName = "SVGBackground";

const CompetitionChat = ({ className, handle, value, ...rest }) => {
  const scale = useRef(0);
  const classes = useStyles();
  const svgRef = React.createRef();
  const [currentPoint, setCurrentPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current).select("svg");
      const mountainLine = svg.select("#mountainLine");
      const mountainPoints = svg.select("#mountainLine").attr("d");
      const startPoint = mountainPoints.match(re);
      const point = svg.append("g");
      const root = d3.select("#CompetitionRoot");

      const line = point
        .append("rect")
        .attr("x", startPoint.groups.x)
        .attr("y", startPoint.groups.y)
        .attr("width", 300)
        .attr("height", 2)
        .attr("fill", "#ef476f");

      const text = point
        .append("text")
        .attr("x", parseInt(startPoint.groups.x) + 350)
        .attr("y", startPoint.groups.y)
        .attr("text-anchor", "middle")
        .attr("font-family", "Do Hyeon")
        .attr("font-weight", "bold")
        .style("font-size", "36px")
        .style("fill", "#ef476f")
        .text("");

      const circle = point
        .append("circle")
        .attr("r", outSideRadius)
        .attr("fill", "#ef476f")
        .attr("cx", startPoint.groups.x)
        .attr("cy", startPoint.groups.y)
        .attr("id", "userPoint");

      svg.on("mousemove", async (e) => {
        const rate = value.length / 10;

        const currentText =
          value[parseInt((scale.current / 100) * rate)]?.doc_count;
        const key = value[parseInt((scale.current / 100) * rate)]?.key;
        const previousScale = scale.current;
        scale.current = e.clientY * 0.8;

        handle(key);

        circle
          .transition(function (d, i) {
            return i * 1000;
          })
          .delay(200)
          .duration(1000)
          .ease(d3.easeElastic)
          .tween("pathTween", () => {
            return pathTween(mountainLine, previousScale, scale.current);
          });
        line
          .transition(function (d, i) {
            return i * 1000;
          })
          .delay(200)
          .duration(1000)
          .ease(d3.easeElastic)
          .tween("pathTweenTooltip", () => {
            return pathTweenTooltip(mountainLine, previousScale, scale.current);
          });

        text
          .text(`${currentText}명의 팀이 경쟁중!`)
          .transition(function (d, i) {
            return i * 1000;
          })
          .delay(200)
          .duration(1000)
          .ease(d3.easeElastic)
          .tween("pathTweenLabel", () => {
            return pathTweenLabel(mountainLine, previousScale, scale.current);
          });
      });
    }
  }, [svgRef.current, value]);

  return (
    <Fragment>
      <SVGBackground
        className={className}
        localClassName={classes.border}
        ref={svgRef}
      />
    </Fragment>
  );
};

export default CompetitionChat;

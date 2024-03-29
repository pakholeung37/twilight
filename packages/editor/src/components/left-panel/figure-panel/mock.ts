// import { ShapeOptions } from "../../../states"
import { ShapeCreator } from "../../../store/model"

export const figureList = [
  {
    type: "Circle",
    radius: 30,
    x: 0,
    y: 0,
    fill: "hsla(0, 100%, 50%, 1)",
    name: "circle",
    // stroke: "black",
    // strokeWidth: 1,
  },
  {
    type: "Rect",
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    fill: "hsla(180, 100%, 50%, .2)",
    name: "rect",
    // stroke: "black",
    // strokeWidth: 1,
  },
  {
    type: "Ellipse",
    x: 0,
    y: 0,
    radiusX: 40,
    radiusY: 30,
    fill: "blue",
    name: "custom ellipse",
    // stroke: "black",
    // strokeWidth: 1,
  },
  // {
  //   attrs: {
  //     x: 400,
  //     y: 300,
  //     radius: 70,
  //     angle: 60,
  //     fill: "red",
  //     stroke: "black",
  //     strokeWidth: 4,
  //     rotation: -120,
  //     draggable: true,
  //   },
  //   className: "Wedge",
  // },
  // {
  //   attrs: {
  //     x: 400,
  //     y: 300,
  //     numPoints: 6,
  //     innerRadius: 40,
  //     outerRadius: 70,
  //     fill: "yellow",
  //     stroke: "black",
  //     strokeWidth: 4,
  //     draggable: true,
  //   },
  //   className: "Star",
  // },
  // {
  //   attrs: {
  //     x: 400,
  //     y: 15,
  //     text: "Simple Text",
  //     fontSize: 30,
  //     fontFamily: "Calibri",
  //     fill: "green",
  //     draggable: true,
  //   },
  //   className: "Text",
  // },
] as ShapeCreator[]

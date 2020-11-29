import { ShapeOptions } from "../../../states";

export const figureList = [
  {
    type: "Circle",
    radius: 70,
    x: 70,
    y: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  },
  {
    type: "Rect",
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
  }
  // {
  //   attrs: {
  //     x: 400,
  //     y: 300,
  //     radiusX: 100,
  //     radiusY: 50,
  //     fill: "yellow",
  //     stroke: "black",
  //     strokeWidth: 4,
  //     draggable: true,
  //   },
  //   className: "Ellipse",
  // },
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
] as ShapeOptions[]

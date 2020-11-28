/* eslint-disable react/prop-types */
/**
 * Based on ReactArt.js
 * Copyright (c) 2017-present Lavrenov Anton.
 * All rights reserved.
 *
 * MIT
 */
import React, { version as _version, forwardRef } from "react"
import { isBrowser, Stage as _Stage } from "konva/lib/Core"
import ReactFiberReconciler from "react-reconciler"
import { getClosestInstanceFromNode } from "./ReactDOMComponentTree"
import * as HostConfig from "./ReactKonvaHostConfig"
import { applyNodeProps, toggleStrictMode } from "./makeUpdates"

// export for testing
// const REACT_VERSION = '16.8.3';
// const __matchRectVersion = React.version === REACT_VERSION;
// skip version testing for now

// That warning is useful, but I am not sure we really need it
// if (!__matchRectVersion) {
//   console.warn(
//     `Version mismatch detected for react-konva and react. react-konva expects to have react version ${REACT_VERSION}, but it has version ${
//       React.version
//     }. Make sure versions are matched, otherwise, react-konva work is not guaranteed. For releases information take a look here: https://github.com/konvajs/react-konva/releases`
//   );
// }

class StageClass extends React.Component {
  componentDidMount() {
    if (!isBrowser) {
      return
    }
    this._stage = new _Stage({
      width: this.props.width,
      height: this.props.height,
      container: this._tagRef,
    })

    this._setRef(this._stage)

    applyNodeProps(this._stage, this.props)

    this._mountNode = KonvaRenderer.createContainer(this._stage)
    KonvaRenderer.updateContainer(this.props.children, this._mountNode, this)
  }

  _setRef(value) {
    const { forwardedRef } = this.props
    if (!forwardedRef) {
      return
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(value)
    } else {
      forwardedRef.current = value
    }
  }

  componentDidUpdate(prevProps) {
    if (!isBrowser) {
      return
    }
    this._setRef(this._stage)
    applyNodeProps(this._stage, this.props, prevProps)

    KonvaRenderer.updateContainer(this.props.children, this._mountNode, this)
  }

  componentWillUnmount() {
    if (!isBrowser) {
      return
    }
    this._setRef(null)
    KonvaRenderer.updateContainer(null, this._mountNode, this)
    this._stage.destroy()
  }

  getStage() {
    return this._stage
  }

  render() {
    const props = this.props

    return (
      <div
        ref={ref => (this._tagRef = ref)}
        accessKey={props.accessKey}
        className={props.className}
        role={props.role}
        style={props.style}
        tabIndex={props.tabIndex}
        title={props.title}
      />
    )
  }
}

const KONVA_NODES = [
  "Layer",
  "FastLayer",
  "Group",
  "Label",
  "Rect",
  "Circle",
  "Ellipse",
  "Wedge",
  "Line",
  "Sprite",
  "Image",
  "Text",
  "TextPath",
  "Star",
  "Ring",
  "Arc",
  "Tag",
  "Path",
  "RegularPolygon",
  "Arrow",
  "Shape",
  "Transformer",
]

const TYPES = {}

KONVA_NODES.forEach(function (nodeName) {
  TYPES[nodeName] = nodeName
})

const KonvaRenderer = ReactFiberReconciler(HostConfig)

KonvaRenderer.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: process.env.NODE_ENV !== "production" ? 1 : 0,
  version: _version,
  rendererPackageName: "react-konva",
  getInspectorDataForViewTag: (...args) => {
    console.log(args)
  },
})

/** API */

export const Stage = forwardRef((props, ref) => {
  return <StageClass {...props} forwardedRef={ref} />
})

Stage.displayName = "Stage"

export const {
  Layer,
  FastLayer,
  Group,
  Label,
  Rect,
  Circle,
  Ellipse,
  Wedge,
  Line,
  Sprite,
  Image,
  Text,
  TextPath,
  Star,
  Ring,
  Arc,
  Tag,
  Path,
  RegularPolygon,
  Arrow,
  Shape,
  Transformer,
} = TYPES

export const useStrictMode = toggleStrictMode
export const __matchRectVersion = true

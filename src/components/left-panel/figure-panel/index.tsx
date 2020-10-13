import React, { useEffect, useState } from "react"
import { Box, Flex, Divider, Image } from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import AddButton from "../AddButton"
import Figure from "./Figure"
import { ImageBuilder } from "libs/sketch"

const figureList = [
  `{"attrs":{"x":400,"y":300,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"Circle"}`,
  `{"attrs":{"x":400,"y":300,"radiusX":100,"radiusY":50,"fill":"yellow","stroke":"black","strokeWidth":4},"className":"Ellipse"}`,
  `{"attrs":{"x":400,"y":300,"radius":70,"angle":60,"fill":"red","stroke":"black","strokeWidth":4,"rotation":-120},"className":"Wedge"}`,
  `{"attrs":{"x":400,"y":300,"numPoints":6,"innerRadius":40,"outerRadius":70,"fill":"yellow","stroke":"black","strokeWidth":4},"className":"Star"}`,
  `{"attrs":{"x":400,"y":15,"text":"Simple Text","fontSize":30,"fontFamily":"Calibri","fill":"green"},"className":"Text"}`,
]
const FigurePanel: React.FC = () => {
  const [figures, updateFigures] = useState<string[]>([
    ...figureList.map(() => ""),
  ])
  useEffect(() => {
    figureList.forEach((figure, index) => {
      ImageBuilder.toImageURL(figure).then(url => {
        updateFigures(prev => {
          const newArray = [...prev]
          newArray[index] = url
          return newArray
        })
      })
    })
  }, [])

  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理标志"
        subtitle="使用一个或多个标志向大家展示您的业务。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <Box overflow="auto">
        {figures.map((figure, index) => (
          <Box mt="30px" mx="30px" key={index}>
            <Figure imgSrc={figure}></Figure>
          </Box>
        ))}
        <Box my="30px" mx="30px">
          <AddButton title="新增标志"></AddButton>
        </Box>
      </Box>
    </Flex>
  )
}

export default FigurePanel

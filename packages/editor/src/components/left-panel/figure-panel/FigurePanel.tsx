import React, { useEffect, useState } from "react"
import { Box, Flex, Divider } from "@chakra-ui/react"
import PanelInfo from "../PanelInfo"
import Figure from "./Figure"
import { figureList } from "./mock"
import { ImageBuilder } from "../../../libs/sketch"
import { useAddShape } from "../../../states/hooks"

const FigurePanel: React.FC = () => {
  const [figures, updateFigures] = useState<string[]>([
    ...figureList.map(() => ""),
  ])
  const addShape = useAddShape()

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

  const createFigure = (index: number) => {
    const firgure = figureList[index]
    addShape(firgure)
  }

  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理标志"
        subtitle="使用一个或多个标志向大家展示您的业务。"
      ></PanelInfo>
      <Divider my={0} />
      <Box overflow="auto">
        {figures.map((figure, index) => (
          <Box
            mt="30px"
            mx="30px"
            key={index}
            onClick={() => createFigure(index)}
          >
            <Figure imgSrc={figure}></Figure>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default FigurePanel

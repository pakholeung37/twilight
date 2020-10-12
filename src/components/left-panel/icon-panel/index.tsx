import React, { useEffect, useState } from "react"
import {
  Text,
  Box,
  Flex,
  Divider,
  Icon,
  Image as CImage,
} from "@chakra-ui/core"
import PanelInfo from "../PanelInfo"
import AddButton from "../AddButton"
import { ImageBuilder } from "libs/sketch"

const icon1 = `{"attrs":{"width":800,"height":600},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":400,"y":300,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"Circle"}]}]}`
const IconPanel: React.FC = () => {
  const [url, updateUrl] = useState("")
  useEffect(() => {
    ImageBuilder.toImageURL(icon1).then(url => updateUrl(url))
  })
  return (
    <Flex h="100%" direction="column">
      <PanelInfo
        title="管理标志"
        subtitle="使用一个或多个标志向大家展示您的业务。"
      ></PanelInfo>
      <Divider borderColor="border" my={0} />
      <CImage src={url} py="30px" mx="30px" w="100px"></CImage>
      <Box py="30px" mx="30px" overflow="overlay">
        <AddButton title="新增标志"></AddButton>
      </Box>
    </Flex>
  )
}

export default IconPanel

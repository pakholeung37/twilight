import React from "react"
import { Box, Text, Image } from "@chakra-ui/core"

const Logo: React.FC = () => (
  <Box>
    <Image h="40px" src={process.env.PUBLIC_URL + "/logo.svg"}></Image>
  </Box>
)

export default Logo

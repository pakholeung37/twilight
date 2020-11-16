import React from "react"
import { Box, Text, Image } from "@chakra-ui/react"

const Logo: React.FC = () => (
  <Box>
    <Image h="36px" src={process.env.PUBLIC_URL + "/logo.svg"}></Image>
  </Box>
)

export default Logo

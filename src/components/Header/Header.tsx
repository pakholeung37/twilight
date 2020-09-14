import React, { useState } from "react"
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core"

const Header: React.FC = props => {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="black"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Chakra UI
        </Heading>
      </Flex>
    </Flex>
  )
}

export default Header

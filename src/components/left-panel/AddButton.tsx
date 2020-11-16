import React from "react"
import { Flex, Text, Icon, Button } from "@chakra-ui/react"
import { RiAddFill } from "react-icons/ri"

const icons = {
  add: RiAddFill,
}

const AddButton: React.FC<{
  title?: string
  icon?: "add"
}> = ({ title, icon }) => {
  return (
    <Button
      as="div"
      display="block"
      h="108px"
      borderRadius="md"
      bg="transparent"
      border="1px dashed"
      borderColor="twilight.500"
      cursor="pointer"
    >
      <Flex h="100%" justify="center" align="center">
        <Icon as={icons[icon || "add"]} color="twilight.500" mr="4px"></Icon>
        <Text as="span" color="twilight.500">
          {title}
        </Text>
      </Flex>
    </Button>
  )
}

export default AddButton

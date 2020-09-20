import React, { useState } from "react"
import { IconButton, IconButtonProps } from "@chakra-ui/core"

const HistoryButton: React.FC<IconButtonProps> = props => {
  return (
    <IconButton
      {...props}
      as="div"
      color="textlight"
      border="none"
      variant="outline"
      _hover={{ color: props.color }}
      _active={{ color: props.color }}
      _disabled={{ color: "disabled", cursor: "default" }}
    >
      {props.children}
    </IconButton>
  )
}

export default HistoryButton

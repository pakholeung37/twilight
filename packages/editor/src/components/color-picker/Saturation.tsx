import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Box } from "@chakra-ui/react"
import { calculatePosition } from "./utils"
import { Pointer } from "./Pointer"
import { HSV } from "color-convert/conversions"
import { useThrottleFn } from "ahooks"
import { observer } from "mobx-react-lite"

const renderWindow = window

interface SaturationProps {
  onChange?: (hsv: HSV) => void
  hsv: HSV
}

export const Saturation: React.FC<SaturationProps> = observer(
  function Saturation({ onChange, hsv }) {
    const containerRef = useRef<HTMLDivElement>(null)
    // useRef() will return a mutableRefObject, which current can assign
    const rectCache = useRef<DOMRect>()

    const [h, s, v] = hsv
    const { run: setPositionThrottle } = useThrottleFn(
      (value: { x: number; y: number }) => {
        setX(value.x)
        setY(value.y)
      },
      { wait: 16 },
    )
    useEffect(() => {
      if (containerRef.current) {
        rectCache.current = containerRef.current.getClientRects()[0]
      }
    }, [])

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
      if (rectCache.current) {
        const width = rectCache.current.width
        const height = rectCache.current.height
        const x = (s / 100) * width
        const y = height - (v / 100) * height
        setPositionThrottle({ x, y })
      }
    }, [setPositionThrottle, s, v])

    const handleChange = useCallback(
      (e: MouseEvent) => {
        if (rectCache.current) {
          const result = calculatePosition(e, rectCache.current)

          const {
            width: containerWidth,
            height: containerHeight,
          } = rectCache.current

          const _s = (result.left / containerWidth) * 100
          const _v = (1 - result.top / containerHeight) * 100

          onChange && onChange([h, _s, _v])
        }
      },
      [onChange, h],
    )
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        handleChange(e.nativeEvent)
      },
      [handleChange],
    )

    const handleMouseUp = useCallback(
      (e: MouseEvent) => {
        renderWindow.removeEventListener("mousemove", handleChange)
        renderWindow.removeEventListener("mouseup", handleMouseUp)
      },
      [handleChange],
    )

    const handleMouseDown = useCallback(() => {
      rectCache.current = containerRef.current?.getClientRects()[0]
      renderWindow.addEventListener("mousemove", handleChange)
      renderWindow.addEventListener("mouseup", handleMouseUp)
    }, [handleChange, handleMouseUp])

    return (
      <Box
        ref={containerRef}
        h="150px"
        w="100%"
        position="relative"
        overflow="hidden"
        rounded="4px"
        boxShadow="0 0 0px 1px rgba(0,0,0, 0.4)"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {useMemo(
          () => (
            <>
              <Box
                w="100%"
                h="100%"
                position="absolute"
                style={{
                  background: `hsl(${h},100%, 50%)`,
                }}
              ></Box>
              <Box
                w="100%"
                h="100%"
                position="absolute"
                background="linear-gradient(to right, #fff, rgba(255, 255, 255, 0));"
              ></Box>
              <Box
                w="100%"
                h="100%"
                position="absolute"
                background="linear-gradient(to top, #000, rgba(0, 0, 0, 0));"
              ></Box>
            </>
          ),
          [h],
        )}
        <Pointer x={x} y={y} />
      </Box>
    )
  },
)

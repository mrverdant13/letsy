import { useState, useMemo, useRef, FC } from 'react';

import { Box, Stack } from '@mui/material';
import { NumberSize, Resizable, ResizeDirection } from 're-resizable';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { IUniformSeriesPayment } from '../../interfaces/payment';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';

interface Props {
  blockWidth: number;
  blockHeight: number;
  payment: IUniformSeriesPayment;
}

export const UniformSeriesPayment: FC<Props> = ({ blockWidth, blockHeight, payment }) => {
  const ref = useRef(null);
  const { updatePayment } = useEquivalenceGroupContext();
  const color: string = useMemo(
    () => payment.periodicAmount > 0 ? '#00FF00AA' : '#FF0000AA',
    [payment.periodicAmount],
  );

  const currentOffset: number = useMemo(
    () => (payment.position) * blockWidth,
    [payment.position, blockWidth]
  );
  const currentWidth: number = useMemo(
    () => payment.periods * blockWidth,
    [payment.periods, blockWidth],
  );

  const [dynamicPosition, setDynamicPosition] = useState<number>(payment.position);
  const [dynamicPeriods, setDynamicPeriods] = useState<number>(payment.periods);

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onResizeStart = () => {
    setIsResizing(true);
  }

  const onResizeEnd = (
  ) => {
    setIsResizing(false);
    updatePayment(
      payment.name,
      {
        ...payment,
        periods: dynamicPeriods,
      },
    );
  }

  const onResize = (
    event: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    elementRef: HTMLElement,
    delta: NumberSize,
  ) => {
    if (direction === 'right') {
      const updatedPeriods = Math.round((currentWidth + delta.width) / blockWidth);
      setDynamicPeriods(updatedPeriods);
    }
  }

  const onDragStart = () => {
    setIsDragging(true);
  }

  const onDragEnd = () => {
    setIsDragging(false);
    updatePayment(
      payment.name,
      {
        ...payment,
        position: dynamicPosition,
      },
    );
  }

  const onDrag = (
    e: DraggableEvent,
    data: DraggableData,
  ) => {
    const updatedPosition = Math.round((currentOffset + data.x) / blockWidth);
    setDynamicPosition(updatedPosition);
  }

  const isMutating: boolean = isResizing || isDragging;

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {
        isMutating &&
        <Stack
          direction="row"
          sx={{
            position: 'absolute',
          }}
        >
          <Box
            sx={{
              width: currentOffset,
            }}
          />
          <UniformSeriesPaymentBody
            blockWidth={blockWidth}
            blockHeight={blockHeight}
            payment={payment}
            color={color}
            type={UniformSeriesPaymentBodyType.placeholder}
          />
        </Stack>
      }
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
        }}
      >
        <Box
          sx={{
            width: dynamicPosition * blockWidth,
            transition: 'width 0.1s',
          }}
        />
        <UniformSeriesPaymentBody
          blockWidth={blockWidth}
          blockHeight={blockHeight}
          payment={{
            ...payment,
            periods: dynamicPeriods,
          }}
          color={color}
          type={
            isMutating
              ? UniformSeriesPaymentBodyType.hollow
              : UniformSeriesPaymentBodyType.full
          }
        />
      </Stack>
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
        }}
      >
        <Box
          sx={{
            width: currentOffset,
          }}
        />
        <Resizable
          defaultSize={{
            width: currentWidth,
            height: blockHeight,
          }}
          minWidth={2 * blockWidth}
          minHeight={blockHeight}
          grid={[blockWidth, blockHeight]}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeEnd}
          enable={{
            right: true,
            top: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        />
      </Stack>
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
        }}
      >
        <Box
          sx={{
            width: currentOffset,
          }}
        />
        <Draggable
          key={`${currentOffset}`}
          nodeRef={ref}
          axis="x"
          grid={[blockWidth, blockHeight]}
          onDrag={onDrag}
          onStart={onDragStart}
          onStop={onDragEnd}
        >
          <Box
            ref={ref}
            sx={{
              width: currentWidth,
              height: blockHeight,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          />
        </Draggable>
      </Stack>
    </Box>
  );
}

enum UniformSeriesPaymentBodyType {
  full,
  placeholder,
  hollow,
}

interface UniformSeriesPaymentBodyProps {
  blockWidth: number;
  blockHeight: number;
  payment: IUniformSeriesPayment;
  color: string;
  type?: UniformSeriesPaymentBodyType;
  opacity?: number;
}

const UniformSeriesPaymentBody: FC<UniformSeriesPaymentBodyProps> = ({
  blockWidth,
  blockHeight,
  payment,
  color,
  type = UniformSeriesPaymentBodyType.full,
  opacity = 1,
}) => {
  const borderThickness: number = blockWidth / 10;
  if (type == UniformSeriesPaymentBodyType.placeholder) {
    return (
      <Box
        sx={{
          opacity: opacity,
          width: blockWidth * payment.periods,
          height: blockHeight,
          background:
            `repeating-linear-gradient( 45deg, ${color}, ${color} ${borderThickness}px, transparent ${borderThickness}px, transparent ${3 * borderThickness}px )`
        }}
      />
    );
  }
  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: blockWidth,
          height: blockHeight,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            display: 'block',
            width: '200%',
            height: '200%',
            position: 'absolute',
            borderRadius: '50%',
            right: 0,
            ...(
              (payment.periodicAmount > 0) ?
                {
                  bottom: 0,
                  boxShadow: `${blockWidth}px ${blockHeight}px 0 0 ${color}`,
                } :
                {
                  top: 0,
                  boxShadow: `${blockWidth}px -${blockHeight}px 0 0 ${color}`,
                }
            ),
          },
        }}
      />
      <Box
        sx={{
          width: blockWidth * (payment.periods - 1),
          height: blockHeight,
          position: 'relative',
          ...(
            (type == UniformSeriesPaymentBodyType.full) &&
            {
              backgroundColor: color,
            }
          ),
          ...(
            (type == UniformSeriesPaymentBodyType.hollow) &&
            {
              border: `${borderThickness}px solid ${color}`,
              boxSizing: 'border-box',
              MozBoxSizing: 'border-box',
              WebkitBoxSizing: 'border-box',
            }
          ),
          transition: 'width 0.1s',
        }}
      />
    </Stack>
  );
}

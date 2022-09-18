import { useState, FC, useRef, useMemo } from 'react';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Box, Stack, Tooltip, Typography, Button, Divider } from '@mui/material';

import { ISinglePayment } from '../../interfaces/payment';
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';

interface Props {
  blockWidth: number;
  blockHeight: number;
  payment: ISinglePayment;
}

export const SinglePayment: FC<Props> = ({ blockWidth, blockHeight, payment }) => {
  const ref = useRef(null);
  const { updatePayment } = useEquivalenceGroupContext();
  const color: string = useMemo(
    () => payment.amount > 0 ? '#00FF00AA' : '#FF0000AA',
    [payment.amount],
  );
  const currentOffset: number = useMemo(
    () => payment.position * blockWidth,
    [payment.position, blockWidth],
  );
  const [dynamicPosition, setDynamicPosition] = useState<number>(payment.position);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const width: number = Math.min(blockWidth / 5, 50);

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

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {
        isDragging &&
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
          <SinglePaymentBody
            width={width}
            blockHeight={blockHeight}
            payment={payment}
            color={color}
            type={SinglePaymentBodyType.placeholder}
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
        <SinglePaymentBody
          width={width}
          blockHeight={blockHeight}
          payment={payment}
          color={color}
          type={
            isDragging
              ? SinglePaymentBodyType.hollow
              : SinglePaymentBodyType.full
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
        <Tooltip
          followCursor
          title={(
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {payment.name}
              </Typography>
              <Divider />
              <Typography variant="caption">
                Position: {payment.position}
              </Typography>
              <Typography variant="caption">
                Amount: {payment.amount}
              </Typography>
            </Stack>
          )}
        >
          <Box
            sx={{
              m: 0,
              p: 0,
              minWidth: 0,
            }}
          >
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
                component="div"
                ref={ref}
                sx={{
                  width: width,
                  height: blockHeight,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              />
            </Draggable>
          </Box>
        </Tooltip>
      </Stack>
    </Box>
  );
}

enum SinglePaymentBodyType {
  full,
  placeholder,
  hollow,
}

interface SinglePaymentBodyProps {
  width: number;
  blockHeight: number;
  payment: ISinglePayment;
  color: string;
  type?: SinglePaymentBodyType;
  opacity?: number;
}

const SinglePaymentBody: FC<SinglePaymentBodyProps> = ({
  width,
  blockHeight,
  payment,
  color,
  type = SinglePaymentBodyType.full,
  opacity = 1,
}) => {
  const borderThickness: number = width / 5;
  if (type == SinglePaymentBodyType.placeholder) {
    return (
      <Box
        sx={{
          opacity: opacity,
          width: width,
          height: blockHeight,
          background:
            `repeating-linear-gradient( 45deg, ${color}, ${color} ${borderThickness}px, transparent ${borderThickness}px, transparent ${3 * borderThickness}px )`
        }}
      />
    );
  }
  return (
    <>
      <Box
        sx={{
          width: width,
          height: blockHeight,
          ...(
            (type == SinglePaymentBodyType.full) &&
            {
              backgroundColor: color,
            }
          ),
          ...(
            (type == SinglePaymentBodyType.hollow) &&
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
    </>
  );
}
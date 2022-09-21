import Link from 'next/link'
import { useState } from 'react';

import { Handyman } from '@mui/icons-material'
import { IconButton, Tooltip, Button, Menu, MenuItem } from '@mui/material';

interface ToolData {
  route: string;
  name: string;
}

const tools: ToolData[] = [
  {
    route: '/tools/equivalent-value',
    name: 'Equivalent Value Calculator',
  },
  {
    route: '/tools/equivalent-interest-rate',
    name: 'Equivalent Interest Rate Calculator',
  },
];

export const ToolsButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  const isOpen: boolean = Boolean(anchorEl);
  const menuId: string = 'tools-menu';

  return (
    <>
      <Button
        aria-controls={isOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={open}
        sx={{
          mx: 3,
        }}
      >
        Tools
      </Button>
      <Menu
        id={menuId}
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={close}
      >
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.route}
            passHref
          >
            <MenuItem
              sx={{
                px: 3,
              }}
            >
              {tool.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
}

'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: '#25274D', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Animeshka
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color={pathname === '/' ? 'secondary' : 'inherit'}
            component={Link}
            href="/"
            variant={pathname === '/' ? 'contained' : 'text'}
          >
            Главная
          </Button>
          <Button
            color={pathname === '/watched' ? 'secondary' : 'inherit'}
            component={Link}
            href="/watched"
            variant={pathname === '/watched' ? 'contained' : 'text'}
          >
            Просмотренные
          </Button>
          <Button
            color={pathname === '/about' ? 'secondary' : 'inherit'}
            component={Link}
            href="/about"
            variant={pathname === '/about' ? 'contained' : 'text'}
          >
            О нас
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

"use client"
import * as React from 'react';
import { Michroma } from "next/font/google";
import Image from "next/image";
import Link from 'next/link';
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Label } from '@headlessui/react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { label: 'Casos de Éxito', href: '/portafolio' },
  { label: 'Soluciones', href: '/servicios' },
  { label: 'Sobre Medify', href: '/sobreNosotros' },
  { label: 'Contacto', href: '/soporte' },
  { label: 'Solicitar información', href: '/comprar' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [hoveredMenu, setHoveredMenu] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMouseEnter = (event) => {
    setHoveredMenu(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <AppBar
      className={michroma.className}
      position="sticky"
      color="transparent"
      enableColorOnDark
      sx={{
        backgroundColor: '#ffffff !important',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(30, 58, 138, 0.08)',
        boxShadow: '0 2px 20px rgba(30, 58, 138, 0.12)',
        fontFamily: michroma.style.fontFamily,
      }}
    >
      <Container maxWidth="xl">
        <Box style={{ color: '#1e3a8a' }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: { xs: 1, md: 2 } }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, mr: 2 }}>
              <Link
                href="/"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '160px', minHeight: '160px', maxHeight: '160px', padding: '0 12px', cursor: 'pointer' }}
              >
                <Image
                  src="/ico.png"
                  alt="Medify logo - Volver al inicio"
                  width={500}
                  height={140}
                  style={{ objectFit: 'contain', borderRadius: '16px', boxShadow: '0 4px 24px rgba(30,58,138,0.13)', background: '#fff', border: '2px solid #1e3a8a', transition: 'transform 0.2s ease' }}
                  className="hover:scale-105"
                  priority
                />
              </Link>
              <Typography
                className={michroma.className}
                component={Link}
                href="/"
                style={{ color: '#1e3a8a', fontFamily: michroma.style.fontFamily }}
                sx={{
                  color: '#1e3a8a',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontFamily: michroma.style.fontFamily,
                  letterSpacing: '.10em',
                  fontSize: '1.0rem',
                  lineHeight: 1.05,
                  opacity: 0.92,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': { opacity: 1, color: '#0c1426' }
                }}
              >
                Tecnología Médica Digital
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
                PaperProps={{
                  sx: {
                    backgroundColor: '#ffffff',
                    color: '#1e3a8a',
                    borderRadius: 2,
                    border: '1px solid rgba(30, 58, 138, 0.12)',
                    boxShadow: '0 8px 32px rgba(30, 58, 138, 0.18)',
                    mt: 1,
                    fontFamily: michroma.style.fontFamily,
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu} sx={{ px: 2, py: 1.25 }}>
                    <Typography
                      className={michroma.className}
                      component={Link}
                      href={page.href}
                      sx={{
                        color: '#1e3a8a',
                        textDecoration: 'none',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        fontFamily: michroma.style.fontFamily,
                        letterSpacing: '.06em',
                        display: 'block',
                        width: '100%',
                        lineHeight: 1.2,
                        whiteSpace: 'normal',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: '#0c1426' }
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              className={michroma.className}
              component={Link}
              href="/"
              style={{ color: '#1e3a8a', fontFamily: michroma.style.fontFamily }}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                textDecoration: 'none',
                letterSpacing: '.06em',
                fontSize: { xs: '1.0rem', sm: '1.05rem' },
                fontWeight: 700,
                fontFamily: michroma.style.fontFamily,
                lineHeight: 1.15,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflow: 'visible',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#0c1426' }
              }}
            >
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', gap: 0 }}>
              {pages.map((page) => (
                <Box key={page.label} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Button
                    onClick={handleCloseNavMenu}
                    className={michroma.className}
                    component={Link}
                    href={page.href}
                    sx={{
                      my: 1.5,
                      mx: 0.5,
                      px: 2.25,
                      py: 1,
                      color: '#1e3a8a',
                      fontFamily: michroma.style.fontFamily,
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      letterSpacing: '.08em',
                      textTransform: 'none',
                      borderRadius: 2,
                      opacity: 0.9,
                      transition: 'all .2s ease',
                      '&:hover': {
                        opacity: 1,
                        backgroundColor: 'rgba(30, 58, 138, 0.08)',
                        transform: 'translateY(-1px)',
                        color: '#0c1426'
                      }
                    }}
                  >
                    {page.label}
                  </Button>
                  <Menu
                    anchorEl={hoveredMenu}
                    open={Boolean(hoveredMenu)}
                    onClose={handleMouseLeave}
                    MenuListProps={{
                      onMouseLeave: handleMouseLeave,
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    PaperProps={{
                      sx: {
                        backgroundColor: '#ffffff',
                        color: '#1e3a8a',
                        borderRadius: 2,
                        border: '1px solid rgba(30, 58, 138, 0.12)',
                        boxShadow: '0 8px 32px rgba(30, 58, 138, 0.18)',
                        mt: 0.5,
                        fontFamily: michroma.style.fontFamily,
                      }
                    }}
                  >
                    <MenuItem onClick={handleMouseLeave} sx={{ px: 2, py: 1.25 }}>
                      <Typography
                        className={michroma.className}
                        component={Link}
                        href={page.href}
                        sx={{
                          color: '#1e3a8a',
                          textDecoration: 'none',
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          fontFamily: michroma.style.fontFamily,
                          letterSpacing: '.06em',
                          display: 'block',
                          width: '100%',
                          transition: 'color 0.2s ease',
                          '&:hover': { color: '#0c1426' }
                        }}
                      >
                        {page.label}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ))}
              <Button
                component="a"
                href="https://wa.me/56977889900?text=Quiero%20cotizar%20solución%20médica%20Medify"
                target="_blank"
                rel="noopener"
                className={michroma.className}
                sx={{
                  my: 1.5,
                  ml: 1.5,
                  px: 2.75,
                  py: 1.1,
                  color: 'white',
                  fontFamily: michroma.style.fontFamily,
                  fontWeight: 700,
                  borderColor: 'rgba(30, 58, 138, 0.3)',
                  textTransform: 'none',
                  letterSpacing: '.08em',
                  fontSize: '0.94rem',
                  borderRadius: 2,
                  border: '1px solid rgba(30, 58, 138, 0.3)',
                  background: 'linear-gradient(to right, #1e3a8a, #2563eb)',
                  boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)',
                  transition: 'all .2s ease',
                  '&:hover': {
                    background: 'linear-gradient(to right, #0c1426, #1e3a8a)',
                    transform: 'translateY(-1px)',
                    borderColor: 'rgba(30, 58, 138, 0.5)',
                    boxShadow: '0 6px 20px rgba(30, 58, 138, 0.4)'
                  }
                }}
              >
                Cotizar
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
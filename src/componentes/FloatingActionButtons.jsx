import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function FloatingActionButtons({
  onClick,
  color,
  icon,
  tooltip,
  position
}) {
  return (
    <Box>
      <Tooltip 
        title={tooltip} 
        placement="left"
        componentsProps={{
          tooltip: {
            sx: {
              fontSize: "16px",   // tamaño de letra más grande
              padding: "8px 12px" // más espacio interno
            }
          }
        }}
      >
        <Fab
          color={color}
          aria-label={tooltip}
          onClick={onClick}
          sx={{
            position: 'fixed',
            bottom: position.bottom,
            right: position.right,
            boxShadow: 4, // adds subtle shadow for better visibility
            zIndex: 9999,   // ensures it stays above other elements
            backgroundColor: '#25D366',
            '&:hover': {
              backgroundColor: '#1EBE5D'
            }
          }}
        >
          {icon || <WhatsAppIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
}

// Default props for ease of use
FloatingActionButtons.defaultProps = {
  onClick: () => window.open('https://wa.me/56991749964?text=Quiero%20información%20sobre%20Medify', '_blank'),
  color: 'success',
  icon: <WhatsAppIcon />,
  tooltip: 'WhatsApp',
  position: { bottom: 16, right: 16 }
};

// Prop types for better validation
FloatingActionButtons.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'inherit', 'success', 'error', 'info', 'warning']),
  icon: PropTypes.element,
  tooltip: PropTypes.string,
  position: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number
  })
};
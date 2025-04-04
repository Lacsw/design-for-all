import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--tooltip-bg)',
    color: 'var(--color-secondary)',
    fontSize: 12,
    fontStyle: 'Gotham',
    backdropFilter: 'blur(5px)',
    borderRadius: '6px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--tooltip-bg)',
    fontSize: 20, // arrow size
  },
}));

export default CustomTooltip;

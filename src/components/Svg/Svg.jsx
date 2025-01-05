import { useRef } from 'react';
import './Svg.css';

const Svg = ({ icon }) => {
  console.log(icon);
  const svgRef = useRef(null);
  const img = new Image();
  img.src = icon;
  img.onload = () => {
    svgRef.current.style.maskImage = `url(${img.src})`;
    console.log(img.src);
  };
  return <div ref={svgRef} className="svg-box" />;
};

export default Svg;

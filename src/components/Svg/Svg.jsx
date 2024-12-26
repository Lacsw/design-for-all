import './Svg.css';

const Svg = ({ icon }) => {
  const maskStyle = {
    mask: `url(${icon}) no-repeat center`,
    maskSize: '100%',
  };
  return <div className="svg-box" style={maskStyle} />;
};

export default Svg;

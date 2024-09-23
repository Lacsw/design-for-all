const Svg = ({ icon, size, color }) => {
  const maskStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    mask: `url(${icon}) no-repeat center`,
    maskSize: '100%',
  };
  return <div className="svg-box" style={maskStyle} />;
};

export default Svg;

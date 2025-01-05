import './Svg.css';

const Svg = ({ icon }) => {
  const mask = `url(${icon}) no-repeat center / 100%`;
  return <div className="svg-box" style={{ maskImage: `url(${icon})` }} />;
};

export default Svg;

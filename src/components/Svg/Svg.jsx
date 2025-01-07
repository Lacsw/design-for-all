import './Svg.css';

function correctUrl(dataUrl) {
  const url = dataUrl.split(',');
  url[1] = url[1]
    .replace(/'/g, '%22')
    .replace(/=/g, '%3D')
    .replace(/:/g, '%3A')
    .replace(/\//g, '%2F');
  return url.join(',');
}

const Svg = ({ icon }) => {
  const url = icon.includes('data:') ? correctUrl(icon) : icon;
  return (
    <div
      className="svg-box"
      style={{ maskImage: `url(${url})`, WebkitMaskImage: `url(${url})` }}
    />
  );
};

export default Svg;

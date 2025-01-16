import './Preloader.css';

const Preloader = ({size}) => {
  return (
    <div className="preloader-box">
      <div className="preloader" style={{ width: size, height: size }} />
    </div>
  );
};


export default Preloader;
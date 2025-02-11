const LoadingSpin = ({ size }) => {
  const spinSize = `loading-${size}`;
  return <span className={`loading loading-spinner ${spinSize}`} />;
};

export default LoadingSpin;

const Skeleton = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-muted rounded-md ${className}`}
      {...props}
    >
      {children}
      {!children && <div className='w-full h-full invisible'>{'\u00A0'}</div>}
    </div>
  );
};

export default Skeleton;

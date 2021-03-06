import React from 'react';

const Spinner = ({ xClasses }: { xClasses?: string[] }) => {
  return (
    <svg className={xClasses?.length ? `spinner ${xClasses?.join(' ')}` : 'spinner'} viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
};

export default Spinner;

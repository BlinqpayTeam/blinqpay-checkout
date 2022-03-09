import React, { useEffect, useState } from 'react';
import { ICountdown } from './ICountdown';
// import { useDispatch, useSelector } from "react-redux";

const Countdown: React.FC<ICountdown.IProps> = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  Refresh,
  callback,
}: ICountdown.IProps) => {
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
  const [over, setOver] = useState(false);

  const tick = () => {
    if (over) {
      // dispatch(hideBankDetails());
    }
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });
  useEffect(() => {
    if (over && callback) {
      callback();
    }
  }, [over]);

  return (
    <div>
      {!over && (
        <p>
          <span className="font-medium mr-2">Time Left:</span>
          {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
        </p>
      )}
      {Refresh && (
        <div className="refresh-text" onClick={Refresh}>
          {over ? 'Refresh!' : ''}
        </div>
      )}
    </div>
  );
};

export default Countdown;

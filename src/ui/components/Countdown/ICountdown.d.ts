import { Dispatch, SetStateAction } from 'react';

declare namespace ICountdown {
  export interface IProps {
    hours?: number;
    minutes?: number;
    seconds?: number;
    expireCount?: boolean;
    isOver?: boolean;
    setExpireCount?: Dispatch<SetStateAction<boolean>>;
    Refresh?: () => void | null;
    callback?: () => void | null | Promise<void>;
  }
}

export { ICountdown };

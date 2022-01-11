import * as React from 'react';

interface Props {
  size?: number;
}

export default function Loading(props: Props) {
  const SIZE = props.size ? props.size : 4;
  return (
    <span
      className={`w-${SIZE} h-${SIZE} border-b-2 border-white-900 rounded-full animate-spin mr-5`}
    ></span>
  );
}

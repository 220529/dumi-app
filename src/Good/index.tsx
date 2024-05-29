import React, { type FC } from 'react';

const Good: FC<{ title: string }> = (props) => {
  const handler = () => {
    console.log('Good', props);
  };
  return <div onClick={handler}>Good: {props.title}</div>;
};

export default Good;

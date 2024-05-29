import React, { type FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Good: FC<{ title: string }> = (props) => {
  const handler = () => {
    console.log('Good', uuidv4(), props);
  };
  return <div onClick={handler}>Good: {props.title}</div>;
};

export default Good;

import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => {
  const handler = () => {
    console.log('Foo', props);
  };
  return <div onClick={handler}>Foo: {props.title}</div>;
};

export default Foo;

# Modal

This is an Modal example component.

```jsx
import { useModal } from 'ns-dumi';

export default () => {
  const { open } = useModal();
  return (
    <div onClick={() => open('This is a modal message')}>点击打开modal</div>
  );
};
```

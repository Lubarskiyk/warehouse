import { Button } from '@mui/material';

import { increment } from '../store/slice';
import { useAppDispatch, useAppSelector } from '../store';

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Home Page</h2>
      <p>Count: {count}</p>
      <Button variant="contained" onClick={() => dispatch(increment())}>Increment</Button>
    </div>
  );
}
import React from 'react';

const ReducerContext = () => {
  return (
    <div>
      <div className="w-[800px] flex flex-col gap-2">
        <h1>Reducer</h1>
        <p>
          Components with many state updates spread across many event handlers
          can get overwhelming. For these cases, you can consolidate all the
          state update logic outside your component in a single function, called
          a reducer.
        </p>
      </div>
    </div>
  );
};

export default ReducerContext;

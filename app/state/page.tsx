'use client';
import React, {useState} from 'react';

const EventPropagation = () => {
  return (
    <div
      onClick={() => alert('Clickeaste al padre')}
      className="flex gap-5 justify-center">
      <button
        className="border rounded-lg py-1 px-4 hover:opacity-90"
        onClick={() => alert('Click al botón pepe')}>
        Pepe
      </button>
      <button
        className="border rounded-lg py-1 px-4 hover:opacity-90"
        onClick={() => alert('Click al botón Sech')}>
        Sech
      </button>
    </div>
  );
};

const EventPropagationFix = () => {
  return (
    <div
      onClick={() => alert('Clickeaste al padre')}
      className="flex gap-5 justify-center">
      <button
        className="border rounded-lg py-1 px-4 hover:opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          alert('Click al botón pepe');
        }}>
        Pepe
      </button>
      <button
        className="border rounded-lg py-1 px-4 hover:opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          alert('Click al botón Sech');
        }}>
        Sech
      </button>
    </div>
  );
};

const Signup = () => {
  return (
    <form
      className="flex gap-2 justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Submitting!');
      }}>
      <input className="border-2" />
      <button className='className="border rounded-lg py-1 px-4 hover:opacity-90"'>
        Send
      </button>
    </form>
  );
};

const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number);
        }}>
        +5
      </button>
    </>
  );
};

const RespondingEvents = () => {
  return (
    <>
      <div className="flex flex-col gap-1 w-[400px]">
        <h3 className="text-center text-lg font-semibold">
          Propagación de eventos
        </h3>
        <p>
          Event handlers also catch events from any children your component
          might have, Is starts with where the event happened, and then goes up
          the tree
        </p>
        <EventPropagation />
        <p>
          Esto se soluciona evitando la propagación del componente hijo,
          e.stopPropagation()
        </p>
        <EventPropagationFix />
      </div>

      <div className="flex flex-col gap-1 w-[400px]">
        <h3 className="text-center text-lg font-semibold">
          Preventing default behavior
        </h3>
        <p>
          Some browser events have default behavior associated with them. For
          example, a form submit event, which happens when a button inside of it
          is clicked, will reload the whole page by default
        </p>
        <Signup />
      </div>

      <div className="flex flex-col gap-1 w-[400px] bg-orange-300 rounded-md p-2">
        <ul>
          <li>
            e.stopPropagation() stops the event handlers attached to the tags
            above from firing.
          </li>
          <li>
            e.preventDefault() prevents the default browser behavior for the few
            events that have it.
          </li>
        </ul>
      </div>
    </>
  );
};

const StateSnapshot = () => {
  return (
    <>
      <div className="flex flex-col gap-1 w-[400px]">
        <h3 className="text-center text-lg font-semibold">State as snapshot</h3>
        <p>
          “Rendering” means that React is calling your component, which is a
          function. The JSX you return from that function is like a snapshot of
          the UI in time. Its props, event handlers, and local variables were
          all calculated using its state at the time of the render.
        </p>
        <p>
          When React re-renders a component: React calls your function again,
          Your function returns a new JSX snapshot and React then updates the
          screen to match the snapshot you’ve returned.
        </p>

        <Counter />
        <div className="flex flex-col gap-1 w-[400px] bg-orange-300 rounded-md p-2">
          A state variable’s value never changes within a render, even if its
          event handler’s code is asynchronous. Inside that render’s onClick,
          the value of number continues to be 0 even after setNumber(number + 5)
          was called. Its value was “fixed” when React “took the snapshot” of
          the UI by calling your component.
        </div>

        <div className="bg-green-300">
          But what if you wanted to read the latest state before a re-render?
          You’ll want to use a state updater function, covered on the next page!
        </div>
      </div>
    </>
  );
};

const State = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <RespondingEvents />
        <StateSnapshot />
      </div>
    </div>
  );
};

export default State;

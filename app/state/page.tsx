'use client';
import React, {useState} from 'react';
import {initialTravelPlan} from './places';
import {initialTravelPlanNested} from './placesTwo';

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
      <div className="flex flex-col gap-1 w-[950px]">
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

      <div className="flex flex-col gap-1 w-[950px]">
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

      <div className="flex flex-col gap-1 w-[950px] bg-orange-300 rounded-md p-2">
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
      <div className="flex flex-col gap-1 w-[950px]">
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
        <div className="flex flex-col gap-1 w-[950px] bg-orange-300 rounded-md p-2">
          A state variable’s value never changes within a render, even if its
          event handler’s code is asynchronous. Inside that render’s onClick,
          the value of number continues to be 0 even after setNumber(number + 5)
          was called. Its value was “fixed” when React “took the snapshot” of
          the UI by calling your component.
        </div>

        <div className="bg-green-300">
          But what if you wanted to read the latest state before a re-render?
        </div>
      </div>
    </>
  );
};

const BatchesState = () => {
  return (
    <>
      <div className="flex flex-col gap-1 w-[950px]">
        <h3 className="text-center text-lg font-semibold">Batches in react</h3>
        <p>
          React waits until all code in the event handlers has run before
          processing your state updates.This might remind you of a waiter taking
          an order at the restaurant. A waiter doesn’t run to the kitchen at the
          mention of your first dish! Instead, they let you finish your order,
          let you make changes to it, and even take orders from other people at
          the table.
        </p>
        <p>
          It is an uncommon use case, but if you would like to update the same
          state variable multiple times before the next render, instead of
          passing the next state value like setNumber(number + 1), you can pass
          a function that calculates the next state based on the previous one in
          the queue, like setNumber(n =&gt; n + 1). It is a way to tell React to
          “do something with the state value” instead of just replacing it.
        </p>

        <CounterWithBatch />

        <div className="flex flex-col gap-1 w-[950px] bg-orange-300 rounded-md p-2">
          If you prefer more verbose code, another common convention is to
          repeat the full state variable name, like setEnabled(enabled =0&gt;
          !enabled), or to use a prefix like setEnabled(prevEnabled =&gt;
          !prevEnabled).
        </div>
      </div>
    </>
  );
};

const CounterWithBatch = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}>
        +3
      </button>
    </>
  );
};

const DeeplyNestedState = () => {
  return (
    <>
      <div className="flex flex-col gap-1 w-[950px]">
        <h3 className="text-center text-lg font-semibold">
          Avoid deeply nested state
        </h3>
        <p>
          Imagine a travel plan consisting of planets, continents, and
          countries. You might be tempted to structure its state using nested
          objects and arrays, like in this example:
        </p>

        <TravelPlanOne />

        <div className="flex flex-col gap-1 w-[950px] bg-orange-300 rounded-md p-2">
          Updating nested state involves making copies of objects all the way up
          from the part that changed. Deleting a deeply nested place would
          involve copying its entire parent place chain. Such code can be very
          verbose. If the state is too nested to update easily, consider making
          it “flat”. Here is one way you can restructure this data. Instead of a
          tree-like structure where each place has an array of its child places,
          you can have each place hold an array of its child place IDs. Then
          store a mapping from each place ID to the corresponding place.
        </div>

        <TravelPlanTwo />
      </div>
    </>
  );
};

function PlaceTreeOne({place}: any) {
  const childPlaces = place.childPlaces;

  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map((place) => (
            <PlaceTreeOne key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

function TravelPlanOne() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map((place) => (
          <PlaceTreeOne key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}

function PlaceTreeTwo({id, placesById}) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTreeTwo key={childId} id={childId} placesById={placesById} />
          ))}
        </ol>
      )}
    </li>
  );
}

function TravelPlanTwo() {
  const [plan, setPlan] = useState(initialTravelPlanNested);
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map((id) => (
          <PlaceTreeTwo key={id} id={id} placesById={plan} />
        ))}
      </ol>
    </>
  );
}
const State = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <RespondingEvents />
        <StateSnapshot />
        <BatchesState />
        <DeeplyNestedState />
      </div>
    </div>
  );
};

export default State;

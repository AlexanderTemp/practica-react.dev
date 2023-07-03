'use client';
import React, {useState, useEffect} from 'react';

/**
 *
 * Puntos a destacar:
 *  1. To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.
 * 2. JavaScript supports closures which means an inner function (e.g. handleClick) has access to variables and functions defined in a outer function (e.g. Board). The handleClick function can read the squares state and call the setSquares method because they are both defined inside of the Board function.
 * 3. Re render function problem: When you were passing onSquareClick={handleClick}, you were passing the handleClick function down as a prop. You were not calling it! But now you are calling that function right away—notice the parentheses in handleClick(0)—and that’s why it runs too early. You don’t want to call handleClick until the user clicks!
 * 4.  In React, it’s conventional to use onSomething names for props which represent events and handleSomething for the function definitions which handle those events.
 * 5. Inmutabilidad al reemplazar el array y no cambiarlo directamente:
 *    * Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later.
 *    * By default, all child components re-render automatically when the state of a parent component changes. This includes even the child components that weren’t affected by the change. Although re-rendering is not by itself noticeable to the user (you shouldn’t actively try to avoid it!), you might want to skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons. Immutability makes it very cheap for components to compare whether their data has changed or not. You can learn more about how React chooses when to re-render a component in the memo API reference.
 * 6. Keys tell React about the identity of each component, which allows React to maintain state between re-renders. If a component’s key changes, the component will be destroyed and re-created with a new state.
 * 6.1. It’s strongly recommended that you assign proper keys whenever you build dynamic lists. If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will report an error and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list’s items or inserting/removing list items. Explicitly passing key={i} silences the error but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.

* 7. In fact, always try to avoid redundant state. Simplifying what you store in state reduces bugs and makes your code easier to understand. 
 */

/**
 * FIXME: onClick back to move doesnt produce hydratation
 * FIXME: history reverse doesnt work in list
 */

type cellValue = 'X' | 'O' | null;

function calculateWinner(squares: cellValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // se toma toda una línea
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [toggleSort, setToggleSort] = useState<boolean>(false); // False by ascending
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: cellValue[]) {
    // se reinicia el historial desde el punto de retorno y se olvida lo que iba después del movimiento
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move # ' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move} className="w-full">
        {move === currentMove ? (
          <p className="text-lg ">
            You are at move:{' '}
            <span className="font-bold text-xl">{currentMove + 1}</span>
          </p>
        ) : (
          <button
            className="border text-lg rounded-sm hover:bg-slate-200 px-4 py-1 bg-slate-100"
            onClick={() => jumpTo(move)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  const movesInverse = history
    .slice()
    .reverse()
    .map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move # ' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move} className="w-full">
          {move === currentMove ? (
            <p className="text-lg ">
              You are at move:{' '}
              <span className="font-bold text-xl">{currentMove}</span>
            </p>
          ) : (
            <button
              className="border text-lg rounded-sm hover:bg-slate-200 px-4 py-1 bg-slate-100"
              onClick={() => jumpTo(move)}>
              {description}
            </button>
          )}
        </li>
      );
    });

  return (
    <div className="min-h-screen bg-sky-100 flex justify-center items-center">
      <div className="flex flex-col gap-4 bg-white shadow-md items-center p-7 rounded-md border">
        <div className="flex flex-col gap-4 items-center">
          <h2 className=" tracking-wide text-4xl font-semibold">
            Tic Tac Toe Game
          </h2>

          <div className="flex gap-2 justify-start">
            <button
              className="basis-1/5 relative w-[50px] h-[26px] items-center flex rounded-full bg-slate-500"
              onClick={() => setToggleSort(!toggleSort)}>
              <div
                role="button"
                className={
                  'absolute w-[20px] mx-1 h-[20px] rounded-full bg-white shadow-ms transition-all ease-in duration-150' +
                  (toggleSort && ' translate-x-[19px]')
                }
              />
            </button>

            <div className="basis-4/5 w-[180px]">
              {!toggleSort ? (
                <p className="text-slate-800 text-lg tracking-wide">
                  Orden Ascendente
                </p>
              ) : (
                <p className="text-slate-800 text-lg tracking-wide">
                  Orden Descendente
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-col sm:flex-row">
          <section className="flex h-fit flex-col border justify-center items-center">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </section>
          <section className="">
            <ol className="flex flex-col gap-1 w-full">
              {toggleSort && moves}
              {!toggleSort && movesInverse}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

interface BoardProps {
  xIsNext: boolean;
  squares: cellValue[] | null[];
  onPlay: Function;
}

const Board = ({xIsNext, squares, onPlay}: BoardProps) => {
  const handleButtonClick = (id: number) => {
    if (squares[id] || calculateWinner(squares)) {
      return;
    }
    const nextSquares: cellValue[] = squares.slice();
    if (xIsNext) {
      nextSquares[id] = 'X';
    } else {
      nextSquares[id] = 'O';
    }
    onPlay(nextSquares);
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + squares[winner[0]];
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="flex justify-center py-2">
        <h2 className="text-2xl">{status}</h2>
      </div>
      <div className="w-fit">
        {/* Componente Tic tac toe */}
        <div className=" grid grid-cols-3 bg-neutral-100  grid-rows-3">
          {squares?.map((elem, key) => {
            const find = winner?.find((x) => x === key) !== undefined;
            if (find) {
              console.log(winner);
              console.log(key);
            }
            return (
              <Square
                key={key}
                value={elem}
                id={key}
                winCell={find}
                handleClick={handleButtonClick}></Square>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface squareProps {
  id: number;
  value: string | null;
  handleClick: Function;
  winCell: boolean;
}
const Square = ({value, handleClick, id, winCell}: squareProps) => {
  return (
    <button
      onClick={() => handleClick(id)}
      className={`w-[75px] h-[75px] m-1 border rounded-md bg-white  transition-all duration-150 text-4xl font-bold ${
        winCell ? ' bg-yellow-100 cursor-auto' : ' hover:bg-neutral-100'
      }`}>
      {value}
    </button>
  );
};

export default TicTacToe;

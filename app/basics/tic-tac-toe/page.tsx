'use client';
import React, {useState} from 'react';

const TicTacToe = () => {
  const [arrayOfSquare, setArrayOfSquare] = useState<string[] | null[]>(
    Array(9).fill(null)
  );
  const handleButtonClick = (id: number) => {
    console.log(id);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Tic tac toe section */}
      <section className="flex flex-col border justify-center items-center shadow-md">
        <div className="flex justify-center">
          <h2>Turno de: X</h2>
        </div>
        <div className="w-fit">
          {/* Componente Tic tac toe */}
          <div className=" grid grid-cols-3  grid-rows-3">
            {arrayOfSquare?.map((elem, key) => (
              <Square
                key={key}
                value={key}
                handleClick={handleButtonClick}></Square>
            ))}
          </div>

          {/* Historial de movimientos de movimientos */}
          <div></div>
        </div>
      </section>
    </div>
  );
};

interface squareProps {
  value: number;
  handleClick: Function;
}
const Square = ({value, handleClick}: squareProps) => {
  const [valor, setValor] = useState<string>('');

  const handleInternalClick = () => {
    setValor('X');
  };

  return (
    <button
      onClick={handleInternalClick}
      className="py-3 px-4 border hover:bg-neutral-100 transition-all duration-150">
      {valor}
    </button>
  );
};

export default TicTacToe;

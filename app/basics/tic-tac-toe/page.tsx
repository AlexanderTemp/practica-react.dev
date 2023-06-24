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
    <div>
      {/* Tic tac toe section */}
      <section className="flex flex-col border shadow-md">
        <div className='flex justify-center'>
          <h2>Turno de: X</h2>
        </div>
        <div>
          {/* Componente Tic tac toe */}
          <div>
            {
              arrayOfSquare?.map((elemm, key)=>(
                <button key={key}>
                  
                </button>
              ))
            }
          </div>

          {/* Historial de movimientos de movimientos */}
          <div></div>
        </div>
      </section>
    </div>
  );
};

interface buttonProps {
  function: Function
  
}
const Button = () =>{
  return <button>
    
  </button>
}

export default TicTacToe;

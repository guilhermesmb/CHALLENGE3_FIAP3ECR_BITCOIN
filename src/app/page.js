'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import homeimage from './images/hospital.jpg';

export default function Home() {
  
  const [peso, setPeso] = useState(70);
  const [dosagemSelecionada, setDosagemSelecionada] = useState('sim');
  const [resultado, setResultado] = useState(null);

  const calcularDosagem = () => {
    
    let dosagem = 0;
    if (dosagemSelecionada === 'sim') {
      dosagem = peso * 1.5;
    } else if (dosagemSelecionada === 'nao') {
      dosagem = peso * 1;
    }
  
    dosagem = Math.floor(dosagem);
  
    setResultado(dosagem);
  };

  return (
    <div className="flex">
      <aside className="hidden lg:flex h-screen">
        <Image src={homeimage} className="h-auto w-auto object-cover" />
      </aside>
      <main className="flex flex-col justify-center items-center p-4 h-screen w-full">
        <h2 className="p-10 text-3xl">Dosagem para Tratamento da TEV</h2>

        <form className="flex flex-col gap-2">
          <label htmlFor="peso">Peso do Paciente (Kg)</label>
          <input
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            min={41}
            max={99}
            type="number"
            id="peso"
            className="bg-slate-600 p-1 rounded"
          />

          <label className="p-1" htmlFor="layout_sim">
            1,5 mg / kg - 24h
          </label>
          <input
            type="radio"
            id="layout_sim"
            name="layout"
            value="sim"
            checked={dosagemSelecionada === 'sim'}
            onChange={() => setDosagemSelecionada('sim')}
          />

          <label className="p-1" htmlFor="layout_nao">
            1 mg / kg - 12h
          </label>
          <input
            type="radio"
            id="layout_nao"
            name="layout"
            value="nao"
            checked={dosagemSelecionada === 'nao'}
            onChange={() => setDosagemSelecionada('nao')}
          />

          <button
            className="bg-red-800 p-2 rounded"
            type="button"
            onClick={calcularDosagem}
          >
            Calcular Dosagem
          </button>
        </form>

        {resultado !== null && (
          <div className="mt-4 flex  flex-col items-center">
            <p className='text-xl'>Resultado da Dosagem:</p>
            <p className='text-2xl'> Enoxaparina {resultado.toFixed(0)} mg</p>
          </div>
        )}
      </main>
    </div>
  );
}
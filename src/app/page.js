'use client'

import Image from "next/image";
import homeimage from "./images/hospital.jpg"
import { useState } from "react";

export default function Home() {

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
            defaultValue={70}
            min={41}
            max={99}
            type="number"
            id="peso"
            className="bg-slate-600 p-1 rounded" />

          <label className="p-1" htmlFor="layout_sim">1,5 mg / kg - 24h</label>
          <input
            type="radio"
            id="layout_sim"
            name="layout"
            value="sim" />
          

          <label className="p-1" htmlFor="layout_nao">1 mg / kg - 12h</label>
          <input
            type="radio"
            id="layout_nao"
            name="layout"
            value="nao" />

          <button className="bg-sky-800 p-2 rounded">Calcular Dosagem</button>

        </form>

      </main>
    </div>
  )
}

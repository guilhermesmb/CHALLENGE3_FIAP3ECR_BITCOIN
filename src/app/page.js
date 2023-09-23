'use client'

import jsPDF from 'jspdf';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import homeimage from './images/hospital.jpg';

export default function Home() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [erroCadastro, setErroCadastro] = useState('');

  const [peso, setPeso] = useState(70);
  const [dosagemSelecionada, setDosagemSelecionada] = useState('sim');
  const [resultado, setResultado] = useState(null);

  const cadastrarPaciente = () => {
    const paciente = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
    };

    fetch('http://localhost:3001/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    })
      .then((response) => {
        if (response.status === 201) {
          setCadastroSucesso(true);
          setErroCadastro('');
        } else {
          setCadastroSucesso(false);
          setErroCadastro('Erro ao cadastrar paciente.');
        }
      })
      .catch((error) => {
        setCadastroSucesso(false);
        setErroCadastro('Erro ao cadastrar paciente: ' + error.message);
      });
  };

  const gerarPdf = () => {
    // Crie um novo documento PDF
    const doc = new jsPDF();
  
    // Defina o título do PDF
    doc.text('Relatório de Dosagem', 10, 10);
  
    // Obtenha o CPF do paciente do formulário
    const cpfPaciente = document.getElementById('cpf_paciente').value;
  
    // Obtenha os dados do paciente correspondente ao CPF
    const pacienteSelecionado = require('db.json').pacientes.find((paciente) => paciente.cpf === cpfPaciente);
  
    if (pacienteSelecionado) {
      // Dados do paciente selecionado
      const { nome, cpf, data_nascimento } = pacienteSelecionado;
  
      // Calcula a dosagem com base nos valores atuais de peso e seleção de dosagem
      let dosagem = 0;
      if (dosagemSelecionada === 'sim') {
        dosagem = peso * 1.5;
      } else if (dosagemSelecionada === 'nao') {
        dosagem = peso * 1;
      }
      dosagem = Math.floor(dosagem);
  
      // Crie uma string com os dados do paciente selecionado e a dosagem
      const dadosPacienteSelecionado = `Nome: ${nome}\n`
        + `CPF do Paciente: ${cpf}\n`
        + `Data de Nascimento: ${data_nascimento}\n`
        + `Peso do Paciente: ${peso} Kg\n`
        + `Dosagem Necessária: ${dosagem} mg`;
  
      // Adicione os dados do paciente selecionado ao PDF
      doc.text(dadosPacienteSelecionado, 10, 30);
  
      // Salve o PDF com um nome específico (por exemplo, paciente.pdf)
      doc.save('paciente.pdf');
    } else {
      // Paciente não encontrado
      doc.text('Paciente não encontrado.', 10, 30);
      doc.save('paciente.pdf');
    }
  };
  

  useEffect(() => {
    if (cadastroSucesso) {
      setNome('');
      setCpf('');
      setDataNascimento('');
    }
  }, [cadastroSucesso]);

  return (
    <div className="flex">
      <aside className="hidden lg:flex h-screen">
        <Image src={homeimage} className="h-auto w-auto object-cover" alt='foto_medico'/>
      </aside>
      <main className="flex flex-col justify-center items-center p-4 h-screen w-full">
        <h2 className="p-10 text-3xl">Cadastro de Pacientes</h2>
        <form className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Paciente</label>
          <input
            type="text"
            id="nome"
            className="bg-slate-600 p-1 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            className="bg-slate-600 p-1 rounded"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label htmlFor="data_nascimento">Data de Nascimento</label>
          <input
            type="date"
            id="data_nascimento"
            className="bg-slate-600 p-1 rounded"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <button
            className="bg-red-800 p-2 rounded"
            type="button"
            onClick={cadastrarPaciente}
          >
            Cadastrar Paciente
          </button>
        </form>

        {cadastroSucesso && <p>Cadastro realizado com sucesso!</p>}
        {erroCadastro && <p>{erroCadastro}</p>}

        <h2 className="p-10 text-3xl">Dosagem para Tratamento da TEV</h2>
        <form className="flex flex-col gap-2">
          <label htmlFor="cpf_paciente">CPF do Paciente</label>
          <input
            type="text"
            id="cpf_paciente"
            className="bg-slate-600 p-1 rounded"
          />

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

          <label htmlFor="layout_sim">1,5 mg / kg - 24h</label>
          <input
            type="radio"
            id="layout_sim"
            name="layout"
            value="sim"
            checked={dosagemSelecionada === 'sim'}
            onChange={() => setDosagemSelecionada('sim')}
          />

          <label htmlFor="layout_nao">1 mg / kg - 12h</label>
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
          onClick={() => {
            gerarPdf();
          }}
        >
          Gerar Dosagem Necessária e PDF
        </button>
        </form>
      </main>
    </div>
  );
}

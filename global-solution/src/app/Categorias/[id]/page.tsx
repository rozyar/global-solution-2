"use client";
import ExerciseCard from "@/components/ExerciseCard/ExerciseCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Exercicio() {
  const router = useRouter();
  const [Exercicios, setExercicios] = useState([]);
  let { id } = useParams<{ id: string }>();
  let realId = parseInt(id);
  console.log(id);

  useEffect(() => {
    // Verificar se o objeto está presente na sessionStorage
    const authData = sessionStorage.getItem("authData");

    if (!authData) {
      // Se não estiver presente, redirecionar para a página de login
      router.push("/");
    }

    // Marcar que a verificação foi concluída
  }, []);

  const handleSubmit = async (exercicioData: {
    nome: string;
    descricao: string;
    repeticoes: string;
    series: string;
    nivel: string;
  }) => {
    console.log("Dados do exercício:", exercicioData);
    const authDataString = sessionStorage.getItem("authData") || "";
    const authData = JSON.parse(authDataString) as {
      usuario: { id: number };
    } | null;

    const usuarioId = authData?.usuario.id;
    try {
      const response = await axios.post(
        `http://localhost:3001/usuarios/${usuarioId}/plano-de-treino`,
        exercicioData
      );

      console.log(
        "Exercício adicionado com sucesso ao plano de treino:",
        response.data
      );
      // Faça o que for necessário com a resposta (por exemplo, atualizar o estado, mostrar uma mensagem)
    } catch (error: any) {
      console.error(
        "Erro ao adicionar exercício ao plano de treino:",
        error.response?.data || error.message
      );
      // Lide com o erro de acordo com suas necessidades
    }
  };

  useEffect(() => {
    const fetchExercices = async () => {
      try {
        const exercises = await axios.get(
          `http://localhost:3001/categorias/${realId}/exercicios`
        );
        setExercicios(exercises.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExercices();
  }, []);

  return (
    <div className="bg-slate-700 h-full w-full">
      <Header />
      <div className="mt-24 md:mt-28 lg:mt-32 w-full"></div>
      <h1 className="text-xl font-sora font-bold text-center text-white md:text-2xl lg:text-3xl mt-10">
        Exercicio na Categoria:
      </h1>
      <div className="flex mt-18 mb-10 w-full h-full items-center justify-center flex-col lg:flex-row lg:flex-wrap">
        {Exercicios.map((ex: any) => {
          return (
            <div key={ex.id}>
              <ExerciseCard
                nome={ex.nome}
                desc={ex.descricao}
                rep={ex.repeticoes}
                series={ex.series}
                nivel={ex.nivel}
                handle={() =>
                  handleSubmit({
                    nome: ex.nome,
                    descricao: ex.descricao,
                    repeticoes: ex.repeticoes,
                    series: ex.series,
                    nivel: ex.nivel,
                  })
                }
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

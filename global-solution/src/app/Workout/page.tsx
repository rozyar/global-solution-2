"use client";

import ExerciseCardRemove from "@/components/ExerciseCardRemove/ExerciseCardRemove";
import Header from "@/components/Header/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Workout() {
  const [planoDeTreino, setPlanoDeTreino] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const router = useRouter();
    // Verificar se o objeto está presente na sessionStorage
    const authData = sessionStorage.getItem("authData");

    if (!authData) {
      // Se não estiver presente, redirecionar para a página de login
      router.push("/");
    }

    // Marcar que a verificação foi concluída
  }, []);
  useEffect(() => {
    // Função assíncrona para buscar o plano de treino
    const fetchPlanoDeTreino = async () => {
      const authDataString = sessionStorage.getItem("authData") || "";
      const authData = JSON.parse(authDataString) as {
        usuario: { id: number };
      } | null;

      const usuarioId = authData?.usuario.id;
      try {
        const response = await axios.get(
          `http://localhost:3001/usuarios/${usuarioId}/plano-de-treino`
        );
        setPlanoDeTreino(response.data);
      } catch (error) {
        console.error("Erro ao obter o plano de treino:", error);
      } finally {
        setLoading(false); // Marca o carregamento como concluído, independentemente do resultado
      }
    };

    fetchPlanoDeTreino();
  }, []);
  const handleExcluir = async (exercicioId: any) => {
    const authDataString = sessionStorage.getItem("authData") || "";
    const authData = JSON.parse(authDataString) as {
      usuario: { id: number };
    } | null;

    const usuarioId = authData?.usuario.id;

    try {
      // Substitua a URL abaixo pela URL correta do seu backend
      await axios.delete(
        `http://localhost:3001/usuarios/${usuarioId}/plano-de-treino/${exercicioId}`
      );

      // Após a exclusão, faz uma nova requisição para atualizar o conteúdo
      const response = await axios.get(
        `http://localhost:3001/usuarios/${usuarioId}/plano-de-treino`
      );
      setPlanoDeTreino(response.data);

      console.log("Exercício excluído com sucesso.");
      // Faça o que for necessário com a resposta (por exemplo, atualizar o estado, mostrar uma mensagem)
    } catch (error: any) {
      console.error(
        "Erro ao excluir exercício do plano de treino:",
        error.response?.data || error.message
      );
      // Lide com o erro de acordo com suas necessidades
    }
  };

  return (
    <>
      <Header />
      <div className="flex mt-24 w-full"></div>
      <h1 className="text-xl font-sora font-bold text-center text-white md:text-2xl lg:text-3xl mt-10">
        Workout
      </h1>
      <div className="flex mt-18 mb-10 w-full h-full items-center justify-center flex-col lg:flex-row lg:flex-wrap">
        {planoDeTreino.map((ex: any) => {
          return (
            <div key={ex.id}>
              <ExerciseCardRemove
                nome={ex.nome}
                desc={ex.descricao}
                rep={ex.repeticoes}
                series={ex.series}
                nivel={ex.nivel}
                handle={() => handleExcluir(ex.id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoriasCard from "@/components/CategoryCard/CategoryCard";

export default function Categorias() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Verificar se o objeto está presente na sessionStorage
    const authData = sessionStorage.getItem("authData");

    if (!authData) {
      // Se não estiver presente, redirecionar para a página de login
      router.push("/");
    }

    // Marcar que a verificação foi concluída
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        let response = await axios.get("http://localhost:3001/categorias");
        setCategorias(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    console.log(categorias);
  }, [categorias]);

  return (
    <>
      <Header />
      <div className="flex mt-24 w-full"></div>

      {authChecked && (
        <>
          <h1 className="text-xl font-sora font-bold text-center text-white md:text-2xl lg:text-3xl mt-10">
            Categorias de Execicios
          </h1>
          <div className="flex w-full justify-center items-center mt-10 flex-wrap">
            {categorias.map((cat: any) => {
              const categoriaCapitalizada =
                cat.categoria.charAt(0).toUpperCase() + cat.categoria.slice(1);
              return (
                <Link href={`/Categorias/${cat.id}`}>
                  {" "}
                  <CategoriasCard
                    key={cat.id}
                    nome={categoriaCapitalizada}
                  />{" "}
                </Link>
              );
            })}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

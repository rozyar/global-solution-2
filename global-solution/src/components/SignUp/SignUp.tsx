import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!nome || !email || !password) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Substitua a URL abaixo pela URL correta do seu backend
      const response = await axios.post("http://localhost:3001/usuarios", {
        nome: nome,
        email: email,
        senha: password,
      });

      console.log("Usuário cadastrado com sucesso:", response.data);
      // Faça o que for necessário com a resposta (por exemplo, redirecionar o usuário)
    } catch (error: any) {
      console.error(
        "Erro ao cadastrar usuário:",
        error.response?.data || error.message
      );
      // Lide com o erro de acordo com suas necessidades
    }
    router.push("/");
  };

  return (
    <>
      <div className="flex w-full items-center justify-center h-screen bg-dark-gray md:w-1/3">
        <div className="flex items-start justify-center w-80 h-33-75 md:h-45 lg:w-[28.125rem] ">
          {/* Logo */}
          <div className="flex flex-col justify-center items-center ">
            <Image
              className="md:w-24 lg:w-28"
              src={"/logo.svg"}
              width={75}
              height={0}
              alt="logo"
            ></Image>
            <h1 className="select-none text-white text-3xl -mt-5 font-vina font-light lg:text-4xl">
              CoreCraft
            </h1>

            {/* Login Form */}

            <form className="flex flex-col items-center" action="#post">
              <h1 className="select-none text-white font-sora font-bold mt-16 text-2xl lg:text-3xl">
                Registrar
              </h1>
              <p className="text-gray-700 text-xs font-sora mt-2 lg:text-sm">
                Já possui uma conta?{" "}
                <Link className="text-[#ebc400] underline" href={"/"}>
                  Login
                </Link>{" "}
              </p>
              <input
                className=" text-center font-sora text-sm w-60 h-8 mt-12 rounded-md border-2 border-[#ebc400] md:text-base md:h-9 lg:w-72"
                type="nome"
                placeholder="Digite seu nome"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />

              <input
                className="text-center font-sora text-sm w-60 h-8 rounded-md border-2 border-[#ebc400] mt-6 md:text-base md:h-9 lg:w-72"
                type="email"
                placeholder="Digite sua email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                className="text-center font-sora text-sm w-60 h-8 rounded-md border-2 border-[#ebc400] mt-6 md:text-base md:h-9 lg:w-72"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                className="w-40 h-7 mt-8 rounded-md bg-[#ebc400] text-slate-700 font-sora font-semibold lg:w-44 lg:h-9"
                type="submit"
                onClick={handleSubmit}
              >
                Registrar
              </button>

              <p className="select-none text-xs text-gray-700 w-60 mt-12 lg:text-sm lg:w-72 ">
                Ao se inscrever, você concorda com nossos{" "}
                <span className="underline">Termos</span> e{" "}
                <span className="underline">Política de Privacidade.</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

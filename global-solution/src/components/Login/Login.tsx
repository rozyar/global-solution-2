import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [lista, setLista] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuarios");
        setLista(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    console.log(lista);
  }, [lista]);

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    // Verificar se o email e senha correspondem a um usuário na lista
    const usuario = lista.find(
      (u: any) =>
        u.email.toLowerCase() === email.toLowerCase() && u.senha === password
    );

    if (usuario) {
      // Gerar um token aleatório de 8 dígitos
      const token = Math.random().toString(36).substr(2, 8);

      // Criar objeto com token e informações do usuário
      const authData = {
        token: token,
        usuario: usuario,
      };

      // Armazenar na sessionStorage
      sessionStorage.setItem("authData", JSON.stringify(authData));

      // Redirecionar para a página de Categorias
      router.push("/Categorias");

      console.log(authData); // Objeto com token e informações do usuário
    } else {
      alert("Credenciais inválidas");
    }
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

            <form className="flex flex-col items-center">
              <h1 className="select-none text-white font-sora font-bold mt-16 text-2xl lg:text-3xl">
                Login
              </h1>
              <p className="text-gray-700 text-xs font-sora mt-2 lg:text-sm">
                Ainda não possui uma conta?{" "}
                <Link className="text-[#ebc400] underline" href={"/Registro"}>
                  Registrar
                </Link>{" "}
              </p>
              <input
                className=" text-center font-sora text-sm w-60 h-8 mt-12 rounded-md border-2 border-[#ebc400] md:text-base md:h-9 lg:w-72"
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                className="text-center font-sora text-sm w-60 h-8 rounded-md border-2 border-[#ebc400] mt-6 md:text-base md:h-9 lg:w-72"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                className="w-40 h-7 mt-8 rounded-md bg-[#ebc400] text-slate-700 font-sora font-semibold lg:w-44 lg:h-9"
                type="button"
                onClick={async () => await handleSubmit()}
              >
                Login
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

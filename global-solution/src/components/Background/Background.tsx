export default function Background() {
  return (
    <>
      <div className="hidden md:flex w-2/3 h-screen justify-center items-center bg-[url('/calistenia.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="flex items-center justify-center w-full h-64 backdrop-blur-md ">
          <h1 className="text-white font-sora font-semibold text-xl lg:text-3xl w-2/3">
            Aqui você é o treinador. Explore categorias, escolha exercícios, e
            construa o treino perfeito para alcançar seus objetivos.
          </h1>
        </div>
      </div>
    </>
  );
}

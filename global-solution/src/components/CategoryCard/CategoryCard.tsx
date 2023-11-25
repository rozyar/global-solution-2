export default function CategoriasCard(props: any) {
  return (
    <>
      <div
        key={props.key}
        className="flex items-center justify-center w-64 bg-white h-24 rounded-md m-5"
      >
        <h1 className="font-sora text-xl text-black font-bold">{props.nome}</h1>
      </div>
    </>
  );
}

export default function Footer() {
  const names = [
    "Razyel Ferrari",
    "Rayzor Anael",
    "Derick Araújo",
    "Kalel Schlichting",
    "Phablo Santos",
  ];

  return (
    <>
      <div className="flex fixed bottom-0 left-0 w-full h-20 bg-dark-gray">
        <div className="flex justify-center items-center w-full">
          {names.map((name, index) => (
            <p key={index} className="text-white mx-2">
              {name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

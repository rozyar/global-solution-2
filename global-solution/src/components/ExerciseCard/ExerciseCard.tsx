import axios from "axios";

const ExerciseCard = (props: any) => {
  return (
    <div className="w-[22.19rem] md:w-[30rem] lg:w-[35rem] mt-10 lg:m-10">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex h-full items-center">
          <div className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/120"
              alt="Exercício"
              className="w-20 h-20 md:w-[7.5rem] md:h-[7.5rem] object-cover rounded"
            />
          </div>
          <div className="flex flex-col md:justify-center ml-4">
            <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-2">
              {props.nome}
            </h3>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl">
              {props.desc}
            </p>
            <p className="text-gray-600 mt-2 md:text-lg lg:text-xl">
              Repetições: {props.rep} | Series: {props.serie}
            </p>
            <p className="text-gray-600 mt-2 md:text-lg lg:text-xl">
              Nível: {props.nivel}
            </p>
            <button
              onClick={props.handle}
              className="text-sm md:text-base lg:text-lg mt-4 w-43 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Adicionar ao Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;

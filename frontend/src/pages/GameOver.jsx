import { useParams, Link } from "react-router-dom";

function GameOver() {
  const { status, level } = useParams();

  const messages = {
    win: {
      title: "Congratulations!",
      text: "You survived the horde and cleared the level!",
      bgColor: "bg-green-600",
    },
    lose: {
      title: "Game Over!",
      text: "The zombies got you. Try again!",
      bgColor: "bg-red-600",
    },
  };

  const levelNames = {
    level1: "The Outskirts",
    level2: "Forest of the Dead",
    level3: "The City Ruins",
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1
        className={`text-5xl font-extrabold drop-shadow-lg ${
          messages[status]?.bgColor || "bg-gray-700"
        } p-4 rounded-lg animate__animated animate__fadeIn`}
      >
        {messages[status]?.title || "Unknown Outcome"}
      </h1>
      <p className="mt-4 text-lg font-medium text-gray-300 drop-shadow-md animate__animated animate__fadeIn animate__delay-1s">
        {messages[status]?.text || "Something went wrong..."}
      </p>
      <p className="mt-2 text-xl text-yellow-400 animate__animated animate__fadeIn animate__delay-2s">
        Level: {levelNames[level] || "Unknown"}
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 p-4 rounded-lg text-white text-2xl font-bold shadow-2xl hover:bg-blue-700 transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
      >
        Play Again
      </Link>

      <div className="absolute bottom-10 flex justify-center w-full">
        <span className="text-gray-400 text-sm">Don't give up, survivor!</span>
      </div>
    </div>
  );
}

export default GameOver;

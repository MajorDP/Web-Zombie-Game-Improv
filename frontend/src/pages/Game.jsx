import { useState } from "react";
import { Link } from "react-router-dom";
import level1 from "../assets/level1.png";
import level2 from "../assets/level2.png";
import level3 from "../assets/level3.png";
const Game = () => {
  const [selectedLevel, setSelectedLevel] = useState({
    label: "",
    link: "",
  });

  const levels = [
    {
      name: "Level 1: The Outskirts",
      description:
        "A calm start. Zombies are slow and easy to defeat. Perfect for beginners.",
      imageUrl: level1,
      link: "level1",
    },
    {
      name: "Level 2: Forest of the Dead",
      description:
        "A dense forest filled with fast and aggressive zombies. More challenging!",
      imageUrl: level2,
      link: "level2",
    },
    {
      name: "Level 3: The City Ruins",
      description:
        "A destroyed city with fast zombies and tons of obstacles. High difficulty.",
      imageUrl: level3,
      link: "level3",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-md">
        Choose Your Level
      </h1>
      <p className="mt-4 text-lg font-medium text-gray-300 drop-shadow-sm">
        Select a level to start your zombie-killing adventure!
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {levels.map((level, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-600 cursor-pointer"
            onClick={() =>
              setSelectedLevel({ link: level.link, label: level.name })
            }
          >
            <div
              className="relative h-56 w-full rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${level.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            </div>
            <h2 className="text-2xl font-bold text-center mt-4">
              {level.name}
            </h2>
            <p className="text-sm text-center text-gray-300 mt-2">
              {level.description}
            </p>
          </div>
        ))}
      </div>

      {selectedLevel.link && (
        <div className="mt-8 text-center flex flex-col">
          <p className="text-lg text-gray-300">
            You selected: {selectedLevel.label}
          </p>
          <Link
            to={`/game/${selectedLevel.link}`}
            className="mt-4 bg-green-600 p-4 rounded-lg text-white text-xl font-semibold shadow-2xl hover:bg-green-700 transition-colors duration-300"
          >
            Start {selectedLevel.label}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Game;

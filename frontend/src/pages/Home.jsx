import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold text-green-400 drop-shadow-lg animate__animated animate__fadeIn animate__delay-1s">
        Zombie Shooter
      </h1>
      <p className="mt-4 text-lg font-medium text-gray-300 drop-shadow-md animate__animated animate__fadeIn animate__delay-2s">
        A thrilling 3D zombie shooting game! Survive and take down the horde.
      </p>

      <div className="mt-8 flex justify-center animate__animated animate__fadeIn animate__delay-3s">
        <img
          src="https://imgcdn.stablediffusionweb.com/2024/8/16/2b1b7ef0-c2d0-4bf7-b3ee-d7c68dc1ade8.jpg"
          alt="Zombie Illustration"
          className="w-40 h-40 rounded-full shadow-lg"
        />
      </div>

      <Link
        to="/login"
        className="mt-8 bg-green-600 p-6 rounded-lg text-white text-2xl font-bold shadow-2xl hover:bg-green-700 transform transition duration-300 hover:scale-105"
      >
        Start Game
      </Link>

      <div className="absolute bottom-10 flex justify-center w-full">
        <span className="text-gray-400 text-sm">
          Press 'Start' to join the fight!
        </span>
      </div>
    </div>
  );
}

export default Home;

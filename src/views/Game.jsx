import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext.jsx";
import { jwtDecode } from "jwt-decode";

const Game = () => {
    const socket = useContext(SocketContext);
    const { gameId } = useParams();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const user = jwtDecode(sessionStorage.getItem("token"));

        socket.emit("joinGame", { gameId, user });

        socket.on("updatePlayers", (playersList) => {
            setPlayers(playersList);
        });

        return () => {
            socket.off("updatePlayers");
        };
    }, [gameId, socket]);

    return (
        <div style={{ height: "calc(100vh - 64px)" }} className="dark:bg-gray-900">
            {!!sessionStorage.getItem("token") && (
                <div className="dark:text-white text-black h-screen max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 flex flex-col items-center">
                    <p className="text-2xl">Partie numéro : <span className="font-bold">{gameId}</span></p>
                    <div className="mt-6">
                        <h3 className="text-lg font-bold">Joueurs dans la partie :</h3>
                        <ul>
                            {players.map((player) => (
                                <li key={player.id} className="text-indigo-500 font-semibold">
                                    {player.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
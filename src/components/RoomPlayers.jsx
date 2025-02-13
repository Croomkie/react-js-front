import {useContext, useEffect, useMemo, useState} from "react";
import { SocketContext } from "../context/SocketContext.jsx";
import {jwtDecode} from "jwt-decode";

const RoomPlayers = ({ gameId }) => {
    const socket = useContext(SocketContext);
    const [players, setPlayers] = useState([]);

    const token = sessionStorage.getItem("token");
    const user = useMemo(() => (token ? jwtDecode(token) : null), [token]);

    useEffect(() => {
        if (!socket || !token || !user) return;

        // On émet l'événement pour rejoindre la room (si ce n'est pas déjà fait ailleurs)
        socket.emit("joinGame", {
            gameId, user
        });

        // On écoute l'événement "updatePlayers" pour mettre à jour la liste des joueurs en temps réel
        socket.on("updatePlayers", (playersList) => {
            setPlayers(playersList);
        });

        return () => {
            socket.off("updatePlayers");
        };
    }, [socket, gameId]);

    return (
        <div>
            <h3 className="text-lg font-bold">Joueurs dans la partie :</h3>
            <ul>
                {players.map((player) => (
                    <li key={player.id} className="text-indigo-500 font-semibold">
                        {player.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomPlayers;

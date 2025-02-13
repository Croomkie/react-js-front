import {useEffect, useState} from "react";

const GameHistory = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://35.181.93.121:3000/games", {
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("token")}`}
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Données reçues :", data);
                if (Array.isArray(data)) {
                    setGames(data);
                } else if (data.games && Array.isArray(data.games)) {
                    setGames(data.games);
                } else {
                    console.error("La réponse n'est pas un tableau :", data);
                    setGames([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des parties", err);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return <p>Chargement des parties...</p>;
    }

    if (games.length === 0) {
        return <p>Aucune partie trouvée.</p>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Historique des parties</h2>
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="border p-2">Game ID</th>
                    <th className="border p-2">État</th>
                    <th className="border p-2">Créateur (Player1)</th>
                    <th className="border p-2">Player2</th>
                    <th className="border p-2">Gagnant</th>
                    <th className="border p-2">Score du gagnant</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game) => (
                    <tr key={game.id}>
                        <td className="border p-2 break-words">{game.id}</td>
                        <td className="border p-2">{game.state}</td>
                        <td className="border p-2">
                            {game.player1 ? game.player1.username : "N/A"}
                        </td>
                        <td className="border p-2">
                            {game.player2 ? game.player2.username : "N/A"}
                        </td>
                        <td className="border p-2">
                            {game.winPlayer ? game.winPlayer.username : "N/A"}
                        </td>
                        <td className="border p-2">
                            {game.winnerScore != null ? game.winnerScore : "N/A"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameHistory;

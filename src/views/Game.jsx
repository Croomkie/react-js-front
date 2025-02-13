import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useMemo } from "react";
import { SocketContext } from "../context/SocketContext.jsx";
import { jwtDecode } from "jwt-decode";
import RoomPlayers from "../components/RoomPlayers.jsx"; // Assurez-vous que le chemin est correct

const Game = () => {
    const socket = useContext(SocketContext);
    const { gameId } = useParams();
    const [quiz, setQuiz] = useState({
        started: false,
        topic: null,
        currentQuestion: null,
        ended: false,
    });
    const [scores, setScores] = useState({});

    const token = sessionStorage.getItem("token");
    const user = useMemo(() => (token ? jwtDecode(token) : null), [token]);


    useEffect(() => {
        if (!socket || !token || !user) return;
        console.log("Joueur actuel 2", user);
        // Rejoindre la room et demander l'état actuel
        socket.emit("joinGame", { gameId, user });
        console.log("Rejoindre la partie", gameId);

        socket.emit("getGameState", { gameId });

        socket.on("gameState", (state) => {
            if (state.quiz) setQuiz(state.quiz);
            if (state.scores) setScores(state.scores);
        });

        // Événements du quiz
        socket.on("quizStarted", ({ topic, question }) => {
            setQuiz({ started: true, topic, currentQuestion: question, ended: false });
        });
        socket.on("nextQuestion", ({ question }) => {
            setQuiz((prev) => ({ ...prev, currentQuestion: question }));
        });
        socket.on("answerResult", ({ scores }) => {
            setScores(scores);
        });
        socket.on("quizEnded", ({ scores }) => {
            setQuiz((prev) => ({ ...prev, ended: true }));
            setScores(scores);
        });

        return () => {
            socket.off("gameState");
            socket.off("quizStarted");
            socket.off("nextQuestion");
            socket.off("answerResult");
            socket.off("quizEnded");
        };
    }, [socket, gameId, token, user]);

    // Fonction pour lancer le quiz
    const handleStartQuiz = () => {
        socket.emit("startQuiz", { gameId });
    };

    // Envoi de la réponse choisie
    const handleAnswer = (answer) => {
        socket.emit("submitAnswer", { gameId, answer, userId: user.id });
    };

    return (
        <div style={{ height: "calc(100vh - 64px)" }} className="dark:bg-gray-900">
            {token && (
                <div className="dark:text-white text-black h-screen max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 flex flex-col items-center">
                    <p className="text-2xl">
                        Partie numéro : <span className="font-bold">{gameId}</span>
                    </p>

                    {/* Affichage dynamique des joueurs */}
                    <div className="mt-6">
                        <RoomPlayers gameId={gameId} />
                    </div>

                    {/* Bouton pour lancer le quiz */}
                    {!quiz.started && (
                        <div className="mt-6">
                            <button
                                onClick={handleStartQuiz}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                                Lancer le Quiz
                            </button>
                        </div>
                    )}

                    {/* Interface du quiz en cours */}
                    {quiz.started && !quiz.ended && quiz.currentQuestion && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold">Quiz sur {quiz.topic.name}</h2>
                            <p className="mt-4">{quiz.currentQuestion.question}</p>
                            <ul className="mt-4 grid grid-cols-2 gap-2">
                                <li>
                                    <button
                                        onClick={() => handleAnswer("A")}
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        {quiz.currentQuestion.answerA}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleAnswer("B")}
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        {quiz.currentQuestion.answerB}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleAnswer("C")}
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        {quiz.currentQuestion.answerC}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleAnswer("D")}
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        {quiz.currentQuestion.answerD}
                                    </button>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <h4 className="font-bold">Scores en temps réel :</h4>
                                <ul>
                                    {Object.entries(scores).map(([uid, score]) => (
                                        <li key={uid}>
                                            {uid}: {score}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Affichage final du quiz */}
                    {quiz.ended && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold">Le quiz est terminé !</h2>
                            <div className="mt-4">
                                <h4 className="font-bold">Scores finaux :</h4>
                                <ul>
                                    {Object.entries(scores).map(([uid, score]) => (
                                        <li key={uid}>
                                            {uid}: {score}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;

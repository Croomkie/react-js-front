import {Button, Transition} from "@headlessui/react";
import {jwtDecode} from "jwt-decode";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Icon from '@mdi/react';
import {mdiCloseCircle, mdiClose} from '@mdi/js';
import {SocketContext} from "./context/SocketContext.jsx";

function App() {
    const socket = useContext(SocketContext);

    const [show, setShow] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const createParty = function () {
        const userId = jwtDecode(sessionStorage.getItem("token")).id
        fetch('http://localhost:3000/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                userId: userId
            })
        }).then(async (data) => {
            const {gameId} = await data.json();
            socket.emit("join", gameId);
            navigate(`/game/${gameId}`);
        })
    }

    return (
        <div style={{height: "calc(100vh - 64px)"}} className="dark:bg-gray-900">
            {
                !!sessionStorage.getItem("token") &&
                <div className="h-screen max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 flex">
                    <div
                        className="w-1/2 flex items-center justify-center border-r border-gray-300 dark:border-gray-700">
                        <Button
                            onClick={createParty}
                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors text-center">
                            Créer une partie
                        </Button>
                    </div>
                    <div className="w-1/2 flex flex-col gap-y-4 justify-center items-center">
                        <p className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 text-center mt-6">
                            Rejoindre une partie
                        </p>
                        <Formik
                            initialValues={{partyCode: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                                const userId = jwtDecode(sessionStorage.getItem("token")).id
                                fetch(`http://localhost:3000/game/join/${values.partyCode}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                                    },
                                    body: JSON.stringify({userId: userId})
                                }).then(async (data) => {
                                    const gameData = await data.json()
                                    if (gameData?.id) {
                                        // Rejoindre la room
                                        socket.emit("join", gameData.id);
                                        navigate(`/game/${gameData.id}`)
                                    } else {
                                        if (gameData.statusCode == 500) {
                                            setError("Le code ne correspond à aucune partie")
                                        } else {
                                            setError(gameData.error)
                                        }
                                        setShow(true)
                                        setTimeout(() => {
                                            setShow(false)
                                        }, 5000)
                                    }
                                })
                            }}
                        >
                            {({values, handleChange, handleBlur, handleSubmit}) => (
                                <form onSubmit={handleSubmit} className="flex gap-x-4">
                                    <input
                                        id="partyCode"
                                        name="partyCode"
                                        type="text"
                                        value={values.partyCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        placeholder="Entrez l'id de la partie"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                    />
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                                        >
                                            Rejoindre
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            }
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition show={show}>
                        <div
                            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Icon path={mdiCloseCircle} size={1} className="text-red-500"/>
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Erreur</p>
                                        <p className="mt-1 text-sm text-gray-500">{error}</p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">Close</span>
                                            <Icon path={mdiClose} size={1}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    );
}

export default App;

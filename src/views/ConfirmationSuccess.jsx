import { Link } from "react-router-dom";

export default function ConfirmationSuccess() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 text-center mt-6">
                    Votre email a été validé !
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Merci d'avoir confirmé votre adresse email. Vous pouvez maintenant profiter de toutes nos fonctionnalités.
                </p>
                <Link to="/login">
                    <button
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                    >
                        Se connecter
                    </button>
                </Link>
            </div>
        </div>
    );
}

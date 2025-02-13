import { Formik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAlert } from '@mdi/js';
import {useState} from "react";

export default function Login() {
    const location = useLocation()
    const navigate = useNavigate();
    const goTo = (route) => {
        navigate(route);
    };

    const [error,setError] = useState("")

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <Link to={'/'}>
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                </Link>
                <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 text-center mt-6">Se
                    connecter</h2>
                {
                    location.state?.email && <div className="rounded-md bg-yellow-50 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Icon path={mdiAlert} size={1} className="h-5 w-5 text-yellow-400"/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">Confirmé votre e-mail</h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        Un e-mail vous a été envoyé à {location.state.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !!error && <div className="rounded-md bg-red-50 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Icon path={mdiAlert} size={1} className="h-5 w-5 text-red-400"/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Champ requis';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Adresse email invalide';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                        fetch('http://35.181.93.121:3000/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values)
                        }).then(async (data) => {
                            const token = await data.json();
                            if(token?.token){
                                goTo("/");
                                window.location.reload();
                                sessionStorage.setItem("token", token.token);
                            } else {
                                console.log(token)
                                setError(token.error)
                            }
                        });
                    }}
                >
                    {({values, handleChange, handleBlur, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email"
                                       className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Adresse
                                    email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    autoComplete="email"
                                    placeholder="Entrez votre adresse email"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password"
                                       className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Mot de
                                    passe</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Entrez votre mot de passe"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                                >
                                    Se connecter
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

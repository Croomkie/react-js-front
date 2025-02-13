import { Formik } from "formik";
import {Link, useNavigate} from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const goTo = (route,email) => {
        navigate(route,{state:{email:email}});
    };

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
                <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 text-center mt-6">Inscription</h2>
                <Formik
                    initialValues={{ lastname: '', firstname: '', email: '', username: '', password: '' }}
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
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                        fetch('http://35.181.93.121:3000/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values)
                        }).then(() => {
                            goTo("/login",values.email);
                        });
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="lastname" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Nom</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Entrez votre nom"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="firstname" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Prénom</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={values.firstname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Entrez votre prénom"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Entrez votre email"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Entrez un nom d'utilisateur"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Entrez un mot de passe"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignupForm;

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react';
import Icon from '@mdi/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const tokenIsValid = !!sessionStorage.getItem("token");

const logout = function () {
    sessionStorage.removeItem("token");
    window.location.reload();
};

const toggleDarkMode = function () {
    const isDarkMode = sessionStorage.getItem("darkMode") === "true";
    sessionStorage.setItem("darkMode", !isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
};

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Vérifiez le mode sombre au premier rendu
    useEffect(() => {
        const darkMode = sessionStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }, []);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        setIsDarkMode(prev => !prev); // Inverser l'état local
    };

    return (
        <Disclosure as="nav" className="bg-white shadow dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Icon path={mdiMenu} size={1} className="block h-6 w-6 group-data-[open]:hidden"/>
                            <Icon path={mdiClose} size={1} className="hidden h-6 w-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to={'/'}>
                                <p className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-200 text-center mt-6">Home</p>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            tokenIsValid ?
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton
                                            className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:ring-offset-gray-800">
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none dark:bg-gray-700 dark:ring-gray-600"
                                    >
                                        <MenuItem>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                                Your Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                                Settings
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a onClick={logout}
                                               className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                                                Sign out
                                            </a>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                                :
                                <div className="items-center gap-x-4 hidden md:flex">
                                    <Link
                                        to={'/login'}
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors text-center"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        to={'/register'}
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors text-center"
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                        }
                    </div>
                    <button onClick={handleToggleDarkMode} className="ml-4">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 pb-4 pt-2">
                    <DisclosureButton
                        as="a"
                        href="#"
                        className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 dark:bg-indigo-600 dark:text-white dark:border-indigo-500"
                    >
                        Dashboard
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="#"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:border-gray-500"
                    >
                        Team
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="#"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:border-gray-500"
                    >
                        Projects
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="#"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:border-gray-500"
                    >
                        Calendar
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Disclosure } from "@headlessui/react";
import { LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Notenliste from "./notenliste/notenliste";
import Stundenplan from "./stundenplan/stundenplan";
import Dashboard from "./dashboard/dashboard";

export default function Wrapper() {
  const [menuItem, setMenuItem] = useState(0);

  const navigation = [
    { name: "Dashboard", menuItem: 0 },
    { name: "Noten", menuItem: 1 },
    { name: "Stundenplan", menuItem: 2 },
  ];

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <button
                            onClick={function () {
                              return setMenuItem(item.menuItem);
                            }}
                            key={item.name}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white
                                                            px-3 py-2 rounded-md text-sm font-medium"
                            aria-current="page"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        onClick={() => signOut()}
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">Logout</span>
                        <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current="page"
                    >
                      <button onClick={() => setMenuItem(item.menuItem)}>
                        {item.name}
                      </button>
                    </Disclosure.Button>
                  ))}
                  <button
                    onClick={() => signOut()}
                    type="button"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    <span className="sr-only">Logout</span>
                    <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {navigation.at(menuItem).name}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {(function () {
              if (menuItem === 0) {
                return <Dashboard />;
              } else if (menuItem === 1) {
                return <Notenliste />;
              } else if (menuItem === 2) {
                return <Stundenplan />;
              } else {
                return <span>Neither</span>;
              }
            })()}
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}

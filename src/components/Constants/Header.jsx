import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineSearch } from 'react-icons/hi'

const Header = ({pathname}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Издөө..."
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-400 rounded-md pl-11 pr-4"
          />
        </div>
      {/* <div className="">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    "url(https://play-lh.googleusercontent.com/ovs12dBUb8TXzqhqB1TSTZDYFwN4XJZco18VfvNVAteIFQ2yNgCo-IgdCpxIcZbrnSk)",
                }}
              >
                <span className="sr-only">Umra Service</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/profile")}
                  >
                    Профиль
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/settings")}
                  >
                    Настройка
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/login ")}
                  >
                    Чыгуу
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div> */}
    </div>
  );
};

export default Header;

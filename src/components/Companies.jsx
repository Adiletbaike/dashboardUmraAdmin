import { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit, CiLogout } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import DialogDelete from "./Modals/DialogDelete";
import { FaKaaba } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import CustomAxios from "../axios/customAxios";
import Loader from "./Constants/Louder";

const Companies = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  // Table
  const [companies, setCompanies] = useState([]);
  const [companyData, setCompanyData] = useState({
    isEdit: false,
    data: {
      id: "",
      name: "",
      username: "",
      password: "",
    },
  });
  console.log(companyData);
  const navigate = useNavigate();
  const customAxios = CustomAxios();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isAuth") == "true") {
      if (companies.length === 0) {
        getAllCompanies();
      }
    } else {
      navigate("/login");
    }
  }, []);

  const getAllCompanies = async () => {
    customAxios({
      method: "get",
      url: "company",
    })
      .then((res) => {
        setCompanies((prev) => {
          return res.data.map((item) => {
            return {
              id: item.id,
              name: item.companyName,
              username: item.username,
              password: item.password,
            };
          });
        });
        setIsLoad(false);
      })
      .catch((rej) => {
        alert(rej.message);
        setCompanies([]);
        setIsLoad(false);
      });
  };

  // Add new group
  const addCompanyHandler = async (e) => {
    e.preventDefault();
    customAxios({
      method: "post",
      url: "company",
      data: JSON.stringify({
        name: companyData.data.name,
        username: companyData.data.username,
        password: companyData.data.password,
      }),
    })
      .then((res) => {
        setCompanies(() => {
          return res.data.map((item) => {
            return {
              id: item.id,
              name: item.companyName,
              username: item.username,
              password: item.password,
            };
          });
        });
        setCompanyData({
          isEdit: false,
          data: {
            id: "",
            name: "",
            username: "",
            password: "",
          },
        });
        setShowModal(false);
        toast.success("Успешно добавлено!!!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((rej) => {
        alert(rej.message);
        setCompanies([]);
      });
  };

  // Delete
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const [delCompanyId, setDelCompanyId] = useState(0);

  const areYouSureDelete = async (choose) => {
    if (choose) {
      try {
        await customAxios({
          method: "delete",
          url: `company/${delCompanyId}`,
        });
        getAllCompanies();
        toast.error("Успешно удалено!!!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#fff", // Set your desired background color
          },
        });
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setIsShowDialogModalWin(false);
        setDelCompanyId(0);
      }
    } else {
      setIsShowDialogModalWin(false);
    }
  };

  // Edit group data
  const editCompanyDataHandler = (e) => {
    e.preventDefault();

    customAxios({
      method: "put",
      url: `company/${companyData.data.id}`,
      data: JSON.stringify({
        name: companyData.data.name,
        username: companyData.data.username,
        password: companyData.data.password,
      }),
    })
      .then((res) => {
        setCompanies(() => {
          return companies.map((item) => {
            if (item.id === res.data.id) {
              return {
                id: item.id,
                name: res.data.companyName,
                username: res.data.companyLogin,
                password: res.data.companyPassword,
              };
            } else {
              return item;
            }
          });
        });
        setCompanyData({
          isEdit: false,
          data: {
            id: "",
            name: "",
            username: "",
            password: "",
          },
        });
        setShowModal(false);
        toast.info("Успешно обновлено!!!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((rej) => {
        alert(rej.message);
        setCompanies([]);
      });
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between gap-2 px-5 py-8 border-b border-neutral-700 bg-black">
        <button className="flex gap-5">
          <FaKaaba fontSize={28} color="yellow" />
          <span className="text-neutral-100 text-lg font-bold">Умра</span>
        </button>
        <button
          className="flex items-center gap-2 bg-orange-400 rounded-lg px-3 py-1"
          onClick={() => {
            localStorage.setItem("isAuth", false);
            localStorage.setItem("token", "");
            navigate("/login");
          }}
        >
          <CiLogout color="yellow" />
          <span className="text-white text-sm font-normal">Выход</span>
        </button>
      </div>
      <div className="bg-white p-4">
        <ToastContainer />
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h3 className="text-xl font-bold">Компании</h3>
          <button
            className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
            onClick={() => {
              setCompanyData((prev) => {
                return {
                  ...prev,
                  data: {
                    id: "",
                    name: "",
                    username: "",
                    password: "",
                  },
                };
              });
              setShowModal(true);
            }}
          >
            <IoMdAdd />
            Добавить
          </button>
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="py-6 px-6 lg:px-8 text-left">
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                Компания
              </h3>
              <form
                className="space-y-3"
                action="#"
                onSubmit={
                  companyData.isEdit
                    ? editCompanyDataHandler
                    : addCompanyHandler
                }
              >
                <div>
                  <label
                    htmlFor="groups"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Название компании
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Название"
                    value={companyData.data.name}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    onChange={(e) =>
                      setCompanyData((prev) => {
                        return {
                          ...prev,
                          data: { ...prev.data, name: e.target.value },
                        };
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="groups"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Логин
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Логин"
                    value={companyData.data.username}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    onChange={(e) =>
                      setCompanyData((prev) => {
                        return {
                          ...prev,
                          data: { ...prev.data, username: e.target.value },
                        };
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Пароль
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={companyData.data.password}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    onChange={(e) =>
                      setCompanyData((prev) => {
                        return {
                          ...prev,
                          data: { ...prev.data, password: e.target.value },
                        };
                      })
                    }
                  />
                </div>
                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {companyData.isEdit ? 'Обновить' : 'Сохранить'}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className="flex flex-col pt-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {isLoad ? (
                  <Loader />
                ) : companies.length === 0 ? (
                  <div className="p-7 flex justify-center">
                    <button
                      className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                      onClick={() => {
                        setCompanyData((prev) => {
                          return {
                            ...prev,
                            data: {
                              id: "",
                              name: "",
                            },
                          };
                        });
                        setShowModal(true);
                      }}
                    >
                      <IoMdAdd />
                      Добавить
                    </button>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          №
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Компании ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Название компании
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Логин
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Пароль
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Действие
                        </th>

                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companies.map((company, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-200 duration-300"
                        >
                          <td className="px-6 py-4 ">
                            <div className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 ">
                            <div className="text-sm font-medium text-gray-900">
                              {company.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 w-full">
                            <div className="text-sm font-medium text-gray-900">
                              {company.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 w-full">
                            <div className="text-sm font-medium text-gray-900">
                              {company.username}
                            </div>
                          </td>
                          <td className="px-6 py-4 w-full">
                            <div className="text-sm font-medium text-gray-900">
                              {company.password}
                            </div>
                          </td>
                          <td className=" flex px-6 py-6  gap-2 border-none text-right text-2xl items-center font-medium">
                            <button
                              onClick={() => {
                                setCompanyData({
                                  isEdit: true,
                                  data: {
                                    ...company,
                                  },
                                });
                                setShowModal(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <CiEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                setIsShowDialogModalWin(true);
                                setDelCompanyId(company.id);
                              }}
                            >
                              <RiDeleteBin5Line />
                            </button>
                            {isShowDialogModalWin && (
                              <DialogDelete
                                onDialog={areYouSureDelete}
                                message={"Вы уверены?"}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;

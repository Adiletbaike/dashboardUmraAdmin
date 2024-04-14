import React, { useEffect, useState } from "react";
import {CiEdit, CiLogout } from "react-icons/ci";
import { FaKaaba } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Modal from "./Modals/Modal";
import CustomAxios from "../axios/customAxios";
import { IoArrowBack } from "react-icons/io5";
import Loader from "./Constants/Louder";
import { RiDeleteBin5Line } from "react-icons/ri";
import DialogDelete from "./Modals/DialogDelete";
import Select from "react-select";  

const initialAdminData = {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    gender: "MALE",
    username: "",
    password: "",
}

const languages = [
    { label: "KG", value: "KG" },
    { label: "RU", value: "RU" },
    { label: "KZ", value: "KZ" },
    { label: "UZ", value: "UZ" },
    { label: "EN", value: "EN" },
    { label: "TR", value: "TR" },
  ];

export default function CompanyAdmins(){

    const {companyName, companyId} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const customAxios = CustomAxios();
    const navigate = useNavigate()
    const [isLoad, setIsLoad] = useState(true);
    
    const [admins, setAdmins] = useState([]);
    const [adminData, setAdminData] = useState({...initialAdminData});

    const [adminLanguage, setAdminLanguage] = useState('KG');

    useEffect(()=>{
        if(localStorage.getItem('isAuth')=='true'){
            if(admins.length==0){
                getAllAdmins();
            }
        }else{
            navigate('/login');
        }
        
    }, [])

    const getAllAdmins = ()=>{
        customAxios({
            method : "get",
            url: `company/${companyId}/admins`
        })
        .then(res=>{
            setAdmins(res.data);
            setIsLoad(false);
        })
        .catch(rej=>{
            alert(err.response.data.message);
        })
    }

    const logoutHandler = ()=>{
        try{
            localStorage.setItem('isAuth', false);
            localStorage.setItem('token', '');
        }catch(err){
            alert(err.response.data.message);
        }finally{
            navigate('/login')
        }
    }

    // add new admin
    const addAdminHandler = (e)=>{
        e.preventDefault();
        const {id, ...data} = adminData;
        customAxios({
            method: "post",
            url: `company/${companyId}/admin`,
            data: JSON.stringify({
                ...data,
                companyId: companyId,
            })
        })
        .then(res=>{
            getAllAdmins()
            setAdminData({...initialAdminData})
            setAdminLanguage("");
            setShowModal(false);
            toast.success("Ийгиликтүү сакталды!!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        })
        .catch(rej=>{
            alert(rej.message);
        })
    }
    
    //Delete
    const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
    const [delAdminId, setDelAdminId] = useState(0);

    const areYouSureDelete = async(choose) => {
      if (choose) {
        try{
            await customAxios({
                method: "delete",
                url: `company/${companyId}/admin/${delAdminId}`,
              });
              getAllAdmins();
              toast.error("Ийгиликтүү өчүрүлдү!!!", {
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
              setIsShowDialogModalWin(false)
        }catch(err){
            alert(err.response.data.message);
        }finally{
            setDelAdminId(0)
        }
      } else {
        setIsShowDialogModalWin(false)
      }
    };

    // Edit admin data
    const editAdminDataHandler = async (e)=>{
        e.preventDefault();
        const {id, ...data} = adminData;
        customAxios({
            method: "put",
            url: `company/${companyId}/admin/${id}`,
            data: JSON.stringify({...data, companyId: companyId,})
        })
        .then(res=>{
            getAllAdmins()
            setAdminData({...initialAdminData})
            setShowModal(false);
            toast.success("Ийгиликтүү өзгөртүлдү!!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        })
        .catch(rej=>{
            alert(rej.message);
        })
    }

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between gap-2 px-5 py-8 border-b border-neutral-700 bg-black">
            <button className="flex gap-5">
                <FaKaaba fontSize={28} color="yellow" />
                <span className="text-neutral-100 text-lg font-bold">{companyName}</span>
            </button>
            <button className="flex items-center gap-2 bg-orange-400 rounded-lg px-3 py-1"
                onClick={logoutHandler}
            >
                <CiLogout color="yellow" />
                <span className="text-white text-sm font-normal">Чыгуу</span>
            </button>
        </div>
            <div className="bg-white p-4">
                <ToastContainer />
                <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                    <button
                        className="flex justify-end items-center text-lg rounded-lg border p-1 bg-gray-300"
                        onClick={()=>navigate('/')}
                    >
                        <IoArrowBack />
                        Back
                    </button>
                    <button
                    className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                    onClick={() => {setShowModal(true);}}>
                        <IoMdAdd />
                        Жаңы кошуу
                    </button>
                    <Modal isVisible={showModal} onClose={() => {
                        setAdminData({...initialAdminData});
                        setShowModal(false);
                    }}>
                        <div className="py-6 px-6 lg:px-8 text-left">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Компания</h3>
                            <form
                                className="space-y-3"
                                action="#"
                                onSubmit={isEdit ? editAdminDataHandler : addAdminHandler}
                            >
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Аты
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Аты"
                                    value={adminData.firstName}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, firstName: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Фамилия"
                                    value={adminData.lastName}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, lastName: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Телефон
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Телефон"
                                    value={adminData.phoneNumber}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, phoneNumber: e.target.value}})}
                                />
                            </div>

                            {isEdit?
                            "":
                            <div className="w-full">
                                <label
                                htmlFor="language"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Тил
                                </label>
                                <Select
                                    defaultValue={adminLanguage!=""?{label:adminLanguage, value: adminLanguage}:""}
                                    options={languages}
                                    onChange={(value) => setAdminLanguage(value.value)}
                                />
                            </div>}

                            <div className="w-full">
                                <label
                                htmlFor="admin-gender"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                Gender
                                </label>
                                <Select
                                    defaultValue={adminData.gender && adminData.gender!=""?{label: adminData.gender, value: adminData.gender}:""}
                                    options={[{label: "MALE", value: "MALE"}, {label: "FEMALE", value: "FEMALE"}]}
                                    onChange={(value) =>{
                                        setAdminData((prev) => { return {...prev, gender: value.value}});
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="birthday"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Birthday
                                </label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={adminData.birthday}
                                    id="birthday"
                                    placeholder="Birthday"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) => {
                                        setAdminData((prev) => {
                                            return {...prev, birthday: e.target.value.replace(/\//, '-')};
                                        });
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label
                                    htmlFor="groups"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={adminData.username}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, username: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Пороль
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Пороль"
                                    value={adminData.password}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, password: e.target.value}})}
                                />
                            </div>
                            <div className="flex justify-end pt-5">
                                <button
                                    type="submit"
                                    className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Сактоо
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
                        {
                            isLoad?
                            <Loader/>:
                            admins.length===0?
                            <div className="p-7 flex justify-center">
                                <button
                                    className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                                    onClick={() => {setShowModal(true);}}>
                                        <IoMdAdd />
                                        Жаңы кошуу
                                    </button>
                            </div>:
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            №
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Аты фамилиясы
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Телефон
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Birthday
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Gender
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Username
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Password
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Control
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {admins.map((admin, index) => (
                                    <tr key={index} className="hover:bg-gray-200 duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.firstName.concat(" ", admin.lastName)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.birthday}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.gender}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.username}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.password}
                                            </div>
                                        </td>
                                        <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                                        <button
                                            onClick={() => {
                                                setAdminData({...admin})
                                                setIsEdit(true);
                                                setShowModal(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                        <CiEdit />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsShowDialogModalWin(true);
                                                setDelAdminId(admin.id);
                                            }}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <RiDeleteBin5Line />
                                        </button>
                                        {isShowDialogModalWin && (
                                            <DialogDelete
                                            onDialog={areYouSureDelete}
                                            message={"Чындап өчүрүүнү каалайсызбы?"}
                                            />
                                        )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
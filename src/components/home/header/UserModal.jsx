import React from "react";
import { LiaEditSolid, LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { BiSpreadsheet } from "react-icons/bi";
import { Blog } from "../../../context/Context";
import { Link } from "react-router-dom";
import { secretEmail } from "../../../utils/helper";

const UserModal = ({setModal}) => {
  const { currentUser } = Blog();
  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${currentUser?.uid}`,
    },
    {
      title: "Library",
      icon: <MdOutlineLocalLibrary />,
      path: "/library",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <HiOutlineChartBar />,
      path: "/stats",
    },
  ];
  return (
    <section className='absolute p-6 bg-white shadows rounded-md z-50 text-gray-500 right-0 w-[18rem] top-[100%]'>
      <Link
        to={"/write"}
        className='flex md:hidden items-center gap-3 text-gray-500'
      >
        <span className='text-3xl'>
          <LiaEditSolid />
        </span>
        <span className='text-sm mt-2'>Write</span>
      </Link>
      <div className='flex flex-col gap-4 border-b border-gray-500 pb-5'>
        {userModal.map((link, i) => (
          <Link
            onClick={() => setModal(false)}
            className='flex items-center gap-2 text-gray-500 hover:text-black/700'
            to={link.path}
          >
            <span className='text-2xl'>{link.icon}</span>
            <h2 className='text-md'>{link.title}</h2>
          </Link>
        ))}
      </div>
      <button className='flex flex-col pt-5 cursor-pointer hover:text-black/70'>
        Sign Out
        <span className='text-sm'>{secretEmail(currentUser?.email)}</span>
      </button>
    </section>
  );
};

export default UserModal;

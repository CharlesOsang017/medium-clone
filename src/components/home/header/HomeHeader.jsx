import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsMedium } from "react-icons/bs";
import Search from "../Search";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";
import { CiSearch } from "react-icons/ci";
import { Blog } from "../../../context/Context";
import Loading from "../../loading/Loading";

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { allUsers, userLoading, currentUser, setPublish } = Blog();

  const {pathname} = useLocation()
  console.log(pathname)

  const getUserData = allUsers.find((user) => user.id === currentUser?.uid);
  return (
    <header className='border-b border-gray-200'>
      {userLoading && <Loading />}
      {/* left side */}
      <div className='size flex items-center justify-between h-[60px]'>
        <div className='flex items-center gap-3'>
          <Link to={"/"}>
            <span className='text-5xl'>
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>
        <div className='flex items-center gap-3 sm:gap-7'>
          {/* right side */}
          <div className='flex items-center gap-3 sm:gap-7'>
            <span
              onClick={() => setSearchModal(true)}
              className='flex sm:hidden text-3xl text-gray-300 cursor-pointer'
            >
              <CiSearch />
            </span>
            {pathname === '/write' ? <button onClick={()=> setPublish(true)} className="btn !bg-green-700 !py-1 !text-white !rounded-full">Publish</button> : (
              <Link
              to='/write'
              className='hidden md:flex items-center gap-1 text-gray-500'
            >
              <span className='text-3xl'>
                <LiaEditSolid />
              </span>
              <span className='text-sm mt-2'>Write</span>
            </Link>
            )}
            <span className='text-3xl text-gray-500 cursor-pointer'>
              <IoMdNotificationsOutline />
            </span>
            <div className='flex items-center relative'>
              <img
                onClick={() => setModal(true)}
                src={getUserData?.userImg ? getUserData?.userImg : '/profile.webp'}
                alt='profile-img'
                className='w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer'
              />
              <span className='text-gray-500 cursor-pointer'>
                <MdKeyboardArrowDown />
              </span>
              <Modal modal={modal} setModal={setModal}>
                <div
                  className={`${
                    modal ? "visible opacity-100%" : "invisible opacity-0"
                  } transition-all duration-300`}
                >
                  <UserModal setModal={setModal} />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;

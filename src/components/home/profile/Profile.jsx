import { useState } from "react";
import ProfileHome from "./activities/ProfileHome";
import ProfileLists from "./activities/ProfileLists";
import ProfileAbout from "./activities/ProfileAbout";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import { discoverActions } from "../../../data";
import EditProfile from "./EditProfile";
import { Blog } from "../../../context/Context";
import { useParams } from "react-router-dom";

const Profile = () => {
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "Lists",
      comp: ProfileLists,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { allUsers } = Blog();
  const { userId } = useParams();

  const getUserData = allUsers.find((user) => user.id === userId);
  // console.log(getUserData)
  return (
    <section className='size flex relative gap-[4rem]'>
      {/* users activities */}
      <div className='mt-[9rem] flex-[2]'>
        <div className='flex items-end gap-4'>
          <h2 className='text-3xl sm:text-5xl font-bold capitalize'>
            {getUserData?.username}
          </h2>
          <p className='text-gray-500 text-xs sm:text-sm'>Followers(10)</p>
          <p className='text-gray-500 text-xs sm:text-sm'>Followings(10)</p>
        </div>
        <div className='flex items-center gap-5 border-b border-gray-300 mt-[1rem] mb-[3rem]'>
          {activities.map((item, i) => (
            <div
              key={i}
              className={`py-[0.5rem] ${
                item.title === currentActive.title
                  ? "border-b border-gray-500"
                  : ""
              }`}
            >
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp
          getUserData={getUserData}
          setEditModal={setEditModal}
        />
      </div>
      {/* open sidebar profile in small screens */}

      <button
        onClick={() => setModal(true)}
        className='fixed to-[8rem] right-0 w-[2rem] grid place-items-center h-[2rem] md:hidden text-xl'
      >
        <IoSettingsSharp />
      </button>
      {/* user details */}
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`border-l border-gray-300 z-10 flex-[1] p-[2rem]
        fixed right-0 md:relative bottom-0 top-0 w-[18rem] bg-white ${
          modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
        } transition-all duration-500`}
        >
          {/* icon to close out modal */}
          <div className='pb-4 text-right'>
            <button
              onClick={() => setModal(false)}
              className='inline-block md:hidden'
            >
              <LiaTimesSolid />
            </button>
          </div>
          {/* profile details */}
          <div className='sticky top-7 flex flex-col justify-between'>
            <img
              src={getUserData?.userImg || '/profile.webp'   }
              alt='profile-img'
              className='w-[3.5rem] h-[3.5] object-cover rounded-full'
            />
            <h2 className='py-2 font-bold capitalize'>
              {getUserData?.username}
            </h2>
            <p className='text-gray-500 first-letter:uppercase text-sm'>
              {getUserData?.bio}
            </p>
            <button
              onClick={() => setEditModal(true)}
              className='hover:underline text-green-700 pt-6 text-sm w-fit'
            >
              Edit Profile
            </button>
            {/* nav */}
            <div className='flex items-center flex-wrap gap-3 pt-8 flex-[1]'>
              {discoverActions.map((item) => (
                <button key={item} className='text-xs text-black1'>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {editModal && (
        <EditProfile editModal={editModal} setEditModal={setEditModal} getUserData={getUserData}/>
      )}
    </section>
  );
};

export default Profile;

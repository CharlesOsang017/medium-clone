import Modal from "../../utils/Modal"
import Follow from "./userToFollow/Follow"
import Posts from '../common/posts/Posts'


const Home = () => {
  return (
   <section className="size flex relative gap-[5rem]">
    <div className="py-10 flex-[2] mb-[4rem]">
      <Posts />
    </div>
    <div className="hidden md:inline-block py-7 border-1 border-gray-300 md:w-[21rem]">
      <h3>Who to follow</h3>
      <Follow />
    </div>
   </section>
  )
}

export default Home
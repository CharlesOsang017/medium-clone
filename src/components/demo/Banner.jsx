import React from 'react'

const Banner = () => {
  return (
    <div className="bg-banner border-b border-black">
        <div className="size flex flex-col items-start py-[5rem] gap-[1rem]">
            <h1 className="font-title text font-normal text-[3rem] sm:text-[4rem] md:tex-[6rem]">
                Stay curious
            </h1>
            <p className="w-full font-medium leading-7 md:w-[31rem] text-[1.3rem] md:text-[1.3rem]">
                Discover stories, thinking, and expertise from writers on any topic
            </p>
            <button className="btn bg-black1 rounded-full text-white !text-[1.2rem] !px-[6] !mt-[2.5rem]">Start Reading</button>
        </div>
    </div>
  )
}

export default Banner
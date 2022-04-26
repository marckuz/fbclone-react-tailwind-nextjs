import React from 'react'
import StoryCard from './StoryCard';

const stories = [
    {
        name: "Mark Elbambo",
        src: "https://firebasestorage.googleapis.com/v0/b/fb-nextjs-tailwind.appspot.com/o/prof.jpg?alt=media&token=47ee7079-76b8-4087-a22b-984819945f56",
        profile: "https://firebasestorage.googleapis.com/v0/b/fb-nextjs-tailwind.appspot.com/o/stor.jpg?alt=media&token=1ef10eb3-ce47-46c1-a4ff-dcdcf217f2d8"
    },
    {
        name: "Elon Musk",
        src: "https://links.papareact.com/4zn",
        profile: "https://links.papareact.com/kxk"
    },
    {
        name: "Jeff Bezoz",
        src: "https://links.papareact.com/k2j",
        profile: "https://links.papareact.com/f0p"
    },
    {
        name: "Mark Zuckerberg",
        src: "https://links.papareact.com/xql",
        profile: "https://links.papareact.com/snf"
    },
    {
        name: "Bill Gates",
        src: "https://links.papareact.com/4u4",
        profile: "https://links.papareact.com/4u4"
    },
];

function Stories() {
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
        {stories.map((story) => (
            <StoryCard 
                key={story.src}
                name={story.name}
                src={story.src}
                profile={story.profile}
            />
        ))}
    </div>
  )
}

export default Stories

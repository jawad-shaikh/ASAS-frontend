import Image from 'next/image';
import React from 'react'
import { Icon } from './common/Icons';

const ReviewCard = () => {
    return (
        <div className='flex flex-col gap-4 mt-6'>
            <div className='flex items-center gap-4'>
                <Image src="/preview.png" width={30} height={30} alt="user image" className='rounded-full h-[40px] w-[40px] object-cover' />
                <h3 className='font-medium text-sm'>Nicole</h3>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                </div>
                <p className="font-thin text-sm">5.0 (120)</p>
            </div>
            <div>
                <p>Loved: </p>
                <p>My daughter felt like she was falling behind her advanced math class peers. I could tell she needed a few things clarified and needed some low-pressure help that wasn&apos;t me. The instructor here explained things very well and she left the tutoring session feeling super confident - after only 30 minutes! Since the sawyer session, she has told me about some nice math wins at school. Knowing the tutoring is there for her if needed in the future is powerful too!</p>
            </div>

            <div>
                <p>Improvements: </p>
                <p>nothing - this was extremely valuable and we&apos;re so thankful it was offered without a long-term commitment. I&apos;m sure we&apos;ll be back!</p>
            </div>
        </div>
    )
}

export default ReviewCard;
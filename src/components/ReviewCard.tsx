import Image from 'next/image';
import React from 'react'
import { Icon } from './common/Icons';

const ReviewCard = ({review}: any) => {
    return (
        <div className='flex flex-col gap-4 mt-6'>
            <div className='flex items-center gap-4'>
                <img src={review.parent.profilePicture} width={30} height={30} alt="user image" className='rounded-full h-[40px] w-[40px] object-cover' />
                <h3 className='font-medium text-sm'>{review.parent.fullName}</h3>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                </div>
                <p className="font-thin text-sm">{review.rating}</p>
            </div>
            <div>
                <p>Loved: </p>
                <p>{review.loved}</p>
            </div>

            <div>
                <p>Improvements: </p>
                <p>{review.improvements}</p>
            </div>
        </div>
    )
}

export default ReviewCard;
import Image from 'next/image';
import React from 'react';
import { Icon } from './common/Icons';
import { Product } from '@/types';
import { formatDate, formatTime } from '@/utils/helper';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, thumbnailPicture, title, averageRating, numberOfRatings, ageRangeStart, ageRangeEnd, activityStartDate, activityStartTime, activityEndTime, activityEndDate } = product;


  return (
    <Link href={`/${id}`} className='block rounded-md shadow-md'>
      <Image src={'/thumbnail.png'} height={260} width={400} alt={`${title} image`} className='w-full min-h-[200px] object-cover' />
      <div className='p-4'>
        <p className='font-thin flex items-center gap-2 mb-2'>
          <Icon.star />
         <span className='mt-1'> {averageRating} ({numberOfRatings}) </span>
        </p>
        <h3 className='font-medium text-xl mb-2 truncate'>{title}</h3>
        <p className='font-thin mb-4'>Age {ageRangeStart} - {ageRangeEnd} Years</p>
        <p className='font-medium text-primary'>{formatDate(activityStartDate)}, {formatTime(activityStartTime)} - {formatDate(activityEndDate)}, {formatTime(activityEndTime)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

'use client'
import { getAllOrders, giveReview } from "@/api";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/common/Button";
import ModalWrapper from "@/components/common/ModalWrapper";
import products from "@/constant/siteInfo";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [orderDetailId, setOrderDetailId] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [loved, setLoved] = useState('');
  const [improvements, setImprovement] = useState('');

  const handleRatingChange = (value: any) => {
    setRating(value);
  };

  const handleReviewChange = (event: any) => {
    setImprovement(event.target.value);
  };

  const handleLovedChange = (event: any) => {
    setLoved(event.target.value);
  };


  const getData = async () => {
    const { data } = await getAllOrders();
    setData(data.data);
  }

  const addReview = async () => {

    // Check if rating, loved, and improvement are provided
    if (!rating || !loved || !improvements) {
      toast.error('Please provide rating, loved, and improvements before submitting the review');
      return;
  }

    const ident = toast.loading('Loading...');
    try {
      const data = await giveReview(id, orderDetailId, {rating,loved, improvements});
      setOpen(false);
      toast.success('Review Added', { id: ident });
      getData()
    } catch (error: any) {
      toast.success(error.response.data.error, { id: ident });
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <main className="container pb-10 sm:pb-20 md:pb-[104px]">
      <h1 className="font-medium text-3xl text-center my-12">Order History</h1>

      <section className="flex flex-col gap-10 max-w-[600px] mx-auto">
        {
        data.length> 0 ?  data?.map((item: any, i:any) => {
            return item?.OrderDetail?.map(({ activity, hasGivenReview }: any) => (
              <div key={activity.id} className="flex items-center gap-8 relative">
                <img src={item.proofOfPayment} height={100} width={100} alt={`${activity.id} image`} className="object-cover h-[100px] w-[100px] rounded-2xl" />
                <div>
                  <h2 className="font-medium text-xl">{activity.title}</h2>
                  <p className="mt-2 text-sm text-primary">Age {activity.ageRangeStart} - {activity.ageRangeEnd} years</p>
                  <p className="font-medium my-1 text-sm">{formatDate(activity.activityStartDate)} - {formatDate(activity.activityEndDate)}</p>
                  {/* <p className="text-primary">Activity Schedule</p> */}
                </div>
                {(!hasGivenReview && item.isApproved === "APPROVE") && <button className="text-primary absolute top-4 right-4" onClick={() => {
                  setId(activity.id)
                  setOrderDetailId(item.id)
                  setOpen(true)}}>Leave a review</button>}
              </div>
            ))
          }) : <EmptyState />
        }
      </section>

      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="bg-white p-6 rounded-xl max-w-[30rem]">
          <p>Please rate</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className="text-xl mx-1"
              style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
              onClick={() => handleRatingChange(value)}
            >
              ★
            </span>
          ))}

          <input type="text" value={loved}
            onChange={handleLovedChange} placeholder="Loved" className={`mt-8 block bg-transparent border-b w-full pb-2 outline-none border-border`} />

          <textarea
            value={improvements}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            rows={4}
            cols={50}
            className={`mt-4 block bg-transparent border-b w-full pb-2 outline-none border-border`}
          />

          <Button onClick={addReview} className="mt-4">Add Review</Button>
        </div>
      </ModalWrapper>
    </main>
  );
}

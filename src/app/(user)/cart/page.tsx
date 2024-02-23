'use client'
import Button from "@/components/common/Button";
import { useCartStore } from "@/store";
import { calculateItemPrices, calculateTotalPrice, formatDate, formatTime } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function UserPage() {
  const { items, removeFromCart } = useCartStore();
  const router = useRouter();

  return (
    <main className="bg-light-gray relative py-20">
      <div className="container">
        <h1 className='text-3xl font-medium text-center'>Cart</h1>
        <div className="grid grid-cols-3 items-startS gap-8 mt-8 items-start">
          <div className="col-span-2">
            {
              items.map(({ activity, attendeeIds, sessionDates }) => (
                <div key={activity.id} className="relative flex items-start gap-8 bg-white p-4 rounded-xl">
                  <Image src={'/thumbnail.png'} height={100} width={100} alt={`${activity.title} image`} className="object-cover h-[100px] w-[100px] rounded-2xl" />
                  <div>
                    <h2 className="font-medium text-xl">{activity.title}</h2>
                    <p className="mt-2 text-sm">{activity.ageRangeStart} - {activity.ageRangeEnd} years</p>
                    <p className="font-medium my-1 text-sm">{formatDate(activity.activityStartDate)} - {formatDate(activity.activityEndDate)}</p>
                    {/* <p className="text-primary">Activity Schedule</p> */}
                    <div className="flex items-start gap-4 mt-4">
                      {
                        (attendeeIds && attendeeIds.length > 0) && (
                          <div className="space-y-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden" open={false}>
                              <summary
                                className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border p-2 text-gray-900"
                              >
                                <h2 className="font-medium">Child List</h2>

                                <svg
                                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              <div className="m-4">
                                {attendeeIds?.map((option: any) => (
                                  <div key={option.fullName} className="mt-2">
                                    <p>{option.fullName}</p>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        )
                      }

                      {
                        (sessionDates && sessionDates.length > 0) && (
                          <div className="space-y-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden" open={false}>
                              <summary
                                className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border p-2 text-gray-900"
                              >
                                <h2 className="font-medium">Session Date</h2>

                                <svg
                                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              <div className="m-4">
                                {sessionDates?.map((option: any) => (
                                  <div key={option} className="mt-2">
                                    <p>{formatDate(option)}</p>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        )
                      }

                    </div>
                  </div>

                  <button onClick={() => removeFromCart(activity.id)} className="absolute top-4 right-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
                </div>
              ))
            }
          </div>
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4 divide-y">
            <div>
              <div>
                <h2 className="font-medium my-4">Subtotal <span className="text-primary font-medium text-2xl">${calculateTotalPrice(calculateItemPrices(items))}</span></h2>
              </div>
              <Button onClick={() => {
                router.push("/user/checkout")
              }} size={"large"} className="mt-8">Check out</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

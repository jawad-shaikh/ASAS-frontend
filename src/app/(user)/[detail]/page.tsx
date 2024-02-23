import CartAside from "@/components/CartAside";
import ReviewCard from "@/components/ReviewCard";
import { Icon } from "@/components/common/Icons";
import { formatDate, formatTime } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";


export default async function UserPage({params}: any) {
  const { data } = await axios.get(`https://cpxrkdz4-6600.inc1.devtunnels.ms/api/v1/activities/${params.detail}`)
  const { id, thumbnailPicture, title, capacity, averageRating, numberOfRatings, ActivityReview, ageRangeStart, ageRangeEnd, activityStartDate, activityEndDate, activityStartTime, activityEndTime,
    isFullCourse, isSingleSession, fullCoursePrice, singleSessionPrice } = data.data;

    console.log(data.data)
  return (
    <main className="bg-light-gray relative py-20">
      <div className="container">
        <h1 className='text-3xl font-medium text-center'>{title}</h1>
        <div className="grid grid-cols-3 items-startS gap-8 mt-8 items-start">
          <div className="col-span-2">
            <Image src={'/thumbnail.png'} height={500} width={500} alt="Thumbnail" className="w-full h-auto" />

            <div className="divide-y">
              <div>
                <h2 className="font-medium my-4">Classes Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="my-4">
                      <p className="font-thin mb-2"> Age</p>
                      <p className="font-medium">{ageRangeStart} - {ageRangeEnd} years</p>
                    </div>

                    <div className="my-4">
                      <p className="font-thin mb-2">Dates</p>
                      <p className="font-medium">{formatDate(activityStartDate)} - {formatDate(activityEndDate)}</p>
                    </div>

                    <div className="my-4">
                      <p className="font-thin mb-2"> Time</p>
                      <p className="font-medium">{formatTime(activityStartTime)} - {formatTime(activityEndTime)}</p>
                    </div>
                  </div>

                  <div>
                    <div className="my-4">
                      <p className="font-thin mb-2">Location</p>
                      <p className="font-medium">Online</p>
                    </div>

                    <div className="my-4">
                      <p className="font-thin mb-2">Capacity</p>
                      <p className="font-medium">{capacity} Student</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h2 className="font-medium my-4">Class Experience</h2>
                <h3 className="text-sm font-medium">6 Lessons</h3>

                <ol className="list-decimal list-inside my-4 font-thin text-sm space-y-1">
                  <li>
                    Illustration
                  </li>
                  <li>
                    How to create Original Characters & Tell Tantalizing Stories
                  </li>
                  <li>
                    Design Picture Books
                  </li>
                  <li>
                    Dialogue Narration
                  </li>
                  <li>
                    Introduction to Design
                  </li>
                  <li>
                    Creating Digital assets
                  </li>
                </ol>

                <h3 className="text-sm font-medium">You Will Create</h3>

                <ol className="list-decimal list-inside my-4 font-thin text-sm space-y-1">
                  <li>
                    Create original characters and build stories
                  </li>
                  <li>
                    1 Illustrated Picture Book with your Child’s own Voice Narration
                  </li>
                  <li>
                    Build a Strong Digital Portfolio with original works
                  </li>
                  <li>
                    Design Fundamentals and tools
                  </li>
                  <li>
                    Create Digital assets using Design tools
                  </li>
                </ol>
              </div>


              <div>
                <h2 className="font-medium my-4">How To Participate</h2>
                <p className="font-thi text-sm mb-4">You will receive an email 30 minutes before class starts with a link to the class and access instructions.</p>
              </div>

              <div>
                <h2 className="font-medium my-4">Reviews</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                    <Icon.star />
                  </div>
                  <p className="font-thin text-sm">{averageRating} out of {numberOfRatings}</p>
                </div>

                <ReviewCard />
                <ReviewCard />

                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />

              </div>


            </div>

          </div>
          <CartAside product={data.data} />
        </div>
      </div>
    </main>
  );
}
"use client";
import { createActivity } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const placesLibrary = ["places"];

export default function NewActivityPage() {
  const router= useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [isFullCourse, setIsFullCourse] = useState(false);
  const [isSingleSession, setIsSingleSession] = useState(false);


  const onSubmit = async (data: any) => {
    const loadingToastId = toast.loading("Operation in progress...");
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === "activityStartTime" || key === "activityEndTime") {
          // Convert time to ISO string format
          const [hours, minutes] = (value as string).split(":");
          const today = new Date();
          today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
          formData.append(key, today.toISOString());
        } else if (key === "activityStartDate" || key === "activityEndDate") {
          // Convert date to ISO string format
          formData.append(key, new Date(value as string).toISOString());
        } else if (key === "thumbnail") {
          // Append image file
          formData.append("thumbnail", data.thumbnail[0]);
        } else {
          formData.append(key, value?.toString() || "");
        }
      }
  
      formData.append("isFullCourse", isFullCourse.toString());
      formData.append("isSingleSession", isSingleSession.toString());
  
      // Conditionally append fullCoursePrice and singleSessionPrice
      if (!isFullCourse) {
        formData.append("fullCoursePrice", "null");
      } else {
        formData.append("fullCoursePrice", data.fullCoursePrice.toString());
      }
  
      if (!isSingleSession) {
        formData.append("singleSessionPrice", "null");
      } else {
        formData.append("singleSessionPrice", data.singleSessionPrice.toString());
      }
  
      const response = await createActivity(formData);
      toast.success(response.data.message, { id: loadingToastId });
      router.push('/provider/activity/')
    } catch (error: any) {
      // An error occurred during registration
      console.error("An error occurred during registration:", error);
      toast.error(error.response?.data?.error || "An error occurred", {
        id: loadingToastId,
      });
    }
  };
  
  

  return (
    <div className="px-8">
      <div className="flex justify-between items-center">
        <TableHeader title="Add New Activity" />
        {/* <Button onClick={() => setDisable(false)} size={"small"}>Edit Profile</Button> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mt-3">
          <FormInput
            label={"Title"}
            placeholder="Title"
            register={register}
            name={"title"}
            errors={errors}
          />
          <FormInput
            label={"Description"}
            placeholder="Description"
            register={register}
            name={"description"}
            errors={errors}
          />
          <select
            id="category"
            className={`mt-7 block bg-transparent border-b w-full pb-2 outline-none ${errors['category'] ? "border-red-500" : "border-border"}`}
            {...register("category")}
          >
            <option value="MUSIC" selected>
              Music
            </option>
            <option value="ART">Art</option>
            <option value="COOKING">Cooking</option>
            <option value="ROBOTS">Robots</option>
            <option value="LANGUAGE">Language</option>
            <option value="SPORTS">Sports</option>
          </select>

          <FormInput
            label={"Capacity"}
            placeholder="Capacity"
            register={register}
            name={"capacity"}
            errors={errors}
          />

          <div className="flex items-center gap-4">
            <FormInput
              label={"Age range start"}
              placeholder="Age range start"
              register={register}
              name={"ageRangeStart"}
              errors={errors}
            />

            <FormInput
              label={"Age range end"}
              placeholder="Age range end"
              register={register}
              name={"ageRangeEnd"}
              errors={errors}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormInput
              type="date"
              label={"Activity start date"}
              placeholder="Activity start date"
              register={register}
              name={"activityStartDate"}
              errors={errors}
            />
            <FormInput
              type="date"
              label={"Activity end date"}
              placeholder="Activity end date"
              register={register}
              name={"activityEndDate"}
              errors={errors}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormInput
              type="time"
              label={"Activity start time"}
              placeholder="Activity start time"
              register={register}
              name={"activityStartTime"}
              errors={errors}
            />
            <FormInput
              type="time"
              label={"Activity end time"}
              placeholder="Activity end time"
              register={register}
              name={"activityEndTime"}
              errors={errors}
            />
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-4">
              <div className="checkboxes__item">
                <label className="checkbox style-c">
                  <input type="checkbox"
                    checked={isSingleSession}
                    onChange={() => setIsSingleSession(!isSingleSession)} />
                  <div className="checkbox__checkmark"></div>
                  <div className="text-sm">Is Single Session</div>
                </label>
              </div>
              {isSingleSession ? <FormInput
                label={"Single Session Price"}
                placeholder="Single Session Price"
                register={register}
                name={"singleSessionPrice"}
                errors={errors}
              />
                : null}
            </div>

            <div className="mt-4">
              <div className="checkboxes__item">
                <label className="checkbox style-c">
                  <input type="checkbox"
                    checked={isFullCourse}
                    onChange={() => setIsFullCourse(!isFullCourse)} />
                  <div className="checkbox__checkmark"></div>
                  <div className="text-sm">Is Full Course</div>
                </label>
              </div>
              {
                isFullCourse ? <FormInput
                  label={"Full Course Price"}
                  placeholder="Full Course Price"
                  register={register}
                  name={"fullCoursePrice"}
                  errors={errors}
                /> : null
              }

            </div>
          </div>

          <FormInput
            label={"Formatted Address"}
            placeholder="Formatted Address"
            register={register}
            name={"formattedAddress"}
            errors={errors}
          />

          <FormInput
            type="file"
            label={"Thumbnail"}
            placeholder="Thumbnail"
            register={register}
            name={"thumbnail"}
            errors={errors}
          />

          <div className="mt-10 flex justify-end">
            <Button size={"small"}>Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

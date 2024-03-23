"use client";
import { createActivity } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { useRouter } from "next/navigation";
import { LegacyRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { usePlacesWidget } from "react-google-autocomplete";
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
  ssr:false
})
import 'react-quill/dist/quill.snow.css';

export default function NewActivityPage() {

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: 'AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8',
    options:{
      types: ['school','drugstore','neighborhood', 'locality', 'sublocality'],
      componentRestrictions: {
          country: 'sa'
      }
  },
    onPlaceSelected: (place) => {
      setValue('lat', place.geometry?.location?.lat());
      setValue('lng', place.geometry?.location?.lng());
      setValue("formattedAddress", place.formatted_address)
    }
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

    const [value, setEditor] = useState("");

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
        }
         else if (key !== "fullCoursePrice" && key !== "singleSessionPrice") {
          console.log(key, value)
          formData.append(key, value?.toString() || "");
        }
      }
      if(JSON.stringify(value)){
        formData.append("description", JSON.stringify(value));

      }else {
        toast.error("Please add description");
        return null;
      }

      formData.append("isFullCourse", isFullCourse.toString());
      formData.append("isSingleSession", isSingleSession.toString());

      // Conditionally append fullCoursePrice and singleSessionPrice
      if (!isFullCourse) {
        formData.append("fullCoursePrice", "0");
      } else {
        if(data.fullCoursePrice){
          formData.append("fullCoursePrice", data.fullCoursePrice.toString());
        }else {
          toast.error("Please Enter Full Course Price", { id: loadingToastId })
          return false;
        }
      }

      if (!isSingleSession) {
        formData.append("singleSessionPrice", "0");
      } else {
        if(data.singleSessionPrice){
          formData.append("singleSessionPrice", data.singleSessionPrice.toString());
        }else {
          toast.error("Please Enter Single Session Price", { id: loadingToastId })

          return false;
        }
      }

      const response = await createActivity(formData);
      toast.success(response.data.message, { id: loadingToastId });
      router.push('/provider/activity/')
    } catch (error: any) {
      // An error occurred during registration
      console.error("An error occurred during registration:", error);
      toast.error(error.response?.data?.error || "Please fill all the fields", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="px-8">
      {/* <div className="flex justify-between items-center"> */}
      <TableHeader title="Add New Activity" />
      {/* <Button onClick={() => setDisable(false)} size={"small"}>Edit Profile</Button> */}
      {/* </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-8">
        <div className="mt-3">
          <FormInput
            label={"Title"}
            placeholder="Title"
            register={register}
            name={"title"}
            errors={errors}
          />
          <div className="mt-7 w-full">
            <label className="sr-only block mb-2 text-sm" htmlFor={'description'}>
            Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setEditor} />

          </div>
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

          <div className="flex items-center gap-4 w-full">
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
            <div className="w-full mt-4">
              Activity start date
              <FormInput
                type="date"
                label={"Activity start date"}
                placeholder="Activity start date"
                register={register}
                name={"activityStartDate"}
                errors={errors}
              />
            </div>
            <div className="w-full mt-4">
              Activity end date
              <FormInput
                type="date"
                label={"Activity end date"}
                placeholder="Activity end date"
                register={register}
                name={"activityEndDate"}
                errors={errors}
              />
            </div>

          </div>


          <div className="flex items-center gap-4">
            <div className="w-full mt-4">
              Activity start time
              <FormInput
                type="time"
                label={"Activity start time"}
                placeholder="Activity start time"
                register={register}
                name={"activityStartTime"}
                errors={errors}
              />
            </div>

            <div className="w-full mt-4">
              Activity end time
              <FormInput
                type="time"
                label={"Activity end time"}
                placeholder="Activity end time"
                register={register}
                name={"activityEndTime"}
                errors={errors}
              />
            </div>

          </div>

          <div className="flex items-start gap-4">
            <div className="w-full mt-4">
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

            <div className="w-full mt-4">
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


          <div className="mt-7 w-full">
            <label className="sr-only block mb-2 text-sm" htmlFor={'formattedAddress'}>
              Formatted Address
            </label>
            <input
              id={'formattedAddress'}
              className={`block bg-transparent border-b w-full pb-2 outline-none ${errors['formattedAddress'] ? "border-red-500" : "border-border"}`}
              placeholder={"Formatted Address"}
              ref={ref as unknown as LegacyRef<HTMLInputElement>}
              onChange={(e: any) => setValue("formattedAddress", e.target.value)}
            />
          </div>

          <FormInput
            type="file"
            label={"Thumbnail"}
            placeholder="Thumbnail"
            register={register}
            name={"thumbnail"}
            errors={errors}
          />

          <div className="mt-10 flex justify-end">
            <Button size={"small"}>Create Activity</Button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

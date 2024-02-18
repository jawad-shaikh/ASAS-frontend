"use client";
import { createActivity, createOrders } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { providerAccountFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormValues = z.infer<typeof providerAccountFormSchema>;

const placesLibrary = ["places"];

export default function NewActivityPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "GOOGLE_API_KEY",
  //     libraries: placesLibrary,
  //   });

  //   const onLoad = () => {
  //     const autocomplete = autocompleteRef.current;
  //   };

  //   const onPlaceChanged = (place) => {
  //     setSearchResult(place);
  //     console.log(searchResult);
  //   };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const loadingToastId = toast.loading("Operation in progress...");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "activityStartTime" || key === "activityEndTime") {
          // Convert time to ISO string format
          const [hours, minutes] = value.split(":");
          const today = new Date();
          today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
          formData.append(key, today.toISOString());
        } else if (key === "activityStartDate" || key === "activityEndDate") {
          // Convert date to ISO string format
          formData.append(key, new Date(value).toISOString());
        } else if (key === "thumbnail") {
          // Convert date to ISO string format
          return;
        } else {
          formData.append(key, value);
        }
      });
      formData.append("isFullCourse", "true");
      formData.append("isSingleSession", "true");

      // Append image file
      formData.append("thumbnail", data.thumbnail[0]);

      const response = await createActivity(formData);
      toast.success(response.data.message, { id: loadingToastId });
    } catch (error: any) {
      // An error occurred during registration
      console.error("An error occurred during registration:", error);
      toast.error(error.response.data.error, {
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
            className={`block bg-transparent border-b w-full pb-2 outline-none mt-7`}
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

          <div className="flex items-center gap-4">
            <FormInput
              label={"Single Session Price"}
              placeholder="Single Session Price"
              register={register}
              name={"singleSessionPrice"}
              errors={errors}
            />
            <FormInput
              label={"Full Course Price"}
              placeholder="Full Course Price"
              register={register}
              name={"fullCoursePrice"}
              errors={errors}
            />
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
        </div>
        <div className="mt-10 flex justify-end">
          <Button size={"small"}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

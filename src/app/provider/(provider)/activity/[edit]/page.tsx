"use client";
import { createActivity, createOrders, getActivity, updateActivity } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { LegacyRef, useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ReactQuill = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
  ssr:false
})
import 'react-quill/dist/quill.snow.css';

export default function NewActivityPage({ params }: any) {

  const router = useRouter()
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: 'AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8',
    options:{
      types: ['school','drugstore','neighborhood', 'locality', 'sublocality'],
      componentRestrictions: {
          country: 'ae'
      }
  },
    onPlaceSelected: (place) => {
      setValue('lat', place.geometry?.location?.lat());
      setValue('lng', place.geometry?.location?.lng());
      setValue("formattedAddress", place.formatted_address)
    }
  });

  const [data, setData] = useState<any>();

  const [value, setEditor] = useState("");

  const [isFullCourse, setIsFullCourse] = useState(false);
  const [isSingleSession, setIsSingleSession] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<any>();


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
        } else if (key !== "fullCoursePrice" && key !== "singleSessionPrice") {
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
      // // Append image file
      // if (data?.thumbnail?.length) formData.append("thumbnail", data?.thumbnail[0]);

      const response = await updateActivity(params.edit, formData);
      toast.success(response.data.message, { id: loadingToastId });
      router.push('/provider/activity/')
    } catch (error: any) {
      // An error occurred during registration
      console.error("An error occurred during registration:", error);
      toast.error(error.response.data.error, {
        id: loadingToastId,
      });
    }
  };

  const getData = async () => {
    try {
      const response = await getActivity(params.edit); // Fetch data
      setData(response.data.data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const keysToSet = [
        "title",
        "category",
        "capacity",
        "ageRangeStart",
        "ageRangeEnd",
        "formattedAddress",
        'lat',
        "lng",
        "fullCoursePrice",
        "singleSessionPrice"
      ];

      keysToSet.forEach((key) => {
        console.log(key, data[key])
        setValue(key, data[key]);
      });
      setEditor(JSON.parse(data.description) || "")
      const formattedAddressInput = document.getElementById('formattedAddress') as HTMLInputElement | null;
      if (formattedAddressInput) {
        formattedAddressInput.value = getValues('formattedAddress') || "";
      }

      // Convert activityStartDate and activityEndDate to input date type
      setValue("activityStartDate", formatDate(data.activityStartDate));
      setValue("activityEndDate", formatDate(data.activityEndDate));

      // Convert activityStartTime and activityEndTime to input time type
      setValue("activityStartTime", formatTime(data.activityStartTime));
      setValue("activityEndTime", formatTime(data.activityEndTime));

      // Set isFullCourse and isSingleSession
      setIsFullCourse(data.isFullCourse);
      setIsSingleSession(data.isSingleSession);
    }
  }, [data, setValue]);

  // Function to format date as yyyy-mm-dd for input type date
  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  // Function to format time as HH:MM for input type time
  const formatTime = (time: string) => {
    const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };
  return (
    <div className="px-8">
      <div className="flex justify-between items-center">
        <TableHeader title="Edit Activity" />
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
          <div className="mt-7 w-full">
            <label className="sr-only block mb-2 text-sm" htmlFor={'description'}>
            Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setEditor} />

          </div>
          <select
            id="category"
            className={`mt-7 block bg-transparent border-b w-full pb-2 outline-none border-border`}
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
            <Button size={"small"}>Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client'
import { useEffect, useState } from "react"
import Button from "./common/Button"
import useAuthStore, { useCartStore } from "@/store"
import { myChildren, updateChildren } from "@/api"
import ModalWrapper from "./common/ModalWrapper"
import FormInput from "./common/FormInput"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import DatePicker, { Calendar } from "react-multi-date-picker";
import { calculateItemPrices, formatDate } from "@/utils/helper"

const CartAside = ({
    product
}: any) => {
    const { isFullCourse, isSingleSession, fullCoursePrice, singleSessionPrice, activityStartDate, activityEndDate } = product;
    const { addToCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const [children, setChildren] = useState([]);
    const [price, setPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const [bookingOption, setBookingOption] = useState(isFullCourse ? "FULL_COURSE" : "SINGLE_SESSION")

    const router = useRouter();

    const [tempSelectedOptions, setTempSelectedOptions] = useState<any[]>([]);

    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = (dates: any) => {
        setSelectedDates(dates);
    };

    const [childData, setChildData] = useState({
        fullName: '',
        birthDay: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setChildData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {

        if (!childData.fullName || !childData.birthDay) {
            toast.error('Please fill out all fields');
            return;
        }
        // Call your submit handler here with childData

        try {
            const { data } = await updateChildren([{ fullName: childData.fullName, birthDay: new Date(childData.birthDay).toISOString() }])
            console.log(data.data)
            // Reset form fields and error state
            toast.success("New child added successfully")

            setChildData({
                fullName: '',
                birthDay: '',
            });
            getChildren();
        } catch (error) {
            toast.error("there is an internal error")
        } finally {
            setOpen(false)
        }

    };


    const getChildren = async () => {
        const { data } = await myChildren();
        setChildren(data.data)
        console.log(data.data)
    }

    const handleOptionChange = (option: any) => {
        const updatedOptions = tempSelectedOptions.includes(option)
            ? tempSelectedOptions.filter((item) => item !== option)
            : [...tempSelectedOptions, option];

        console.log(updatedOptions)
        setTempSelectedOptions(updatedOptions);
    };

    useEffect(() => {
        if (isAuthenticated) {
            getChildren()
        }
    }, [])

    useEffect(() => {
        setPrice(calculateItemPrices([{ bookingType: bookingOption, attendeeIds: tempSelectedOptions, sessionDates: selectedDates, activity: product }])[0]);
    }, [bookingOption, selectedDates, tempSelectedOptions])
    
    return (
        <>
            <div className="bg-white rounded-xl p-6 flex flex-col gap-4 divide-y">
                {
                    (isAuthenticated) && (
                        <div>
                            <h2 className="font-medium mb-4">Who Attending</h2>

                            <div className="space-y-4">
                                <details className="group [&_summary::-webkit-details-marker]:hidden" open>
                                    <summary
                                        className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border p-4 text-gray-900"
                                    >
                                        <h2 className="font-medium">Select Child</h2>

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
                                        {children.map((option: any) => (
                                            <div key={option.value} className="checkboxes__item">
                                                <label className="checkbox style-c">
                                                    <input type="checkbox" value={option.value}
                                                        checked={tempSelectedOptions.includes(option)}
                                                        onChange={() => handleOptionChange(option)} />
                                                    <div className="checkbox__checkmark"></div>
                                                    <div className="text-sm">{option.fullName}</div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                            <button onClick={() => setOpen(true)} className="w-full text-sm font-medium text-center text-primary">Add Child</button>
                        </div>
                    )
                }

                <div>
                    <h2 className="font-medium mt-4">Booking Options</h2>
                    <fieldset className="space-y-4">
                        <legend className="sr-only">Booking Options</legend>

                        {
                            isFullCourse ? (
                                <div>
                                    <label
                                        htmlFor="FULL_COURSE"
                                        className="flex cursor-pointer justify-start gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                                    >
                                        <input
                                            type="radio"
                                            name="bookingOption"
                                            value="FULL_COURSE"
                                            id="FULL_COURSE"
                                            className="size-5 border-primary text-primary"
                                            checked={bookingOption === "FULL_COURSE"}
                                            onChange={(e: any) => setBookingOption(e.target.value)}
                                        />
                                        <div>
                                            <p>Full Course ${fullCoursePrice}</p>
                                            <p className="mt-1 text-gray-400 text-sm">{formatDate(activityStartDate)} - {formatDate(activityEndDate)}</p>
                                        </div>
                                    </label>
                                </div>
                            ) : null
                        }
                        {
                            isSingleSession ? (
                                <div>
                                    <label
                                        htmlFor="SINGLE_SESSION"
                                        className="flex cursor-pointer justify-start gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                                    >
                                        <input
                                            type="radio"
                                            name="bookingOption"
                                            value="SINGLE_SESSION"
                                            id="SINGLE_SESSION"
                                            className="size-5 border-primary text-primary"
                                            checked={bookingOption === "SINGLE_SESSION"}
                                            onChange={(e: any) => setBookingOption(e.target.value)}
                                        />
                                        <div>
                                            <p>Single Session ${singleSessionPrice}</p>
                                            <p className="mt-1 text-gray-400 text-sm">{formatDate(activityStartDate)} - {formatDate(activityEndDate)}</p>
                                        </div>
                                    </label>
                                </div>
                            ) : null
                        }


                    </fieldset>
                </div>
                {

                    bookingOption === "SINGLE_SESSION" ? (<Calendar
                        value={selectedDates}
                        onChange={handleDateChange}
                        multiple
                        className="w-full"
                        showOtherDays
                        minDate={new Date(activityStartDate)}
                        maxDate={new Date(activityEndDate)}
                    />) : null
                }

                <div>
                    <h2 className="font-medium my-4">Subtotal</h2>
                    <p className="flex items-center gap-2">{bookingOption === "FULL_COURSE" ? "Full Course" : "Per/Semester"} <span className="text-primary font-medium text-2lg">
                    ${price}
                        </span></p>

                </div>

                <Button onClick={() => {
                    if (!isAuthenticated) {
                        toast.error("Please Login");

                    }
                    else if (price === 0) {
                        toast.error("Please select a options");
                    }
                    else {
                        addToCart(product, bookingOption, tempSelectedOptions, selectedDates)
                        toast.success("Item added to cart successfully")
                        router.push("/cart")
                    }

                }} size={"large"}>Join Class</Button>
            </div>

            <ModalWrapper open={open} setOpen={setOpen}>
                <div className='flex flex-col p-6 max-w-[450px] rounded-2xl bg-white'>
                    <h2 className="font-medium text-xl">Add New Child</h2>
                    <div className="mt-7">
                        <label className="text-left block mb-2 text-sm" htmlFor={"fullName"}>
                            Child Full Name
                        </label>
                        <input
                            id={"fullName"}
                            name={"fullName"}
                            type={"text"}
                            value={childData.fullName}
                            onChange={handleChange}
                            className={`block bg-transparent border-b w-full pb-2 outline-none border-border`}
                        />
                    </div>
                    <div className="mt-7">
                        <label className="text-left block mb-2 text-sm" htmlFor={"birthDay"}>
                            Child Birthday
                        </label>
                        <input
                            id={"birthDay"}
                            name={"birthDay"}
                            type={"date"}
                            value={childData.birthDay}
                            onChange={handleChange}
                            className={`block bg-transparent border-b w-full pb-2 outline-none border-border`}
                        />
                    </div>
                    <Button onClick={handleSubmit} className="mt-4">
                        Add Child
                    </Button>
                </div>

            </ModalWrapper>

        </>
    )
}

export default CartAside
'use client'
import { createOrders } from "@/api";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/common/Button";
import ModalWrapper from "@/components/common/ModalWrapper";
import { useCartStore } from "@/store";
import { calculateItemPrices, calculateTotalPrice, copyToClipboard, formatDate, formatTime } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function UserPage() {
  const { items } = useCartStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<any | null>(null);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files);
    }
  };

  const handleImageUpload = (files: FileList) => {
    const file = files[0];
    setImageFile(file)
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async () => {
    const id = toast.loading("Loading....")

    try {

      if (items.length && image) {
        // Create FormData object
        const formData = new FormData();

        // Append the image file to FormData
        formData.append('proof-of-payment', imageFile, imageFile.name);

        const data = items.map(item => ({
          sessionDates: item.sessionDates?.map(i => new Date(i).toISOString()),
          bookingType: item.bookingType,
          attendeeIds: item.attendeeIds?.map(i => i.id),
          activityId: item.activity.id,
        }))
        console.log(data)
        formData.append('orders', JSON.stringify(data));
        await createOrders(formData)
        toast.success("Checkout Successful", {id})
        window.localStorage.removeItem('cartItems')
        router.push('/explore')
      } else {
        toast.error("Please select proof of payment", { id });
      }

    } catch (error) {
      console.log(error)
      toast.error('There was an error', { id })
    }

  }

  return (
    <main className="bg-light-gray relative py-20">
      <div className="container">
        <h1 className='text-3xl font-medium text-center'>Check out</h1>
        {
          items.length > 0 ? (
            <div className="grid grid-cols-3 items-startS gap-8 mt-8 items-start">
              <div className="col-span-2">
                <div className="bg-white p-4 rounded-xl flex items-center gap-8">
                  <Image src={'/logo.svg'} height={100} width={100} alt={`logo image`} className="h-[100px] w-[100px] rounded-2xl object-contain" />
                  <div>
                    <h2 className="font-medium text-xl">Bank Information</h2>
                    <p className="mt-2 text-sm">Bank Syariah Indonesia</p>
                    <p className="font-medium my-1 text-sm flex items-center gap-4">Account Number - 12312312312321 <button onClick={() => copyToClipboard('12312312312321')}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </button>
                    </p>
                    {/* <p className="text-primary">Activity Schedule</p> */}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex flex-col gap-4 divide-y">
                <div>
                  <div>
                    <h2 className="font-medium my-4">Subtotal <span className="text-primary font-medium text-2xl">${calculateTotalPrice(calculateItemPrices(items))}</span></h2>
                  </div>
                  <div>
                    <h2 className="font-medium my-4">Upload</h2>
                    <p className="flex items-center gap-2">
                      {image ? <img src={image} alt="Uploaded" className="h-[20px] w-[20px] rounded-full" /> : <button onClick={() => setOpen(true)} className="w-full text-sm font-medium text-center text-primary flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h14" /><path d="m18 13-6-6-6 6" /><path d="M12 7v14" /></svg>Proof of payment</button>
                      }
                    </p>

                  </div>

                  <Button onClick={() => {
                    onSubmit()
                  }} size={"large"} className="mt-8">Check out</Button>
                </div>
              </div>
            </div>
          ) : <EmptyState />
        }


      </div>

      <ModalWrapper open={open} setOpen={setOpen}>
        <div className='flex flex-col p-6 max-w-[450px] rounded-2xl bg-white'>
          <h2 className="font-medium text-xl">Upload proof of payment</h2>
          {image ? (
            <img src={image} alt="Uploaded" className="max-h-full max-w-[450px] my-4" />
          ) : (
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer"
            >

              <div className="w-full flex items-center flex-col justify-center border mt-4 py-12 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                <p>Upload</p>
              </div>
              <input id="file-upload" onChange={handleInputChange} name="file-upload" type="file" className="sr-only" />
            </label>
          )}
          <Button onClick={() => setOpen(false)} className="mt-4">
            Send
          </Button>
        </div>
      </ModalWrapper>
    </main>
  );
}

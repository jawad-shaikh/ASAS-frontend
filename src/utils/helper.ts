import toast from "react-hot-toast";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(dateTimeString: string) {
  const date = new Date(dateTimeString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export const calculateItemPrices = (cartState: any): number[] => {
  return cartState.map((item: any) => {
    const { attendeeIds, sessionDates, activity, bookingType } = item;

    // Calculate the price based on the booking type and number of attendees
    const pricePerAttendee =
      bookingType === "SINGLE_SESSION" && sessionDates
        ? attendeeIds.length * sessionDates.length * activity.singleSessionPrice
        : attendeeIds.length * activity.fullCoursePrice;

    return pricePerAttendee;
  });
};

export const calculateTotalPrice = (itemPrices: number[]): number => {
  return itemPrices.reduce((total, price) => total + price, 0);
};

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard successfully!");
    toast.success("Account number copied");
  } catch (error) {
    console.error("Error copying text to clipboard:", error);
    // Handle potential errors (e.g., user denying permission)
  }
}

export function timeStringToISOString(timeString: string) {
  const today = new Date();
  const [hours, minutes] = timeString.split(":");
  today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return today.toISOString();
}

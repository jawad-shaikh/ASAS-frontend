export interface Product {
  activityEndDate: string;
  activityEndTime: string;
  activityProviderId: number;
  activityStartDate: string;
  activityStartTime: string;
  ageRangeEnd: number;
  ageRangeStart: number;
  averageRating: number;
  capacity: number;
  category: string;
  createdAt: string;
  description: string;
  formattedAddress: string;
  fullCoursePrice: number;
  id: number;
  isFullCourse: boolean;
  isSingleSession: boolean;
  locationLatitude: number;
  locationLongitude: number;
  numberOfRatings: number;
  provider: {
    id: number;
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    // Add other fields if available
  };
  singleSessionPrice: number;
  thumbnailPicture: string;
  title: string;
  updatedAt: string;
}


export type InputProps = {
  register: any;
  name: string;
  errors: any;
  label: string;
  placeholder?: string;
  type?: string;
};

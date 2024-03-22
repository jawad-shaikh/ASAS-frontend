'use client'
import { Icon } from '@/components/common/Icons';
import CustomFilterButton from '@/components/filter/filter'
import { formatDate, formatTime } from '@/utils/helper';
import axios from 'axios';
import Link from 'next/link';
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete';
import GoogleMap from 'google-maps-react-markers'
import Marker from './Marker';
import CustomAgeFilterButton from '@/components/filter/CustomAgeFilterButton';
import MultiRangeSlider from '@/components/filter/RangeFilter';
import EmptyState from '@/components/EmptyState';

const page = ({searchParams: {search, category}}: {searchParams: any}) => {
    const [searchValue, setSearch] = useState(decodeURIComponent(search || ""));
    const [latitude, setLatitude] = useState<any>(0)
    const [longitude, setLongitude] = useState<any>(0)

    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: 'AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8',
        options:{
            types: ['school','drugstore','neighborhood', 'locality', 'sublocality'],
            componentRestrictions: {
                country: 'ae'
            }
        },
        onPlaceSelected: (place) => {
            mapRef.current.setCenter({ lat:place.geometry?.location?.lat(), lng:place.geometry?.location?.lng() })

            setLatitude(place.geometry?.location?.lat());
            setLongitude(place.geometry?.location?.lng());
            console.log("formattedAddress", place.formatted_address)
        }
    });

    const bookingTypeOptions = [
        { name: "Full Course", value: "FULL_COURSE" },
        { name: "Single Session", value: "SINGLE_SESSION" },

    ]

    const categoryOptions = [
        { name: 'Music', value: 'MUSIC' },
        { name: 'Art', value: 'ART' },
        { name: 'Cooking', value: 'COOKING' },
        { name: 'Robots', value: 'ROBOTS' },
        { name: 'Language', value: 'LANGUAGE' },
        { name: 'Sports', value: 'SPORTS' },
    ];

    const monthOptions = [
        { name: 'January', value: '0' },
        { name: 'February', value: '1' },
        { name: 'March', value: '2' },
        { name: 'April', value: '3' },
        { name: 'May', value: '4' },
        { name: 'June', value: '5' },
        { name: 'July', value: '6' },
        { name: 'August', value: '7' },
        { name: 'September', value: '8' },
        { name: 'October', value: '9' },
        { name: 'November', value: '10' },
        { name: 'December', value: '11' },
    ];

    const dayOptions = [
        { name: 'Monday', value: '0' },
        { name: 'Tuesday', value: '1' },
        { name: 'Wednesday', value: '2' },
        { name: 'Thursday', value: '3' },
        { name: 'Friday', value: '4' },
        { name: 'Saturday', value: '5' },
        { name: 'Sunday', value: '6' },
    ];


    const [ageArr, setAge] = useState<any[]>([]);

    const [selectedBookingOptions, setSelectedBookingOptions] = useState<any[]>([]);

    const [selectedCategoryOptions, setSelectedCategoryOptions] = useState<any[]>(category ? [{name:category, value:category.toUpperCase()}] : []);

    const [selectedMonthOptions, setSelectedMonthOptions] = useState<any[]>([]);
    // const [selectedDayOptions, setSelectedDayOptions] = useState<any[]>([]);
    const [selectedTimeOptions, setSelectedTimeOptions] = useState<{ startTime: string, endTime: string }>({ startTime: "00", endTime: "24" });
    const [data, setData] = useState<any[]>([]);
    const [coordinates, setCoordinates] = useState<any[]>([]);


    const mapRef = useRef<any>(null)
    const [mapReady, setMapReady] = useState(false)

    const onGoogleApiLoaded = ({ map, maps }: any) => {
        mapRef.current = map
        setMapReady(true)
    }

    const onMarkerClick = (e: any, { markerId, lat, lng }: any) => {
        console.log('This is ->', markerId)

        // inside the map instance you can call any google maps method
        // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
    }


    const handleAgeChange = (selectedOptions: any[]) => {
        setAge(selectedOptions);
        // Handle month filter change logic here
        console.log('Selected age options:', selectedOptions);
    };

    const handleBookingChange = (selectedOptions: any[]) => {
        setSelectedBookingOptions(selectedOptions);
        // Handle month filter change logic here
        console.log('Selected category options:', selectedOptions);
    };

    const handleCategoryChange = (selectedOptions: any[]) => {
        setSelectedCategoryOptions(selectedOptions);
        // Handle month filter change logic here
        console.log('Selected category options:', selectedOptions);
    };

    const handleMonthChange = (selectedOptions: any[]) => {
        setSelectedMonthOptions(selectedOptions);
        // Handle month filter change logic here
        console.log('Selected month options:', selectedOptions);
    };

    const handleTimeChange = (selectedOptions: any) => {
        setSelectedTimeOptions(selectedOptions);
        // Handle time filter change logic here
        console.log('Selected time options:', selectedOptions);
    };

    function flattenArray(arr: any) {
        return arr.reduce((acc: any, curr: any) => {
            if (Array.isArray(curr)) {
                acc.push(...flattenArray(curr));
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
    }

    const getData = async () => {
        try {
            console.log(selectedCategoryOptions, "selectedCategoryOptions")
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/v1/activities/fetch`, {
                age: flattenArray(ageArr.map(item => isNaN(item) ? item.split('-').map((num: string) => Number(num)) : item)),
                searchQuery: searchValue,
                category: selectedCategoryOptions.map(item => item.value),
                bookingType: selectedBookingOptions.map(item => item.value),
                months: selectedMonthOptions.length > 0 ? selectedMonthOptions.map(item => item.value) : [],
                startTime: `${selectedTimeOptions.startTime.slice(0, 2)}`,
                endTime: `${selectedTimeOptions.endTime.slice(0, 2)}`,
                latitude,
                longitude

            });

            if(mapRef && mapRef.current && data.data.coordinates.length){
                mapRef.current.setCenter({lat: data.data.coordinates[0].lat, lng:data.data.coordinates[0].lng })
            }

            setData(data.data.activities)
            setCoordinates(data.data.coordinates)
        } catch (error) {
            console.log(error)
        }

    }


    // Map options
    const mapOptions = { };


    useEffect(() => {
        const getLocation = async () => {
            if (navigator.geolocation) {
              try {
                const position = await navigator.geolocation.getCurrentPosition(async (pos) => {
                    setLatitude(pos.coords.latitude)
                    setLongitude(pos.coords.longitude);
                    mapRef.current.setCenter({lat: pos.coords.latitude, lng:pos.coords.longitude })

                    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${pos.coords.latitude}, ${pos.coords.longitude}&key=AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8`)
                     
                     if (ref && ref.current) {
                        const inputRef = ref.current as HTMLInputElement;

                        inputRef.value = data.results[0].formatted_address;
                    }
                   
                });
              } catch (err: any) {
                console.log(err.message);
              }
            } else {
              console.log("Geolocation is not supported by this browser.");
            }
          };
      
          getLocation();
    }, [mapRef.current])
    useEffect(() => {
        if(latitude) getData()
    }, [ageArr, selectedBookingOptions, selectedCategoryOptions, selectedMonthOptions, selectedTimeOptions, searchValue, latitude, longitude])

    return (
        <>
        <title>
        Activities for Kids near you | ASAS
        </title>
            <main className='container py-12'>
                <div className='flex items-end gap-4 flex-wrap'>
                    <div className='grid grid-cols-1 gap-4'>

                            {/* <AutocompleteInput /> */}
                        <div className='flex items-center gap-2 px-2 py-2 pl-4 text-sm font-medium rounded-full border border-black text-black'>
                            <input value={searchValue} placeholder='Search' onChange={(e) => setSearch(e.target.value)} className='outline-none w-full' />
                            <button onClick={() => { setSearch("") }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clipRule="evenodd" d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM8.707 7.293C8.5184 7.11084 8.2658 7.01005 8.0036 7.01233C7.7414 7.0146 7.49059 7.11977 7.30518 7.30518C7.11977 7.49059 7.0146 7.7414 7.01233 8.0036C7.01005 8.2658 7.11084 8.5184 7.293 8.707L8.586 10L7.293 11.293C7.19749 11.3852 7.12131 11.4956 7.0689 11.6176C7.01649 11.7396 6.9889 11.8708 6.98775 12.0036C6.9866 12.1364 7.0119 12.2681 7.06218 12.391C7.11246 12.5139 7.18671 12.6255 7.2806 12.7194C7.3745 12.8133 7.48615 12.8875 7.60905 12.9378C7.73194 12.9881 7.86362 13.0134 7.9964 13.0123C8.12918 13.0111 8.2604 12.9835 8.3824 12.9311C8.50441 12.8787 8.61475 12.8025 8.707 12.707L10 11.414L11.293 12.707C11.4816 12.8892 11.7342 12.99 11.9964 12.9877C12.2586 12.9854 12.5094 12.8802 12.6948 12.6948C12.8802 12.5094 12.9854 12.2586 12.9877 11.9964C12.99 11.7342 12.8892 11.4816 12.707 11.293L11.414 10L12.707 8.707C12.8892 8.5184 12.99 8.2658 12.9877 8.0036C12.9854 7.7414 12.8802 7.49059 12.6948 7.30518C12.5094 7.11977 12.2586 7.0146 11.9964 7.01233C11.7342 7.01005 11.4816 7.11084 11.293 7.293L10 8.586L8.707 7.293Z" fill="#7A869A" />
                                </svg>
                            </button>
                        </div>

                        <div className='flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-full border border-black text-black'>
                            <svg width="12" height="18" viewBox="0 0 12 18" className='ml-2' fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.00033 0.666992C2.77533 0.666992 0.166992 3.27533 0.166992 6.50033C0.166992 10.8753 6.00033 17.3337 6.00033 17.3337C6.00033 17.3337 11.8337 10.8753 11.8337 6.50033C11.8337 3.27533 9.22533 0.666992 6.00033 0.666992ZM6.00033 8.58366C4.85033 8.58366 3.91699 7.65033 3.91699 6.50033C3.91699 5.35033 4.85033 4.41699 6.00033 4.41699C7.15033 4.41699 8.08366 5.35033 8.08366 6.50033C8.08366 7.65033 7.15033 8.58366 6.00033 8.58366Z" fill="black" />
                            </svg>

                            <input ref={ref as unknown as LegacyRef<HTMLInputElement>} className='outline-none w-full' />
                            <button onClick={() => {

                                if (ref && ref.current) {
                                    const inputRef = ref.current as HTMLInputElement;

                                    inputRef.value = "";
                                }
                                setLatitude(0)
                                setLongitude(0)
                            }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clipRule="evenodd" d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM8.707 7.293C8.5184 7.11084 8.2658 7.01005 8.0036 7.01233C7.7414 7.0146 7.49059 7.11977 7.30518 7.30518C7.11977 7.49059 7.0146 7.7414 7.01233 8.0036C7.01005 8.2658 7.11084 8.5184 7.293 8.707L8.586 10L7.293 11.293C7.19749 11.3852 7.12131 11.4956 7.0689 11.6176C7.01649 11.7396 6.9889 11.8708 6.98775 12.0036C6.9866 12.1364 7.0119 12.2681 7.06218 12.391C7.11246 12.5139 7.18671 12.6255 7.2806 12.7194C7.3745 12.8133 7.48615 12.8875 7.60905 12.9378C7.73194 12.9881 7.86362 13.0134 7.9964 13.0123C8.12918 13.0111 8.2604 12.9835 8.3824 12.9311C8.50441 12.8787 8.61475 12.8025 8.707 12.707L10 11.414L11.293 12.707C11.4816 12.8892 11.7342 12.99 11.9964 12.9877C12.2586 12.9854 12.5094 12.8802 12.6948 12.6948C12.8802 12.5094 12.9854 12.2586 12.9877 11.9964C12.99 11.7342 12.8892 11.4816 12.707 11.293L11.414 10L12.707 8.707C12.8892 8.5184 12.99 8.2658 12.9877 8.0036C12.9854 7.7414 12.8802 7.49059 12.6948 7.30518C12.5094 7.11977 12.2586 7.0146 11.9964 7.01233C11.7342 7.01005 11.4816 7.11084 11.293 7.293L10 8.586L8.707 7.293Z" fill="#7A869A" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <CustomAgeFilterButton name="Age" onChange={handleAgeChange} />
                    <CustomFilterButton name="Booking Type" options={bookingTypeOptions} onChange={handleBookingChange} />
                    <CustomFilterButton active={category} name="Category" options={categoryOptions} onChange={handleCategoryChange} />
                    <CustomFilterButton name="Month" options={monthOptions} onChange={handleMonthChange} />
                    {/* <CustomFilterButton name="Day" options={dayOptions} onChange={handleDayChange} /> */}
                    <MultiRangeSlider min={0} max={24} name="Time" onChange={handleTimeChange} />
                </div>

                <section className='mt-8'>
                    <GoogleMap
                        apiKey="AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8"
                        defaultCenter={{ lat: 24.7155288, lng: 46.4870344 }}
                        defaultZoom={10}
                        options={mapOptions}
                        mapMinHeight="400px"
                        onGoogleApiLoaded={onGoogleApiLoaded}
                        onChange={(map) => console.log('Map moved', map)}
                    >
                        {coordinates.map(({ lat, lng, name, title }, index) => (
                            <Marker
                                lat={lat}
                                lng={lng}
                                key={index}
                                markerId={name}
                                activity={title}
                                onClick={onMarkerClick} // you need to manage this prop on your Marker component!
                                draggable={false}
                            // onDragStart={(e, { latLng }) => {}}
                            // onDrag={(e, { latLng }) => {}}
                            // onDragEnd={(e, { latLng }) => {}}
                            />
                        ))}
                    </GoogleMap>
                </section>

                <section className='flex flex-col gap-8 mt-8'>
                    {
                       data.length > 0 ? data.map((item: any) => (
                            <Link key={item} href={`/${item.id}`} className="flex md:flex-row flex-col items-start gap-4 bg-white border overflow-hidden rounded-xl">
                                <img src={item.thumbnailPicture} className='w-full md:max-w-[400px] h-full object-cover' />
                                <div className='w-full p-4'>
                                    <div className="flex justify-between items-center mb-4">
                                        <p className='text-[#5641DA] font-semibold'>{item.category}</p>
                                        <p className='font-thin flex items-center gap-2'>
                                            <Icon.star />
                                            <span className='mt-1'> {item.averageRating} ({item.numberOfRatings}) </span>
                                        </p>
                                    </div>
                                    <h3 className='font-medium text-xl mb-2 truncate'>{item.title}</h3>
                                    <p className='font-thin mb-4'>Age {item.ageRangeStart} - {item.ageRangeEnd} Years</p>
                                    <p className='text-[#5641DA] font-semibold'>{formatDate(item.activityStartDate)}, {formatTime(item.activityStartTime)} - {formatDate(item.activityEndDate)}, {formatTime(item.activityEndTime)}</p>
                                    <p className='mt-4'><span className='text-primary font-semibold text-lg'>${item.singleSessionPrice ? item.singleSessionPrice : item.fullCoursePrice}</span> SAR/Month</p>
                                </div>
                            </Link>
                        )): <EmptyState />
                    }
                </section>

            </main>
        </>
    )
}

export default page
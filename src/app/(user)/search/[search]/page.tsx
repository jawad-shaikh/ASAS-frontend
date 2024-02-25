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
const page = ({ params }: any) => {
    console.log(params.search);

    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: 'AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8',
        onPlaceSelected: (place) => {
            console.log('lat', place.geometry?.location?.lat());
            console.log('lng', place.geometry?.location?.lng());
            console.log("formattedAddress", place.formatted_address)
        }
    });

    const monthOptions = [
        { name: 'January', value: 'january' },
        { name: 'February', value: 'february' },
        { name: 'March', value: 'march' },
        { name: 'April', value: 'april' },
        { name: 'May', value: 'may' },
        { name: 'June', value: 'june' },
        { name: 'July', value: 'july' },
        { name: 'August', value: 'august' },
        { name: 'September', value: 'september' },
        { name: 'October', value: 'october' },
        { name: 'November', value: 'november' },
        { name: 'December', value: 'december' },
    ];

    const dayOptions = [
        { name: 'Monday', value: 'monday' },
        { name: 'Tuesday', value: 'tuesday' },
        { name: 'Wednesday', value: 'wednesday' },
        { name: 'Thursday', value: 'thursday' },
        { name: 'Friday', value: 'friday' },
        { name: 'Saturday', value: 'saturday' },
        { name: 'Sunday', value: 'sunday' },
    ];

    const timeOptions = [
        { name: '01', value: '01' },
        { name: '02', value: '02' },
        { name: '03', value: '03' },
        { name: '04', value: '04' },
        { name: '05', value: '05' },
        { name: '06', value: '06' },
        { name: '07', value: '07' },
        { name: '08', value: '08' },
        { name: '09', value: '09' },

    ];

    const [selectedMonthOptions, setSelectedMonthOptions] = useState<any[]>([]);
    const [selectedDayOptions, setSelectedDayOptions] = useState<any[]>([]);
    const [selectedTimeOptions, setSelectedTimeOptions] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);

    const mapRef = useRef<any>(null)
    const [mapReady, setMapReady] = useState(false)

    const onGoogleApiLoaded = ({ map, maps }: any) => {
        mapRef.current = map
        setMapReady(true)
    }

    const onMarkerClick = (e: any, { markerId, lat, lng }: any) => {
        console.log('This is ->', markerId)

        // inside the map instance you can call any google maps method
        mapRef.current.setCenter({ lat, lng })
        // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
    }


    const handleMonthChange = (selectedOptions: any[]) => {
        setSelectedMonthOptions(selectedOptions);
        // Handle month filter change logic here
        console.log('Selected month options:', selectedOptions);
    };

    const handleDayChange = (selectedOptions: any[]) => {
        setSelectedDayOptions(selectedOptions);
        // Handle day filter change logic here
        console.log('Selected day options:', selectedOptions);
    };

    const handleTimeChange = (selectedOptions: any[]) => {
        setSelectedTimeOptions(selectedOptions);
        // Handle time filter change logic here
        console.log('Selected time options:', selectedOptions);
    };


    const getData = async () => {
        const { data } = await axios.get("https://cpxrkdz4-6600.inc1.devtunnels.ms/api/v1/activities");
        setData(data.data)
    }

    // Coordinates for markers
    const coordinates = [
        { lat: 45.4046987, lng: 12.2472504, name: 'Marker 1' },
        { lat: 45.4046987, lng: 15.2472504, name: 'Marker 2' },

        // Add more coordinates as needed
    ];

    // Map options
    const mapOptions = {};


    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <main className='container py-12'>
                
                <div className='flex items-center gap-4 flex-wrap'>
                    <input ref={ref as unknown as LegacyRef<HTMLInputElement>} className='px-6 py-2 text-sm font-medium rounded-full border border-black text-black' />
                    <CustomFilterButton name="Age" options={monthOptions} onChange={handleMonthChange} />
                    <CustomFilterButton name="Booking Type" options={monthOptions} onChange={handleMonthChange} />
                    <CustomFilterButton name="Category" options={monthOptions} onChange={handleMonthChange} />
                    <CustomFilterButton name="Month" options={monthOptions} onChange={handleMonthChange} />
                    <CustomFilterButton name="Day" options={dayOptions} onChange={handleDayChange} />
                    <CustomFilterButton name="Time" options={timeOptions} onChange={handleTimeChange} />
                </div>

                <section className='mt-8'>
                    <GoogleMap
                        apiKey="AIzaSyALid_clJdG76KwqFhqa5qvNqRb8dTt-h8"
                        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
                        defaultZoom={5}
                        options={mapOptions}
                        mapMinHeight="400px"
                        onGoogleApiLoaded={onGoogleApiLoaded}
                        onChange={(map) => console.log('Map moved', map)}
                    >
                        {coordinates.map(({ lat, lng, name }, index) => (
                            <Marker
                                lat={lat}
                                lng={lng}
                                key={index}
                                markerId={name}
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
                        data.map((item: any) => (
                            <Link key={item} href="" className="flex items-start gap-8 bg-white border rounded-xl">
                                <img src="/thumbnail.png" className='max-w-[400px]' />
                                <div className='w-full mt-4 mr-4'>
                                    <div className="flex justify-between items-center w-full mb-4">
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
                        ))
                    }
                </section>

            </main>
        </>
    )
}

export default page
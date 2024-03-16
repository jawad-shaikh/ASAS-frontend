import { LatLngLiteral } from "google-maps-react-markers";
import React from "react";

interface MarkerProps {
  className?: string;
  draggable: boolean;
  lat: number;
  lng: number;
  markerId: string;
  activity: string;
  onClick?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { lat: number; lng: number; markerId: string }
  ) => void;
  onDrag?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
  onDragEnd?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
  onDragStart?: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    props: { latLng: LatLngLiteral }
  ) => void;
}

const Marker = ({
  className,
  lat,
  lng,
  markerId,
  activity,
  onClick,
  draggable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDrag,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragEnd,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragStart,
  ...props
}: MarkerProps) =>
  lat && lng ? (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div className="relative group">
      <span className="hidden group-hover:block absolute bottom-full p-2 text-center left-[60%] translate-x-[-40%] min-w-[8rem] bg-white rounded-md">
        {  activity}
      </span>
      <img
        className={className}
        src={`/marker-pin-draggable.png`}
        // lat={lat}
        // lng={lng}
        onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
        style={{ fontSize: 40 }}
        alt={markerId}
        width={35}
        height={35}
        {...props}
      />
    </div>
  ) : null;

export default Marker;

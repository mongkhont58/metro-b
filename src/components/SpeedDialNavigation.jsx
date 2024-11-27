'use client';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SpeedDialNavigation({ info }) {

  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-10 -translate-y-2/4 -translate-x-3/4 font-normal bg-white shadow-xl p-2 border rounded-lg w-32 text-center",
  }

  return (
    <div className="relative h-80 w-full">
      <div className="absolute bottom-0 right-0">
        {info?.data?.call_to_action?.length > 0 &&
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton size="lg" className="rounded-full bg-green-500">
                <PhoneIcon className="h-5 w-5 transition-transform" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              {
                info?.data?.call_to_action?.map((item, index) => {
                  return (
                    <SpeedDialAction className="relative" key={index} onClick={() => window.open(item?.link, "_blank")}>
                      <Image src={item?.img} alt="speed-dial-facebook" width={40} height={40} />
                      <Typography {...labelProps}>{item?.title}</Typography>
                    </SpeedDialAction>
                  )
                })
              }
            </SpeedDialContent>
          </SpeedDial>
        }
      </div>
    </div>
  );
}
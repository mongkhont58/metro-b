'use client';
import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const ITAPage = ({ data }) => {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-[95%] lg:w-[70rem] bg-white p-4 lg:p-10 border rounded-3xl flex flex-col gap-4">
        <div className="text-center text-2xl mb-4">{data?.title ?? ''}</div>
        {data?.list?.map((item, index) => (
          <div key={index}>
            <div className='text-xl'>
              {item?.title ?? ''}
            </div>
            {item?.list?.map((list, listIndex) => (
              <div className='gap-2 grid' key={`${index}_${listIndex}`}>
                <Accordion open={open === `${index}_${listIndex}`} icon={<Icon id={`${index}_${listIndex}`} open={open} />}>
                  <AccordionHeader className='text-lg py-2 text-inherit' onClick={() => handleOpen(`${index}_${listIndex}`)}>{list?.title ?? ''}</AccordionHeader>
                  <AccordionBody className='grid gap-2 pb-2 text-inherit'>
                    {list.list.map((list2, list2Index) => (
                      <div key={`${index}_${listIndex}_${list2Index}`}>
                        <div className='font-bold'>
                          {list2.title}
                        </div>
                        {list2.list?.map((list3, list3Index) => (
                          <div className='grid gap-2' key={`${index}_${listIndex}_${list2Index}_${list3Index}`}>
                            <div className='lg:flex gap-2 pl-4'>
                              <div>{list3.title}</div>
                              {list3?.link.map((list4, list4Index) => (
                                <a key={`${index}_${listIndex}_${list2Index}_${list3Index}_${list4Index}`} href={list4} target='_blank' rel='noopener noreferrer'>
                                  <div className='text-primary text-nowrap'>[คลิกดูข้อมูล]</div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </AccordionBody>
                </Accordion>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ITAPage
'use client';
import React, { useEffect, useRef } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function NavListChild({ title, list, content_id }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
        className='font-sarabun'
      >
        <MenuHandler>
          <Typography as="div">
            <ListItem
              className={`flex items-center gap-2 py-2 pr-4 text-nowrap bg-transparent text-[#496488]`}
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:flex flex-col gap-1">
          {list?.map((item, index) => {
            if (item.code === 'content') {
              return (
                <Link href={item?.code ? `/${item.code}/${content_id}/${item.id}` : ''} key={index}>
                  <MenuItem className={pathname === `/content/${content_id}/${item.id}` ?
                    'bg-primary hover:bg-primary' : 'bg-transparent hover:bg-primary'
                  }>
                    {item?.title}
                  </MenuItem>
                </Link>
              )
            } else {
              return (
                <Link href={item?.code ? `/${item.code}/${item.id}` : ''} key={index}>
                  <MenuItem className={pathname === `/${item.code}/${item.id}` ?
                    'bg-primary hover:bg-primary' : 'bg-transparent hover:bg-primary'
                  }>
                    {item?.title}
                  </MenuItem>
                </Link>
              )
            }
          })}
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          {list?.map((item, index) => {
            return (
              <Link href={item?.code ? `/${item.code}/${item.id}` : ''} key={index}>
                <MenuItem
                  className={pathname === `/${item.code}/${item.id}` ? 'bg-primary hover:bg-primary' : 'bg-transparent hover:bg-primary'}
                >
                  {item?.title}
                </MenuItem>
              </Link>
            )
          })}
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList({ list }) {
  const pathname = usePathname()

  return (
    <List className="font-sarabun mt-[0.65rem] p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1 bg-white max-w-full border-white-200 opacity-100 border-white-200 flex items-center lg:gap-4">
      {list?.map((item, index) => {
        if (item.list.length > 0) {
          return (
            <NavListChild key={index} list={item.list} title={item.title} content_id={item.id} content_code={item.code} />
          )
        } else if (item.code === 'content') {
          return (
            <Menu
              placement="bottom"
              className='font-sarabun'
              key={index}
            >
              <MenuHandler>
                <Typography as="div">
                  <Link
                    key={index}
                    href={item?.code ? `/${item.code}/${item.id}` : ''}
                    className={`header-nav flex items-center gap-2 py-2 text-nowrap ${item?.code &&
                      pathname.split('/')[1] === item?.code &&
                      pathname.split('/')[2] === `${item?.id}` ? 'active' : ''
                      }`}
                  >
                    <div>
                      {item?.title}
                    </div>
                  </Link>
                </Typography>
              </MenuHandler>
            </Menu>
          )
        } else {
          return (
            <Menu
              placement="bottom"
              className='font-sarabun'
              key={index}
            >
              <MenuHandler>
                <Typography as="div">
                  <Link key={index} href={item?.code ? `/${item.code}` : ''} className={`header-nav flex items-center gap-2 py-2 text-nowrap ${item?.code && pathname.split('/')[1] === item?.code ? 'active' : ''}`}>
                    <div>
                      {item?.title}
                    </div>
                  </Link>
                </Typography>
              </MenuHandler>
            </Menu>
          )
        }
      })}
    </List>
  );
}

export default function NavigationBarHeader({ info }) {
  const [openNav, setOpenNav] = React.useState(false)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const header = info?.data?.header ?? null

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setOpenNav(false);
      prevPathname.current = pathname
    }
  }, [pathname])

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <Navbar className="font-sarabun sticky top-0 z-40 mx-auto max-w-full py-2 lg:h-[4.5rem] px-0 rounded-none bg-opacity-100">
      <div className="flex items-center justify-between text-blue-gray-900 px-4">
        <Link href="/" className="flex items-center gap-2">
          {header?.logo &&
            <Image
              src={header?.logo}
              alt="Logo"
              width={100}
              height={100}
              className="cursor-pointer w-[2.5rem] h-[2.5rem] lg:w-[3.5rem] lg:h-[3.5rem] object-contain"
            />
          }
          <div className="text-xl lg:text-2xl font-bold hover:cursor-pointer unset-link">{header?.title ?? ''}</div>
        </Link>
        <div className="hidden lg:block overflow-x-auto">
          <NavList list={header?.list} />
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList list={header?.list} />
      </Collapse>
    </Navbar>
  );
}
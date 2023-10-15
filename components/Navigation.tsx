"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const nav = [
    {
      name: "dashboard",
      uri: "/dashboard",
      image:
        '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" fill="currentColor"/></svg>',
    },
    {
      name: "account",
      uri: "/account",
      image:
        '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" fill="currentColor"/></svg>',
    },
  ];

  return (
    <div className="navigation fixed flex justify-center gap-8 pt-2 w-full min-h-[10vh] bottom-0 rounded-t-3xl bg-white">
      {nav.map((item, index) => (
        <Link
          key={index}
          className="relative flex flex-col items-center pt-3"
          href={item.uri}
        >
          {pathname === item.uri ? (
            <span className="absolute top-0 text-[10px] text-violet-700">
              &#x25CF;
            </span>
          ) : null}
          <span
            className={`${
              pathname === item.uri ? "text-violet-700" : "text-black"
            }`}
            dangerouslySetInnerHTML={{ __html: item.image }}
          />
        </Link>
      ))}
    </div>
  );
};

export default Navigation;

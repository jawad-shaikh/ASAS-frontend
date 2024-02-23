const Navbar = ({ user }: any) => {
  return (
    <header className="flex items-center justify-end py-4 px-6 gap-4 bg-white">
      {/* <ul className='flex items-center'>
                <li>
                    <Link href="/" className='px-2 font-medium text-sm'>
                        Online
                    </Link>
                </li>
                <li>
                    <Link href="/" className='px-2 font-medium text-sm'>
                        In Person
                    </Link>
                </li>
                <li>
                    <Link href="/" className='px-2 font-medium text-sm'>
                        Blog
                    </Link>
                </li>
            </ul> */}

      <button className="border border-border rounded-2xl flex items-center gap-4 px-4 py-2">
        {user?.profilePicture ? (
          <img
            src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            height={30}
            width={30}
            alt="logo"
            className="rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rounded-full"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}

        <div className="flex flex-col items-end">
          <p className="font-semibold">Hi, {user?.fullName}</p>
          <p className="text-xs">{user?.role === "ACTIVITY_PROVIDER" ? "PROVIDER" : user?.role}</p>
        </div>
        {/* <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="black" />
                </svg> */}
      </button>
    </header>
  );
};

export default Navbar;

import Logo from "./components/Logo";

export default function page() {
  return (
    <div className="min-h-screen min-w-full container mx-auto bg-bng text-text  px-4 md:px-8 flex flex-col justify-center  ">
      <div className="h-full w-full">
        <Logo />
      </div>
      <div className="mt-4">
        <h1 className="text-4xl font-bold text-gray-800">
          an unopinionated aesthetic
          <br />
          routine generator.
        </h1>
      </div>
      {/* <div className=" relative  flex items-center justify-center h-[100px] lg:h-[500px]  overflow-hidden">
        <div className="hidden lg:block w-[100px] h-full bg-primary  absolute left-0"></div>
        <div className="hidden lg:block w-[100px] h-full bg-secondary  absolute right-0"></div>
        <div className="hidden lg:block w-[100px] h-full bg-accent   absolute right-[120px]"></div>
        <div className="hidden md:block w-[700px] h-full bg-sky-300  absolute"></div>
        <div className="hidden md:block w-[700px] h-full bg-sky-400   absolute top-[50%]"></div>

        <Login />
      </div> */}
    </div>
  );
}

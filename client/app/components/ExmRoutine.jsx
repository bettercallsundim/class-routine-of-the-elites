"use client";

export default function ExmRoutine({ routine, handleDataChange }) {
  // const [routine, setRoutine] = useState([]);
  // const routine = [
  //   {
  //     day: "Saturday",
  //     date: "20-01-24",
  //     sub: "CSE-211 (SRD)",
  //     room: "509, 512",
  //     time: "03:00pm - 05:00pm",
  //   },
  //   {
  //     day: "Monday",
  //     date: "22-01-24",
  //     sub: "BDS-211 (ARS)",
  //     room: "508, 512",
  //     time: "10:30am - 12:30pm",
  //   },
  //   {
  //     day: "Wednesday",
  //     date: "24-01-24",
  //     sub: "MAT-131 (AAS)",
  //     room: "507, 512",
  //     time: "10:30am - 12:30pm",
  //   },
  //   {
  //     day: "Saturday",
  //     date: "27-01-24",
  //     sub: "CSE-213 (AZ)",
  //     room: "509",
  //     time: "03:00pm - 05:00pm",
  //   },
  // ];
  // useEffect(() => {
  //   fetch("https://vprime-bettercallsundim.vercel.app/api")
  //     .then((res) => res.json())
  //     .then((res) => setRoutine(res[2].routine));
  // }, []);
  console.log(routine, "routine");
  return (
    <div className="routine">
      <h4 className="bg-rose-900 px-8 text-4xl text-white font-medium py-2 jokename">
        Prime University{" "}
      </h4>
      <h4 className="bg-white px-8 text-xl text-black font-medium py-2 tags">
        Routine Of &nbsp; CSE / 61'st (D) / Group - B
        <p className="mt-2">
          <span className="ml-[0rem] font-bold text-sm mr-4 text-rose-500">
            #summer2023
          </span>
          <span className="font-bold text-sm mr-4  text-sky-500">#cse61D</span>
          <span className="text-orange-400 font-bold text-sm mr-4 ">
            Updated : 02/06/23
          </span>
        </p>
      </h4>

      <div className="anotherOne flex flex-col md:flex-row gap-8 mt-8">
        <div className="order-2 md:order-1 table text-white text-[20px] font-jost ">
          <table className="">
            {/* <tr className="text-center exmday">
              <td>Date</td>
              <td>Exams</td>
            </tr> */}
            {routine?.map((elm, ind1) => (
              <tr className="py-2">
                {elm?.exams?.length > 0 && <td>{elm?.date}</td>}

                {elm?.exams?.map((exm, ind2) => {
                  return (
                    <td
                      onClick={() => handleDataChange(exm, ind1, ind2)}
                      className="py-2    px-2 basis-[100%] font-bold exmday"
                    >
                      <p>
                        {exm?.date} {exm?.room} {exm?.time[0]} {exm?.time[1]}{" "}
                        {exm?.subName} {exm?.tname}
                      </p>
                    </td>
                  );
                })}
              </tr>
            ))}
          </table>
        </div>

        {/* <div className="order-1 md:order-2 profile_info md:text-3xl text-white flex md:flex-col justify-between">
            <p className="md:text-xl">
              <p className="mb-2">Todays Date : </p>
              <p className="text-orange-400 md:text-4xl font-josefin">
                {today},
              </p>
              <span className="">{todate}</span>
            </p>

            <p className="md:mt-16">
              CSE /61 <sup>st</sup>
              <p>Section : {sec}</p>
            </p>
          </div> */}
      </div>
    </div>
  );
}

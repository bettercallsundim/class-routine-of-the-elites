"use client";
const theme = [
  {
    time: "time1",
    tname: "tname1",
    room: "room1",
    sub: "sub1",
    table: "table1",
  },
  {
    time: "time2",
    tname: "tname2",
    room: "room2",
    sub: "sub2",
    table: "table2",
  },
];
let themeClassInd = 1;
import "@/app/globals.css";
import "@/app/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function RoutinePage() {
  const [routine, setRoutine] = useState([]);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const emails = localStorage.getItem("email");
    if (emails) {
      setEmail(emails);
      fetchUser();
    }
  }, []);
  useEffect(() => {

      fetchUser();

  }, [email]);


  async function fetchUser() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/user/${email}`)
      .then((res) => {
        console.log(res, "user fetched");
        setRoutine(res.data.user.routine);
      })
      .catch((res) => {
        console.log("failed");
      });
  }
  // Get current date
  let currentDate = new Date();

  // Get day, month, and year
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
  let year = currentDate.getFullYear();

  // Add leading zeros if necessary
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Construct the date string in the desired format
  let formattedDate = `${day}/${month}/${year}`;

  console.log(formattedDate); // Output: e.g., 20/02/2024

  return (
    <div className="routine">
      <h4 className="bg-rose-900 px-8 text-4xl text-white font-medium py-2 jokename">
        Prime University{" "}
      </h4>
      <h4 className="bg-white px-8 text-xl text-black font-medium py-2 tags">
        Routine Of &nbsp; CSE / 61'st (D) / Group - B
        <p className="mt-2">
          <span className="ml-[0rem] font-bold text-sm mr-4 text-rose-500">
            #spring2024
          </span>
          <span className="font-bold text-sm mr-4  text-sky-500">#cse61D</span>
          <span className="text-orange-400 font-bold text-sm mr-4 ">
            Updated : {formattedDate}
          </span>
        </p>
      </h4>

      <div className="anotherOne flex flex-col md:flex-row gap-8 mt-2 w-full">
        <div className="order-2 md:order-1 table text-white text-[20px] font-jost w-full">
          <table className={`${theme[themeClassInd].table} w-full`}>
            {routine?.map((elm, row) => {
              if (elm.classes.length > 0) {
                return (
                  <tr className={`trtr`}>
                    {/* <tr className={`${ind & 5 ? "bg-gray-700 " : "bg-gray-800"}`}> */}

                    <th className="pl-1 md:p-2">{elm?.day}</th>
                    {elm?.classes?.map((classData, col) => (
                      <td>
                        <p
                          className={`t bg-lime-600 px-2 rounded-md md:rounded-full my-2   font-semibold text-center bxsh ${theme[themeClassInd].time}`}
                        >
                          {classData?.time[0]} - {classData?.time[1]}
                        </p>
                        <p className="flex md:block flex-wrap flex-row ">
                          <span
                            className={`text-black bg-white px-2 basis-[100%] font-semibold bxsh rounded-md md:rounded-full ${theme[themeClassInd].sub}`}
                          >
                            {classData?.subName}
                          </span>{" "}
                          <span
                            className={`bg-rose-600 px-2  font-semibold flex-grow-0 bxsh  rounded-md md:rounded-full ${theme[themeClassInd].tname}`}
                          >
                            {classData?.tname}
                          </span>
                          <span className="hidden md:inline-block"></span>
                          {"   "}&nbsp;
                          <span
                            className={`bg-sky-600 px-2  mb-2  font-semibold bxsh  rounded-md md:rounded-full ${theme[themeClassInd].room} `}
                          >
                            {classData?.room}
                          </span>
                        </p>
                        <p></p>
                      </td>
                    ))}
                  </tr>
                );
              } else {
                return undefined;
              }
            })}
          </table>
          <hr />
        </div>
      </div>
    </div>
  );
}

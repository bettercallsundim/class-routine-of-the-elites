"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Routine from "../components/Routine";
const routine = [
  {
    day: "Monday",
    classes: [
      {
        tname: "JA",
        subName: "CSE",
        time: "9:00am - 10:30am",
        room: 507,
      },
      {
        tname: "AA",
        subName: "ELC",
        time: "12:10 pm - 01:40 pm",
        room: 513,
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        tname: "JA",
        subName: "CSE",
        time: "9:00am - 10:30am",
        room: 505,
      },
      {
        tname: "MAA",
        subName: "CEL",
        time: "10:35am - 12:05 pm",
        room: 406,
      },
      {
        tname: "AA",
        subName: "ELC",
        time: "12:10am - 01:40 pm",
        room: 507,
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        tname: "JA",
        subName: "CSE",
        time: "12:10 pm - 01:40 pm",
        room: 507,
      },
      {
        tname: "RR",
        subName: "MAT",
        time: "02:10 pm - 03:40 pm",
        room: 507,
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        tname: "RR",
        subName: "MAT",
        time: "02:05 pm - 03:35 pm",
        room: 508,
      },
      {
        tname: "MAA",
        subName: "CEL",
        time: "03:40 pm - 05:10 pm",
        room: 508,
      },
    ],
  },
];
let initRoutine = [
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
  {
    day: "",
    classes: [],
  },
];
const page = memo(() => {
  const router = useRouter();
  const [imgsrc, setImgsrc] = useState("");
  const [uniName, setUniName] = useState("");
  const [semiName, setSemiName] = useState("");
  const [depName, setDepName] = useState("");
  const [batch, setBatch] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [routineLoading, setRoutineLoading] = useState(false);
  const rootRef = useRef(null);
  const rootdayref = useRef(null);
  const dayref = useRef(null);
  const roottnameref = useRef(null);
  const tnameref = useRef(null);
  const rootsubNameref = useRef(null);
  const subNameref = useRef(null);
  const rootroomref = useRef(null);
  const roomref = useRef(null);
  const starttimeref = useRef(null);
  const endtimeref = useRef(null);
  const user = useSelector((state) => state.globalSlice.user);
  console.log("🚀 ~ page ~ user:", user);

  let [r, setR] = useState(initRoutine);
  let [indexes, setIndexes] = useState(null);
  let [email, setEmail] = useState(null);
  let [needDataChange, setNeedDataChange] = useState(0);
  console.log(r, "userdbbbb");
  let [themeClassInd, setthemeClassInd] = useState(0);
  let [currentState, setCurrentState] = useState({
    day: "",
    tname: "",
    subName: "",
    room: "",
    time: ["", ""],
    ind: 0,
  });

  function handleDataChange(classData, row, col) {
    setNeedDataChange(1);
    setIndexes({ row, col, classData });
    //updating room value
    roomref.current.value = +classData.room;

    //updating time value
    function formatTime(inputTime) {
      const [hours, minutes] = inputTime.split(":");
      const formattedHours = hours.length === 1 ? "0" + hours : hours;
      const formattedTime = formattedHours + ":" + minutes;
      return formattedTime;
    }

    const convert12hTo24h = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      console.log(time, modifier, "time modifirer");
      let [hours, minutes] = time.split(":");
      if (hours === "12") {
        hours = "00";
      }
      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    };
    // const convert12hTo24h = (timeStr) => {
    //   const [time, modifier] = timeStr.split(" ");
    //   let [hours, minutes] = time.split(":");

    //   // Convert hours and minutes to integers
    //   hours = parseInt(hours, 10);
    //   minutes = parseInt(minutes, 10);

    //   if (modifier === "PM" && hours !== 12) {
    //     // Add 12 to hours for PM times (except 12:00 PM)
    //     hours = (hours + 12) % 24;
    //   } else if (modifier === "AM" && hours === 12) {
    //     // Special case: 12:00 AM should be converted to 00:00
    //     hours = 0;
    //   }

    //   // Pad hours and minutes with leading zeros if necessary
    //   hours = hours.toString().padStart(2, "0");
    //   minutes = minutes.toString().padStart(2, "0");

    //   return `${hours}:${minutes}`;
    // };
    console.log(
      formatTime(classData.time[0].split(" ")[0]) +
        classData.time[0].split(" ")[1],
      "hihhh"
    );
    console.log(
      convert12hTo24h(
        formatTime(classData.time[0].split(" ")[0]),
        classData.time[0].split(" ")[1]
      ),
      "what the"
    );
    starttimeref.current.value = convert12hTo24h(
      formatTime(classData.time[0].split(" ")[0]) +
        " " +
        classData.time[0].split(" ")[1]
    );
    endtimeref.current.value = convert12hTo24h(
      formatTime(classData.time[1].split(" ")[0]) +
        " " +
        classData.time[1].split(" ")[1]
    );
    // const roottimeref_options = roottimeref.current.options;
    // for (let i = 0; i < roottimeref_options.length; i++) {
    //   if (classData.time == roottimeref_options[i].innerHTML) {
    //     roottimeref.current.selectedIndex = i;
    //     break;
    //   }
    // }

    //updating day value
    const rootdayref_options = rootdayref.current.options;
    rootdayref.current.selectedIndex = row + 1;

    //updating teacherName value
    tnameref.current.value = classData.tname;

    // const roottnameref_options = roottnameref.current.options;
    // for (let i = 0; i < roottnameref_options.length; i++) {
    //   if (classData.tname == roottnameref_options[i].innerHTML) {
    //     roottnameref.current.selectedIndex = i;
    //     break;
    //   }
    // }

    //updating subName value
    subNameref.current.value = classData.subName;
    // const rootsubNameref_options = rootsubNameref.current.options;
    // for (let i = 0; i < rootsubNameref_options.length; i++) {
    //   if (classData.subName == rootsubNameref_options[i].innerHTML) {
    //     rootsubNameref.current.selectedIndex = i;
    //     break;
    //   }
    // }
    setCurrentState({
      day: rootdayref_options[row + 1].innerHTML,
      tname: classData.tname,
      subName: classData.subName,
      room: +classData.room,
      time: classData.time,
      ind: row,
    });
  }
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
  function changeTheme() {
    if (themeClassInd == theme.length - 1) {
      setthemeClassInd(0);
    } else {
      setthemeClassInd((prev) => prev + 1);
    }
  }
  function handleTname(e) {
    setCurrentState({
      ...currentState,
      tname: e.target.value,
    });
  }
  function handleRoom(e) {
    setCurrentState({
      ...currentState,
      room: e.target.value,
    });
  }
  function handleSubname(e) {
    setCurrentState({
      ...currentState,
      subName: e.target.value,
    });
  }
  function handleDay(e) {
    setCurrentState({
      ...currentState,
      day: e.target[e.target.selectedIndex].innerHTML,
      ind: parseInt(e.target.value) - 1,
    });
  }
  function handleStartTime(e) {
    const timeString = e.target.value.split(" ")[0];
    const timeString12hr = new Date(
      "1970-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    let time = currentState.time;
    time[0] = timeString12hr;
    setCurrentState({
      ...currentState,
      time,
    });
  }
  function handleEndTime(e) {
    const timeString = e.target.value.split(" ")[0];
    const timeString12hr = new Date(
      "1970-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    let time = currentState.time;
    time[1] = timeString12hr;
    setCurrentState({
      ...currentState,
      time,
    });
  }

  function setInputNull() {
    setCurrentState({
      day: "",
      tname: "",
      subName: "",
      room: "",
      time: ["", ""],
      ind: 0,
    });
    dayref.current.selected = true;
    tnameref.current.value = "";
    subNameref.current.value = "";
    roomref.current.value = "";
    starttimeref.current.value = "";
    endtimeref.current.value = "";
    setIndexes(null);
    setNeedDataChange(0);
    console.log("input null");
  }
  function handleSubmit() {
    console.log(currentState);
    if (
      currentState.day &&
      currentState.tname &&
      currentState.subName &&
      currentState.room &&
      currentState.time
    ) {
      let newR = r;
      newR[currentState.ind].day = currentState.day;
      newR[currentState.ind].classes.push({
        tname: currentState.tname,
        subName: currentState.subName,
        time: currentState.time,
        room: currentState.room,
      });
      setR(newR);
      setInputNull();
      setNeedDataChange(0);
    } else {
      alert("Please fill all the fields");
    }
  }
  function handleUpdate() {
    console.log(currentState);
    if (
      currentState.day &&
      currentState.tname &&
      currentState.subName &&
      currentState.room &&
      currentState.time
    ) {
      setNeedDataChange(0);
      let newR = r;
      newR[indexes.row].classes[indexes.col] = {
        tname: currentState.tname,
        subName: currentState.subName,
        time: currentState.time,
        room: currentState.room,
      };
      setR(newR);
      setInputNull();
    } else {
      console.log(r);
      alert("Please fill all the fields");
    }
  }
  function handleDelete() {
    let newR = r;
    console.log(indexes, "from delte");
    if (!indexes) return;
    newR[indexes.row].classes.splice(indexes.col, 1);
    setR(newR);
    setInputNull();
    setNeedDataChange(0);
  }
  function handleLeft() {
    if (!indexes) return;

    let { row, col, classData } = indexes;
    if (col != 0) {
      let newR = r;
      console.log("hi", row, col);
      let temp = newR[row].classes[col];
      newR[row].classes[col] = newR[row].classes[col - 1];
      newR[row].classes[col - 1] = temp;
      setR(newR);
      handleDataChange(classData, row, col);
      setInputNull();
      setNeedDataChange(0);
    }
  }
  function handleRight() {
    if (!indexes) return;
    let { row, col, classData } = indexes;
    if (col != r[row].classes.length - 1) {
      let newR = r;
      console.log("hiiiii", row, col);
      let temp = newR[row].classes[col];
      newR[row].classes[col] = newR[row].classes[col + 1];
      newR[row].classes[col + 1] = temp;
      setR(newR);
      handleDataChange(classData, row, col);
      setInputNull();
      setNeedDataChange(0);
    }
  }
  async function handleSaveRoutine() {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/user/saveRoutine`, {
        email: email,
        routine: r,
      })
      .then((res) => {
        const notify = () =>
          toast.success("Routine saved to database.", {
            duration: 2000,
          });

        notify();
        console.log(res, "success");
      })
      .catch((res) => {
        console.log("failed");
      });
    localStorage.setItem("uniName", uniName);
    localStorage.setItem("semiName", semiName);
    localStorage.setItem("depName", depName);
    localStorage.setItem("batch", batch);
  }
  async function fetchUser() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/user/${email}`)
      .then((res) => {
        console.log(res, "user fetched");
        setR(res.data.user.routine);
        setRoutineLoading(false);
        // Create a browser instance
      })
      .catch((res) => {
        console.log("failed");
        setRoutineLoading(false);
        fetchUser();
      });
    // setRoutineLoading(false);
  }

  async function handleDownload() {
    const id = localStorage.getItem("email");
    setDownloadLoading(true);
    const colLength = Math.max(...r.map((day) => day.classes.length));
    const rowLength = r
      .map((day) => day.classes.length)
      .filter((count) => count > 0).length;

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/user/download`,
        {
          email,
          row: rowLength,
          col: colLength,
          uniName,
          semiName,
          depName,
          batch,
          themeClassInd,
        },
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        // Function to convert ArrayBuffer to base64
        const arrayBufferToBase64 = (buffer) => {
          let binary = "";
          const bytes = new Uint8Array(buffer);
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };
        console.log(res, "user download request done");
        const screenshot = arrayBufferToBase64(res.data);
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${screenshot}`;
        link.download = "Routine.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadLoading(false);
        console.log("🚀 ~ .then ~ screenshot:", screenshot);
      })
      .catch((res) => {
        console.log("failed", res);
        handleDownload();
      });
  }
  useEffect(() => {
    setRoutineLoading(true);
    fetchUser();
    const uniNames = localStorage.getItem("uniName");
    const semiNames = localStorage.getItem("semiName");
    const depNames = localStorage.getItem("depName");
    const batchs = localStorage.getItem("batch");
    if (uniNames) {
      setUniName(uniNames);
    }
    if (semiNames) {
      setSemiName(semiNames);
    }
    if (depNames) {
      setDepName(depNames);
    }
    if (batchs) {
      setBatch(batchs);
    }
  }, []);
  useEffect(() => {
    let emailGot = localStorage.getItem("email");
    if (emailGot) {
      setEmail(emailGot);
    } else {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    setRoutineLoading(true);
    fetchUser();
  }, [email]);

  return (
    <div className="rootInput">
      <Toaster position="top-right" reverseOrder={false} />

      <div className=" bg-[rgba(0,0,0,0.9)] text-white px-8 py-4">
        <div className="py-4">
          <div className="flex  items-center mb-6">
            <p className="w-[30%] mr-4">
              <input
                type="text"
                onChange={(e) => setUniName(e.target.value)}
                className="text-black w-full"
                name=""
                id=""
                value={uniName}
                placeholder="University Name"
              />
            </p>
            <p className="w-[20%] mr-4">
              <input
                type="text"
                onChange={(e) => setSemiName(e.target.value)}
                className="text-black w-full"
                name=""
                id=""
                value={semiName}
                placeholder="Semester"
              />
            </p>
            <p className="w-[20%] mr-4">
              <input
                type="text"
                onChange={(e) => setDepName(e.target.value)}
                className="text-black w-full"
                name=""
                id=""
                value={depName}
                placeholder="Department"
              />
            </p>
            <p className="w-[10%]">
              <input
                type="text"
                onChange={(e) => setBatch(e.target.value)}
                className="text-black w-full"
                name=""
                id=""
                value={batch}
                placeholder="Batch"
              />
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <p>
              Day : &nbsp;
              <select
                ref={rootdayref}
                onChange={handleDay}
                className="text-black"
                name=""
                id=""
              >
                <option ref={dayref}>Select Day</option>
                <option value="1">Saturday</option>
                <option value="2">Sunday</option>
                <option value="3">Monday</option>
                <option value="4">Tuesday</option>
                <option value="5">Wednesday</option>
                <option value="6">Thursday</option>
                <option value="7">Friday</option>
              </select>
            </p>
            <br></br>
            <p>
              Course Code :&nbsp;
              <input
                type="text"
                ref={subNameref}
                onChange={handleSubname}
                className="text-black "
                name=""
                id=""
              />
              {/* <option ref={subNameref}>Select Course Code</option> */}
            </p>
            <p>
              Teacher Code :&nbsp;
              <input
                ref={tnameref}
                onChange={handleTname}
                className="text-black"
                name=""
                id=""
              />
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <p>
              Time :&nbsp;
              <input
                type="time"
                ref={starttimeref}
                onChange={handleStartTime}
                className="text-black"
                name=""
                id=""
              />{" "}
              to &nbsp;
              <input
                type="time"
                ref={endtimeref}
                onChange={handleEndTime}
                className="text-black"
                name=""
                id=""
              />
            </p>
            <p>
              Room :&nbsp;
              <input
                className="text-black"
                ref={roomref}
                onChange={handleRoom}
                type="number"
                name=""
                id=""
              />
            </p>
          </div>

          <br />
          <div className=" ">
            <br />
            <p className="flex items-center gap-8">
              <button
                hidden={needDataChange}
                onClick={handleSubmit}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Add class
              </button>
              <button
                hidden={!needDataChange}
                onClick={handleUpdate}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Update class
              </button>
              <button
                onClick={handleDelete}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Delete class
              </button>
              <button
                onClick={handleSaveRoutine}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Save Routine
              </button>
              <button
                onClick={changeTheme}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Theme Toggle
              </button>
              <button
                onClick={handleLeft}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Move Left
              </button>
              <button
                onClick={handleRight}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg hover:scale-[1.03] duration-200"
              >
                Move Right
              </button>
              <button
                disabled={downloadLoading}
                onClick={() => {
                  const notify = () =>
                    toast.success(
                      "Routine is cooking. It can take up to 1 min. to be served. Wait...",
                      {
                        duration: 5000,
                      }
                    );

                  notify();
                  handleDownload();
                }}
                className="bg-white text-black px-4 py-2 font-medium text-sm mr-2 rounded-lg flex items-center hover:scale-[1.03] duration-200"
              >
                Download{downloadLoading && <span className="">ing</span>}
                {downloadLoading && (
                  <span className="ml-2 inline-block animate-spin h-5 w-5 rounded-full border-2 border-r-0 border-rose-500"></span>
                )}{" "}
              </button>
            </p>
          </div>
          <div>
            <p className="text-gray-300 mt-4">
              Tip : Click on any cell to edit individually && Click 'Save'
              before clicking 'Download'.
            </p>
          </div>
        </div>
        {/* routine */}
        <div
          ref={rootRef}
          className="bg-gray-800 min-h-screen min-w-full text-white p-4"
        >
          <Routine
            indexes={indexes}
            handleDataChange={handleDataChange}
            routine={r}
            themeClassInd={themeClassInd}
            theme={theme}
            currentColumn={indexes}
            setInputNull={setInputNull}
          />
          {routineLoading && (
            <span className="ml-2 inline-block animate-spin h-5 w-5 rounded-full border-2 border-r-0 border-rose-500"></span>
          )}{" "}
        </div>
      </div>
    </div>
  );
});

export default page;

"use client";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ExmRoutine from "../components/ExmRoutine";
const routine = [
  {
    date: "20-01-24",
    exams: [
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
    ],
  },
  {
    date: "20-01-24",
    exams: [
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
    ],
  },
  {
    date: "20-01-24",
    exams: [
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
      {
        day: "Saturday",
        sub: "CSE-211 (SRD)",
        room: "509, 512",
        time: "03:00pm - 05:00pm",
      },
    ],
  },
];
let initRoutine = [];
const page = memo(() => {
  const [imgsrc, setImgsrc] = useState("");
  const rootRef = useRef(null);
  const rootdateref = useRef(null);
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
    date: "",
    tname: "",
    subName: "",
    room: "",
    time: ["", ""],
    ind: 0,
  });

  function handleDataChange(examData, row, col) {
    setNeedDataChange(1);
    setIndexes({ row, col, examData });
    //updating room value
    roomref.current.value = +examData.room;

    //updating time value
    function formatTime(inputTime) {
      const [hours, minutes] = inputTime.split(":");
      const formattedHours = hours.length === 1 ? "0" + hours : hours;
      const formattedTime = formattedHours + ":" + minutes;
      return formattedTime;
    }

    const convert12hTo24h = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours === "12") {
        hours = "00";
      }
      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    };
    console.log(
      formatTime(examData.time[0].split(" ")[0]) +
        examData.time[0].split(" ")[1],
      "hihhh"
    );
    starttimeref.current.value = convert12hTo24h(
      formatTime(examData.time[0].split(" ")[0]),
      examData.time[0].split(" ")[1]
    );
    endtimeref.current.value = convert12hTo24h(
      formatTime(examData.time[1].split(" ")[0]),
      examData.time[1].split(" ")[1]
    );
    // const roottimeref_options = roottimeref.current.options;
    // for (let i = 0; i < roottimeref_options.length; i++) {
    //   if (examData.time == roottimeref_options[i].innerHTML) {
    //     roottimeref.current.selectedIndex = i;
    //     break;
    //   }
    // }

    //updating day value
    // const rootdayref_options = rootdayref.current.options;
    rootdateref.current.value = examData.date;

    //updating teacherName value
    tnameref.current.value = examData.tname;

    // const roottnameref_options = roottnameref.current.options;
    // for (let i = 0; i < roottnameref_options.length; i++) {
    //   if (examData.tname == roottnameref_options[i].innerHTML) {
    //     roottnameref.current.selectedIndex = i;
    //     break;
    //   }
    // }

    //updating subName value
    subNameref.current.value = examData.subName;
    // const rootsubNameref_options = rootsubNameref.current.options;
    // for (let i = 0; i < rootsubNameref_options.length; i++) {
    //   if (examData.subName == rootsubNameref_options[i].innerHTML) {
    //     rootsubNameref.current.selectedIndex = i;
    //     break;
    //   }
    // }
    setCurrentState({
      date: examData.date,
      tname: examData.tname,
      subName: examData.subName,
      room: +examData.room,
      time: examData.time,
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
  function handleDate(e) {
    setCurrentState({
      ...currentState,
      date: e.target.value,
      ind: 0,
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
      date: "",
      tname: "",
      subName: "",
      room: "",
      time: ["", ""],
      ind: 0,
    });
    rootdateref.current.value = "";
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
      currentState.date &&
      currentState.tname &&
      currentState.subName &&
      currentState.room &&
      currentState.time
    ) {
      for (let i = 0; i < r.length; i++) {
        if (r[i].date == currentState.date) {
          // setCurrentState({
          //   ...currentState,
          //   ind: i,
          // });
          let newR = r;
          newR[i].exams.push({
            tname: currentState.tname,
            subName: currentState.subName,
            time: currentState.time,
            room: currentState.room,
          });
          setR(newR);
          setInputNull();
          setNeedDataChange(0);
          console.log("kol");
          return;
        }
      }
      let newR = r;
      newR.push({
        date: currentState.date,
        exams: [],
      });
      newR[newR.length - 1].exams.push({
        date: currentState.date,
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
    console.log(indexes);
    if (
      currentState.date &&
      currentState.tname &&
      currentState.subName &&
      currentState.room &&
      currentState.time
    ) {
      setNeedDataChange(0);
      let newR = r;
      newR[indexes.row].exams[indexes.col] = {
        date: currentState.date,
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
    newR[indexes.row].exams.splice(indexes.col, 1);
    setR(newR);
    setInputNull();
    setNeedDataChange(0);
  }
  function handleTop() {
    if (!indexes) return;
    console.log("🚀 ~ handleTop ~ indexes:", indexes);

    let { row, examData } = indexes;
    if (row > 0) {
      let newR = r;
      let temp = newR[row - 1];
      newR[row - 1] = newR[row];
      newR[row] = temp;
      setR(newR);
      // handleDataChange(examData, row, col);
      setInputNull();
      setNeedDataChange(0);
    }
  }
  function handleDown() {
    if (!indexes) return;
    let { row, col, examData } = indexes;
    if (col != r[row].exams.length - 1) {
      let newR = r;
      console.log("hiiiii", row, col);
      let temp = newR[row].exams[col];
      newR[row].exams[col] = newR[row].exams[col + 1];
      newR[row].exams[col + 1] = temp;
      setR(newR);
      handleDataChange(examData, row, col);
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
        console.log(res, "success");
      })
      .catch((res) => {
        console.log("failed");
      });
  }
  async function fetchUser() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/user/${email}`)
      .then((res) => {
        console.log(res, "user fetched");
        setR(res.data.user.routine);
        // Create a browser instance
      })
      .catch((res) => {
        console.log("failed");
      });
  }

  async function handleDownload() {
    const id = localStorage.getItem("email");
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/user/download`,
        {
          email,
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
        link.download = "screenshot.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("🚀 ~ .then ~ screenshot:", screenshot);
      })
      .catch((res) => {
        console.log("failed", res);
      });
  }
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  useEffect(() => {
    let emailGot = localStorage.getItem("email");
    if (emailGot) {
      setEmail(emailGot);
    }
  }, []);
  
  // useEffect(() => {
  //   fetchUser();
  // }, [email]);

  return (
    <div className="bg-bng text-text py-8 px-4 md:px-12 flex items-start md:h-[90vh] w-full  ">
      <div className="hidden md:block">sidebar</div>
      <div className=" h-[inherit] w-full md:w-[unset]">
        <div
          ref={rootRef}
          className="bg-gray-800 min-h-screen min-w-full text-white p-4"
        >
          <div className="flex gap-28">
            <p>
              Date :
              <input
                // disabled={!!indexes?.row}
                ref={rootdateref}
                onChange={handleDate}
                className="text-black"
                type="date"
                name=""
                id=""
              />
            </p>
            <br></br>
            <p>
              Course Code :
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
          </div>

          <br></br>
          <div className="flex gap-12">
            <p>
              Teacher Code :
              <input
                ref={tnameref}
                onChange={handleTname}
                className="text-black"
                name=""
                id=""
              />
            </p>

            <br></br>
            <p>
              Time :
              <input
                type="time"
                ref={starttimeref}
                onChange={handleStartTime}
                className="text-black"
                name=""
                id=""
              />{" "}
              to
              <input
                type="time"
                ref={endtimeref}
                onChange={handleEndTime}
                className="text-black"
                name=""
                id=""
              />
            </p>
          </div>
          <br />
          <div className="flex gap-12 mb-8">
            <p>
              Room :
              <input
                className="text-black"
                ref={roomref}
                onChange={handleRoom}
                type="number"
                name=""
                id=""
              />
            </p>
            <br />
            <p>
              <button
                hidden={needDataChange}
                onClick={handleSubmit}
                className="bg-rose-700 mr-4 rounded p-2"
              >
                Add class
              </button>
              <button
                hidden={!needDataChange}
                onClick={handleUpdate}
                className="bg-rose-700 mr-4 rounded p-2"
              >
                Update class
              </button>
              <button
                onClick={handleDelete}
                className="bg-rose-700 mr-4 rounded p-2"
              >
                Delete class
              </button>
              <button
                onClick={handleSaveRoutine}
                className="bg-rose-700 mr-4 rounded p-2"
              >
                Save Routine
              </button>
              <button onClick={changeTheme} className="bg-rose-400 rounded p-2">
                Theme Toggle
              </button>
              <button onClick={handleTop} className="bg-rose-400 rounded p-2">
                Move Top
              </button>
              <button onClick={handleDown} className="bg-rose-400 rounded p-2">
                Move Down
              </button>
              <button
                onClick={handleDownload}
                className="bg-rose-400 rounded p-2"
              >
                Download
              </button>
            </p>
          </div>

          <ExmRoutine
            indexes={indexes}
            setIndexes={setIndexes}
            handleDataChange={handleDataChange}
            routine={r}
            themeClassInd={themeClassInd}
            theme={theme}
            currentColumn={indexes}
            setInputNull={setInputNull}
          />
          {imgsrc && <img src={imgsrc} alt="" />}
        </div>
      </div>
    </div>
  );
});

export default page;

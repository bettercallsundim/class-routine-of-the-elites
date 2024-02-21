"use client";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
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
  const [imgsrc, setImgsrc] = useState("");
  const rootRef = useRef(null);
  const rootdayref = useRef(null);
  const dayref = useRef(null);
  const roottnameref = useRef(null);
  const tnameref = useRef(null);
  const rootsubNameref = useRef(null);
  const subNameref = useRef(null);
  const rootroomref = useRef(null);
  const roomref = useRef(null);
  const roottimeref = useRef(null);
  const timeref = useRef(null);
  const user = useSelector((state) => state.globalSlice.user);
  console.log("🚀 ~ page ~ user:", user);
  const [email, setEmail] = useState();
  let [r, setR] = useState(initRoutine);
  let [indexes, setIndexes] = useState(null);
  let [needDataChange, setNeedDataChange] = useState(0);
  console.log(r, "userdbbbb");
  let [themeClassInd, setthemeClassInd] = useState(0);
  let [currentState, setCurrentState] = useState({
    day: "",
    tname: "",
    subName: "",
    room: "",
    time: "",
    ind: 0,
  });

  function handleDataChange(classData, row, col) {
    setNeedDataChange(1);
    setIndexes({ row, col, classData });
    //updating room value
    roomref.current.value = +classData.room;

    //updating time value
    const roottimeref_options = roottimeref.current.options;
    for (let i = 0; i < roottimeref_options.length; i++) {
      if (classData.time == roottimeref_options[i].innerHTML) {
        roottimeref.current.selectedIndex = i;
        break;
      }
    }

    //updating day value
    const rootdayref_options = rootdayref.current.options;
    rootdayref.current.selectedIndex = row + 1;

    //updating teacherName value
    const roottnameref_options = roottnameref.current.options;
    for (let i = 0; i < roottnameref_options.length; i++) {
      if (classData.tname == roottnameref_options[i].innerHTML) {
        roottnameref.current.selectedIndex = i;
        break;
      }
    }

    //updating subName value
    const rootsubNameref_options = rootsubNameref.current.options;
    for (let i = 0; i < rootsubNameref_options.length; i++) {
      if (classData.subName == rootsubNameref_options[i].innerHTML) {
        rootsubNameref.current.selectedIndex = i;
        break;
      }
    }
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
      tname: e.target[e.target.selectedIndex].innerHTML,
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
      subName: e.target[e.target.selectedIndex].innerHTML,
    });
  }
  function handleDay(e) {
    setCurrentState({
      ...currentState,
      day: e.target[e.target.selectedIndex].innerHTML,
      ind: parseInt(e.target.value) - 1,
    });
  }
  function handleTime(e) {
    setCurrentState({
      ...currentState,
      time: e.target[e.target.selectedIndex].innerHTML,
    });
  }
  function setInputNull() {
    setCurrentState({
      day: "",
      tname: "",
      subName: "",
      room: "",
      time: "",
      ind: 0,
    });
    dayref.current.selected = true;
    tnameref.current.selected = true;
    subNameref.current.selected = true;
    roomref.current.value = "";
    timeref.current.selected = true;
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
        email,
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
  useEffect(() => {
    const emails = localStorage.getItem("email");
    if (emails) {
      setEmail(emails);
    }
  }, []);

  async function handleDownload() {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND}/user/download`, {
          email,
        })
        .then((res) => {
          console.log(res, "user download request done");
          // Convert the buffer data to a Blob
          const imageUrl = `data:image/png;base64,${res.data.data}`;
          setImgsrc(`data:image/png;base64,${res.data.data}`);

          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = "image.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log(imageUrl);
          // setR(res.data.user.routine);
          // Create a browser instance
        });
    } catch (err) {
      console.log("failed", err);
      handleDownload();
    }
  }
  useEffect(() => {
    if (email) {
      fetchUser();
    }
  }, []);

  return (
    <div className="bg-bng text-text py-8 px-4 md:px-12 flex items-start md:h-[90vh] w-full overflow-hidden ">
      <div className="hidden md:block">sidebar</div>
      <div className="hidescroll overflow-y-scroll h-[inherit] w-full md:w-[unset]">
        <div
          ref={rootRef}
          className="bg-gray-800 min-h-screen min-w-full text-white p-4"
        >
          <div className="flex gap-28">
            <p>
              Day :
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
              Course Code :
              <select
                ref={rootsubNameref}
                onChange={handleSubname}
                className="text-black"
                name=""
                id=""
              >
                <option ref={subNameref}>Select Course Code</option>
                <option value="">IEC-231</option>
                <option value="">CSE-211</option>
                <option value="">CSE-212</option>
                <option value="">CSE-213</option>
                <option value="">CSE-214</option>
                <option value="">MAT-131</option>
                <option value="">BDS-211</option>
              </select>
            </p>
          </div>

          <br></br>
          <div className="flex gap-12">
            <p>
              Teacher Code :
              <select
                ref={roottnameref}
                onChange={handleTname}
                className="text-black"
                name=""
                id=""
              >
                <option ref={tnameref}>Select Teacher Code</option>
                <option value="">AAS</option>
                <option value="">MNI</option>
                <option value="">SRD</option>
                <option value="">AZ</option>
                <option value="">TTT</option>
                <option value="">ARS</option>
              </select>
            </p>

            <br></br>
            <p>
              Time :
              <select
                ref={roottimeref}
                onChange={handleTime}
                className="text-black"
                name=""
                id=""
              >
                <option ref={timeref}>Select Time</option>
                <option value="">9:00 AM - 10:30 AM</option>
                <option value="">10:35 AM - 12:05 PM</option>
                <option value="">12:10 PM - 01:40 PM</option>
                <option value="">02:10 PM - 03:40 PM</option>
                <option value="">03:45 PM - 05:15 PM</option>
              </select>
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
              <button onClick={handleLeft} className="bg-rose-400 rounded p-2">
                Move Left
              </button>
              <button onClick={handleRight} className="bg-rose-400 rounded p-2">
                Move Right
              </button>
              <button
                onClick={handleDownload}
                className="bg-rose-400 rounded p-2"
              >
                Download
              </button>
            </p>
          </div>

          <Routine
            indexes={indexes}
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

import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import DataNotFound from "./DataNotFound.jsx";

const MatchCard = () => {
  const [matchesdata, setMatchesdata] = useState(null);
  const [season, setSeason] = useState("");
  const [dataFound, setDataFound] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const fetchMatches = async () => {
    try {
      const { data } = await axios.get("/api/v1/");
      if (data.statusCode == 200) {
        toast.success(data.message);
        const actualMatches = data.data
        console.log(actualMatches)
        setMatchesdata([...actualMatches].reverse());
        setSeason("2022-23");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function formatTimeWithIcon(timeString) {
    const [hourStr, minuteStr] = timeString.split(":");
    const hour = parseInt(hourStr, 10);

    // Determine AM/PM
    const isAM = hour < 12;
    const ampm = isAM ? "AM" : "PM";

    // Convert to 12-hour format
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${displayHour
      .toString()
      .padStart(2, "0")}:${minuteStr} ${ampm} IST`;

    // Determine if it's day (6 AM to 5:59 PM) or night
    const isDayTime = hour >= 6 && hour < 18;

    return (
      <div className="flex items-center gap-1 text-sm mt-1">
        {isDayTime ? (
          <FaSun className="text-yellow-500" size={14} />
        ) : (
          <FaMoon className="text-blue-500" size={14} />
        )}
        <span>{formattedTime}</span>
      </div>
    );
  }

  function checkWinner(teamA, teamB) {
    if (teamA > teamB) {
      return true;
    } else if (teamA === teamB) {
      return "tie";
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
      const timer = setTimeout(() => {
        if (!matchesdata || matchesdata.length === 0) {
          setDataFound(false);
        }
      }, 8000);
  
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [matchesdata]);

  return (
    <div className="max-w-[1900px] w-full mx-auto my-12 flex flex-col ">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-1 text-blue-500">
          MATCH PROGRESS
        </h1>
        <div className="w-48 h-1 bg-blue-500"></div>
        <p className="text-3xl font-bold text-blue-500 mt-3">
          {season ? season : ""}
        </p>
      </div>

      { dataFound ? (matchesdata ? (
        <div className="flex flex-col border border-gray-600 rounded-lg max-h-[80vh] overflow-y-auto w-[90%] mx-auto bg-white">
          {matchesdata.map((match) => (
            <div
              key={match.id}
              className="flex flex-col md:flex-row justify-between items-center px-5 h-full border-b border-gray-300"
            >
              <div className="flex md:flex-col w-full gap-8 max-md:justify-between md:w-[200px] py-4">
                <p className="p-1 max-md:h-[35px] border border-amber-500 w-[120px] text-center font-semibold">
                  {match.stage ? match.stage : "Qualifier 1"}
                </p>
                <div className="flex max-md:justify-between max-md:items-center md:flex-col max-sm:flex-col sm:gap-7 md:gap-2">
                  <h2 className="text-2xl font-semibold">
                    {formatDateToDDMMYYYY(match.date)}
                  </h2>
                  <div className="flex gap-0.5 items-center">
                    {formatTimeWithIcon(match.time)}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 md:pt-4 md:border-l md:pl-4 md:border-r-gray-200 pb-4 md:h-[220px]">
                <div className="flex justify-between">
                  <h3 className="text-gray-950/80 font-semibold">
                    {match.venue ? match.venue : match.country.name}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600">
                    {match.status.long}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col items-start gap-1 w-[200px]">
                    <p
                      className={`text-xl font-semibold ml-2 ${
                        checkWinner(
                          match.scores.away.total,
                          match.scores.home.total
                        ) === "tie"
                          ? "text-yellow-600"
                          : checkWinner(
                              match.scores.away.total,
                              match.scores.home.total
                            )
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {checkWinner(
                        match.scores.away.total,
                        match.scores.home.total
                      ) === "tie"
                        ? "Tie"
                        : checkWinner(
                            match.scores.away.total,
                            match.scores.home.total
                          )
                        ? "Winner"
                        : "Loser"}
                    </p>
                    <div className="flex md:flex-row flex-col gap-2 md:items-center">
                      <img
                        src={match.teams.away.logo}
                        alt="Team 1"
                        className="w-16"
                      />
                      <p className="text-lg font-bold">
                        {match.teams.away.name}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-blue-500 ml-2">
                      {match.scores.away.total
                        ? `Total: ${match.scores.away.total}`
                        : ""}
                    </p>
                  </div>

                  <div className="flex-1 flex justify-center items-center h-full">
                    <span className="text-black text-3xl font-bold">VS</span>
                  </div>

                  <div className="flex flex-col items-end gap-1 w-[200px]">
                    <p
                      className={`text-xl font-semibold ml-2 self-end ${
                        checkWinner(
                          match.scores.home.total,
                          match.scores.away.total
                        ) === "tie"
                          ? "text-yellow-600"
                          : checkWinner(
                              match.scores.home.total,
                              match.scores.away.total
                            )
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {checkWinner(
                        match.scores.home.total,
                        match.scores.away.total
                      ) === "tie"
                        ? "Tie"
                        : checkWinner(
                            match.scores.home.total,
                            match.scores.away.total
                          )
                        ? "Winner"
                        : "Loser"}
                    </p>
                    <div className="flex flex-col items-end md:flex-row-reverse gap-2 md:items-center">
                      <img
                        src={match.teams.home.logo}
                        alt="Team 1"
                        className="w-16"
                      />
                      <p className="text-lg font-bold text-right">
                        {match.teams.home.name}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-blue-500 ml-2 self-end">
                      {match.scores.home.total
                        ? `Total: ${match.scores.home.total}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )) : <DataNotFound/>}
    </div>
  );
};

export default MatchCard;

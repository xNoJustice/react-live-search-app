import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./logo.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setFilteredUsers(data.results);
      });
  }, []);
  console.log(users);
  const LiveSearch = (e) => {
    const filteredData = users.filter((user) => {
      return (
        user.name.first.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0 ||
        user.name.last.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0 ||
        user.location.city
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) >= 0 ||
        user.location.country
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) >= 0
      );
    });
    setFilteredUsers(filteredData);
  };

  return (
    <div className="w-full h-screen mx-auto p-6">
      <div className="relative rounded mb-8">
        <div className="p-4 py-8">
          <div className="mx-auto max-w-sm rounded-lg">
            <div className="sm:flex sm:items-center px-2 py-4">
              <div className="flex-grow">
                <img src={logo} className="logo mx-auto" alt="logo" />
                <h3 className="font-normal px-2 py-3 leading-tight text-xl text-center dark:text-gray-100">
                  Live User Filter
                </h3>
                <input
                  type="text"
                  placeholder="Search user from name/surname/city..."
                  onChange={(e) => LiveSearch(e)}
                  className="my-2 w-full rounded-full text-sm bg-grey-light text-grey-darkest dark:bg-gray-800 dark:text-gray-100 rounded h-10 p-3 focus:outline-none"
                />
                {filteredUsers.length > 0 ? (
                  <div className="w-full h-96 flex flex-col overflow-x-auto">
                    {filteredUsers.map((user, i) => (
                      <div key={i} className="rounded-2xl p-4">
                        <div className="flex-row gap-4 flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              alt="profil"
                              src={user.picture.thumbnail}
                              className="mx-auto object-cover rounded-full h-16 w-16 "
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-600 dark:text-white text-lg font-medium">
                              {user.name.first + " " + user.name.last}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {user.location.city +
                                ", " +
                                user.location.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-2xl dark:text-gray-100 text-center mt-5">
                    Not User Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

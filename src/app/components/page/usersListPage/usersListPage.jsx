import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import _ from "lodash";
import { useProfessions } from "../../../hooks/useProfessions";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const { isLoading: professionsLoading, professions } = useProfessions;
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        setSelectedProf(undefined);
    };
    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : data;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const startIndex = (currentPage - 1) * pageSize;
    let newCurrentPage = currentPage;
    if (startIndex === sortedUsers.length) {
        newCurrentPage = newCurrentPage - 1;
        setCurrentPage(newCurrentPage);
    }
    const userCrop = paginate(sortedUsers, newCurrentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <form>
                    <input
                        className="w-100 mx-auto"
                        name="searchQuery"
                        placeholder="Search..."
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                </form>
                {count > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        onBookmark={handleToggleBookMark}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={newCurrentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func
};
export default UsersListPage;

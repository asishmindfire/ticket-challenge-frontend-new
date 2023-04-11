import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./TicketTables.css";
import moment from "moment-timezone";
import { List, MessageSquare, Edit3 } from "react-feather";
import AddTicketModal from "../AddTicketModal/AddTicketModal";
import Services from "../../service/http";
import { Trash } from "react-feather";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Error from "../Error/Error";

const TicketTables = () => {
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);
  const userName = logedInUser.user.user_name;
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState<any>([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [rowDetails, setRowDetails] = useState<any>({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [bol, setBol] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [check, setCheck] = useState(true);
  const [users, setUsers] = useState([]);
  const [ticketAssignedUser, setTicketAssignedUser] = useState<any>({});

  const deleteCommet = async (cid: any) => {
    try {
      const deletedComment = await Services.deleteRequestUsingTwoParamIds(
        "/comment",
        rowDetails._id,
        cid
      );
      if (!deletedComment?.data.status) {
        setError(true);
        setErrMsg(
          "Service Unavailable."
        );
        return;
      }
      setBol(1);
    } catch (error) {
      setError(true);
      setErrMsg(
        "Service Unavailable."
      );
    }
  };

  const changeToEditMode = () => {
    setIsEditMode(true);
  };

  const handleEnter = async (e: any, id: any, username: any, comment: any) => {
    try {
      if (e.key === "Enter") {
        var obj = {
          update_data: {
            id: id,
            comment: comment,
            username: username,
          },
        };
        const updatedComment = await Services.putRequestUsingParamIdAndBody(
          "/comment",
          obj,
          rowDetails._id
        );
        if (!updatedComment?.data.status) {
          setError(true);
          setErrMsg(
            "Service Unavailable."
          );
          return;
        }
        setBol(1);
        setIsEditMode(false);
      }
    } catch (error) {
      setError(true);
      setErrMsg(
        "Service Unavailable."
      );
    }
  };

  const handleRowDetails = async (data: any) => {
    try {
      setRowDetails({ ...data });
      setTicketId(data._id);
      getComments(data._id);
      const AssignedUser = await Services.getRequestUsingParamId(
        "/user",
        data.assign_to
      );
      if (!AssignedUser?.data.status) {
        setError(true);
        setErrMsg(
          "Service Unavailable."
        );
        return;
      }
      setTicketAssignedUser(AssignedUser.data.data);
    } catch (error) {
      setError(true);
      setErrMsg(
        "Service Unavailable."
      );
    }
  };

  const getTickets = async () => {
    try {
      const tickets = await Services.getRequest("/ticket");
      if (!tickets?.data.status) {
        setError(true);
        setErrMsg(
          "Service Unavailable."
        );
        return;
      }
      setCountries(tickets.data.data);
      setFilteredTickets(tickets.data.data);
    } catch (error) {
      setError(true);
      setErrMsg(
        "Service Unavailable."
      );
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleOnClick = async () => {
    try {
      const updateComment = await Services.postRequest("/comment", {
        ticketId: rowDetails._id,
        comments: [
          {
            username: userName,
            comment: commentText,
          },
        ],
      });
      if (!updateComment?.data.status) {
        setError(true);
        setErrMsg(
          "Service Unavailable."
        );
        return;
      }
      setBol(1);
      setCommentText("");
    } catch (error) {
      setError(true);
      setErrMsg(
        "Service Unavailable."
      );
    }
  };

  const getComments = async (id: any) => {
    try {
      const comments = await Services.getRequestUsingParamId("/comment", id);
      if (!comments?.data.status) {
        setError(true);
        setErrMsg(
          "Service Unavailable."
        );
        return;
      }
      setBol(0);
      setComments(
        comments?.data?.data[0]
          ? comments?.data?.data[0].comments
          : comments.data.data
      );
    } catch (error) {
      setError(true);
        setErrMsg(
          "Service Unavailable."
        );
    }
  };

  useEffect(() => {
    if (check) {
      setCheck(false);
    } else {
      getComments(ticketId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.id, comments.username, comments.comment, commentText, bol]);

  useEffect(() => {
    const result = countries.filter((country: any) => {
      return country.product.toLowerCase().match(search.toLowerCase());
    });
    setFilteredTickets(result);
  }, [search, countries]);

  const onStatusSelection = async (status: any, ticketId: any) => {
    try {
      const updatedTicket = await Services.putRequestUsingParamIdAndBody(
        "/ticket",
        { status: status.target.value },
        ticketId
      );
      if (!updatedTicket?.data.status) {
        setError(true);
        setErrMsg("Service Unavailable.");
        return;
      }
      getTickets();
    } catch (error) {
      setError(true);
      setErrMsg("Service Unavailable.");
    }
  };

  const onUserSelection = async (assign_to: any, ticketId: any) => {
    try {
      const updatedTicket = await Services.putRequestUsingParamIdAndBody(
        "/ticket",
        { assign_to: assign_to.target.value },
        ticketId
      );
      if (!updatedTicket?.data.status) {
        setError(true);
        setErrMsg("Service Unavailable.");
        return;
      }
      getTickets();
    } catch (error) {
      setError(true);
      setErrMsg("Service Unavailable.");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await Services.getRequest("/user");
        if (!users?.data.status) {
          setError(true);
          setErrMsg(
            "Currently, we are unable to get user details, Please try after sometime."
          );
          return;
        }
        setUsers(users.data.data);
      } catch (error) {
        setError(true);
        setErrMsg(
          "Currently, we are unable to get user details, Please try after sometime."
        );
      }
    }
    fetchUser();
  }, []);

  const removeTicket = async (ticketId: any) => {
    try {
      const removedTicket = await Services.deleteRequestParamId(
        "/ticket",
        ticketId
      );
      if (!removedTicket.data.status) {
        setError(true);
        setErrMsg(
          "Currently, we are unable to remove ticket, Please try after sometime."
        );
        return;
      }
      getTickets();
    } catch (error) {
      setError(true);
      setErrMsg(
        "Currently, we are unable to remove ticket, Please try after sometime."
      );
    }
  };

  const columns = [
    {
      name: "#Id",
      selector: (row: any) => row._id,
    },
    {
      name: "Title",
      selector: (row: any) => row.ticket_name,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row: any) => row.product,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onClick={() => handleRowDetails(row)}
            style={{ background: "#ffffff", border: "none" }}
          >
            <i
              className="bi bi-pencil-square"
              style={{
                marginRight: "8px",
                background: "#ffffff",
                color: "black",
                fontSize: "20px",
              }}
            ></i>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={{ marginTop: "72px", borderRadius: "10px" }}
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel" style={{ marginLeft: "40px" }}>
                #{rowDetails._id}
              </h5>
            </div>
            <div className="offcanvas-body">
              <div
                className="pb-5"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                <i className="bi bi-square-fill text-warning pe-3"></i>
                {rowDetails.ticket_name} <Edit3 />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  <h5>
                    <List /> Description
                  </h5>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Add a description here..."
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value={rowDetails.ticket_desc}
                ></textarea>
              </div>

              <select
                className="form-select col-md-1 mt-3 mb-3"
                aria-label="Default select example"
                onChange={(e) => onStatusSelection(e, rowDetails._id)}
              >
                <option
                  value="BACKLOG"
                  selected={rowDetails.status === "BACKLOG"}
                >
                  BACKLOG
                </option>
                <option
                  value="INPROGRESS"
                  selected={rowDetails.status === "INPROGRESS"}
                >
                  INPROGRESS
                </option>
                <option value="DONE" selected={rowDetails.status === "DONE"}>
                  DONE
                </option>
              </select>

              <select
                className="form-select col-md-1"
                aria-label="Default select example"
                onChange={(e) => onUserSelection(e, rowDetails._id)}
              >
                {users?.map((el: any) => {
                  return (
                    <option
                      selected={ticketAssignedUser.user_name === el.user_name}
                      key={el._id}
                      value={el._id}
                    >
                      {el.user_name}
                    </option>
                  );
                })}
              </select>

              <h5 className="mt-3">
                <MessageSquare /> Comment
              </h5>
              <div className="form-group">
                <textarea
                  className="form-control rounded-0"
                  style={{ fontSize: "15px" }}
                  placeholder="Leave a comment here"
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mt-2 me-1 text-end">
                <button
                  className="btn btn-primary p-2"
                  style={{
                    background: "#ffc107",
                    border: "none",
                    color: "black",
                  }}
                  onClick={handleOnClick}
                >
                  Comment
                </button>
              </div>
              {comments &&
                comments.map((item: any) => {
                  return (
                    <p key={item.id}>
                      <strong style={{ paddingRight: "12px" }}>
                        {item.username}
                      </strong>
                      <span style={{ fontSize: "12px" }}>
                        {item.date
                          ? moment(item.date)
                              .tz("Asia/Kolkata")
                              .format("MMM DD YYYY, h:mm A")
                          : ""}
                      </span>
                      <br />
                      {isEditMode ? (
                        userName === item.username &&
                        isEditMode &&
                        item.id === commentId ? (
                          <div className="trash">
                            <input
                              type="text"
                              defaultValue={item.comment}
                              onKeyDown={(e: any) => {
                                handleEnter(
                                  e,
                                  item.id,
                                  item.username,
                                  e.target.value
                                );
                              }}
                            />
                            <Trash onClick={() => deleteCommet(item.id)} />
                          </div>
                        ) : userName === item.username && isEditMode ? (
                          <div className="trash">
                            {item.comment}
                            <Trash onClick={() => deleteCommet(item.id)} />
                          </div>
                        ) : (
                          <div>{item.comment}</div>
                        )
                      ) : userName === item.username ? (
                        <div
                          className="trash"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            changeToEditMode();
                            setCommentId(item.id);
                          }}
                        >
                          {item.comment}
                          <Trash onClick={() => deleteCommet(item.id)} />
                        </div>
                      ) : (
                        <div>{item.comment}</div>
                      )}
                    </p>
                  );
                })}
            </div>
          </div>
        </>
      ),
    },
    {
      name: "Remove",
      cell: (row: any) => (
        <h5
          style={{ marginLeft: "12px", cursor: "pointer" }}
          onClick={() => removeTicket(row._id)}
        >
          <DeleteOutlineIcon />
        </h5>
      ),
    },
  ];

  const onCloseHandle = () => {
    setError(false);
  };

  return (
    <>
      {error ? (
        <Error
          message={errMsg}
          onChange={() => {
            onCloseHandle();
          }}
        />
      ) : null}
      <div className="container mt-4">
        <AddTicketModal onChange={() => getTickets()} />
        <DataTable
          fixedHeader
          columns={columns}
          data={filteredTickets}
          pagination
          fixedHeaderScrollHeight="420px"
          subHeader
          // ResponsiveWrapper
          // responsive
          subHeaderComponent={
            <input
              type="text"
              placeholder="Filter Tickets..."
              className="w-25 form-control p-3 text-start search_bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>
    </>
  );
};

export default TicketTables;
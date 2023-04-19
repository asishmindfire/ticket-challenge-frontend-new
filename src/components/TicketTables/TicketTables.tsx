import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import "./TicketTables.css";
import moment from "moment-timezone";
import { List, MessageSquare, Edit3 } from "react-feather";
import AddTicketModal from "../AddTicketModal/AddTicketModal";
import Services from "../../service/http";
import { Trash } from "react-feather";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AlertDialog from "../ConfirmationAlert/ConfirmationAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketTables = () => {
  const user: any = localStorage.getItem("user");
  const logedInUser = JSON.parse(user);
  const userName = logedInUser.user.user_name;
  const [search, setSearch] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tickets, setTickets] = useState<any>([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [rowDetails, setRowDetails] = useState<any>({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [bol, setBol] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [check, setCheck] = useState(true);
  const [users, setUsers] = useState([]);
  const [ticketAssignedUser, setTicketAssignedUser] = useState<any>({});
  const [togglePopup, setTogglePopup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const deleteCommet = async (cid: any) => {
    try {
      const deletedComment = await Services.deleteRequestUsingTwoParamId(
        "/comment",
        rowDetails._id,
        cid
      );
      if (!deletedComment?.data.status) {
        toast.error(deletedComment.data.message);
        return;
      }
      setBol(1);
    } catch (error) {
      toast.error("Service Unavailable, Please try after sometime.");
    }
  };

  const changeToEditMode = () => {
    setIsEditMode(true);
  };

  const handleEnter = async (e: any, id: any, username: any, comment: any) => {
    try {
      if (e.key === "Enter") {
        const updatedComment = await Services.putRequestUsingParamIdAndBody(
          "/comment",
          {
            id: id,
            comment: comment,
          },
          rowDetails._id
        );
        if (!updatedComment?.data.status) {
          toast.error(updatedComment.data.message);
          return;
        }
        setBol(1);
        setIsEditMode(false);
      }
    } catch (error) {
      toast.error("Service Unavailable, Please try after sometime.");
    }
  };

  const handleRowDetails = async (data: any) => {
    try {
      setRowDetails({ ...data });
      setTicketId(data._id);
      getComments(data._id);
      if (!data.assign_to) return;
      const AssignedUser = await Services.getRequestUsingParamId(
        "/user",
        data.assign_to
      );
      if (!AssignedUser?.data.status) {
        toast.error(AssignedUser.data.message);
        return;
      }
      setTicketAssignedUser(AssignedUser.data.data);
    } catch (error) {
      console.log("mil gya");

      toast.error("User service unavailable, Please try after sometime.");
    }
  };

  const handlePageChange = (page: any) => {
    setPageCount(page);
    getTickets(page);
  };

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true);
    const tickets = await Services.getPaginatedTickets(page, perPage);
    setTickets(tickets.data.data.result);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const getTickets = useCallback(
    async (page: any) => {
      try {
        const tickets = await Services.getPaginatedTickets(page, perPage);
        if (!tickets?.data.status) {
          toast.error(tickets.data.message);
          return;
        }
        setTickets(tickets.data.data.result);
        setFilteredTickets(tickets.data.data.result);
        setTotalRows(tickets.data.data.totalTickets);
      } catch (error) {
        toast.error("Ticket service unavailable, Please try after sometime.");
      }
    },
    [perPage]
  );

  useEffect(() => {
    getTickets(1);
  }, [getTickets]);

  const handleOnClick = async () => {
    try {

      const updateComment = await Services.postRequest("/comment", {
        ticketId: rowDetails._id,
        username: userName,
        comment: commentText,
      });
      if (!updateComment?.data.status) {
        toast.error(updateComment.data.message);
        return;
      }
      setBol(1);
      setCommentText("");
    } catch (error) {
      toast.error("Comment service unavailable, Please try after sometime.");
    }
  };

  const getComments = async (id: any) => {
    try {
      const comments = await Services.getRequestUsingParamId("/comment", id);
      if (!comments?.data.status) {
        toast.error(comments.data.message);
        return;
      }

      setBol(0);
      setComments(comments?.data?.data);
    } catch (error) {
      toast.error("Comment service unavailable, Please try after sometime.");
    }
  };

  useEffect(() => {
    if (check) {
      setCheck(false);
    } else {
      getComments(ticketId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.comment, comments.username, comments._id, commentText, bol]);

  const getFilterTickets = async (search: any) => {
    try {
      const filterData = await Services.postRequest("/ticket/search", {
        data: search,
      });

      if (!filterData?.data.status) {
        toast.error(filterData.data.message);
        return;
      }
      setFilteredTickets(filterData.data.data);
    } catch (error) {
      toast.error("Ticket service unavailable, Please try after sometime.");
    }
  };

  useEffect(() => {
    getFilterTickets(search);
  }, [search]);

  const onStatusSelection = async (status: any, ticketId: any) => {
    try {
      const updatedTicket = await Services.putRequestUsingParamIdAndBody(
        "/ticket",
        { status: status.target.value },
        ticketId
      );
      if (!updatedTicket?.data.status) {
        toast.error(updatedTicket.data.message);
        return;
      }
      toast.success("Status Updated Successfully.");
      getTickets(pageCount);
    } catch (error) {
      toast.error("Ticket service unavailable, Please try after sometime.");
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
        toast.error(updatedTicket.data.message);
        return;
      }
      toast.success("Assinee has changed.");
      getTickets(pageCount);
    } catch (error) {
      toast.error("Ticket service unavailable, Please try after sometime.");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await Services.getRequest("/user");
        if (!users?.data.status) {
          toast.error(users.data.message);
          return;
        }
        setUsers(users.data.data);
      } catch (error) {
        toast.error(
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
        toast.error(removedTicket.data.message);
        return;
      }
      getTickets(pageCount);
    } catch (error) {
      toast.error(
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
      // sortable: true,
    },
    {
      name: "Product",
      selector: (row: any) => row.product,
      // sortable: true,
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
                marginLeft: "-13px",
                background: "#ffffff",
                color: "black",
                fontSize: "20px",
              }}
            ></i>
          </button>

          <h5
            style={{
              cursor: "pointer",
            }}
            // onClick={() => removeTicket(row._id)}
            onClick={() => {
              setTogglePopup(true);
              handleRowDetails(row);
            }}
          >
            <DeleteOutlineIcon />
          </h5>

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
                      selected={ticketAssignedUser?.user_name === el?.user_name}
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
                    <p key={item._id}>
                      <strong style={{ paddingRight: "12px" }}>
                        {item.username}
                      </strong>
                      <span style={{ fontSize: "12px" }}>
                        {item.updatedAt
                          ? moment(item.updatedAt)
                              .tz("Asia/Kolkata")
                              .format("MMM DD YYYY, h:mm A")
                          : ""}
                      </span>
                      <br />
                      {isEditMode ? (
                        userName === item.username &&
                        isEditMode &&
                        item._id === commentId ? (
                          <div className="trash">
                            <input
                              type="text"
                              defaultValue={item.comment}
                              onKeyDown={(e: any) => {
                                handleEnter(
                                  e,
                                  item._id,
                                  item.username,
                                  e.target.value
                                );
                              }}
                            />
                            <Trash onClick={() => deleteCommet(item._id)} />
                          </div>
                        ) : userName === item.username && isEditMode ? (
                          <div className="trash">
                            {item.comment}
                            <Trash onClick={() => deleteCommet(item._id)} />
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
                            setCommentId(item._id);
                          }}
                        >
                          {item.comment}
                          <Trash onClick={() => deleteCommet(item._id)} />
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
  ];

  return (
    <>
      <ToastContainer />

      <AlertDialog
        toggle={togglePopup}
        message="Are you sure, you want to remove."
        onClose={() => setTogglePopup(false)}
        onClick={() => {
          removeTicket(rowDetails._id);
          setTogglePopup(false);
        }}
      />

      <div className="container mt-0">
        <header className="d-flex justify-content-between">
          <h2 className="ticket-label">Tickets</h2>
          <AddTicketModal onChange={() => getTickets(pageCount)} />
        </header>
        <DataTable
          fixedHeader
          columns={columns}
          data={filteredTickets}
          fixedHeaderScrollHeight="420px"
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Filter by product..."
              className="w-25 form-control p-2 text-start search_bar mt-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </>
  );
};

export default TicketTables;

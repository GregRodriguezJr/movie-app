import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getTrailer } from "../apiRequest";

function DetailsModal(props) {
  const [show, setShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    // Opens modal
    handleShow();
    // API call to fetch youtube video key
    const trailerInfo = await getTrailer(props.movie.id);
    if (trailerInfo.code === "ERR_BAD_REQUEST") {
      return;
    } else {
      setTrailerKey(trailerInfo.key);
    }
  };

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <>
      {/* Svg triggers modal to open instead of button */}
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-info-circle m-1"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            {props.movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          {props.movie.overview}
          <p className="text-secondary py-2">
            Release Date: {dateFormat(props.movie.release_date)}
          </p>
          {trailerKey ? (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              rel='noreferrer'
              target="_blank"
              className="py-2"
              onClick={handleClose}
            >
              See Video
            </a>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsModal;

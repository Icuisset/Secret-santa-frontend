import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import santaApi from "../../api/santaApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TeamCard from "../TeamCard/TeamCard";

import "./MemberProfile.css";

export default function MemberProfile() {
  let params = useParams();
  let memberID = params.memberid;

  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState({});

  const [newMessage, setNewMessage] = useState("");
  const [newAvatar, setNewAvatar] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const getMemberProfile = () => {
    setIsLoading(true);
    santaApi
      .getMember(memberID)
      .then((result) => {
        console.log(result);
        setMember({
          avatar: result.avatar,
          message: result.message,
          name: result.name,
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMemberProfile();
  }, []);

  const checkSize = (file) => {
    if (file.size > 100000) {
      alert(
        "Your file is too big! Please select a file under 100KB. Your current file is " +
          file.size +
          " Bytes"
      );
      return false;
    } else return true;
  };

  const handleNewUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const updateAvatar = (url) => {
    setIsLoading(true);
    santaApi
      .updateMemberAvatar(memberID, url)
      .then((result) => {
        console.log(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAvatarSubmission = () => {
    if (selectedFile) {
      const sizeCheck = checkSize(selectedFile);

      if (sizeCheck) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        fetch(process.env.REACT_APP_CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Success:", result.secure_url);
            const avatarURL = result.secure_url;
            updateAvatar(avatarURL);
            getMemberProfile();
            setSelectedFile();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  const handleMessageSubmission = (message) => {
    if (message !== "") {
      setIsLoading(true);
      santaApi
        .updateMemberMessage(memberID, message)
        .then((result) => {
          console.log(result);
          getMemberProfile();
          setNewMessage("");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='profile-zone'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TeamCard member={member} />
          <div className='update-zone'>
            <p className='update-message'>
              Update your Avatar and your Message to Santa:
            </p>
          </div>
          <textarea
            className='member-profile-input member-profile-input_message'
            placeholder='Enter your new letter to Santa. Please note that "Dear Santa" will be added automatically before your message and your name will be added as a signature at the end.'
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type='button'
            className='profile-button'
            onClick={() => handleMessageSubmission(newMessage)}>
            Update Message
          </button>
          <input
            className='member-profile-input'
            placeholder='Enter your new message to Santa'
            id='file'
            type='file'
            value={newAvatar}
            onChange={handleNewUpload}
          />
          <button
            type='button'
            className='profile-button'
            onClick={handleAvatarSubmission}>
            Update Avatar
          </button>
          <Link to='/' className='back-button'>
            Go Back
          </Link>
        </>
      )}
    </div>
  );
}

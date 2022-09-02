import "../App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { storage } from "../firebase.js";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, updateProfile } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  let email = "";
  let IMAGES_FOLDER_NAME = "";
  let photoUrlInstance = "";
  if (user !== null) {
    email = user.email;
    IMAGES_FOLDER_NAME = user.uid;
    photoUrlInstance = user.photoURL;
  }

  const [fileInputFile, setFileInputFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [fileRetrieveValue, setFileRetrieveValue] = useState(photoUrlInstance);

  const handleFileInputChange = (event) => {
    setFileInputFile(event.target.files[0]);
    setFileInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("clicked");
    event.preventDefault();
    console.log(IMAGES_FOLDER_NAME);

    // Store images in an images folder in Firebase Storage
    const fileRef = storageRef(
      storage,
      `${IMAGES_FOLDER_NAME}/${fileInputValue}`
    );
    uploadBytes(fileRef, fileInputFile).then(() => {
      getDownloadURL(fileRef).then((downloadUrl) => {
        updateProfile(user, {
          photoURL: downloadUrl,
        })
          .then(() => {
            console.log("Uploaded photo.");
            setFileRetrieveValue(downloadUrl);
          })
          .catch((error) => {
            console.log("Photo upload error: " + error);
          });
        // Reset input field after submit
        setFileInputFile(null);
        setFileInputValue("");
      });
    });
  };

  return (
    <div className="App">
      <div>
        <Card.Img
          variant="top"
          src={fileRetrieveValue}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            marginBottom: "5px",
          }}
          disabled={!fileRetrieveValue}
        />
      </div>
      <p>Your email: {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          value={fileInputValue}
          className="Upload-file"
          onChange={(event) => handleFileInputChange(event)}
        />
        <br />
        <Button type="submit" value="Post" disabled={!fileInputFile}>
          Upload profile image
        </Button>
      </form>
    </div>
  );
}

export default Profile;

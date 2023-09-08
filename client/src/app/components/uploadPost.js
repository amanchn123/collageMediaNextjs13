"use client";
import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import PhotoIcon from "@mui/icons-material/Photo";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EastIcon from "@mui/icons-material/East";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { analytics } from "@/firebase/firebase-config";
import { v4 as uuidv4 } from "uuid"; // Import UUID v4 generator
import CircularProgress from "@mui/material/CircularProgress";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import EmojiPicker from "emoji-picker-react";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { api } from "@/apiURL";
import { useSelector } from "react-redux";


export default function UploadPost() {
  const portsize = useMediaQuery("(max-width: 800px)");

  const [discard, setDiscard] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstSlide, setFirstSlide] = useState(false);
  const [postType, setPostType] = useState(null);
  const [post, setPost] = useState();
  const[content,setContent]=useState("")
  const [isemoji, setIsemoji] = useState(false);
  const [emojiSelector, setEmojiSelector] = useState(" ");
  const postref = useRef();
  const [postLoading, setPostLoading] = useState(false);
  const[contentType,setContentType]=useState()
  const uniqueId = uuidv4(); // Generate a new UUID


  const userdata=useSelector((state)=>state.auth.user && state.auth.user.response)
  console.log("useeee",userdata)

  const emojiOpen = () => {
    setIsemoji(!isemoji);
  };

  const DiscardAlertOpen = () => {
    setDiscardDialogOpen(true);
  };

  const DiscardAlertClose = () => {
    setDiscardDialogOpen(false);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setEmojiSelector(emojiObject.emoji);
  };

  const postUploadFirebase = async (e) => {
    const postFile = await e.target.files[0];
    setPostType(postFile);

    console.log(postFile);
    if (!postFile) {
      alert("pls select images");
    }
    try {
      setPostLoading(true);
      const postupload = await ref(
        analytics,
        `CollageMediaPost/${postFile.name}${uniqueId}`
      );
      console.log("yyyyy");
      uploadBytes(postupload, postFile).then(async (data) => {
        console.log("data",data.metadata.contentType)
        setContentType(data.metadata.contentType)
        getDownloadURL(data.ref).then((url) => {
          setPost(url);
          setPostLoading(false);
        });
      });
    } catch (err) {
      setPostLoading(false);
      console.log("firebse upload error", err);
    }
  };

  const clearAllModal = () => {
    setDiscard(false);
    setOpen(false);
    setPost(null);
  };

  const handleOpen = () => {
    userdata?setOpen(true):alert("you need to login")
  };

  const handleClose = () => {
    setDiscard(true);
    setCurrentSlide(0);
    setPost(null)
    // setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: portsize ? 400 : 500,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    // p: 4,
  };


  const share=async()=>{
    if(userdata){
      try{
        const response=await axios.post(`${api}uploadpost`,{
         post,content,university:userdata.university,contentType,createdBy:userdata._id
        })
 
        console.log(response)
     }catch(err){
       console.log(err)
     }
    }else{
      alert("you need to login before post")
    }
  }

  const slide = [
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} display="flex" justifyContent="center">
        {post ? (
          <div style={{}}>
            <div
              className="flex"
              style={{ position: "absolute", color: "white" }}
            >
              <div style={{ marginLeft: "220px" }}>Create Post</div>
              <div style={{ marginLeft: "140px" }}>
                <EastIcon
                  style={{ fontSize: 40 }}
                  onClick={() => setCurrentSlide(currentSlide + 1)}
                />
              </div>
            </div>
            {postType.type == "video/mp4" ? (
              <video controls style={{ height: "100%", width: "100%" }}>
                <source src={post} />
                controls width="640" height="360"
              </video>
            ) : (
              <img src={post} style={{ height: "100%", width: "100%" }} />
            )}
          </div>
        ) : postLoading ? (
          <CircularProgress disableShrink />
        ) : (
          <div className="grid w-full">
            <div class="flex px-4 ">
              <div class="ml-10 flex-1 flex flex-col items-end">
                Create Post
              </div>
            </div>
            <div
              className="grid justify-center"
              onClick={() => postref.current.click()}
            >
              <img style={{ height: "200px" }} src="/photo.png" />{" "}
              <h2>Select from your device</h2>
              <input
                onChange={postUploadFirebase}
                className="hidden"
                type="file"
                ref={postref}
              ></input>
            </div>
          </div>
        )}
      </Box>
    </Modal>,

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="bg-gray-300">
        <div className="grid cols-2 space-y-3 px-4 h-full">
          <div
            className="col-span-2 "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <KeyboardBackspaceSharpIcon
              onClick={() => setCurrentSlide(currentSlide - 1)}
              style={{ fontSize: 40 }}
            />
            <p style={{ fontSize: 20 }}>Create Post</p>{" "}
            <b style={{ fontSize: 23, color: "blue" }} onClick={share}>
              Share <ScreenShareIcon />
            </b>
          </div>
          <div className="grid-span-1 ">
         {contentType=='image/png' || contentType=='image/jpeg' ||contentType=='image/jpg'?      
            <img src={post} />
          :          <video controls style={{ height: "100%", width: "100%" }}>
                <source src={post} />
                controls width="640" height="360"
              </video>}
          </div>
          <div className="grid-span-1 grid-cols-1 px-4">
            <div className="flex">
              <img className="h-4 rounded-full" src="/prof.webp" />
              Aman chouhan{" "}
            </div>
            <div>
              <textarea
              onChange={(e)=>setContent(e.target.value)}
                placeholder="Enter the Content..."
                className="bg-transparent border border-gray-400 p-2 rounded-lg w-full h-40 resize-none focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            <div>
              <button onClick={emojiOpen}>&#x1F604; </button>
              {emojiSelector}
              {isemoji && !portsize ? (
                <div style={{ position: "absolute", top: "9%", left: "100%" }}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>,
  ];

  return (
    <>
      <div className="flex justify-center">
        <img
          className="h-16 w-16"
          style={{ borderRadius: "15px" }}
          src="profileimg.jpg"
        />
        <textarea
          style={{
            width: portsize ? "50%" : "480px",
            color: "black",
            backgroundColor: "#C0C0C0",
          }}
          class="resize-none h-19  ml-10 border rounded-md p-2 focus:outline-yellow"
          placeholder="Enter your text..."
        ></textarea>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "10px",
          color: "black",
        }}
        className="px-6 "
      >
        <span className="grid place-center">
          <VideoCameraBackIcon
            style={{ fontSize: "45px" }}
            onClick={handleOpen}
          />{" "}
          Live{" "}
        </span>
        <span className="grid place-center">
          <PhotoIcon style={{ fontSize: "45px" }} /> Photos/
          {portsize ? <br /> : ""} Videos{" "}
        </span>
        <span className="grid place-center">
          <EmojiEmotionsIcon
            style={{ fontSize: "45px" }}
            // onClick={handleOpen}
          />{" "}
          Feeling/ {portsize ? <br /> : ""}Activity{" "}
        </span>

        {slide[currentSlide]}
        
        <Dialog
          open={discard}
          onClose={DiscardAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <p>
              Do you really want to <b className="text-red-500">Discard</b>?
            </p>
          </DialogTitle>
          <DialogActions>
            <Button onClick={clearAllModal}>Discard</Button>
            <Button onClick={() => setDiscard(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

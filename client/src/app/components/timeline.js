import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "@/apiURL";
import { Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Timeline() {

  const [expanded, setExpanded] = React.useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const[load,setLoad]=useState(false)

  const userdata = useSelector(
    (state) => state.auth?state.auth.user:null
  );

  console.log('pppp',userdata)

  const getPost = async () => {
    try {
      setLoad(true)
      const university =await userdata!==null ? userdata.response.university : "all";
      const result = await axios.get(`${api}timeline/${university}`
      );
      setPost(result.data.result);
      setLoad(false)
    } catch (error) {
      setLoad(false)
      console.log("error in timeline", error);
    }
  };


  const likePost=async(postId)=>{
    const userId=userdata?userdata.response._id:"no id"
    try{
       const likeResult=await axios.get(`${api}liking/${userId}/${postId}`)
       console.log("likedpost",likeResult)
    }catch(error){
      console.log("frontend error in liking post")
    }
  }

  useEffect(() => {
    getPost();
  }, []);



  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [post, setPost] = useState([]);




  console.log(":uuu", post);

  const listItems = Array.from({ length: 10 })

  return (
    <>

{load?     

listItems.map(()=>(
  <>
  <Box sx={{ display: 'flex', alignItems: 'center',marginTop:"10px" }}>
        <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
            <Box sx={{ width: '100%' }}>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>

        </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
  </>
))

     :(
  post.length>0 ? 
            post.map((ele, index) => {
              return (
                <Card sx={{ maxWidth: 900,marginTop:5 }} key={index}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
     <a href={ele.post} target="blank">
     <CardMedia
      sx={{maxHeight:ele.contentType=="video"?500:900}}
        component={ele.contentType=="video"?"video":"img"}
        height="100"
        image={ele.post}
        alt="Paella dish"
        // autoPlay
        controls
      />
     </a>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {showFullContent ? ele.content : `${ele.content.slice(0, 100)}...`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likePost(ele._id)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {ele.content.length > 100 && (
          <button onClick={toggleShowContent}>
            {showFullContent ? 'Show Less' : 'Show More'}
          </button>
        )}
      </CardActions>

    </Card>

              );
            }
          ) : (
            <h2>There is no post of this university</h2>
          )
)}
          

    </>
  );
}

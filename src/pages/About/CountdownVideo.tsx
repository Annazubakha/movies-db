import { Card, CardActions, CardMedia, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";

const CountdownVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlaying = () => {
    const nextPlaying = !isPlaying;
    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  return (
    <Card>
      <CardMedia>
        <video
          ref={videoRef}
          src="https://videos.pexels.com/video-files/3945446/3945446-hd_2048_1080_25fps.mp4"
          height="500"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardMedia>
      <CardActions>
        <IconButton onClick={togglePlaying}>
          {isPlaying ? (
            <PauseIcon sx={{ heigth: 38, width: 38 }} />
          ) : (
            <PlayArrowIcon sx={{ heigth: 38, width: 38 }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CountdownVideo;

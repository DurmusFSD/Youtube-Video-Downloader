import express,{Request, Response} from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);

app.post("/api/download", async(req: Request, res: Response)=>{
    const { url, quality } = req.body;
    try {
        const videoInfo = await ytdl.getInfo(url);
        const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
          filter: "videoandaudio",
          quality: quality || "highest",
          
        });
        res.status(200).json({
          message: 
          "Video URL'sini indir!!",
          download: videoFormat.url,
        });
      } catch (error) {
        res.status(500).json({message: "Server not working!"})
      }
});

app.listen(5000, () => console.log(`Server is running`));

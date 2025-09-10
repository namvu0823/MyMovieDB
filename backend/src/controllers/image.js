import { getFile } from "../services/tmdb.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Vibrant = require("node-vibrant/node");


export const download = async (req, res) => {
  try {
    const url = req.query.url;         
    const data = await getFile(url);
    const buffer = Buffer.from(await data.arrayBuffer());

    const { Vibrant } = require("node-vibrant/node");
    const palette = await Vibrant.from(buffer).getPalette();



    res.json({
      Vibrant: palette.Vibrant?.rgb || null,
      Muted: palette.Muted?.rgb || null,
      DarkVibrant: palette.DarkVibrant?.rgb || null,
      LightVibrant: palette.LightVibrant?.rgb || null,
      DarkMuted: palette.DarkMuted?.rgb || null,
      LightMuted: palette.LightMuted?.rgb || null,
    });
  } catch (err) {
    console.error(err, "Failed to extract color");
    res.status(500).json({ error: "Failed to extract color" });
  }
};

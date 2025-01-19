import mongoose from "mongoose";
import { Song } from "../modules/song.model.js";
import { config } from "dotenv";
import { DB_NAME } from "../constants.js";
import connectDb from "../db/connectDb.js";

config();

const songs = [
	{
		songName: "Stay With Me",
		songFile: "/cover-images/1.jpg",
		songImg: "/songs/1.mp3",
		artist: "Sarah Mitchell",
	},
	{
		songName: "Midnight Drive",
		songFile: "/cover-images/2.jpg",
		songImg: "/songs/2.mp3",
		artist: "The Wanderers",
	},
	{
		songName: "Lost in Tokyo",
		songFile: "/cover-images/3.jpg",
		songImg: "/songs/3.mp3",
		artist: "Electric Dreams",
	},
	{
		songName: "Summer Daze",
		songFile: "/cover-images/4.jpg",
		songImg: "/songs/4.mp3",
		artist: "Coastal Kids",
	},
	{
		songName: "Neon Lights",
		songFile: "/cover-images/5.jpg",
		songImg: "/songs/5.mp3",
		artist: "Night Runners",
	},
	{
		songName: "Mountain High",
		songFile: "/cover-images/6.jpg",
		songImg: "/songs/6.mp3",
		artist: "The Wild Ones",
	},
	{
		songName: "City Rain",
		songFile: "/cover-images/7.jpg",
		songImg: "/songs/7.mp3",
		artist: "Urban Echo",
	},
	{
		songName: "Desert Wind",
		songFile: "/cover-images/8.jpg",
		songImg: "/songs/8.mp3",
		artist: "Sahara Sons",
	},
	{
		songName: "Ocean Waves",
		songFile: "/cover-images/9.jpg",
		songImg: "/songs/9.mp3",
		artist: "Coastal Drift",
	},
	{
		songName: "Starlight",
		songFile: "/cover-images/10.jpg",
		songImg: "/songs/10.mp3",
		artist: "Luna Bay",
	},
	{
		songName: "Winter Dreams",
		songFile: "/cover-images/11.jpg",
		songImg: "/songs/11.mp3",
		artist: "Arctic Pulse",
	},
	{
		songName: "Purple Sunset",
		songFile: "/cover-images/12.jpg",
		songImg: "/songs/12.mp3",
		artist: "Dream Valley",
	},
	{
		songName: "Neon Dreams",
		songFile: "/cover-images/13.jpg",
		songImg: "/songs/13.mp3",
		artist: "Cyber Pulse",
	},
	{
		songName: "Moonlight Dance",
		songFile: "/cover-images/14.jpg",
		songImg: "/songs/14.mp3",
		artist: "Silver Shadows",
	},
	{
		songName: "Urban Jungle",
		songFile: "/cover-images/15.jpg",
		songImg: "/songs/15.mp3",
		artist: "City Lights",
	},
	{
		songName: "Crystal Rain",
		songFile: "/cover-images/16.jpg",
		songImg: "/songs/16.mp3",
		artist: "Echo Valley",
	},
	{
		songName: "Neon Tokyo",
		songFile: "/cover-images/17.jpg",
		songImg: "/songs/17.mp3",
		artist: "Future Pulse",
	},
	{
		songName: "Midnight Blues",
		songFile: "/cover-images/18.jpg",
		songImg: "/songs/18.mp3",
		artist: "Jazz Cats",
	},
];

const seedSongs = async () => {
	try {
		// await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
		connectDb();
		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();

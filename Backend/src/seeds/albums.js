import mongoose from "mongoose";
import connectDb from "../db/connectDb.js";
import { config } from "dotenv";
import { Song } from "../modules/song.model.js";
import { Album } from "../modules/album.model.js";

config();

const seedDatabase = async () => {
	try {
		// await mongoose.connect(process.env.MONGODB_URI);
		connectDb();
		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				songName: "City Rain",
				artist: "Urban Echo",
				songImg: "/cover-images/7.jpg",
				songFile: "/songs/7.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 39, // 0:39
			},
			{
				songName: "Neon Lights",
				artist: "Night Runners",
				songImg: "/cover-images/5.jpg",
				songFile: "/songs/5.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 36, // 0:36
			},
			{
				songName: "Urban Jungle",
				artist: "City Lights",
				songImg: "/cover-images/15.jpg",
				songFile: "/songs/15.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 36, // 0:36
			},
			{
				songName: "Neon Dreams",
				artist: "Cyber Pulse",
				songImg: "/cover-images/13.jpg",
				songFile: "/songs/13.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 39, // 0:39
			},
			{
				songName: "Summer Daze",
				artist: "Coastal Kids",
				songImg: "/cover-images/4.jpg",
				songFile: "/songs/4.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 24, // 0:24
			},
			{
				songName: "Ocean Waves",
				artist: "Coastal Drift",
				songImg: "/cover-images/9.jpg",
				songFile: "/songs/9.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 28, // 0:28
			},
			{
				songName: "Crystal Rain",
				artist: "Echo Valley",
				songImg: "/cover-images/16.jpg",
				songFile: "/songs/16.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 39, // 0:39
			},
			{
				songName: "Starlight",
				artist: "Luna Bay",
				songImg: "/cover-images/10.jpg",
				songFile: "/songs/10.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 30, // 0:30
			},
			{
				songName: "Stay With Me",
				artist: "Sarah Mitchell",
				songImg: "/cover-images/1.jpg",
				songFile: "/songs/1.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 46, // 0:46
			},
			{
				songName: "Midnight Drive",
				artist: "The Wanderers",
				songImg: "/cover-images/2.jpg",
				songFile: "/songs/2.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 41, // 0:41
			},
			{
				songName: "Moonlight Dance",
				artist: "Silver Shadows",
				songImg: "/cover-images/14.jpg",
				songFile: "/songs/14.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 27, // 0:27
			},
			{
				songName: "Lost in Tokyo",
				artist: "Electric Dreams",
				songImg: "/cover-images/3.jpg",
				songFile: "/songs/3.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 24, // 0:24
			},
			{
				songName: "Neon Tokyo",
				artist: "Future Pulse",
				songImg: "/cover-images/17.jpg",
				songFile: "/songs/17.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 39, // 0:39
			},
			{
				songName: "Purple Sunset",
				artist: "Dream Valley",
				songImg: "/cover-images/12.jpg",
				songFile: "/songs/12.mp3",
				// plays: Math.floor(Math.random() * 5000),
				// duration: 17, // 0:17
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany(
				{ _id: { $in: albumSongs } },
				{ albumId: album._id }
			);
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();

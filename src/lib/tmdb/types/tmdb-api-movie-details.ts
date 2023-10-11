import { z } from 'zod';

export const movieCastSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

export const movieCrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const departmentSchema = z.union([
  z.literal('Acting'),
  z.literal('Art'),
  z.literal('Camera'),
  z.literal('Costume & Make-Up'),
  z.literal('Crew'),
  z.literal('Directing'),
  z.literal('Editing'),
  z.literal('Lighting'),
  z.literal('Production'),
  z.literal('Sound'),
  z.literal('Visual Effects'),
  z.literal('Writing'),
]);

export const movieGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const moviePosterSchema = z.object({
  aspect_ratio: z.number(),
  height: z.number(),
  iso_639_1: z.string(),
  file_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  width: z.number(),
});

export const movieProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export const movieProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const movieSpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

export const movieVideoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  published_at: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  id: z.string(),
});

export const movieCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(movieCastSchema),
  crew: z.array(movieCrewSchema),
});

export const movieImagesSchema = z.object({
  backdrops: z.array(moviePosterSchema),
  logos: z.array(moviePosterSchema),
  posters: z.array(moviePosterSchema),
});

export const movieVideosSchema = z.object({
  results: z.array(movieVideoSchema),
});

export const movieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  belongs_to_collection: z.null(),
  budget: z.number(),
  genres: z.array(movieGenreSchema),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(movieProductionCompanySchema),
  production_countries: z.array(movieProductionCountrySchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(movieSpokenLanguageSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  videos: movieVideosSchema.optional(),
  images: movieImagesSchema.optional(),
  credits: movieCreditsSchema.optional(),
});

export type MovieCast = z.infer<typeof movieCastSchema>;

export type MovieCrew = z.infer<typeof movieCrewSchema>;

export type Department = z.infer<typeof departmentSchema>;

export type MovieGenre = z.infer<typeof movieGenreSchema>;

export type MoviePoster = z.infer<typeof moviePosterSchema>;

export type MovieProductionCompany = z.infer<
  typeof movieProductionCompanySchema
>;

export type MovieProductionCountry = z.infer<
  typeof movieProductionCountrySchema
>;

export type MovieSpokenLanguage = z.infer<typeof movieSpokenLanguageSchema>;

export type MovieVideo = z.infer<typeof movieVideoSchema>;

export type MovieCredits = z.infer<typeof movieCreditsSchema>;

export type MovieImages = z.infer<typeof movieImagesSchema>;

export type MovieVideos = z.infer<typeof movieVideosSchema>;

export type MovieDetails = z.infer<typeof movieDetailsSchema>;

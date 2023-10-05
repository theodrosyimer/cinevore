'use client'

import * as dotenv from "dotenv"
dotenv.config()

import { useFilms } from '@/hooks/useFilms-zod'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function HeroImage() {
  const { data: films, isLoading } = useFilms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!films) {
    return <div>No films found</div>
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Home Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {films.results.map((movie) => (
          <div key={movie.id}>
            <Link href={`/films/${movie.id}`}>
              <Image
                src={`${process.env.TMDB_IMAGE_BASE_URI}/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

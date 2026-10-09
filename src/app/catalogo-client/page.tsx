'use client';

import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  url: string;
}

export default function CatalogoClient() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_PROD}/videos`
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os vídeos.");
        }

        const catalog: Video[] = await response.json();
        setVideos(catalog);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Ocorreu um erro ao carregar os vídeos."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadVideos();
  }, [])

  return (
    <div className="container-main">
      <div className="container-title mx-auto text-center mx-xl-5 m-8">
        <h1 className="text-4xl font-bold mb-4">Veja seus videos disponiveis  client</h1>
      </div>

      <div className="container-videos flex justify-center">
        {isLoading && <p>Carregando vídeos...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && videos.length === 0 && (
          <p>Nenhum vídeo encontrado.</p>
        )}
        {!isLoading && !error && videos.map((video) => (
          <div key={video.id} className="bg-blue-300 p-5 rounded-md m-5">
            <h3 className="font-bold">Título: 
              <span className="font-normal"> {video.title}</span>
            </h3>
            <div className="font-bold">Descrição do Video: 
              <span className="font-normal"> {video.description}</span>
            </div>
            <div className="font-bold">Duração:
              <span className="italic font-normal"> {video.duration}</span>
            </div>
            <a href={video.url} target="_blank" rel="noreferrer">
              Assistir vídeo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
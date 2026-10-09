interface VideoProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  url: string;
}

// interface CatalogResponse {
//   videos: VideoProps[];
// }

export default async function Catalogo() {

  const res = await fetch('https://server-nodejs-sufg.onrender.com/videos')
  const catalog: VideoProps[] = await res.json()

  console.log(catalog);
  

 

  return (
    <div className="container-main">
      <div className="container-title mx-auto text-center mx-xl-5 m-8">
        <h1 className="text-4xl font-bold mb-4">Veja seus videos disponiveis</h1>
      </div>

      <div className="container-videos flex justify-center">
        {catalog.map(video => (
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
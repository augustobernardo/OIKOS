import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface VideoCardProps {
  id: string;
  familyMember: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export default function VideoCard({
  id,
  familyMember,
  thumbnailUrl,
  videoUrl,
}: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 h-full">
          <div className="relative aspect-video">
            <img
              src={thumbnailUrl}
              // alt={`${familyMember} - Thumbnail`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-12 h-12 opacity-80"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
          </div>
          {/* <CardContent className="p-4">
            <h3 className="font-bold text-lg truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">{familyMember}</p>
          </CardContent> */}
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        {/* <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader> */}
        <div className="video-container">
          {/* Normalmente usaríamos uma URL real de vídeo aqui */}
          <video
            controls
            autoPlay
            className="w-full"
            src={videoUrl}
            poster={thumbnailUrl}
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        {/* <p className="text-center text-lg font-medium mt-2">{familyMember}</p> */}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            <div
                className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 group"
                style={{ aspectRatio: '16/9' }}
            >
                {/* Main Image Slider */}
                <div
                    className="w-full h-full transition-transform duration-500 ease-out flex"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((src, idx) => (
                        <div key={idx} className="relative w-full h-full flex-shrink-0">
                            <Image
                                src={src}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                                unoptimized
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-slate-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-2 hover:bg-white/80'
                                }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-center text-sm text-slate-400">
                Gallery image {currentIndex + 1} of {images.length}
            </p>
        </div>
    );
}

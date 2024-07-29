import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50">
      <div className="min-h-96 bg-gradient-to-r from-green-400 to-blue-500"></div>
      <svg viewBox="0 0 1440 320" fillOpacity=".7">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#4ADE80", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#3B82F6", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,64L48,101.3C96,139,192,213,288,229.3C384,245,480,203,576,165.3C672,128,768,96,864,101.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
        <path
          fill="url(#gradient)"
          d="M0,256L48,250.7C96,245,192,235,288,197.3C384,160,480,96,576,64C672,32,768,32,864,74.7C960,117,1056,203,1152,202.7C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
        <path
          fill="url(#gradient)"
          d="M0,320L48,272C96,224,192,128,288,85.3C384,43,480,53,576,64C672,75,768,85,864,117.3C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
        <path
          fill="url(#gradient)"
          d="M0,288L30,261.3C60,235,120,181,180,154.7C240,128,300,128,360,112C420,96,480,64,540,74.7C600,85,660,139,720,181.3C780,224,840,256,900,256C960,256,1020,224,1080,229.3C1140,235,1200,277,1260,256C1320,235,1380,149,1410,106.7L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
        <path
          fill="url(#gradient)"
          d="M0,32L30,42.7C60,53,120,75,180,90.7C240,107,300,117,360,128C420,139,480,149,540,165.3C600,181,660,203,720,197.3C780,192,840,160,900,138.7C960,117,1020,107,1080,128C1140,149,1200,203,1260,234.7C1320,267,1380,277,1410,282.7L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      <main className="absolute top-0 left-0 right-0 bottom-0 flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col flex-1 lg:container p-6 md:p-12 mx-auto space-y-4 md:space-y-8">
          <Image alt="app logo" src={"/favicon.ico"} width={64} height={64} />

          <div className="text-white">
            <h3 className="p-2 md:p-4 font-semibold text-lg md:text-2xl">
              We Connect for Change
            </h3>
            <h3 className="p-2 md:p-4 font-semibold text-lg md:text-2xl">
              We Collaborate for a Better Future
            </h3>
            <h3 className="p-2 md:p-4 font-semibold text-lg md:text-2xl">
              We Unite for Sustainability
            </h3>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Connect For A Cause
          </h1>
          <div className="z-10 relative">
            <Link
              href="/auth/login"
              className="relative inline-flex align-middle items-center rounded-md
            border-2 font-semibold border-gray-800 bg-transparent py-2 px-6 md:py-2.5 md:px-9 uppercase 
            text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 
            before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 
            before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 group"
            >
              Login here
              <ArrowRight className="ml-2 transition-all delay-150 duration-300 group-hover:ml-8" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

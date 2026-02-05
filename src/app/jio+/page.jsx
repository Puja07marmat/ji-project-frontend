// import { api, ENDPOINT, getStreamingVideoThumbnail } from "@/lib/api";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import Image from "next/image";
// import { PlayCircleIcon } from "lucide-react";

// export default async function JioPlusPage() {
//     const videos = (await api.get(ENDPOINT.fetchAllStreamingVideos)).data?.data;

//     return (
//         <main className="h-screen mt-20 p-8">
//             <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
//             <ul
//                 className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
//             >
//                 {videos?.map((video, index) => (
//                     <Link
//                         key={index}
//                         href={`jio+/watch?id=${video.id}`}
//                         className="relative flex items-center justify-center"
//                     >
//                         <Image
//                             src={getStreamingVideoThumbnail(video.id)}
//                             alt=""
//                             width={200}
//                             height={300}
//                             className="min-w-[200px] h-[300px] rounded-lg object-cover"
//                             quality={30}
//                         />
//                         <PlayCircleIcon className="absolute" />
//                     </Link>
//                 ))}
//             </ul>
//         </main>
//     );
// }
import { api, ENDPOINT, getStreamingVideoThumbnail } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";

// Ye line Next.js ko bolegi ki build ke waqt error na de
export const dynamic = 'force-dynamic';

export default async function JioPlusPage() {
    let videos = [];
    
    try {
        // Render API thoda time leti hai, isliye try-catch zaruri hai
        const response = await api.get(ENDPOINT.fetchAllStreamingVideos);
        videos = response.data?.data || [];
    } catch (error) {
        console.error("Build time fetch failed:", error.message);
        videos = []; // Khali array taaki build crash na ho
    }

    return (
        <main className="h-screen mt-20 p-8">
            <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
            
            {/* Agar videos mil gaye toh list dikhao, nahi toh error message */}
            {videos.length === 0 ? (
                <div className="text-center p-10">
                    <p className="text-gray-400">Videos load nahi ho paye. Shyad backend so raha hai (Render Sleep mode). Phir se try karein.</p>
                </div>
            ) : (
                <ul className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}>
                    {videos.map((video, index) => (
                        <Link
                            key={index}
                            href={`jio+/watch?id=${video.id}`}
                            className="relative flex items-center justify-center"
                        >
                            <Image
                                src={getStreamingVideoThumbnail(video.id)}
                                alt=""
                                width={200}
                                height={300}
                                className="min-w-[200px] h-[300px] rounded-lg object-cover"
                                quality={30}
                            />
                            <PlayCircleIcon className="absolute" />
                        </Link>
                    ))}
                </ul>
            )}
        </main>
    );
}
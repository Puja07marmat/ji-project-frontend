// import BannerSection from "@/components/section/BannerSection";
// import CategoriesSection from "@/components/section/CategoriesSection";
// import JumperSection from "@/components/section/JumperSection";
// import { api, ENDPOINT } from "@/lib/api";


// export default function Home() {
//     const list = [
//         {
//             label: "Comedy",
//             href: "comedy",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchComedyTvShows))?.data?.response?.results;
//             },
//         },
//         {
//             label: "Crime",
//             href: "crime",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchCrimeTvShows))?.data?.response?.results;
//             },
//         },
//         {
//             label: "Drama",
//             href: "drama",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchDramaTvShows))?.data?.response?.results;
//             },
//         },
//         {
//             label: "Action",
//             href: "action",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchActionTvShows))?.data?.response?.results;
//             },
//         },
//     ];
//     const getTVBannerData = async () => {
//         return (await api.get(ENDPOINT.fetchMysteryTvShows)).data?.response?.results;
//     };

//   return (
//     <>
//     <JumperSection list={list}/>
//           <BannerSection fetcher={getTVBannerData}/>
//     {/* // list of categories  */}
//       {list.map((item) => {
//         return <CategoriesSection key={item.label} title={item.label} id={item.href} fetcher={item.fetcher} />
//       })}
//     </>
//   );
// }
import BannerSection from "@/components/section/BannerSection";
import CategoriesSection from "@/components/section/CategoriesSection";
import JumperSection from "@/components/section/JumperSection";
import { api, ENDPOINT } from "@/lib/api";

// Ye line Next.js ko batayegi ki build ke time API call na kare
export const dynamic = "force-dynamic";

export default function Home() {
    
    // Helper function taaki agar ek API fail ho toh baaki page chalta rahe
    const safeFetcher = async (endpoint) => {
        try {
            const response = await api.get(endpoint);
            return response?.data?.response?.results || [];
        } catch (error) {
            console.error(`Error fetching from ${endpoint}:`, error.message);
            return []; // Fail hone par empty array return karega, crash nahi
        }
    };

    const list = [
        {
            label: "Comedy",
            href: "comedy",
            fetcher: () => safeFetcher(ENDPOINT.fetchComedyTvShows),
        },
        {
            label: "Crime",
            href: "crime",
            fetcher: () => safeFetcher(ENDPOINT.fetchCrimeTvShows),
        },
        {
            label: "Drama",
            href: "drama",
            fetcher: () => safeFetcher(ENDPOINT.fetchDramaTvShows),
        },
        {
            label: "Action",
            href: "action",
            fetcher: () => safeFetcher(ENDPOINT.fetchActionTvShows),
        },
    ];

    const getTVBannerData = async () => {
        try {
            const response = await api.get(ENDPOINT.fetchMysteryTvShows);
            return response.data?.response?.results || [];
        } catch (error) {
            console.error("Banner Error:", error.message);
            return [];
        }
    };

    return (
        <>
            <JumperSection list={list} />
            <BannerSection fetcher={getTVBannerData} />
            
            {/* List of categories */}
            {list.map((item) => (
                <CategoriesSection 
                    key={item.label} 
                    title={item.label} 
                    id={item.href} 
                    fetcher={item.fetcher} 
                />
            ))}
        </>
    );
}
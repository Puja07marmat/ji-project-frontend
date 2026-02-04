// import BannerSection from "@/components/section/BannerSection";
// import CategoriesSection from "@/components/section/CategoriesSection";
// import JumperSection from "@/components/section/JumperSection";
// import { api, ENDPOINT } from "@/lib/api";


// export default function Home() {
//     const list = [
//         {
//             label: "Top Comedy Movies",
//             href: "comedy",
//            fetcher: async () => {
//                  return (await api.get(ENDPOINT.fetchComedyMovies)).data.response?.results;
//             },
          

//         },
//         // {
//         //     label: "Top Horror Movies",
//         //     href: "horror",
//         //     fetcher: async () => {
//         //         return (await api.get(ENDPOINT.fetchHorrorMovies)).data.response?.results;
//         //     },
//         // },
//         {
//     href: "horror",
//     fetcher: async () => {
//         try {
//             const response = await api.get(ENDPOINT.fetchHorrorMovies);
//             // Safely return data, agar data nahi hai toh empty array []
//             return response?.data?.response?.results || [];
//         } catch (error) {
//             console.error("Horror Movies API Error:", error.message);
//             return []; // Error aane par page crash nahi hoga, bas list khali dikhegi
//         }
//     },
// },
//         {
//             label: "Top Romance Movies",
//             href: "romance",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchRomanceMovies)).data.response?.results;
//             },
//         },
//         {
//             label: "Top Action Movies",
//             href: "action",
//             fetcher: async () => {
//                 return (await api.get(ENDPOINT.fetchActionMovies)).data.data?.results;
//             },
//         },
//     ];
    
//      // --- Is puraane hisse ko dhoondiye ---
// const getMoviesBannerData = async () => {
//     return (await api.get(ENDPOINT.fetchAnimeMovies)).data?.response?.results;
// };


// // --- Aur use is naye code se badal dijiye (Replace) ---

//     return (
//         <>
//             <JumperSection list={list} />
//             <BannerSection fetcher={getMoviesBannerData} />
//             {/* // list of categories  */}
//             {list.map((item) => {
//                 return <CategoriesSection key={item.label} title={item.label} id={item.href} fetcher={item.fetcher} />
//             })}
//         </>
//     );
// }
import BannerSection from "@/components/section/BannerSection";
import CategoriesSection from "@/components/section/CategoriesSection";
import JumperSection from "@/components/section/JumperSection";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
    
    // Helper function banaya hai taaki code repeat na ho aur safely data fetch kare
    const safeFetcher = async (endpoint, path = "response") => {
        try {
            const res = await api.get(endpoint);
            // Dynamic path checking: kuch API response mein 'response' hota hai, kuch mein 'data'
            const results = path === "response" ? res.data?.response?.results : res.data?.data?.results;
            return results || []; 
        } catch (error) {
            console.error(`Error fetching from ${endpoint}:`, error.message);
            return []; // Error aane par empty array bhejenge taaki UI na fate
        }
    };

    const list = [
        {
            label: "Top Comedy Movies",
            href: "comedy",
            fetcher: () => safeFetcher(ENDPOINT.fetchComedyMovies),
        },
        {
            label: "Top Horror Movies",
            href: "horror",
            fetcher: () => safeFetcher(ENDPOINT.fetchHorrorMovies),
        },
        {
            label: "Top Romance Movies",
            href: "romance",
            fetcher: () => safeFetcher(ENDPOINT.fetchRomanceMovies),
        },
        {
            label: "Top Action Movies",
            href: "action",
            fetcher: () => safeFetcher(ENDPOINT.fetchActionMovies, "data"), // Action API ke liye path 'data' hai
        },
    ];

    // Banner data fetcher with error handling
    const getMoviesBannerData = async () => {
        try {
            const res = await api.get(ENDPOINT.fetchAnimeMovies);
            return res.data?.response?.results || [];
        } catch (error) {
            console.error("Banner API Error:", error.message);
            return [];
        }
    };

    return (
        <>
            <JumperSection list={list} />
            <BannerSection fetcher={getMoviesBannerData} />
            
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
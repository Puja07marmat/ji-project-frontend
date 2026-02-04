// import BannerSection from "@/components/section/BannerSection";
// import CategoriesSection from "@/components/section/CategoriesSection";
// //  import JumperSection from "@/components/section/JumperSection";

// import JumperSection from "@/components/section/JumperSection";
//  import {api, ENDPOINT } from "@/lib/api";



// export default function Home() {
//   const list = [
//     {
//       label: "Top Rated",
//       href: "top-rated",
//       fetcher:async function getTopRatedData() {
//       const resp = await api.get(ENDPOINT.discoverTopRated);
//       const data = resp?.data?.response?.results;
//       return data;
//     }
//     },
//     {
//       label: "Popular",
//       href: "popular",
//       // fetcher:async function getPopular(){
//       //   const resp = await api.get(ENDPOINT.discoverTrending);
//       //   const data = resp?.data?.response?.results;
//       //   return data;
//       // }
//       fetcher: async function getPopular() {
//   try {
//     const resp = await api.get(ENDPOINT.discoverTrending);
//     return resp?.data?.response?.results || [];
//   } catch (error) {
//     console.error("Fetch failed:", error.message);
//     return []; // Return an empty array so the UI doesn't break
//   }
// }
//     },
//     {
//       label: "Upcoming",
//       href: "upcoming",
//       fetcher: async function getUpcoming() {
//         const resp = await api.get(ENDPOINT.discoverUpcoming);
//         const data = resp?.data?.response?.results;
//         return data;
//       }
//     },
//   ];
//    async function getHomeBannerData() {
//     const resp = await api.get(ENDPOINT.discoverNowPlaying);
//     const data = resp?.data?.response?.results;
//     return data;
//   }
 

//   return (
//     <>
//     <JumperSection list={list}/>
//       <BannerSection fetcher={getHomeBannerData}/>
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
// Yahan dhyan dein: Agar api.js mein 'export default' hai toh { } hata dena
import { api, ENDPOINT } from "@/lib/api"; 

export default function Home() {
  const list = [
    {
      label: "Top Rated",
      href: "top-rated",
      fetcher: async function getTopRatedData() {
        try {
          const resp = await api.get(ENDPOINT.discoverTopRated);
          return resp?.data?.response?.results || [];
        } catch (err) {
          console.error("Top Rated Error:", err.message);
          return [];
        }
      }
    },
    {
      label: "Popular",
      href: "popular",
      fetcher: async function getPopular() {
        try {
          const resp = await api.get(ENDPOINT.discoverTrending);
          return resp?.data?.response?.results || [];
        } catch (error) {
          console.error("Popular Fetch failed:", error.message);
          return []; 
        }
      }
    },
    {
      label: "Upcoming",
      href: "upcoming",
      fetcher: async function getUpcoming() {
        try {
          const resp = await api.get(ENDPOINT.discoverUpcoming);
          return resp?.data?.response?.results || [];
        } catch (err) {
          console.error("Upcoming Error:", err.message);
          return [];
        }
      }
    },
  ];

  async function getHomeBannerData() {
    try {
      const resp = await api.get(ENDPOINT.discoverNowPlaying);
      return resp?.data?.response?.results || [];
    } catch (err) {
      console.error("Banner Error:", err.message);
      return [];
    }
  }

  return (
    <>
      <JumperSection list={list}/>
      <BannerSection fetcher={getHomeBannerData}/>
      
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
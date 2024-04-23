// "use client";

// import { Suspense } from "react";
// import BasicTabs from "@/components/UI/BasicTabs";
// import Loader from "@/components/shared/loader/Loader";

// import dynamic from "next/dynamic";

// const HomePage = dynamic(() => import("@/components/home/HomePage"));
// const MostViewedPage = dynamic(
//     () => import("@/components/home/MostViewedPage"),
// );
// const FavoritePage = dynamic(() => import("@/components/home/FavoritePage"));

// export default function Home() {
//     return (
//         <Suspense fallback={<Loader visible />}>
//             <BasicTabs
//                 items={[
//                     {
//                         label: "Your Items",
//                         render: (
//                             <Suspense fallback={<Loader visible />}>
//                                 <HomePage />
//                             </Suspense>
//                         ),
//                     },
//                     {
//                         label: "Favorite Items",
//                         render: (
//                             <Suspense fallback={<Loader visible />}>
//                                 <FavoritePage />
//                             </Suspense>
//                         ),
//                     },
//                     {
//                         label: "Most Viewed Items",
//                         render: (
//                             <Suspense fallback={<Loader visible />}>
//                                 <MostViewedPage />
//                             </Suspense>
//                         ),
//                     },
//                 ]}
//             />
//         </Suspense>
//     );
// }

// "use client";

// import { useParams } from "next/navigation";
// // import Consumers from "@/components/apis/Consumers";

// export default function Home() {
//     const params = useParams();
// //<Consumers id={params.apiId} />
//     return (<div>(navbarPAGE)</div>);
// }


import initTranslations from '@/app/i18n';
import Quotation from '@/components/NewQuotation/Quotation';
import TranslationsProvider from '@/lib/utils/translationsProvider';
import { NextPage } from 'next';
import Link from 'next/link';
async function Home({ params: { locale } }: { params: { locale: string } }) {
  return <Quotation />;
};

export default Home;
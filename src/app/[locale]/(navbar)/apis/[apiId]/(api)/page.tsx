"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";
// import ApiDetail from "@/components/apis/ApisDetails";
// import ProvidedApis from "@/components/apis/ProvidedApis";
// import ApiDataContext from "@/components/contexts/configurationItems/ApiDataContext";

export default function ApiDetailPage() {
    const params = useParams();
    // const apiDataContext = useContext(ApiDataContext);

    return (
        <>
            {/* {!!apiDataContext?.api && (
                <ApiDetail
                    apiEntity={apiDataContext?.api}
                    refreshApiData={apiDataContext.refreshApi}
                />
            )}
            <ProvidedApis id={parseInt(params.apiId, 10)} /> */}
        </>
    );
}

"use client";

// import { ApiDataContextProvider } from "@/components/contexts/configurationItems/ApiDataContext";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

type PropsType = PropsWithChildren;

export default function Layout({ children }: PropsType) {
    const params = useParams();

    return (
        // <ApiDataContextProvider apiId={parseInt(params.apiId, 10)}>
            {children}
        // </ApiDataContextProvider>
    );
}

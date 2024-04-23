"use client";

import { useParams } from "next/navigation";
// import Consumers from "@/components/apis/Consumers";

export default function ApiConsumersPage() {
    const params = useParams();
//<Consumers id={params.apiId} />
    return <>Consumers</>;
}

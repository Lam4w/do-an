"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const cvId = useSearchParams().get("cv");
  const snapshotId = useSearchParams().get("snapshot");

  const { data: html, isFetched } = useQuery({
    queryKey: ["userCvs"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/cv/html?cv=${cvId}` +
          (!!snapshotId ? `&snapshot=${snapshotId}` : ""),
      );

      return data;
    },
  });

  return (
    <>
      {isFetched && html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Page;

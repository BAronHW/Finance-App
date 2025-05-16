import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import AwsS3 from "@uppy/aws-s3";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';


type Props = {
  current: string;
  className?: string;
};

export const ProfilePicture = ({ current, className }: Props) => {
  const uppyRef = useRef<Uppy | null>(null); 
  const dashboardRef = useRef<any>(null);
  const params = useParams();
  const userId = Array.isArray(params?.userId)
    ? Number(params?.userId[0])
    : Number(params?.userId);

  useEffect(() => {
    uppyRef.current = new Uppy();
    uppyRef.current.use(Dashboard, { inline: false });
    uppyRef.current.use(AwsS3, {
      getUploadParameters(file) {
        return fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation UpdateProfilePhoto($userId: Int!) {
                updateProfilePhoto(userId: $userId)
              }
            `,
            variables: {
              userId: userId,
            },
          }),
        })
        .then((response) => response.json())
        .then((result) => {
          const signedUrl = result.data.updateProfilePhoto;
          return {
            method: "PUT",
            url: signedUrl,
            headers: {
              "Content-Type": file.type,
            },
          };
        });
      },
    });
    
    dashboardRef.current = uppyRef.current.getPlugin('Dashboard');
  }, [userId]);

  const openUppy = () => {
    if (dashboardRef.current) {
      dashboardRef.current.openModal();
    }
  };
    
  return <img src={current} className={className} onClick={openUppy} />;
};
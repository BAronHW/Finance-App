


// import { useEffect, useRef, useState } from "react";
// import Uppy from "@uppy/core";
// import { Dashboard } from "@uppy/react";
// import Tus from "@uppy/tus";
// import "@uppy/core/dist/style.min.css";
// import "@uppy/dashboard/dist/style.min.css";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const pfpBucketName = ;

// const DocumentUpload = () => {
//   const [uppyInstance, setUppyInstance] = useState<Uppy | null>(null);
//   const [ready, setReady] = useState(false);
//   const [fileUploaded, setFileUploaded] = useState(false);

//   const formRef = useRef(() => {});
//   const [uploadOpen, setUploadOpen] = useState(false);

//   useEffect(() => {
//     const uppy = new Uppy({
//       autoProceed: false,
//       debug: true,
//       restrictions: {
//         maxNumberOfFiles: 10,
//         allowedFileTypes: null, // Allow all file types, or specify like ['.pdf', '.docx']
//       },
//     });

//     uppy.use(Tus, {
//       endpoint: supabaseStorageURL,
//       headers: {
//         apikey: import.meta.env.VITE_SUPABASE_API_KEY,
//         authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
//       },
//       onError: (error) => {
//         console.error("Upload error:", error);
//       },
//       chunkSize: 6 * 1024 * 1024, // 6MB
//     });

//     uppy.on("file-added", (file) => {
//       file.meta = {
//         ...file.meta,
//         bucketName: import.meta.env.VITE_SUPABASE_DOCUMENTS_BUCKET,
//         objectName: file.name,
//       };
//     });

//     uppy.on("complete", (result) => {
//       console.log("Upload completed:", result.successful);
//       if (result.successful) {
//         setFileUploaded(true);
//       } else {
//         console.log("Result failed:", result.failed);
//       }
//     });

//     setUppyInstance(uppy);

//     return () => {
//       uppy.off("file-added", () => {
//         console.log("Unsubscribed to 'file-added' event");
//       });
//       uppy.off("complete", () => {
//         console.log("Unsubscribed to 'complete' event");
//       });
//     };
//   }, []);

//   if (!uppyInstance) {
//     return <div>Loading uploader...</div>;
//   }

//   return (
//     <div className="uppy-container">
//       <Popover open={uploadOpen} onOpenChange={setUploadOpen}>
//         <PopoverTrigger>
//           <Button>
//             <Plus />
//             Add New Document
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full">
//           <Dashboard
//             uppy={uppyInstance}
//             width="100%"
//             height="400px"
//             showProgressDetails={true}
//             disabled={!ready}
//             doneButtonHandler={() => {
//               formRef.current();
//               uppyInstance.clear();
//               setUploadOpen(false);
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default DocumentUpload;

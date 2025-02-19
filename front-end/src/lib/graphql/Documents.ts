import { gql } from "@apollo/client";

export const UPLOAD_PDF = gql(
    `
    mutation UploadPdf($name: String!, $size: Int!, $file: String!, $uid: String!) {
    uploadPdf(name: $name, size: $size, file: $file, uid: $uid)
    }

    `
)
import { gql } from "@apollo/client";

export const UPLOAD_PDF = gql(
    `
    mutation uploadPdf($name: String!, $size: Int!, $file: String!, $uid: String!) {
    uploadPdf(name: $name, size: $size, file: $file, uid: $uid)
    }

    `
)

export const GET_ALL_PDF_URL_FROM_USER = gql(
    `
    query getALLPDFURLBelongingToUserByUid($uid: String!) {
    getALLPDFURLBelongingToUserByUid(uid: $uid)
    }
    `
)
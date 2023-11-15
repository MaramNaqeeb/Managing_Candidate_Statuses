export interface candidateResponse {
  
    "data": {
        "id": number,
        "firstName": string,
        "middleName": string,
        "lastName": string,
        "email": string,
        "contactNumber": string,
        "comment": null,
        "keywords": string,
        "modeOfApplication": number,
        "dateOfApplication": string,
        "vacancy": {
            "id": number,
            "name": string,
            "status": boolean,
            "jobTitle": {
                "id": number,
                "title": string,
                "isDeleted": boolean
            },
            "hiringManager": {
                "id": number,
                "firstName": string,
                "middleName": string,
                "lastName": string,
                "terminationId": null
            }
        },
        "status": {
            "id": number,
            "label": string
        },
        "hasAttachment": boolean,
        "consentToKeepData": false
    },
    "meta": [],
    "rels": []
    
}

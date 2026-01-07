export interface Justificatif {


    id: number;
    userId: number;
    objectId: number;
    proofImageUrl?: string; // optionnel car c’est nullable côté backend
    status: string;
    objectImageUrl?: string; 
      objectName?: string;




   objectcategory?: string; 
    objectcolor?: string; 
   objectbrand?: string; 
}



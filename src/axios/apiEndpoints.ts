const apiEndpoints = {
  DELETE_ASSET: (assetId: string) => `/cloudinary/delete/${assetId}`,
  GET_ASSETS: (resource_type: string) =>
    `/cloudinary/getassets/${resource_type}`,
  GET_STARRED_ASSETS: (resource_type: string) =>
    `/cloudinary/getassets/${resource_type}?starred=true`,
};

export default apiEndpoints;

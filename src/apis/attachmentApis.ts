import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { AttachmentResponse } from "@/types/response/attachment";
import { ApiResponse } from "@/types/response/pagination";

const attachmentApis = {

  getFiles: async (page: number, pageSize: number): Promise<ApiResponse<AttachmentResponse>> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.files}`, {
        params: {
          page,
          page_size: pageSize
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getFileById: async (id: string): Promise<BaseResponse<AttachmentResponse>> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.files}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadFile: async (file: File): Promise<BaseResponse<AttachmentResponse>> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
      const response = await axiosInstance.post(`/${urls.api}/${urls.files}/${urls.upload}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  deleteFile: async (id: string): Promise<BaseResponse<void>> => {
    try {
      const response = await axiosInstance.delete(`/${urls.api}/${urls.files}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  downloadFile: async (id: string): Promise<Blob> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.files}/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 
};

export default attachmentApis;

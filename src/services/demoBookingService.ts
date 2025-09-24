/**
 * Demo booking service for API calls and request/response handling
 */
import { API_ENDPOINTS } from '@/constants/apiConstants/apiEndpoints';
import { apiPost } from '@/utils/api';
import { transformFormDataToApiPayload } from '@/utils/formTransformers';

export interface DemoBookingResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Submits demo booking form data to the API
 */
export const submitDemoBooking = async (formData: FormData): Promise<DemoBookingResponse> => {
  try {
    const payload = transformFormDataToApiPayload(formData);
    const response = await apiPost(API_ENDPOINTS.SCHEDULE_DEMO_FORM, payload);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Submission failed',
    };
  }
};

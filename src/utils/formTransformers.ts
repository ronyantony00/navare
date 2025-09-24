/**
 * Form data transformers and validation utilities
 */

/**
 * Maps form container values to database enum values
 */
export const mapContainersValue = (formValue: string): string => {
  switch (formValue) {
    case '1-100':
      return 'less_than_250';
    case '101-500':
      return 'between_250_and_1000';
    case '501-1000':
      return 'between_1000_and_2500';
    case '1001-2500':
      return 'between_2500_and_5000';
    case '2501-5000':
      return 'between_5000_and_10000';
    case '5000+':
      return 'more_than_10000';
    default:
      return 'unknown';
  }
};

/**
 * Safely extracts and validates form field from FormData
 */
export const getFormField = (formData: FormData, fieldName: string): string => {
  const value = formData.get(fieldName);
  if (!value || typeof value !== 'string') {
    throw new Error(`${fieldName} is required and must be a string`);
  }
  return value.trim();
};

/**
 * Transforms FormData to API payload format
 */
export const transformFormDataToApiPayload = (formData: FormData) => {
  const firstName = getFormField(formData, 'firstName');
  const lastName = getFormField(formData, 'lastName');
  const email = getFormField(formData, 'email');
  const phoneNumber = getFormField(formData, 'number');
  const companyName = getFormField(formData, 'company');
  const containers = getFormField(formData, 'containers');

  return {
    data: {
      first_name: firstName,
      last_name: lastName,
      work_email: email,
      phone_number: phoneNumber,
      company_name: companyName,
      containers_per_year: mapContainersValue(containers),
      request_status: 'requested',
    },
  };
};

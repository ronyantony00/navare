import type { ContactInfo, ContactInfoType } from '@/types/contactus';

export const transformContactData = (apiData: ContactInfoType): ContactInfo[] => {
  const contactInfo: ContactInfo[] = [];
  let idCounter = 1;

  apiData.contact_info_section.forEach((section) => {
    section.offices.forEach((office) => {
      // Add email
      office.email.forEach((emailItem) => {
        contactInfo.push({
          id: idCounter++,
          title: emailItem.label,
          info: emailItem.email_id,
        });
      });

      // Add phone
      office.phone_contact.forEach((phoneItem) => {
        contactInfo.push({
          id: idCounter++,
          title: phoneItem.label,
          info: phoneItem.phone,
        });
      });

      // Add address
      contactInfo.push({
        id: idCounter++,
        title: office.tag,
        info: office.address,
      });
    });
  });

  return contactInfo;
};

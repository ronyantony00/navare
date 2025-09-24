export interface title {
  id: number;
  text: string;
  highlight: boolean;
}

interface acheivement_logo {
  Id: number;
  url: string;
}

interface bullet_point {
  id: number;
  point: string;
}

export interface demoPageData {
  acheivement_logos: acheivement_logo[];
  bullet_point: bullet_point[];
  customers_section_title: string;
  bullet_section_heading: string;
  form_section_description: string;
  form_section_title: title[];
  page_title: title[];
  submit_button: {
    id: number;
    button_label: string;
    button_link: string;
  };
}

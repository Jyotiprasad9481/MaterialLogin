export interface UserDetails {
    userDet: {
      id: number;
      title: string;
      first_name: string;
      middle_name: string;
      last_name: string;
      mobile: string;
      email: string;
      alter_mobile: string;
      local_address: string;
      permanant_address: string;
      password: string;
      role_id: number;
      dob: string;
      deptartment_id: number;
      profile_photo: string;
      machine_id: number;
      company_master: any;
      spipl_user_id: number;
    };
    menuDet: {
      name?: string;
      url?: string | any[];
      icon?: string;
      //   children?: INavData[];
      permission?: any;
    };
    links: [];
    iat: number;
    exp: number;
  }
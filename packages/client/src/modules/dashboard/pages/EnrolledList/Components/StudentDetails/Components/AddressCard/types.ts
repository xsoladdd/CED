export interface IregionType {
  id: number;
  psgc_code: string;
  region_code: string;
  region_name: string;
}

export interface Iprovince {
  province_code: string;
  province_name: string;
  psgc_code: string;
  region_code: string;
}

export interface ICity {
  city_code: string;
  city_name: string;
  province_code: string;
  region_desc: string;
}

export interface IBarangay {
  brgy_code: string;
  brgy_name: string;
  province_code: string;
  region_code: string;
}

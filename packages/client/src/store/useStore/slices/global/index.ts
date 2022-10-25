import { IglobalSlice } from "./types";

export const globalSlice: StoreSlice<IglobalSlice> = (_set) => ({
  globalVars: {
    active_school_year: "2022-2023",
    year_level: [
      {
        title: "Kinder",
        value: "K",
        sections: [
          { title: "section 1", value: "K01" },
          { title: "section 2", value: "K02" },
        ],
      },
      {
        title: "Preparatory",
        value: "P",
        sections: [
          { title: "section 1", value: "P01" },
          { title: "section 2", value: "P02" },
        ],
      },
      {
        title: "Grade 1",
        value: "1",
        sections: [
          { title: "section 1", value: "101" },
          { title: "section 2", value: "102" },
        ],
      },
      {
        title: "Grade 2",
        value: "2",
        sections: [
          { title: "section 1", value: "201" },
          { title: "section 2", value: "202" },
        ],
      },
      {
        title: "Grade 3",
        value: "3",
        sections: [
          { title: "section 1", value: "301" },
          { title: "section 2", value: "302" },
        ],
      },
      {
        title: "Grade 4",
        value: "4",
        sections: [
          { title: "section 1", value: "401" },
          { title: "section 2", value: "402" },
        ],
      },
      {
        title: "Grade 5",
        value: "5",
        sections: [
          { title: "section 1", value: "501" },
          { title: "section 2", value: "502" },
        ],
      },
      {
        title: "Grade 6",
        value: "6",
        sections: [
          { title: "section 1", value: "601" },
          { title: "section 2", value: "602" },
        ],
      },
      {
        title: "Grade 7",
        value: "7",
        sections: [
          { title: "section 1", value: "701" },
          { title: "section 2", value: "702" },
        ],
      },
      {
        title: "Grade 8",
        value: "8",
        sections: [
          { title: "section 1", value: "801" },
          { title: "section 2", value: "802" },
        ],
      },
      {
        title: "Grade 9",
        value: "9",
        sections: [
          { title: "section 1", value: "901" },
          { title: "section 2", value: "902" },
        ],
      },
      {
        title: "Grade 10",
        value: "10",
        sections: [
          { title: "section 1", value: "1001" },
          { title: "section 2", value: "1002" },
        ],
      },
      {
        title: "Grade 11",
        value: "11",
        sections: [
          { title: "section 1", value: "1101" },
          { title: "section 2", value: "1102" },
        ],
      },
      {
        title: "Grade 12",
        value: "12",
        sections: [
          { title: "section 1", value: "1201" },
          { title: "section 2", value: "1202" },
        ],
      },
    ],
  },
});

/*
 K
        P
        1-12
*/

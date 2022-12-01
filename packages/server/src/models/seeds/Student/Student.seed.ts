import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { NODE_ENV } from "../../../global";
import { StudentAddress } from "../../Student/StudentAddress";
import { Student } from "../../Student/Student";
import { StudentRequirements } from "../../Student/StudentRequirements";
// import { StudentParentGuardian } from "../../Student/StudentParentGuardian";
import { EnrolledRecords } from "../../Student/EnrolledRecords";
import { StudentSchoolRecord } from "../../Student/StudentSchoolRecord";
export default class StudentSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Student);
    // Insert year level

    if (NODE_ENV === "development") {
      const generateAddress = () => {
        const address: StudentAddress = {
          barangay: "",
          city: "",
          province: "",
          region: "",
          no: "",
          zip: "",
          street: "",
          subdiv: "",
        };
        return address;
      };

      // const generateParentGuardian = () => {
      //   const parentGuardian: Array<StudentParentGuardian> = [
      //     {
      //       first_name: "Menard",
      //       middle_name: "Vaneschi",
      //       last_name: "Boar",
      //       contact_number: "09294952534",
      //       type: "M",
      //       email: "mboar0@phpbb.com",
      //     },
      //     {
      //       first_name: "Bartholomeus",
      //       middle_name: "Bertolin",
      //       last_name: "Cowper",
      //       contact_number: "09991715440",
      //       type: "G",
      //       email: "bcowper1@psu.edu",
      //     },
      //     {
      //       first_name: "Andres",
      //       middle_name: "Gilhouley",
      //       last_name: "Rickis",
      //       contact_number: "09987577681",
      //       type: "F",
      //       email: "arickis2@dyndns.org",
      //     },
      //   ];
      //   return parentGuardian;
      // };

      const generateRequirements = () => {
        const requirements: StudentRequirements = {
          has_baptismal: true,
          has_form_137: true,
          has_good_moral: true,
          has_parent_marriage_contract: true,
          has_psa: true,
          has_report_card: true,
          has_report_of_rating: true,
          has_school_government_recognition: true,
        };
        return requirements;
      };

      const studentList: Array<Student> = [
        {
          contact_number: "09397561064",
          first_name: "Stafford",
          middle_name: "Struss",
          last_name: "Tabourin",
          LRN: "4453538243394",
          gender: "f",
          birthday: "2022-03-28",
          email: "stabourin0@house.gov",
        },
        {
          contact_number: "09292513259",
          first_name: "Garnet",
          middle_name: "Buxey",
          last_name: "Jouannin",
          LRN: "0046965677433",
          gender: "F",
          birthday: "2022-03-21",
          email: "gjouannin1@homestead.com",
        },
        {
          contact_number: "09724373816",
          first_name: "Raff",
          middle_name: "De Witt",
          last_name: "Howie",
          LRN: "4158301816819",
          gender: "M",
          birthday: "2022-10-13",
          email: "rhowie2@live.com",
        },
        {
          contact_number: "09516985129",
          first_name: "Robinetta",
          middle_name: "Trevino",
          last_name: "Quixley",
          LRN: "8146934402560",
          gender: "f",
          birthday: "2022-07-26",
          email: "rquixley3@foxnews.com",
        },
        {
          contact_number: "09215369991",
          first_name: "Tiffany",
          middle_name: "Middlebrook",
          last_name: "Barbier",
          LRN: "9956254939257",
          gender: "f",
          birthday: "2022-08-28",
          email: "tbarbier4@weebly.com",
        },
        {
          contact_number: "09511927664",
          first_name: "Damita",
          middle_name: "Fouldes",
          last_name: "Reedyhough",
          LRN: "0847646433096",
          gender: "F",
          birthday: "2022-04-23",
          email: "dreedyhough5@answers.com",
        },
        {
          contact_number: "09649697343",
          first_name: "Kathryn",
          middle_name: "Andover",
          last_name: "Beltzner",
          LRN: "3739276717128",
          gender: "M",
          birthday: "2021-12-23",
          email: "kbeltzner6@bigcartel.com",
        },
        {
          contact_number: "09559746279",
          first_name: "Matilde",
          middle_name: "Polotti",
          last_name: "Harmeston",
          LRN: "4635372693910",
          gender: "F",
          birthday: "2022-02-01",
          email: "mharmeston7@amazon.co.uk",
        },
        {
          contact_number: "09922402470",
          first_name: "Marie-jeanne",
          middle_name: "Giorio",
          last_name: "Leades",
          LRN: "8919193311663",
          gender: "M",
          birthday: "2022-09-10",
          email: "mleades8@oracle.com",
        },
        {
          contact_number: "09668457735",
          first_name: "Kevon",
          middle_name: "Jorioz",
          last_name: "Murfin",
          LRN: "3129591128912",
          gender: "m",
          birthday: "2022-03-07",
          email: "kmurfin9@nationalgeographic.com",
        },
        {
          contact_number: "09173645803",
          first_name: "Maia",
          middle_name: "McRitchie",
          last_name: "Penhearow",
          LRN: "5042600185020",
          gender: "f",
          birthday: "2022-07-22",
          email: "mpenhearowa@bbc.co.uk",
        },
        {
          contact_number: "09660111184",
          first_name: "Cthrine",
          middle_name: "Shewsmith",
          last_name: "Astbery",
          LRN: "5740728538048",
          gender: "F",
          birthday: "2022-02-24",
          email: "castberyb@apache.org",
        },
        {
          contact_number: "09285746391",
          first_name: "Ulises",
          middle_name: "Scamaden",
          last_name: "Scole",
          LRN: "0553478892560",
          gender: "M",
          birthday: "2022-05-12",
          email: "uscolec@netvibes.com",
        },
        {
          contact_number: "09140296985",
          first_name: "Felipe",
          middle_name: "Pavy",
          last_name: "Pendlington",
          LRN: "1025463847185",
          gender: "F",
          birthday: "2022-10-30",
          email: "fpendlingtond@theglobeandmail.com",
        },
        {
          contact_number: "09640119359",
          first_name: "Griffith",
          middle_name: "Liddall",
          last_name: "Vanyushin",
          LRN: "4562312553084",
          gender: "f",
          birthday: "2022-06-15",
          email: "gvanyushine@studiopress.com",
        },
        {
          contact_number: "09355574817",
          first_name: "Jannel",
          middle_name: "Swift",
          last_name: "Silcocks",
          LRN: "3166150303998",
          gender: "F",
          birthday: "2022-07-02",
          email: "jsilcocksf@pinterest.com",
        },
        {
          contact_number: "09197438432",
          first_name: "Flossi",
          middle_name: "Cosens",
          last_name: "Lascelles",
          LRN: "8443659264501",
          gender: "F",
          birthday: "2022-04-19",
          email: "flascellesg@prnewswire.com",
        },
        {
          contact_number: "09564630142",
          first_name: "Read",
          middle_name: "Stichel",
          last_name: "Alsobrook",
          LRN: "0407625149226",
          gender: "f",
          birthday: "2022-01-11",
          email: "ralsobrookh@mediafire.com",
        },
        {
          contact_number: "09154874229",
          first_name: "Luis",
          middle_name: "Connick",
          last_name: "Snibson",
          LRN: "4642373763962",
          gender: "f",
          birthday: "2021-11-30",
          email: "lsnibsoni@chicagotribune.com",
        },
        {
          contact_number: "09665616202",
          first_name: "Elva",
          middle_name: "Giddens",
          last_name: "Scarlett",
          LRN: "9123792340534",
          gender: "M",
          birthday: "2022-05-17",
          email: "escarlettj@geocities.jp",
        },
        {
          contact_number: "09360626869",
          first_name: "Fanny",
          middle_name: "Langstone",
          last_name: "Brave",
          LRN: "8279457449466",
          gender: "m",
          birthday: "2022-01-22",
          email: "fbravek@biglobe.ne.jp",
        },
        {
          contact_number: "09271500075",
          first_name: "Natala",
          middle_name: "Mallison",
          last_name: "Fensome",
          LRN: "0156571231258",
          gender: "M",
          birthday: "2022-11-12",
          email: "nfensomel@t-online.de",
        },
        {
          contact_number: "09312968781",
          first_name: "Park",
          middle_name: "McComiskey",
          last_name: "Baake",
          LRN: "9052661270931",
          gender: "F",
          birthday: "2022-10-17",
          email: "pbaakem@4shared.com",
        },
        {
          contact_number: "09758344863",
          first_name: "Dulcy",
          middle_name: "Crowthe",
          last_name: "Puttick",
          LRN: "3628516034642",
          gender: "M",
          birthday: "2022-04-01",
          email: "dputtickn@mlb.com",
        },
        {
          contact_number: "09950286273",
          first_name: "Wally",
          middle_name: "Weatherhogg",
          last_name: "Blayd",
          LRN: "9508182714914",
          gender: "M",
          birthday: "2022-08-05",
          email: "wblaydo@cargocollective.com",
        },
        {
          contact_number: "09689609504",
          first_name: "Ketty",
          middle_name: "Yannoni",
          last_name: "McVitie",
          LRN: "3248718381726",
          gender: "f",
          birthday: "2022-09-26",
          email: "kmcvitiep@nasa.gov",
        },
        {
          contact_number: "09523350847",
          first_name: "Helene",
          middle_name: "Edelheid",
          last_name: "Pulhoster",
          LRN: "0349381574208",
          gender: "m",
          birthday: "2022-09-01",
          email: "hpulhosterq@nydailynews.com",
        },
        {
          contact_number: "09871929720",
          first_name: "Kain",
          middle_name: "Gioani",
          last_name: "O'Logan",
          LRN: "0729105236746",
          gender: "M",
          birthday: "2022-06-13",
          email: "kologanr@amazonaws.com",
        },
        {
          contact_number: "09691642612",
          first_name: "Rriocard",
          middle_name: "Ledram",
          last_name: "De Ruel",
          LRN: "8737501599542",
          gender: "m",
          birthday: "2022-04-06",
          email: "rderuels@jigsy.com",
        },
        {
          contact_number: "09964430046",
          first_name: "Stanislas",
          middle_name: "Konrad",
          last_name: "Garralts",
          LRN: "0500186876592",
          gender: "f",
          birthday: "2022-08-06",
          email: "sgarraltst@salon.com",
        },
        {
          contact_number: "09727317902",
          first_name: "Lowrance",
          middle_name: "Waldie",
          last_name: "Whacket",
          LRN: "1815780712060",
          gender: "F",
          birthday: "2022-07-05",
          email: "lwhacketu@mlb.com",
        },
        {
          contact_number: "09933200112",
          first_name: "Evelyn",
          middle_name: "Aldiss",
          last_name: "Timewell",
          LRN: "4168295478253",
          gender: "M",
          birthday: "2022-04-15",
          email: "etimewellv@arstechnica.com",
        },
        {
          contact_number: "09728440451",
          first_name: "Birch",
          middle_name: "Broomhead",
          last_name: "Watkins",
          LRN: "8387393991617",
          gender: "m",
          birthday: "2022-11-15",
          email: "bwatkinsw@slate.com",
        },
        {
          contact_number: "09466222528",
          first_name: "Bliss",
          middle_name: "Balden",
          last_name: "Blaine",
          LRN: "4503880696464",
          gender: "F",
          birthday: "2022-03-06",
          email: "bblainex@archive.org",
        },
        {
          contact_number: "09471545979",
          first_name: "Xerxes",
          middle_name: "Grieveson",
          last_name: "Abrahamson",
          LRN: "1977108886428",
          gender: "M",
          birthday: "2022-04-30",
          email: "xabrahamsony@washington.edu",
        },
        {
          contact_number: "09869530672",
          first_name: "Eliza",
          middle_name: "Ambroziak",
          last_name: "Eastop",
          LRN: "8920658656973",
          gender: "F",
          birthday: "2022-03-18",
          email: "eeastopz@cbc.ca",
        },
        {
          contact_number: "09225964243",
          first_name: "Gaylene",
          middle_name: "Dightham",
          last_name: "MacKereth",
          LRN: "6264147053918",
          gender: "f",
          birthday: "2022-08-12",
          email: "gmackereth10@ihg.com",
        },
        {
          contact_number: "09786442943",
          first_name: "Carey",
          middle_name: "Ollarenshaw",
          last_name: "McClurg",
          LRN: "3644833997331",
          gender: "F",
          birthday: "2022-03-22",
          email: "cmcclurg11@barnesandnoble.com",
        },
        {
          contact_number: "09233685341",
          first_name: "Alie",
          middle_name: "Canas",
          last_name: "Mines",
          LRN: "0707047816383",
          gender: "m",
          birthday: "2022-07-05",
          email: "amines12@sina.com.cn",
        },
        {
          contact_number: "09947442498",
          first_name: "Lezlie",
          middle_name: "Lambird",
          last_name: "Duffer",
          LRN: "7460040491759",
          gender: "m",
          birthday: "2022-03-28",
          email: "lduffer13@hexun.com",
        },
      ];

      const generateEnrollmentRecord = () => {
        const enrollmentList: Array<EnrolledRecords> = [
          {
            grade_level_id: "01",
            SY: "2019-2020",
            section_id: "01",
          },
          {
            grade_level_id: "02",
            SY: "2020-2021",
            section_id: "01",
          },
          {
            grade_level_id: "03",
            SY: "2022-2023",
            section_id: "01",
          },
        ];
        return enrollmentList;
      };

      const generateAcademicRecord = () => {
        /*
             { text: "Pre-Elementary", value: "Pre-Elementary" },
            { text: "Elementary", value: "Elementary" },
            { text: "Junior High", value: "Junior High" },
            { text: "Senior High", value: "Senior High" },
        */
        const academicRecord: Array<StudentSchoolRecord> = [
          {
            school_name: "School 1",
            sy_graduated: "2015",
            type: "Pre-Elementary",
          },
          { school_name: "School 2", sy_graduated: "2016", type: "Elementary" },
          {
            school_name: "School 3",
            sy_graduated: "2017",
            type: "Junior High",
          },
          {
            school_name: "School 4",
            sy_graduated: "2018",
            type: "Senior High",
          },
        ];
        return academicRecord;
      };

      const data = studentList.map((props) => {
        return {
          ...props,
          address: generateAddress(),
          requirements: generateRequirements(),
          // parent_guardians: generateParentGuardian(),
          enrollment_records: generateEnrollmentRecord(),
          school_records: generateAcademicRecord(),
        };
      });
      await repository.save(data);
    }
  }
}

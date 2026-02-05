import {
  ChevronRight,
  User,
  X,
  Plus,
  ZoomIn,
  ZoomOut,
  Minus,
  Maximize2,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";

// Raw data from CSV files
const rawNodes = [
  { id: "10001", x: 92561, y: 22645 },
  { id: "10002", x: 97187, y: 22645 },
  { id: "10003", x: 97935, y: 23245 },
  { id: "10004", x: 97935, y: 26180 },
  { id: "10005", x: 96787, y: 26780 },
  { id: "10006", x: 94617, y: 26780 },
  { id: "10007", x: 93139, y: 26780 },
  { id: "10008", x: 81470, y: 26780 },
  { id: "10009", x: 79993, y: 26780 },
  { id: "10010", x: 62165, y: 26780 },
  { id: "10011", x: 60546, y: 26780 },
  { id: "10012", x: 57562, y: 26780 },
  { id: "10013", x: 56412, y: 26180 },
  { id: "10014", x: 56412, y: 24500 },
  { id: "10015", x: 56412, y: 22750 },
  { id: "10016", x: 56412, y: 11445 },
  { id: "10017", x: 56412, y: 10425 },
  { id: "10018", x: 56412, y: 7595 },
  { id: "10019", x: 55813, y: 6845 },
  { id: "10020", x: 55212, y: 6845 },
  { id: "10021", x: 53471, y: 6845 },
  { id: "10022", x: 52288, y: 6845 },
  { id: "10023", x: 50933, y: 6845 },
  { id: "10024", x: 30276, y: 6845 },
  { id: "10025", x: 28191, y: 6845 },
  { id: "10026", x: 25956, y: 6845 },
  { id: "10027", x: 23868, y: 6845 },
  { id: "10028", x: 16051, y: 6845 },
  { id: "10029", x: 13966, y: 6845 },
  { id: "10030", x: 2593, y: 6845 },
  { id: "10031", x: 1852, y: 7640 },
  { id: "10032", x: 1852, y: 7985 },
  { id: "10033", x: 2628, y: 8735 },
  { id: "10035", x: 1852, y: 9341 },
  { id: "10036", x: 1852, y: 10106 },
  { id: "10037", x: 2628, y: 10856 },
  { id: "10038", x: 13698, y: 10856 },
  { id: "10039", x: 14450, y: 12157 },
  { id: "10040", x: 14450, y: 18055 },
  { id: "10041", x: 14450, y: 19805 },
  { id: "10042", x: 14450, y: 21376 },
  { id: "10043", x: 13890, y: 22756 },
  { id: "10044", x: 13890, y: 34335 },
  { id: "10045", x: 14450, y: 35897 },
  { id: "10046", x: 14450, y: 38565 },
  { id: "10047", x: 14450, y: 40320 },
  { id: "10048", x: 14450, y: 46940 },
  { id: "10049", x: 15250, y: 47090 },
  { id: "10050", x: 15250, y: 46035 },
  { id: "10051", x: 16400, y: 45435 },
  { id: "10052", x: 40537, y: 45435 },
  { id: "10053", x: 42287, y: 45435 },
  { id: "10054", x: 53460, y: 45435 },
  { id: "10055", x: 55212, y: 45435 },
  { id: "10056", x: 55662, y: 45435 },
  { id: "10057", x: 56412, y: 44835 },
  { id: "10058", x: 56412, y: 41745 },
  { id: "10059", x: 57563, y: 41145 },
  { id: "10060", x: 79417, y: 41145 },
  { id: "10061", x: 81176, y: 41145 },
  { id: "10062", x: 93867, y: 41145 },
  { id: "10063", x: 95037, y: 41145 },
  { id: "10064", x: 97785, y: 41145 },
  { id: "10065", x: 98487, y: 39645 },
  { id: "10066", x: 98487, y: 20975 },
  { id: "10067", x: 97887, y: 20225 },
  { id: "10068", x: 96031, y: 20225 },
  { id: "10069", x: 95012, y: 20225 },
  { id: "10070", x: 93502, y: 20225 },
  { id: "10071", x: 92761, y: 19625 },
  { id: "10072", x: 92761, y: 14215 },
  { id: "10073", x: 92761, y: 13195 },
  { id: "10074", x: 92761, y: 8145 },
  { id: "10075", x: 92151, y: 7395 },
  { id: "10076", x: 86722, y: 7395 },
  { id: "10077", x: 86122, y: 6245 },
  { id: "10078", x: 86122, y: 1000 },
  { id: "10079", x: 85523, y: 250 },
  { id: "10080", x: 84372, y: 250 },
  { id: "10081", x: 83211, y: 250 },
  { id: "10082", x: 73862, y: 250 },
  { id: "10083", x: 72062, y: 250 },
  { id: "10084", x: 61081, y: 250 },
  { id: "10087", x: 58762, y: 850 },
  { id: "10088", x: 58762, y: 6095 },
  { id: "10089", x: 58163, y: 6845 },
  { id: "10090", x: 57563, y: 6845 },
  { id: "10091", x: 56970, y: 7445 },
  { id: "10092", x: 56970, y: 10096 },
  { id: "10093", x: 57562, y: 10845 },
  { id: "10094", x: 68356, y: 10845 },
  { id: "10095", x: 68957, y: 10245 },
  { id: "10096", x: 68957, y: 7595 },
  { id: "10097", x: 68357, y: 6845 },
  { id: "10098", x: 59332, y: 6845 },
  { id: "10099", x: 1844, y: 6069 },
  { id: "10100", x: 1844, y: 1902 },
  { id: "10101", x: 2637, y: 1152 },
  { id: "10102", x: 14000, y: 1152 },
  { id: "10103", x: 14749, y: 1937 },
  { id: "10104", x: 14749, y: 6104 },
  { id: "10105", x: 15299, y: 6069 },
  { id: "10106", x: 15299, y: 1902 },
  { id: "10107", x: 16084, y: 1152 },
  { id: "10108", x: 28226, y: 1152 },
  { id: "10114", x: 50806, y: 1152 },
  { id: "10115", x: 51716, y: 1937 },
  { id: "10116", x: 51716, y: 6104 },
  { id: "10117", x: 54065, y: 10245 },
  { id: "10118", x: 54065, y: 7595 },
  { id: "10119", x: 54615, y: 7445 },
  { id: "10120", x: 54615, y: 10095 },
  { id: "10121", x: 54615, y: 11445 },
  { id: "10122", x: 54615, y: 20145 },
  { id: "10123", x: 54013, y: 20745 },
  { id: "10124", x: 52011, y: 20745 },
  { id: "10125", x: 54615, y: 21165 },
  { id: "10126", x: 54615, y: 22750 },
  { id: "10127", x: 54615, y: 24500 },
  { id: "10128", x: 54615, y: 26180 },
  { id: "10129", x: 53463, y: 26780 },
  { id: "10130", x: 51903, y: 26780 },
  { id: "10131", x: 50433, y: 26780 },
  { id: "10132", x: 34508, y: 26780 },
  { id: "10133", x: 33025, y: 26780 },
  { id: "10134", x: 23273, y: 26780 },
  { id: "10135", x: 21647, y: 26780 },
  { id: "10136", x: 16400, y: 26780 },
  { id: "10137", x: 15250, y: 26180 },
  { id: "10142", x: 15250, y: 19805 },
  { id: "10143", x: 15250, y: 18055 },
  { id: "10144", x: 15250, y: 12157 },
  { id: "10145", x: 50424, y: 27620 },
  { id: "10146", x: 37157, y: 27620 },
  { id: "10147", x: 35405, y: 27620 },
  { id: "10148", x: 34653, y: 27620 },
  { id: "10149", x: 33068, y: 27620 },
  { id: "10150", x: 23275, y: 27620 },
  { id: "10151", x: 15800, y: 27380 },
  { id: "10152", x: 15800, y: 30375 },
  { id: "10153", x: 16400, y: 31125 },
  { id: "10154", x: 35403, y: 31125 },
  { id: "10155", x: 36007, y: 30525 },
  { id: "10156", x: 36007, y: 28370 },
  { id: "10157", x: 36558, y: 28220 },
  { id: "10158", x: 36558, y: 30375 },
  { id: "10159", x: 37158, y: 31125 },
  { id: "10160", x: 53463, y: 31125 },
  { id: "10161", x: 54065, y: 30525 },
  { id: "10162", x: 54065, y: 27530 },
  { id: "10163", x: 54615, y: 27380 },
  { id: "10164", x: 54615, y: 30375 },
  { id: "10165", x: 54615, y: 31725 },
  { id: "10166", x: 54615, y: 32745 },
  { id: "10167", x: 54615, y: 34545 },
  { id: "10168", x: 54615, y: 42575 },
  { id: "10169", x: 53463, y: 43175 },
  { id: "10170", x: 42287, y: 43175 },
  { id: "10171", x: 40546, y: 43175 },
  { id: "10172", x: 16400, y: 43175 },
  { id: "10173", x: 15250, y: 42575 },
  { id: "10174", x: 15250, y: 40320 },
  { id: "10175", x: 15250, y: 38570 },
  { id: "10176", x: 15250, y: 31725 },
  { id: "10177", x: 15250, y: 30525 },
  { id: "10178", x: 15250, y: 27530 },
  { id: "10179", x: 54065, y: 44835 },
  { id: "10180", x: 54065, y: 43925 },
  { id: "10181", x: 41690, y: 43775 },
  { id: "10182", x: 41690, y: 44685 },
  { id: "10183", x: 41135, y: 43925 },
  { id: "10184", x: 41135, y: 44835 },
  { id: "10185", x: 15800, y: 43776 },
  { id: "10186", x: 15800, y: 44685 },
  { id: "10187", x: 15250, y: 43925 },
  { id: "10188", x: 15250, y: 44835 },
  { id: "10189", x: 54615, y: 43775 },
  { id: "10190", x: 54615, y: 44685 },
  { id: "10191", x: 56412, y: 39645 },
  { id: "10192", x: 56412, y: 34545 },
  { id: "10193", x: 56412, y: 32745 },
  { id: "10194", x: 56412, y: 31725 },
  { id: "10195", x: 56412, y: 30525 },
  { id: "10196", x: 56412, y: 27530 },
  { id: "10197", x: 56970, y: 27380 },
  { id: "10198", x: 56970, y: 30375 },
  { id: "10199", x: 57566, y: 31125 },
  { id: "10200", x: 72337, y: 31125 },
  { id: "10201", x: 74096, y: 31125 },
  { id: "10202", x: 96787, y: 31125 },
  { id: "10203", x: 97935, y: 31725 },
  { id: "10204", x: 97935, y: 39495 },
  { id: "10205", x: 97337, y: 40245 },
  { id: "10206", x: 95037, y: 40245 },
  { id: "10207", x: 94017, y: 40245 },
  { id: "10208", x: 81217, y: 40245 },
  { id: "10209", x: 79418, y: 40245 },
  { id: "10210", x: 57562, y: 40245 },
  { id: "10211", x: 72940, y: 30525 },
  { id: "10212", x: 72940, y: 28370 },
  { id: "10213", x: 73490, y: 28220 },
  { id: "10214", x: 73490, y: 30375 },
  { id: "10215", x: 97387, y: 30525 },
  { id: "10216", x: 97387, y: 27530 },
  { id: "10217", x: 97935, y: 27380 },
  { id: "10218", x: 97935, y: 30375 },
  { id: "10219", x: 61083, y: 1150 },
  { id: "10220", x: 72062, y: 1150 },
  { id: "10221", x: 73871, y: 1150 },
  { id: "10222", x: 83202, y: 1150 },
  { id: "10223", x: 84222, y: 1150 },
  { id: "10224", x: 84820, y: 1150 },
  { id: "10225", x: 85572, y: 1753 },
  { id: "10226", x: 85572, y: 6095 },
  { id: "10227", x: 84972, y: 6845 },
  { id: "10228", x: 70107, y: 6845 },
  { id: "10229", x: 69510, y: 7445 },
  { id: "10230", x: 69510, y: 10095 },
  { id: "10231", x: 70114, y: 10845 },
  { id: "10232", x: 91352, y: 10845 },
  { id: "10233", x: 91950, y: 11445 },
  { id: "10234", x: 91950, y: 13045 },
  { id: "10235", x: 91950, y: 14215 },
  { id: "10236", x: 91950, y: 20522 },
  { id: "10237", x: 92552, y: 21125 },
  { id: "10238", x: 94862, y: 21125 },
  { id: "10239", x: 96033, y: 21125 },
  { id: "10240", x: 97187, y: 21125 },
  { id: "10245", x: 92761, y: 11595 },
  { id: "10246", x: 92761, y: 10245 },
  { id: "10247", x: 92980, y: 27661 },
  { id: "10248", x: 81461, y: 27661 },
  { id: "10249", x: 79836, y: 27661 },
  { id: "10250", x: 73928, y: 27661 },
  { id: "10251", x: 72197, y: 27661 },
  { id: "10252", x: 62006, y: 27661 },
  { id: "10253", x: 14450, y: 22796 },
  { id: "10254", x: 14450, y: 34376 },
  { id: "10255", x: 4285, y: 8735 },
  { id: "10256", x: 15876, y: 10856 },
  { id: "10257", x: 23746, y: 10856 },
  { id: "10258", x: 24519, y: 10046 },
  { id: "10259", x: 24519, y: 7645 },
  { id: "10260", x: 25070, y: 7765 },
  { id: "10261", x: 25070, y: 10146 },
  { id: "10262", x: 25832, y: 10856 },
  { id: "10263", x: 53179, y: 10856 },
  { id: "10264", x: 29342, y: 6058 },
  { id: "10265", x: 29342, y: 1943 },
  { id: "10266", x: 30201, y: 1152 },
  { id: "10267", x: 28818, y: 2048 },
  { id: "10268", x: 28818, y: 6145 },
  { id: "80101", x: 93676, y: 22645 },
  { id: "80103", x: 3637, y: 8735 },
];



const rawSegments = [
  {
    id: "31001",
    from: "10263",
    to: "10121",
    type: "SectionDND",
  },
  {
    id: "31101",
    from: "10121",
    to: "10122",
    type: "Horizontal",
  },
  {
    id: "31201",
    from: "10122",
    to: "10125",
    type: "SectionDNN",
  },
  {
    id: "31202",
    from: "10125",
    to: "10126",
    type: "Horizontal",
  },
  {
    id: "31301",
    from: "10122",
    to: "10123",
    type: "SectionDNN",
  },
  {
    id: "31302",
    from: "10123",
    to: "10124",
    type: "Horizontal",
  },
  {
    id: "31401",
    from: "10126",
    to: "10127",
    type: "SectionDND",
  },
  {
    id: "31501",
    from: "10126",
    to: "10015",
    type: "SectionRNU",
  },
  {
    id: "31601",
    from: "10127",
    to: "10128",
    type: "Horizontal",
  },
  {
    id: "31701",
    from: "10128",
    to: "10163",
    type: "SectionDNN",
  },
  {
    id: "31702",
    from: "10163",
    to: "10164",
    type: "Horizontal",
  },
  {
    id: "31703",
    from: "10164",
    to: "10165",
    type: "SectionNND",
  },
  {
    id: "31801",
    from: "10128",
    to: "10129",
    type: "SectionDNL",
  },
  {
    id: "31901",
    from: "10165",
    to: "10166",
    type: "Horizontal",
  },
  {
    id: "32001",
    from: "10166",
    to: "10167",
    type: "SectionDND",
  },
  {
    id: "32101",
    from: "10166",
    to: "10193",
    type: "SectionRNU",
  },
  {
    id: "32201",
    from: "10167",
    to: "10168",
    type: "Horizontal",
  },
  {
    id: "32301",
    from: "10168",
    to: "10189",
    type: "SectionDNN",
  },
  {
    id: "32302",
    from: "10189",
    to: "10190",
    type: "Horizontal",
  },
  {
    id: "32303",
    from: "10190",
    to: "10055",
    type: "SectionNNR",
  },
  {
    id: "32401",
    from: "10168",
    to: "10169",
    type: "SectionDNL",
  },
  {
    id: "32501",
    from: "10055",
    to: "10056",
    type: "Horizontal",
  },
  {
    id: "32502",
    from: "10056",
    to: "10057",
    type: "SectionNNU",
  },
  {
    id: "32503",
    from: "10057",
    to: "10058",
    type: "Horizontal",
  },
  {
    id: "32601",
    from: "10058",
    to: "10191",
    type: "SectionUNU",
  },
  {
    id: "32701",
    from: "10058",
    to: "10059",
    type: "SectionUNR",
  },
  {
    id: "32801",
    from: "10191",
    to: "10192",
    type: "Horizontal",
  },
  {
    id: "32901",
    from: "10192",
    to: "10193",
    type: "SectionUNU",
  },
  {
    id: "33001",
    from: "10192",
    to: "10167",
    type: "SectionLND",
  },
  {
    id: "33101",
    from: "10193",
    to: "10194",
    type: "Horizontal",
  },
  {
    id: "33201",
    from: "10194",
    to: "10195",
    type: "SectionUNN",
  },
  {
    id: "33202",
    from: "10195",
    to: "10196",
    type: "Horizontal",
  },
  {
    id: "33203",
    from: "10196",
    to: "10013",
    type: "SectionNNU",
  },
  {
    id: "33301",
    from: "10194",
    to: "10199",
    type: "SectionUNR",
  },
  {
    id: "33401",
    from: "10013",
    to: "10014",
    type: "Horizontal",
  },
  {
    id: "33501",
    from: "10014",
    to: "10015",
    type: "SectionUNU",
  },
  {
    id: "33601",
    from: "10014",
    to: "10127",
    type: "SectionLND",
  },
  {
    id: "33701",
    from: "10015",
    to: "10016",
    type: "Horizontal",
  },
  {
    id: "33801",
    from: "10016",
    to: "10017",
    type: "SectionUNN",
  },
  {
    id: "33802",
    from: "10017",
    to: "10018",
    type: "Horizontal",
  },
  {
    id: "33803",
    from: "10018",
    to: "10019",
    type: "SectionNNL",
  },
  {
    id: "33901",
    from: "10016",
    to: "10093",
    type: "SectionUNR",
  },
  {
    id: "34001",
    from: "10019",
    to: "10020",
    type: "Horizontal",
  },
  {
    id: "34101",
    from: "10020",
    to: "10021",
    type: "SectionLNL",
  },
  {
    id: "34201",
    from: "10020",
    to: "10119",
    type: "SectionDNN",
  },
  {
    id: "34202",
    from: "10119",
    to: "10120",
    type: "Horizontal",
  },
  {
    id: "34203",
    from: "10120",
    to: "10121",
    type: "SectionNND",
  },
  {
    id: "34301",
    from: "10021",
    to: "10022",
    type: "Horizontal",
  },
  {
    id: "34302",
    from: "10022",
    to: "10023",
    type: "SectionNNL",
  },
  {
    id: "34401",
    from: "10023",
    to: "10024",
    type: "Horizontal",
  },
  {
    id: "34501",
    from: "10024",
    to: "10025",
    type: "SectionLNL",
  },
  {
    id: "34601",
    from: "10025",
    to: "10026",
    type: "Horizontal",
  },
  {
    id: "34701",
    from: "10026",
    to: "10027",
    type: "SectionLNL",
  },
  {
    id: "34801",
    from: "10027",
    to: "10028",
    type: "Horizontal",
  },
  {
    id: "34901",
    from: "10028",
    to: "10029",
    type: "SectionLNL",
  },
  {
    id: "35001",
    from: "10029",
    to: "10030",
    type: "Horizontal",
  },
  {
    id: "35101",
    from: "10030",
    to: "10099",
    type: "SectionUNN",
  },
  {
    id: "35102",
    from: "10099",
    to: "10100",
    type: "Horizontal",
  },
  {
    id: "35103",
    from: "10100",
    to: "10101",
    type: "SectionNNR",
  },
  {
    id: "35104",
    from: "10101",
    to: "10102",
    type: "Horizontal",
  },
  {
    id: "35201",
    from: "10102",
    to: "10103",
    type: "SectionDNN",
  },
  {
    id: "35202",
    from: "10103",
    to: "10104",
    type: "Horizontal",
  },
  {
    id: "35203",
    from: "10104",
    to: "10029",
    type: "SectionNNL",
  },
  {
    id: "35301",
    from: "10028",
    to: "10105",
    type: "SectionUNN",
  },
  {
    id: "35302",
    from: "10105",
    to: "10106",
    type: "Horizontal",
  },
  {
    id: "35303",
    from: "10106",
    to: "10107",
    type: "SectionNNR",
  },
  {
    id: "35401",
    from: "10102",
    to: "10107",
    type: "SectionRNR",
  },
  {
    id: "35501",
    from: "10107",
    to: "10108",
    type: "Horizontal",
  },
  {
    id: "35601",
    from: "10108",
    to: "10266",
    type: "SectionRNR",
  },
  {
    id: "35701",
    from: "10108",
    to: "10267",
    type: "SectionDNN",
  },
  {
    id: "35702",
    from: "10267",
    to: "10268",
    type: "Horizontal",
  },
  {
    id: "35703",
    from: "10268",
    to: "10025",
    type: "SectionNNL",
  },
  {
    id: "35801",
    from: "10024",
    to: "10264",
    type: "SectionUNN",
  },
  {
    id: "35802",
    from: "10264",
    to: "10265",
    type: "Horizontal",
  },
  {
    id: "35803",
    from: "10265",
    to: "10266",
    type: "SectionNNR",
  },
  {
    id: "35901",
    from: "10266",
    to: "10114",
    type: "Horizontal",
  },
  {
    id: "35902",
    from: "10114",
    to: "10115",
    type: "SectionNND",
  },
  {
    id: "35903",
    from: "10115",
    to: "10116",
    type: "Horizontal",
  },
  {
    id: "35904",
    from: "10116",
    to: "10023",
    type: "SectionNNL",
  },
  {
    id: "36001",
    from: "10030",
    to: "10031",
    type: "SectionDNN",
  },
  {
    id: "36002",
    from: "10031",
    to: "10032",
    type: "Horizontal",
  },
  {
    id: "36101",
    from: "10032",
    to: "10035",
    type: "SectionDNN",
  },
  {
    id: "36102",
    from: "10035",
    to: "10036",
    type: "Horizontal",
  },
  {
    id: "36103",
    from: "10036",
    to: "10037",
    type: "SectionNNR",
  },
  {
    id: "36104",
    from: "10037",
    to: "10038",
    type: "Horizontal",
  },
  {
    id: "36201",
    from: "10040",
    to: "10041",
    type: "SectionDND",
  },
  {
    id: "36301",
    from: "10040",
    to: "10143",
    type: "SectionRNU",
  },
  {
    id: "36401",
    from: "10041",
    to: "10042",
    type: "Horizontal",
  },
  {
    id: "36501",
    from: "10042",
    to: "10253",
    type: "SectionDNN",
  },
  {
    id: "36502",
    from: "10253",
    to: "10254",
    type: "Horizontal",
  },
  {
    id: "36503",
    from: "10254",
    to: "10045",
    type: "SectionNND",
  },
  {
    id: "36601",
    from: "10042",
    to: "10043",
    type: "SectionDNN",
  },
  {
    id: "36602",
    from: "10043",
    to: "10044",
    type: "Horizontal",
  },
  {
    id: "36603",
    from: "10044",
    to: "10045",
    type: "SectionNND",
  },
  {
    id: "36701",
    from: "10045",
    to: "10046",
    type: "Horizontal",
  },
  {
    id: "36801",
    from: "10046",
    to: "10047",
    type: "SectionDND",
  },
  {
    id: "36901",
    from: "10046",
    to: "10175",
    type: "SectionRNU",
  },
  {
    id: "37001",
    from: "10047",
    to: "10048",
    type: "Horizontal",
  },
  {
    id: "37002",
    from: "10048",
    to: "10049",
    type: "SectionNNU",
  },
  {
    id: "37003",
    from: "10049",
    to: "10050",
    type: "Horizontal",
  },
  {
    id: "37101",
    from: "10050",
    to: "10188",
    type: "SectionUNN",
  },
  {
    id: "37102",
    from: "10188",
    to: "10187",
    type: "Horizontal",
  },
  {
    id: "37103",
    from: "10187",
    to: "10173",
    type: "SectionNNU",
  },
  {
    id: "37201",
    from: "10050",
    to: "10051",
    type: "SectionUNR",
  },
  {
    id: "37301",
    from: "10173",
    to: "10174",
    type: "Horizontal",
  },
  {
    id: "37401",
    from: "10174",
    to: "10175",
    type: "SectionUNU",
  },
  {
    id: "37501",
    from: "10174",
    to: "10047",
    type: "SectionLND",
  },
  {
    id: "37601",
    from: "10175",
    to: "10176",
    type: "Horizontal",
  },
  {
    id: "37701",
    from: "10176",
    to: "10177",
    type: "SectionUNN",
  },
  {
    id: "37702",
    from: "10177",
    to: "10178",
    type: "Horizontal",
  },
  {
    id: "37703",
    from: "10178",
    to: "10137",
    type: "SectionNNU",
  },
  {
    id: "37801",
    from: "10176",
    to: "10153",
    type: "SectionUNR",
  },
  {
    id: "37901",
    from: "10137",
    to: "10142",
    type: "Horizontal",
  },
  {
    id: "38201",
    from: "10142",
    to: "10143",
    type: "SectionUNU",
  },
  {
    id: "38301",
    from: "10142",
    to: "10041",
    type: "SectionLND",
  },
  {
    id: "38701",
    from: "10051",
    to: "10052",
    type: "Horizontal",
  },
  {
    id: "38801",
    from: "10052",
    to: "10053",
    type: "SectionRNR",
  },
  {
    id: "38901",
    from: "10052",
    to: "10184",
    type: "SectionUNN",
  },
  {
    id: "38902",
    from: "10184",
    to: "10183",
    type: "Horizontal",
  },
  {
    id: "38903",
    from: "10183",
    to: "10171",
    type: "SectionNNL",
  },
  {
    id: "39001",
    from: "10053",
    to: "10054",
    type: "Horizontal",
  },
  {
    id: "39101",
    from: "10054",
    to: "10055",
    type: "SectionRNR",
  },
  {
    id: "39201",
    from: "10054",
    to: "10179",
    type: "SectionUNN",
  },
  {
    id: "39202",
    from: "10179",
    to: "10180",
    type: "Horizontal",
  },
  {
    id: "39203",
    from: "10180",
    to: "10169",
    type: "SectionNNL",
  },
  {
    id: "39301",
    from: "10169",
    to: "10170",
    type: "Horizontal",
  },
  {
    id: "39401",
    from: "10170",
    to: "10171",
    type: "SectionLNL",
  },
  {
    id: "39501",
    from: "10170",
    to: "10181",
    type: "SectionDNN",
  },
  {
    id: "39502",
    from: "10181",
    to: "10182",
    type: "Horizontal",
  },
  {
    id: "39503",
    from: "10182",
    to: "10053",
    type: "SectionNNR",
  },
  {
    id: "39601",
    from: "10171",
    to: "10172",
    type: "Horizontal",
  },
  {
    id: "39701",
    from: "10172",
    to: "10173",
    type: "SectionUNU",
  },
  {
    id: "39801",
    from: "10172",
    to: "10185",
    type: "SectionDNN",
  },
  {
    id: "39802",
    from: "10185",
    to: "10186",
    type: "Horizontal",
  },
  {
    id: "39803",
    from: "10186",
    to: "10051",
    type: "SectionNNR",
  },
  {
    id: "39901",
    from: "10059",
    to: "10060",
    type: "Horizontal",
  },
  {
    id: "40001",
    from: "10060",
    to: "10061",
    type: "SectionRNR",
  },
  {
    id: "40101",
    from: "10060",
    to: "10209",
    type: "SectionUNL",
  },
  {
    id: "40201",
    from: "10061",
    to: "10062",
    type: "Horizontal",
  },
  {
    id: "40202",
    from: "10062",
    to: "10063",
    type: "SectionNNR",
  },
  {
    id: "40401",
    from: "10063",
    to: "10064",
    type: "Horizontal",
  },
  {
    id: "40501",
    from: "10064",
    to: "10065",
    type: "SectionUNN",
  },
  {
    id: "40502",
    from: "10065",
    to: "10066",
    type: "Horizontal",
  },
  {
    id: "40503",
    from: "10066",
    to: "10067",
    type: "SectionNNL",
  },
  {
    id: "40504",
    from: "10067",
    to: "10068",
    type: "Horizontal",
  },
  {
    id: "40601",
    from: "10064",
    to: "10205",
    type: "SectionUNL",
  },
  {
    id: "40701",
    from: "10068",
    to: "10069",
    type: "SectionLNN",
  },
  {
    id: "40702",
    from: "10069",
    to: "10070",
    type: "Horizontal",
  },
  {
    id: "40703",
    from: "10070",
    to: "10071",
    type: "SectionNNU",
  },
  {
    id: "40704",
    from: "10071",
    to: "10072",
    type: "Horizontal",
  },
  {
    id: "40801",
    from: "10068",
    to: "10239",
    type: "SectionDNR",
  },
  {
    id: "40901",
    from: "10072",
    to: "10073",
    type: "SectionUNN",
  },
  {
    id: "40902",
    from: "10073",
    to: "10245",
    type: "Horizontal",
  },
  {
    id: "40903",
    from: "10245",
    to: "10246",
    type: "SectionNNU",
  },
  {
    id: "41001",
    from: "10072",
    to: "10235",
    type: "SectionLND",
  },
  {
    id: "41101",
    from: "10246",
    to: "10074",
    type: "Horizontal",
  },
  {
    id: "41102",
    from: "10074",
    to: "10075",
    type: "SectionNNL",
  },
  {
    id: "41103",
    from: "10075",
    to: "10076",
    type: "Horizontal",
  },
  {
    id: "41201",
    from: "10076",
    to: "10227",
    type: "SectionUNL",
  },
  {
    id: "41301",
    from: "10076",
    to: "10077",
    type: "SectionUNN",
  },
  {
    id: "41302",
    from: "10077",
    to: "10078",
    type: "Horizontal",
  },
  {
    id: "41303",
    from: "10078",
    to: "10079",
    type: "SectionNNL",
  },
  {
    id: "41304",
    from: "10079",
    to: "10080",
    type: "Horizontal",
  },
  {
    id: "41305",
    from: "10080",
    to: "10081",
    type: "SectionNNL",
  },
  {
    id: "41401",
    from: "10227",
    to: "10228",
    type: "Horizontal",
  },
  {
    id: "41501",
    from: "10228",
    to: "10097",
    type: "SectionLNL",
  },
  {
    id: "41601",
    from: "10228",
    to: "10229",
    type: "SectionDNN",
  },
  {
    id: "41602",
    from: "10229",
    to: "10230",
    type: "Horizontal",
  },
  {
    id: "41603",
    from: "10230",
    to: "10231",
    type: "SectionNNR",
  },
  {
    id: "41701",
    from: "10097",
    to: "10098",
    type: "Horizontal",
  },
  {
    id: "41702",
    from: "10098",
    to: "10089",
    type: "SectionNNL",
  },
  {
    id: "41801",
    from: "10089",
    to: "10090",
    type: "Horizontal",
  },
  {
    id: "41901",
    from: "10090",
    to: "10019",
    type: "SectionLNL",
  },
  {
    id: "42001",
    from: "10090",
    to: "10091",
    type: "SectionDNN",
  },
  {
    id: "42002",
    from: "10091",
    to: "10092",
    type: "Horizontal",
  },
  {
    id: "42003",
    from: "10092",
    to: "10093",
    type: "SectionNNR",
  },
  {
    id: "42101",
    from: "10093",
    to: "10094",
    type: "Horizontal",
  },
  {
    id: "42201",
    from: "10094",
    to: "10231",
    type: "SectionRNR",
  },
  {
    id: "42301",
    from: "10094",
    to: "10095",
    type: "SectionUNN",
  },
  {
    id: "42302",
    from: "10095",
    to: "10096",
    type: "Horizontal",
  },
  {
    id: "42303",
    from: "10096",
    to: "10097",
    type: "SectionNNL",
  },
  {
    id: "42401",
    from: "10231",
    to: "10232",
    type: "Horizontal",
  },
  {
    id: "42501",
    from: "10232",
    to: "10246",
    type: "SectionUNU",
  },
  {
    id: "42601",
    from: "10232",
    to: "10233",
    type: "SectionDNN",
  },
  {
    id: "42602",
    from: "10233",
    to: "10234",
    type: "Horizontal",
  },
  {
    id: "42603",
    from: "10234",
    to: "10235",
    type: "SectionNND",
  },
  {
    id: "42701",
    from: "10235",
    to: "10236",
    type: "Horizontal",
  },
  {
    id: "42801",
    from: "10236",
    to: "10001",
    type: "SectionDNN",
  },
  {
    id: "42803",
    from: "10001",
    to: "80101",
    type: "Horizontal",
  },
  {
    id: "42804",
    from: "80101",
    to: "10002",
    type: "Horizontal",
  },
  {
    id: "42805",
    from: "10002",
    to: "10003",
    type: "SectionNND",
  },
  {
    id: "42901",
    from: "10236",
    to: "10237",
    type: "SectionDNN",
  },
  {
    id: "42902",
    from: "10237",
    to: "10238",
    type: "Horizontal",
  },
  {
    id: "42903",
    from: "10238",
    to: "10239",
    type: "SectionNNR",
  },
  {
    id: "43001",
    from: "10003",
    to: "10004",
    type: "Horizontal",
  },
  {
    id: "43101",
    from: "10004",
    to: "10217",
    type: "SectionDNN",
  },
  {
    id: "43102",
    from: "10217",
    to: "10218",
    type: "Horizontal",
  },
  {
    id: "43103",
    from: "10218",
    to: "10203",
    type: "SectionNND",
  },
  {
    id: "43201",
    from: "10004",
    to: "10005",
    type: "SectionDNL",
  },
  {
    id: "43301",
    from: "10203",
    to: "10204",
    type: "Horizontal",
  },
  {
    id: "43302",
    from: "10204",
    to: "10205",
    type: "SectionNNL",
  },
  {
    id: "43401",
    from: "10205",
    to: "10206",
    type: "Horizontal",
  },
  {
    id: "43501",
    from: "10206",
    to: "10207",
    type: "SectionLNN",
  },
  {
    id: "43502",
    from: "10207",
    to: "10208",
    type: "Horizontal",
  },
  {
    id: "43601",
    from: "10206",
    to: "10063",
    type: "SectionDNR",
  },
  {
    id: "43801",
    from: "10208",
    to: "10209",
    type: "SectionLNL",
  },
  {
    id: "43901",
    from: "10208",
    to: "10061",
    type: "SectionDNR",
  },
  {
    id: "44001",
    from: "10209",
    to: "10210",
    type: "Horizontal",
  },
  {
    id: "44101",
    from: "10210",
    to: "10191",
    type: "SectionUNU",
  },
  {
    id: "44201",
    from: "10210",
    to: "10059",
    type: "SectionDNR",
  },
  {
    id: "44301",
    from: "10005",
    to: "10006",
    type: "Horizontal",
  },
  {
    id: "44401",
    from: "10006",
    to: "10007",
    type: "SectionLNN",
  },
  {
    id: "44402",
    from: "10007",
    to: "10008",
    type: "Horizontal",
  },
  {
    id: "44501",
    from: "10006",
    to: "10247",
    type: "SectionDNN",
  },
  {
    id: "44502",
    from: "10247",
    to: "10248",
    type: "Horizontal",
  },
  {
    id: "44503",
    from: "10248",
    to: "10249",
    type: "SectionNNL",
  },
  {
    id: "44601",
    from: "10008",
    to: "10009",
    type: "SectionLNN",
  },
  {
    id: "44602",
    from: "10009",
    to: "10010",
    type: "Horizontal",
  },
  {
    id: "44603",
    from: "10010",
    to: "10011",
    type: "SectionNNL",
  },
  {
    id: "44701",
    from: "10008",
    to: "10249",
    type: "SectionDNL",
  },
  {
    id: "44901",
    from: "10011",
    to: "10012",
    type: "Horizontal",
  },
  {
    id: "45001",
    from: "10012",
    to: "10013",
    type: "SectionUNU",
  },
  {
    id: "45101",
    from: "10012",
    to: "10197",
    type: "SectionDNN",
  },
  {
    id: "45102",
    from: "10197",
    to: "10198",
    type: "Horizontal",
  },
  {
    id: "45103",
    from: "10198",
    to: "10199",
    type: "SectionNNR",
  },
  {
    id: "45201",
    from: "10199",
    to: "10200",
    type: "Horizontal",
  },
  {
    id: "45301",
    from: "10200",
    to: "10201",
    type: "SectionRNR",
  },
  {
    id: "45401",
    from: "10200",
    to: "10211",
    type: "SectionUNN",
  },
  {
    id: "45402",
    from: "10211",
    to: "10212",
    type: "Horizontal",
  },
  {
    id: "45403",
    from: "10212",
    to: "10251",
    type: "SectionNNL",
  },
  {
    id: "45501",
    from: "10201",
    to: "10202",
    type: "Horizontal",
  },
  {
    id: "45601",
    from: "10202",
    to: "10203",
    type: "SectionDND",
  },
  {
    id: "45701",
    from: "10202",
    to: "10215",
    type: "SectionUNN",
  },
  {
    id: "45702",
    from: "10215",
    to: "10216",
    type: "Horizontal",
  },
  {
    id: "45703",
    from: "10216",
    to: "10005",
    type: "SectionNNL",
  },
  {
    id: "45801",
    from: "10249",
    to: "10250",
    type: "Horizontal",
  },
  {
    id: "45901",
    from: "10250",
    to: "10251",
    type: "SectionLNL",
  },
  {
    id: "46001",
    from: "10250",
    to: "10213",
    type: "SectionDNN",
  },
  {
    id: "46002",
    from: "10213",
    to: "10214",
    type: "Horizontal",
  },
  {
    id: "46003",
    from: "10214",
    to: "10201",
    type: "SectionNNR",
  },
  {
    id: "46101",
    from: "10251",
    to: "10252",
    type: "Horizontal",
  },
  {
    id: "46102",
    from: "10252",
    to: "10011",
    type: "SectionNNL",
  },
  {
    id: "46201",
    from: "10239",
    to: "10240",
    type: "Horizontal",
  },
  {
    id: "46202",
    from: "10240",
    to: "10003",
    type: "SectionNND",
  },
  {
    id: "46301",
    from: "10081",
    to: "10082",
    type: "Horizontal",
  },
  {
    id: "46401",
    from: "10082",
    to: "10083",
    type: "SectionLNL",
  },
  {
    id: "46501",
    from: "10082",
    to: "10221",
    type: "SectionDNR",
  },
  {
    id: "46601",
    from: "10083",
    to: "10084",
    type: "Horizontal",
  },
  {
    id: "46703",
    from: "10084",
    to: "10087",
    type: "SectionDNN",
  },
  {
    id: "46704",
    from: "10087",
    to: "10088",
    type: "Horizontal",
  },
  {
    id: "46705",
    from: "10088",
    to: "10089",
    type: "SectionNNL",
  },
  {
    id: "46801",
    from: "10084",
    to: "10219",
    type: "SectionDNN",
  },
  {
    id: "46802",
    from: "10219",
    to: "10220",
    type: "Horizontal",
  },
  {
    id: "46901",
    from: "10220",
    to: "10221",
    type: "SectionRNR",
  },
  {
    id: "47001",
    from: "10220",
    to: "10083",
    type: "SectionUNL",
  },
  {
    id: "47101",
    from: "10221",
    to: "10222",
    type: "Horizontal",
  },
  {
    id: "47201",
    from: "10222",
    to: "10223",
    type: "SectionRNN",
  },
  {
    id: "47202",
    from: "10223",
    to: "10224",
    type: "Horizontal",
  },
  {
    id: "47203",
    from: "10224",
    to: "10225",
    type: "SectionNND",
  },
  {
    id: "47204",
    from: "10225",
    to: "10226",
    type: "Horizontal",
  },
  {
    id: "47205",
    from: "10226",
    to: "10227",
    type: "SectionNNL",
  },
  {
    id: "47301",
    from: "10222",
    to: "10081",
    type: "SectionUNL",
  },
  {
    id: "47401",
    from: "10129",
    to: "10130",
    type: "Horizontal",
  },
  {
    id: "47501",
    from: "10130",
    to: "10131",
    type: "SectionLNN",
  },
  {
    id: "47502",
    from: "10131",
    to: "10132",
    type: "Horizontal",
  },
  {
    id: "47601",
    from: "10130",
    to: "10145",
    type: "SectionDNN",
  },
  {
    id: "47602",
    from: "10145",
    to: "10146",
    type: "Horizontal",
  },
  {
    id: "47701",
    from: "10132",
    to: "10133",
    type: "SectionLNN",
  },
  {
    id: "47702",
    from: "10133",
    to: "10134",
    type: "Horizontal",
  },
  {
    id: "47703",
    from: "10134",
    to: "10135",
    type: "SectionNNL",
  },
  {
    id: "47801",
    from: "10132",
    to: "10149",
    type: "SectionDNL",
  },
  {
    id: "47901",
    from: "10135",
    to: "10136",
    type: "Horizontal",
  },
  {
    id: "48001",
    from: "10136",
    to: "10137",
    type: "SectionUNU",
  },
  {
    id: "48101",
    from: "10136",
    to: "10151",
    type: "SectionDNN",
  },
  {
    id: "48102",
    from: "10151",
    to: "10152",
    type: "Horizontal",
  },
  {
    id: "48103",
    from: "10152",
    to: "10153",
    type: "SectionNNR",
  },
  {
    id: "48201",
    from: "10153",
    to: "10154",
    type: "Horizontal",
  },
  {
    id: "48301",
    from: "10154",
    to: "10159",
    type: "SectionRNR",
  },
  {
    id: "48401",
    from: "10154",
    to: "10155",
    type: "SectionUNN",
  },
  {
    id: "48402",
    from: "10155",
    to: "10156",
    type: "Horizontal",
  },
  {
    id: "48403",
    from: "10156",
    to: "10147",
    type: "SectionNNL",
  },
  {
    id: "48501",
    from: "10159",
    to: "10160",
    type: "Horizontal",
  },
  {
    id: "48601",
    from: "10160",
    to: "10165",
    type: "SectionDND",
  },
  {
    id: "48701",
    from: "10160",
    to: "10161",
    type: "SectionUNN",
  },
  {
    id: "48702",
    from: "10161",
    to: "10162",
    type: "Horizontal",
  },
  {
    id: "48703",
    from: "10162",
    to: "10129",
    type: "SectionNNL",
  },
  {
    id: "48801",
    from: "10146",
    to: "10147",
    type: "SectionLNL",
  },
  {
    id: "48901",
    from: "10146",
    to: "10157",
    type: "SectionDNN",
  },
  {
    id: "48902",
    from: "10157",
    to: "10158",
    type: "Horizontal",
  },
  {
    id: "48903",
    from: "10158",
    to: "10159",
    type: "SectionNNR",
  },
  {
    id: "49001",
    from: "10147",
    to: "10148",
    type: "Horizontal",
  },
  {
    id: "49002",
    from: "10148",
    to: "10149",
    type: "SectionNNL",
  },
  {
    id: "49101",
    from: "10149",
    to: "10150",
    type: "Horizontal",
  },
  {
    id: "49102",
    from: "10150",
    to: "10135",
    type: "SectionNNL",
  },
  {
    id: "49201",
    from: "10263",
    to: "10117",
    type: "SectionUNN",
  },
  {
    id: "49202",
    from: "10117",
    to: "10118",
    type: "Horizontal",
  },
  {
    id: "49203",
    from: "10118",
    to: "10021",
    type: "SectionNNL",
  },
  {
    id: "49301",
    from: "10038",
    to: "10039",
    type: "SectionDND",
  },
  {
    id: "49401",
    from: "10039",
    to: "10040",
    type: "Horizontal",
  },
  {
    id: "49501",
    from: "10143",
    to: "10144",
    type: "Horizontal",
  },
  {
    id: "49601",
    from: "10144",
    to: "10039",
    type: "SectionLND",
  },
  {
    id: "49701",
    from: "10144",
    to: "10256",
    type: "SectionUNR",
  },
  {
    id: "49801",
    from: "10038",
    to: "10256",
    type: "SectionRNR",
  },
  {
    id: "49901",
    from: "10256",
    to: "10257",
    type: "Horizontal",
  },
  {
    id: "50001",
    from: "10257",
    to: "10258",
    type: "SectionUNN",
  },
  {
    id: "50002",
    from: "10258",
    to: "10259",
    type: "Horizontal",
  },
  {
    id: "50003",
    from: "10259",
    to: "10027",
    type: "SectionNNL",
  },
  {
    id: "50101",
    from: "10026",
    to: "10260",
    type: "SectionDNN",
  },
  {
    id: "50102",
    from: "10260",
    to: "10261",
    type: "Horizontal",
  },
  {
    id: "50103",
    from: "10261",
    to: "10262",
    type: "SectionNNR",
  },
  {
    id: "50201",
    from: "10257",
    to: "10262",
    type: "SectionRNR",
  },
  {
    id: "50301",
    from: "10262",
    to: "10263",
    type: "Horizontal",
  },
  {
    id: "50501",
    from: "10032",
    to: "10033",
    type: "SectionDNN",
  },
  {
    id: "50502",
    from: "10033",
    to: "80103",
    type: "Horizontal",
  },
  {
    id: "50503",
    from: "80103",
    to: "10255",
    type: "Horizontal",
  },
];



// Coordinate scaling function
interface ScaledData {
  nodes: Map<string, { x: number; y: number }>;
  segments: Array<{
    id: string;
    from: string;
    to: string;
    type: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>;
  scale: number;
}

function getScaledCoordinates(
  nodes: typeof rawNodes,
  segments: typeof rawSegments,
  canvasWidth: number = 1200,
  canvasHeight: number = 700,
  padding: number = 100,
): ScaledData {
  if (nodes.length === 0) {
    return { nodes: new Map(), segments: [], scale: 1 };
  }

  // Find bounds
  const minX = Math.min(...nodes.map((n) => n.x));
  const maxX = Math.max(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxY = Math.max(...nodes.map((n) => n.y));

  // Calculate scale factors
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;
  const scaleX = (canvasWidth - padding * 2) / rangeX;
  const scaleY = (canvasHeight - padding * 2) / rangeY;

  // Use uniform scaling (smaller factor to fit both dimensions)
  const scale = Math.min(scaleX, scaleY);

  // Transform nodes
  const scaledNodes = new Map<
    string,
    { x: number; y: number }
  >();
  nodes.forEach((node) => {
    scaledNodes.set(node.id, {
      x: (node.x - minX) * scale + padding,
      y: (node.y - minY) * scale + padding,
    });
  });

  // Transform segments
  const scaledSegments = segments.map((seg) => {
    const fromNode = scaledNodes.get(seg.from);
    const toNode = scaledNodes.get(seg.to);

    return {
      id: seg.id,
      from: seg.from,
      to: seg.to,
      type: seg.type,
      x1: fromNode?.x ?? 0,
      y1: fromNode?.y ?? 0,
      x2: toNode?.x ?? 0,
      y2: toNode?.y ?? 0,
    };
  });

  return {
    nodes: scaledNodes,
    segments: scaledSegments,
    scale,
  };
}

type PortVisualState =
  | "white-outline" // newly added, not configured
  | "orange-outline" // not taught
  | "green-outline" // taught
  | "orange-filled" // parking point (not taught)
  | "green-filled"; // parking point (taught)

interface Port {
  id: string;
  equipmentId: string;
  visualState: PortVisualState;
  x: number;
  y: number;
}

interface Section {
  id: string;
  name: string;
  ports: Port[];
  routeCoordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }[];
}

interface TrackSegment {
  id: string;
  sectionId: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: "horizontal" | "vertical";
  from: string;
  to: string;
}







// OHB Interfaces
interface OHBPort {
  id: string;
  linkId: string;
  side: "left" | "right";
  offset: number; // 0 to 1 along the segment
  name: string;
  visualState: PortVisualState;
}

interface OHBSection {
  id: string;
  name: string;
  ports: OHBPort[];
}

interface Bay {
  id: string;
  name: string;
  segmentIds: string[];
  color: string;
  // Level Setting
  highWaterLevel?: string;
  lowWaterLevel?: string;
  pushOuts?: string[];
  pullIns?: string[];
  // Parking Points
  parkingPoints?: string[];
}


// Helper function to calculate perpendicular point
const calculatePerpendicularPoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
  distance: number,
  side: "left" | "right",
) => {
  // Point on the line
  const px = x1 + (x2 - x1) * t;
  const py = y1 + (y2 - y1) * t;

  // Vector of the line
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Length of the line
  const len = Math.sqrt(dx * dx + dy * dy);

  // Normalized perpendicular vector
  // (-dy, dx) is 90 degrees counter-clockwise (Left)
  // (dy, -dx) is 90 degrees clockwise (Right)
  let perpX, perpY;

  if (side === "left") {
    // For screen coords (y down): Left is rotated -90deg (or 270deg) relative to vector
    perpX = dy / len;
    perpY = -dx / len;
  } else {
    // Right is rotated +90deg relative to vector
    perpX = -dy / len;
    perpY = dx / len;
  }

  return {
    x: px + perpX * distance,
    y: py + perpY * distance,
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
};

export function ParkingPointSetting() {
  const [activeTab, setActiveTab] = useState<"port" | "ohb">("port");
  const [activeBayTab, setActiveBayTab] = useState<"bay-setting" | "bay-level-setting" | "bay-parking-point">("bay-setting");
  const [activeZoneTab, setActiveZoneTab] = useState<"zone-setting" | "zone-parking-point">("zone-setting");

  // OHB independent state
  const [ohbZoomLevel, setOhbZoomLevel] = useState<number>(1);
  const [ohbPanOffset, setOhbPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ohbIsDragging, setOhbIsDragging] = useState<boolean>(false);
  const [ohbDragStart, setOhbDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sidebar Menu State
  const [isParkingModeExpanded, setIsParkingModeExpanded] = useState(true);

  const [activeSidebarItem, setActiveSidebarItem] = useState('point-setting'); // 'point-setting', 'bay-mode', 'zone-mode'

  // OHB data
  // OHB data
  const [ohbSections, setOhbSections] = useState<OHBSection[]>(() => {
    const saved = localStorage.getItem('parking-point-ohb-sections');
    return saved ? JSON.parse(saved) : [
      {
        id: "50301",
        name: "50301",
        ports: [
          { id: "ohb-50301-08101", linkId: "50301", side: "left", offset: 0.1, name: "08101", visualState: "green-filled" },
          { id: "ohb-50301-08102", linkId: "50301", side: "left", offset: 0.2, name: "08102", visualState: "green-filled" },
          { id: "ohb-50301-08103", linkId: "50301", side: "left", offset: 0.3, name: "08103", visualState: "green-filled" },
          { id: "ohb-50301-08104", linkId: "50301", side: "left", offset: 0.4, name: "08104", visualState: "green-filled" },
          { id: "ohb-50301-08105", linkId: "50301", side: "left", offset: 0.5, name: "08105", visualState: "green-outline" },
          { id: "ohb-50301-08106", linkId: "50301", side: "left", offset: 0.6, name: "08106", visualState: "green-outline" },
          { id: "ohb-50301-08107", linkId: "50301", side: "left", offset: 0.7, name: "08107", visualState: "orange-filled" },
          { id: "ohb-50301-08108", linkId: "50301", side: "left", offset: 0.8, name: "08108", visualState: "orange-filled" },
          { id: "ohb-50301-08109", linkId: "50301", side: "left", offset: 0.9, name: "08109", visualState: "orange-outline" },
        ]
      }
    ];
  });
  const [ohbSelectedSegmentId, setOhbSelectedSegmentId] = useState<string | null>(null);
  const [ohbHoveredSegmentId, setOhbHoveredSegmentId] = useState<string | null>(null);
  const [ohbHoveredPortId, setOhbHoveredPortId] = useState<string | null>(null); // Added state for OHB port hover

  // OHB form state
  const [addOHBQty, setAddOHBQty] = useState<number>(1);
  const [addOHBStartId, setAddOHBStartId] = useState<string>(""); // User input for start ID
  const [addOHBSide, setAddOHBSide] = useState<"left" | "right">("left"); // 'left' or 'right'

  // Bay Mode State
  // Bay Mode State - With Persistence
  const [bays, setBays] = useState<Bay[]>(() => {
    const saved = localStorage.getItem('parking-point-setting-bays');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist Bays to LocalStorage
  useEffect(() => {
    localStorage.setItem('parking-point-setting-bays', JSON.stringify(bays));
  }, [bays]);
  const [baySelectedSegments, setBaySelectedSegments] = useState<string[]>([]);
  const [bayIdInput, setBayIdInput] = useState<string>("");
  const [activeBayLevelId, setActiveBayLevelId] = useState<string | null>(null);
  const [activeBayParkingPointId, setActiveBayParkingPointId] = useState<string | null>(null);

  const [selectedSectionId, setSelectedSectionId] =
    useState<string>("section-35901");
  const [selectedSegmentId, setSelectedSegmentId] = useState<
    string | null
  >(null);
  const [hoveredSegmentId, setHoveredSegmentId] = useState<
    string | null
  >(null);
  const [showPorts, setShowPorts] = useState<boolean>(true);
  const [showOHBs, setShowOHBs] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Calculate scaled coordinates from raw data
  const scaledData = useMemo(() => {
    return getScaledCoordinates(rawNodes, rawSegments);
  }, []);

  // Use scaled segments for rendering (converted to TrackSegment format for compatibility)
  const trackSegments = useMemo(() => {
    return scaledData.segments.map((seg) => ({
      id: seg.id,
      sectionId: parseInt(seg.id),
      x1: seg.x1,
      y1: seg.y1,
      x2: seg.x2,
      y2: seg.y2,
      type: (seg.type === "Horizontal"
        ? "horizontal"
        : "vertical") as "horizontal" | "vertical",
      from: seg.from,
      to: seg.to,
    }));
  }, [scaledData]);

  // Find segment 35901 coordinates for PORT placement
  const segment35901 = scaledData.segments.find(seg => seg.id === "35901");
  const segment35901Coords = segment35901 ? {
    x1: segment35901.x1,
    y1: segment35901.y1,
    x2: segment35901.x2,
    y2: segment35901.y2,
  } : { x1: 400, y1: 100, x2: 700, y2: 100 };

  // Calculate PORT positions along segment 35901
  const segmentLength = Math.sqrt(
    Math.pow(segment35901Coords.x2 - segment35901Coords.x1, 2) +
    Math.pow(segment35901Coords.y2 - segment35901Coords.y1, 2)
  );
  const portSpacing = segmentLength / 7; // 7 intervals for 6 ports

  // Find segment 35104 coordinates for PORT placement
  const segment35104 = scaledData.segments.find(seg => seg.id === "35104");
  const segment35104Coords = segment35104 ? {
    x1: segment35104.x1,
    y1: segment35104.y1,
    x2: segment35104.x2,
    y2: segment35104.y2,
  } : { x1: 0, y1: 0, x2: 0, y2: 0 };

  // Calculate PORT positions along segment 35104
  const segmentLength35104 = Math.sqrt(
    Math.pow(segment35104Coords.x2 - segment35104Coords.x1, 2) +
    Math.pow(segment35104Coords.y2 - segment35104Coords.y1, 2)
  );
  const portSpacing35104 = segmentLength35104 / 4; // 4 intervals for 3 ports

  // Find segment 35501 coordinates for PORT placement
  const segment35501 = scaledData.segments.find(seg => seg.id === "35501");
  const segment35501Coords = segment35501 ? {
    x1: segment35501.x1,
    y1: segment35501.y1,
    x2: segment35501.x2,
    y2: segment35501.y2,
  } : { x1: 0, y1: 0, x2: 0, y2: 0 };

  // Calculate PORT positions along segment 35501
  const segmentLength35501 = Math.sqrt(
    Math.pow(segment35501Coords.x2 - segment35501Coords.x1, 2) +
    Math.pow(segment35501Coords.y2 - segment35501Coords.y1, 2)
  );
  const portSpacing35501 = segmentLength35501 / 9; // 9 intervals for 8 ports





  const [sections, setSections] = useState<Section[]>(() => {
    const saved = localStorage.getItem('parking-point-sections');
    return saved ? JSON.parse(saved) : [
      {
        id: "section-35901",
        name: "35901",
        ports: [
          {
            id: "port-1",
            equipmentId: "#1 EQ-001",
            visualState: "green-filled",
            x: segment35901Coords.x1 + portSpacing,
            y: segment35901Coords.y1,
          },
          {
            id: "port-2",
            equipmentId: "#2 EQ-002",
            visualState: "green-filled",
            x: segment35901Coords.x1 + portSpacing * 2,
            y: segment35901Coords.y1,
          },
          {
            id: "port-3",
            equipmentId: "#3 EQ-003",
            visualState: "green-outline",
            x: segment35901Coords.x1 + portSpacing * 3,
            y: segment35901Coords.y1,
          },
          {
            id: "port-4",
            equipmentId: "#4 EQ-004",
            visualState: "orange-filled",
            x: segment35901Coords.x1 + portSpacing * 4,
            y: segment35901Coords.y1,
          },
          {
            id: "port-5",
            equipmentId: "#5 EQ-005",
            visualState: "orange-outline",
            x: segment35901Coords.x1 + portSpacing * 5,
            y: segment35901Coords.y1,
          },
          {
            id: "port-6",
            equipmentId: "#6 EQ-006",
            visualState: "white-outline",
            x: segment35901Coords.x1 + portSpacing * 6,
            y: segment35901Coords.y1,
          },
        ],
        routeCoordinates: [
          // Will be calculated from scaled data
          { x1: 0, y1: 0, x2: 0, y2: 0 },
        ],
      },
      {
        id: "section-42803",
        name: "42803",
        ports: [],
        routeCoordinates: [{ x1: 0, y1: 0, x2: 0, y2: 0 }],
      },
      {
        id: "section-35104",
        name: "35104",
        ports: [
          {
            id: "port-35104-1",
            equipmentId: "1.B1_FRCL_11 P1",
            visualState: "green-outline",
            x: segment35104Coords.x1 + portSpacing35104,
            y: segment35104Coords.y1,
          },
          {
            id: "port-35104-2",
            equipmentId: "2.B1_FRCL_12 P1",
            visualState: "green-outline",
            x: segment35104Coords.x1 + portSpacing35104 * 2,
            y: segment35104Coords.y1,
          },
          {
            id: "port-35104-3",
            equipmentId: "3.B1_FRCL_12 P2",
            visualState: "green-outline",
            x: segment35104Coords.x1 + portSpacing35104 * 3,
            y: segment35104Coords.y1,
          },
        ],
        routeCoordinates: [
          { x1: 0, y1: 0, x2: 0, y2: 0 },
        ],
      },
      {
        id: "section-35501",
        name: "35501",
        ports: [
          {
            id: "port-35501-1",
            equipmentId: "B1_FRMT_01_P1",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-2",
            equipmentId: "B1_FRMT_01_P2",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 2,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-3",
            equipmentId: "B1_INSP_20_P1",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 3,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-4",
            equipmentId: "B1_INSP_20_P2",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 4,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-5",
            equipmentId: "B1A_WBANK_01_P1",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 5,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-6",
            equipmentId: "B1A_WBANK_01_P2",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 6,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-7",
            equipmentId: "B1A_WBANK_02_P1",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 7,
            y: segment35501Coords.y1,
          },
          {
            id: "port-35501-8",
            equipmentId: "B1A_WBANK_02_P2",
            visualState: "green-outline",
            x: segment35501Coords.x1 + portSpacing35501 * 8,
            y: segment35501Coords.y1,
          },
        ],
        routeCoordinates: [
          { x1: 0, y1: 0, x2: 0, y2: 0 },
        ],
      },
    ];
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('parking-point-sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('parking-point-ohb-sections', JSON.stringify(ohbSections));
  }, [ohbSections]);

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);
  const [showWarningModal, setShowWarningModal] =
    useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [pendingEditPort, setPendingEditPort] =
    useState<Port | null>(null);
  const [addPortCount, setAddPortCount] = useState("1");
  const [editingPortId, setEditingPortId] = useState<
    string | null
  >(null);
  const [editingPortValue, setEditingPortValue] =
    useState<string>("");
  const [draggingPortId, setDraggingPortId] = useState<
    string | null
  >(null);
  const [portDragOffset, setPortDragOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [hoveredPortId, setHoveredPortId] = useState<
    string | null
  >(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState(false);
  const [pendingDeletePortId, setPendingDeletePortId] =
    useState<string | null>(null);
  const [deleteModalMessage, setDeleteModalMessage] =
    useState("");
  const [pendingDeleteType, setPendingDeleteType] = useState<'port' | 'ohb'>('port');

  const selectedSection = sections.find(
    (s) => s.id === selectedSectionId,
  );



  const getPortStyle = (state: PortVisualState) => {
    switch (state) {
      case "white-outline":
        return {
          fill: "none",
          stroke: "#ffffff",
          strokeWidth: 2,
        };
      case "orange-outline":
        return {
          fill: "none",
          stroke: "#f97316",
          strokeWidth: 2,
        };
      case "green-outline":
        return {
          fill: "none",
          stroke: "#22c55e",
          strokeWidth: 2,
        };
      case "orange-filled":
        return {
          fill: "#f97316",
          stroke: "#fb923c",
          strokeWidth: 2,
        };
      case "green-filled":
        return {
          fill: "#22c55e",
          stroke: "#86efac",
          strokeWidth: 2,
        };
    }
  };

  const getPortStatusInfo = (state: PortVisualState) => {
    switch (state) {
      case "white-outline":
        return {
          taught: false,
          parking: false,
          dotStyle: "bg-white border-2 border-white",
          label: "New",
          labelColor: "text-gray-400 bg-gray-700",
        };
      case "orange-outline":
        return {
          taught: false,
          parking: false,
          dotStyle: "bg-transparent border-2 border-orange-500",
          label: "Not Taught",
          labelColor: "text-orange-400 bg-orange-950",
        };
      case "green-outline":
        return {
          taught: true,
          parking: false,
          dotStyle: "bg-transparent border-2 border-green-500",
          label: "",
          labelColor: "text-green-400 bg-green-950",
        };
      case "orange-filled":
        return {
          taught: false,
          parking: true,
          dotStyle: "bg-orange-500 border-2 border-orange-500",
          label: "Parking",
          labelColor: "text-orange-400 bg-orange-950",
        };
      case "green-filled":
        return {
          taught: true,
          parking: true,
          dotStyle: "bg-green-500 border-2 border-green-500",
          label: "Parking",
          labelColor: "text-green-400 bg-green-950",
        };
    }
  };

  const handlePortClick = (port: Port) => {
    // Filled ports cannot be edited
    if (
      port.visualState === "orange-filled" ||
      port.visualState === "green-filled"
    ) {
      setModalMessage(
        "This port is currently assigned as a parking point.\nPlease remove the parking point before editing.",
      );
      setShowWarningModal(true);
      return;
    }

    // Orange outline ports can be edited directly
    if (port.visualState === "orange-outline") {
      startEditPort(port);
      return;
    }

    // Green outline ports require confirmation
    if (port.visualState === "green-outline") {
      setPendingEditPort(port);
      setModalMessage(
        "This port has already been taught.\nEditing may affect system operation. Please confirm to continue.",
      );
      setShowConfirmModal(true);
      return;
    }

    // White outline ports can be edited directly
    if (port.visualState === "white-outline") {
      startEditPort(port);
      return;
    }
  };

  const startEditPort = (port: Port) => {
    setEditingPortId(port.id);
    setEditingPortValue(port.equipmentId);
  };

  const saveEditPort = (portId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === selectedSectionId) {
          return {
            ...section,
            ports: section.ports.map((port) => {
              if (port.id === portId) {
                return {
                  ...port,
                  equipmentId: editingPortValue,
                };
              }
              return port;
            }),
          };
        }
        return section;
      }),
    );
    setEditingPortId(null);
    setEditingPortValue("");
  };

  const cancelEditPort = () => {
    setEditingPortId(null);
    setEditingPortValue("");
  };



  const confirmEdit = () => {
    if (pendingEditPort) {
      startEditPort(pendingEditPort);
      setPendingEditPort(null);
    }
    setShowConfirmModal(false);
  };

  const handleRemovePort = (portId: string) => {
    const port = selectedSection?.ports.find(
      (p) => p.id === portId,
    );

    if (!port) return;

    // Green-filled or green-outline: requires confirmation (taught)
    if (port.visualState === "green-filled") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('port');
      setDeleteModalMessage(
        "This port has been taught and is assigned as a parking point.\nDeleting may affect system operation. Please confirm to continue.",
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    if (port.visualState === "green-outline") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('port');
      setDeleteModalMessage(
        "This port has already been taught.\nDeleting may affect system operation. Please confirm to continue.",
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    // Orange-filled: parking point but not taught, may need confirmation
    if (port.visualState === "orange-filled") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('port');
      setDeleteModalMessage(
        "This port is assigned as a parking point.\nPlease confirm to delete.",
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    // Orange-outline and white-outline: can be deleted directly
    deletePortDirectly(portId);
  };

  const deletePortDirectly = (portId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === selectedSectionId) {
          return {
            ...section,
            ports: section.ports.filter((p) => p.id !== portId),
          };
        }
        return section;
      }),
    );
  };

  const deleteOHBDirectly = (portId: string) => {
    setOhbSections(prevSections => {
      return prevSections.map(section => {
        if (section.id === ohbSelectedSegmentId) {
          const remainingPorts = section.ports.filter(p => p.id !== portId);
          const leftPorts = remainingPorts.filter(p => p.side === 'left');
          const rightPorts = remainingPorts.filter(p => p.side === 'right');

          const redistribute = (ports: OHBPort[]) => {
            return ports.map((p, idx, arr) => ({
              ...p,
              offset: (idx + 1) / (arr.length + 1)
            }));
          };

          return {
            ...section,
            ports: [...redistribute(leftPorts), ...redistribute(rightPorts)]
          };
        }
        return section;
      });
    });
  };

  const confirmDelete = () => {
    if (pendingDeletePortId) {
      if (pendingDeleteType === 'port') {
        deletePortDirectly(pendingDeletePortId);
      } else {
        deleteOHBDirectly(pendingDeletePortId);
      }
      setPendingDeletePortId(null);
    }
    setShowDeleteConfirmModal(false);
  };

  const cancelDelete = () => {
    setPendingDeletePortId(null);
    setShowDeleteConfirmModal(false);
  };

  const handleAddPorts = () => {
    const count = parseInt(addPortCount);
    if (isNaN(count) || count < 1) return;

    if (
      !selectedSection ||
      selectedSection.routeCoordinates.length === 0
    )
      return;

    const currentPorts = selectedSection?.ports || [];

    // Get the first route segment for this section
    const route = selectedSection.routeCoordinates[0];

    // Calculate route parameters
    const startX = route.x1;
    const endX = route.x2;
    const startY = route.y1;
    const endY = route.y2;



    // Create new ports with default properties
    const newPorts: Port[] = [];
    for (let i = 0; i < count; i++) {
      const portNumber = currentPorts.length + i + 1;
      newPorts.push({
        id: `port-new-${Date.now()}-${i}`,
        equipmentId: `EQ-${String(portNumber).padStart(3, "0")}`,
        visualState: "white-outline",
        x: 0,
        y: 0,
      });
    }

    // Combine all ports (existing + new)
    const allPorts = [...currentPorts, ...newPorts];
    const totalPorts = allPorts.length;

    // Redistribute ALL ports evenly along the segment
    const redistributedPorts = allPorts.map((port, index) => {
      const progress = (index + 1) / (totalPorts + 1);

      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;

      return {
        ...port,
        x: Math.round(x),
        y: Math.round(y),
      };
    });

    setSections(
      sections.map((section) => {
        if (section.id === selectedSectionId) {
          return {
            ...section,
            ports: redistributedPorts,
          };
        }
        return section;
      }),
    );
  };



  const handleSaveConfiguration = () => {
    // Simulate saving and updating visual states for Ports
    setSections(
      sections.map((section) => {
        if (section.id === selectedSectionId) {
          return {
            ...section,
            ports: section.ports.map((port) => {
              // White-outline becomes orange-outline after save
              if (port.visualState === "white-outline") {
                return {
                  ...port,
                  visualState:
                    "orange-outline" as PortVisualState,
                };
              }
              return port;
            }),
          };
        }
        return section;
      }),
    );

    // Simulate saving and updating visual states for OHBs
    setOhbSections(prevOhbSections =>
      prevOhbSections.map(section => ({
        ...section,
        ports: section.ports.map(ohb => {
          if (ohb.visualState === 'white-outline') {
            return {
              ...ohb,
              visualState: 'orange-outline' as PortVisualState
            };
          }
          return ohb;
        })
      }))
    );

    setModalMessage("Configuration saved successfully! (Check console for JSON)");

    // Log current state to console for manual export
    console.log("=== EXPORT CONFIGURATION ===");
    console.log("Sections (Ports):", JSON.stringify(sections, null, 2));
    console.log("OHB Sections:", JSON.stringify(ohbSections, null, 2));
    console.log("============================");

    setShowWarningModal(true);
  };

  const handleSelectSection = (sectionName: string) => {
    // Find section by matching segment ID from trackSegments
    const segment = trackSegments.find(
      (seg) =>
        seg.sectionId.toString() === sectionName ||
        seg.sectionId === parseInt(sectionName),
    );

    if (segment) {
      // Create or update section
      const existingSection = sections.find((s) =>
        s.name.startsWith(sectionName),
      );

      if (!existingSection) {
        const newSection: Section = {
          id: `section-${segment.sectionId}`,
          name: `${segment.sectionId}`,
          ports: [],
          routeCoordinates: [
            {
              x1: segment.x1,
              y1: segment.y1,
              x2: segment.x2,
              y2: segment.y2,
            },
          ],
        };
        setSections([...sections, newSection]);
        setSelectedSectionId(newSection.id);
      } else {
        setSelectedSectionId(existingSection.id);
      }
    }
  };

  const handleSegmentClick = (segmentId: string) => {
    setSelectedSegmentId(segmentId);

  };

  const handleSegmentHover = (segmentId: string | null) => {
    setHoveredSegmentId(segmentId);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const getSegmentStyle = (segmentId: string) => {
    if (selectedSegmentId === segmentId) {
      return "route-line-selected";
    }
    return "route-line";
  };

  const getLabelPosition = (segment: TrackSegment) => {
    if (segment.type === "horizontal") {
      const midX = (segment.x1 + segment.x2) / 2;
      return { x: midX, y: segment.y1 - 15 };
    } else {
      const midY = (segment.y1 + segment.y2) / 2;
      return { x: segment.x1 + 20, y: midY };
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPanOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };



  const handlePortMouseDown = (
    e: React.MouseEvent<SVGCircleElement>,
    port: Port,
  ) => {
    // Only allow dragging for white-outline and orange-outline ports
    if (
      port.visualState === "white-outline" ||
      port.visualState === "orange-outline"
    ) {
      e.stopPropagation();
      setDraggingPortId(port.id);

      // Get SVG coordinates
      const svg = e.currentTarget.ownerSVGElement;
      if (svg) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(
          svg.getScreenCTM()?.inverse(),
        );
        setPortDragOffset({
          x: svgP.x - port.x,
          y: svgP.y - port.y,
        });
      }
    }
  };

  const handlePortMouseMove = (
    e: React.MouseEvent<SVGSVGElement>,
  ) => {
    if (draggingPortId && !isDragging) {
      e.stopPropagation();

      const svg = e.currentTarget;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(
        svg.getScreenCTM()?.inverse(),
      );

      const newX = svgP.x - portDragOffset.x;
      const newY = svgP.y - portDragOffset.y;

      // Update port position, constrained to section line
      setSections(
        sections.map((section) => {
          if (section.id === selectedSectionId) {
            return {
              ...section,
              ports: section.ports.map((port) => {
                if (port.id === draggingPortId) {
                  // Constrain to section route
                  const route = section.routeCoordinates[0];
                  let constrainedX = newX;
                  let constrainedY = newY;

                  if (route.y1 === route.y2) {
                    // Horizontal line - constrain Y, allow X within bounds
                    constrainedY = route.y1;
                    constrainedX = Math.max(
                      route.x1,
                      Math.min(route.x2, newX),
                    );
                  } else if (route.x1 === route.x2) {
                    // Vertical line - constrain X, allow Y within bounds
                    constrainedX = route.x1;
                    constrainedY = Math.max(
                      Math.min(route.y1, route.y2),
                      Math.min(
                        Math.max(route.y1, route.y2),
                        newY,
                      ),
                    );
                  }

                  return {
                    ...port,
                    x: Math.round(constrainedX),
                    y: Math.round(constrainedY),
                  };
                }
                return port;
              }),
            };
          }
          return section;
        }),
      );
    }
  };

  const handlePortMouseUp = () => {
    setDraggingPortId(null);
  };




  // OHB Handlers - Cloned from Port Handlers
  const handleOHBZoomIn = () => {
    setOhbZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleOHBZoomOut = () => {
    setOhbZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  // --- Missing Map Scale/Zoom Handlers ---


  const handleOHBMouseDown = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    setOhbIsDragging(true);
    setOhbDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleOHBMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    if (ohbIsDragging) {
      const dx = e.clientX - ohbDragStart.x;
      const dy = e.clientY - ohbDragStart.y;
      setOhbPanOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      setOhbDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleOHBMouseUp = () => {
    setOhbIsDragging(false);
  };

  const handleOHBSegmentClick = (segmentId: string) => {
    // For OHB we just select the segment directly
    setOhbSelectedSegmentId(segmentId);
  };





  const handleAddOHBs = () => {
    if (!ohbSelectedSegmentId) {
      alert("Please select a segment first");
      return;
    }

    const segment = trackSegments.find(s => s.id === ohbSelectedSegmentId);
    if (!segment) return;

    // Check if section already exists in ohbSections
    const existingSectionIndex = ohbSections.findIndex(s => s.id === ohbSelectedSegmentId);
    let updatedSections = [...ohbSections];
    let targetSection: OHBSection;

    if (existingSectionIndex >= 0) {
      targetSection = { ...updatedSections[existingSectionIndex] };
    } else {
      targetSection = {
        id: ohbSelectedSegmentId,
        name: ohbSelectedSegmentId,
        ports: []
      };
      updatedSections.push(targetSection);
    }

    // Add new ports
    const newPorts: OHBPort[] = [];
    const count = addOHBQty;

    // Calculate start offset and gap based on quantity to distribute evenly
    // For simplicity, we just add them to the list. 
    // Logic: If there are existing ports, append.
    // Ideally, we want to distribute them. Let's just append with random-ish offsets or evenly spaced.
    // Requirements said: offset (average distribution).
    // Let's recalculate ALL port offsets for this section to be evenly distributed.

    // Create new ports
    const bayId = addOHBStartId.trim();

    // Validation: Bay ID must be exactly 2 digits
    if (!/^\d{2}$/.test(bayId)) {
      alert("Bay ID must be exactly 2 digits (e.g. '06')");
      return;
    }

    const sideCode = addOHBSide === 'left' ? '1' : '2';
    const idPrefix = `${bayId}${sideCode}`;

    // Find existing max serial for this prefix to auto-increment safely
    // Collect all existing OHB names
    const existingOhbNames = new Set(ohbSections.flatMap(s => s.ports.map(p => p.name)));

    let currentSerial = 1;
    // Fast-forward serial if IDs already exist
    while (existingOhbNames.has(`${idPrefix}${currentSerial.toString().padStart(3, '0')}`)) {
      currentSerial++;
    }

    for (let i = 0; i < count; i++) {
      const serial = (currentSerial + i).toString().padStart(3, '0');
      const portName = `${idPrefix}${serial}`;

      // Double check for duplicates (should cover by loop logic, but safe guard)
      if (existingOhbNames.has(portName)) {
        // Should not happen with the while loop above, but if we run into a gap and then hit another block?
        // The while loop only finds the *first* gap or the end. 
        // Let's rely on simple increment from the first available slot.
        // Actually showing alert inside loop is annoying.
        // Let's just find next available per item.
        let tempSerial = currentSerial + i;
        let tempName = `${idPrefix}${tempSerial.toString().padStart(3, '0')}`;
        while (existingOhbNames.has(tempName)) {
          tempSerial++;
          tempName = `${idPrefix}${tempSerial.toString().padStart(3, '0')}`;
        }
        // Update loop index or Serial base? 
        // Better strategy: just find N available slots.
      }

      // Refined Strategy:
      // We want a contiguous block if possible, or just next available.
      // Let's just use the currentSerial + i logic, assuming the user likely adds to the end.
      // If collision in block, we skip.

      // Re-eval:
      // The user request implies simple generation. "001 sequence".
      // I'll stick to: Start from 1, finding max existing serial for this prefix, then append.
    }

    // REDO BLOCK FOR CLEAR LOGIC

    // 1. Find max existing serial for this Bay+Side
    let maxSerial = 0;
    ohbSections.flatMap(s => s.ports).forEach(p => {
      if (p.name.startsWith(idPrefix) && p.name.length === 6) {
        const s = parseInt(p.name.substring(3));
        if (!isNaN(s) && s > maxSerial) maxSerial = s;
      }
    });

    // 2. Start generating from maxSerial + 1
    let startSerial = maxSerial + 1;

    for (let i = 0; i < count; i++) {
      const serial = (startSerial + i).toString().padStart(3, '0');
      const portName = `${idPrefix}${serial}`;

      newPorts.push({
        id: portName,
        linkId: ohbSelectedSegmentId,
        side: addOHBSide,
        offset: 0,
        name: portName,
        visualState: 'white-outline'
      });
    }

    // Combine existing and new ports
    const combinedPorts = [...targetSection.ports, ...newPorts];

    // Separate ports by side
    const leftPorts = combinedPorts.filter(p => p.side === 'left');
    const rightPorts = combinedPorts.filter(p => p.side === 'right');

    const redistribute = (ports: OHBPort[]) => {
      return ports.map((p, idx, arr) => ({
        ...p,
        offset: (idx + 1) / (arr.length + 1)
      }));
    };

    // Redistribute independently
    const updatedLeftPorts = redistribute(leftPorts);
    const updatedRightPorts = redistribute(rightPorts);

    // Recombine
    targetSection.ports = [...updatedLeftPorts, ...updatedRightPorts];

    if (existingSectionIndex >= 0) {
      updatedSections[existingSectionIndex] = targetSection;
    } else {
      if (existingSectionIndex === -1) {
        updatedSections[updatedSections.length - 1] = targetSection;
      }
    }

    setOhbSections(updatedSections);

  };


  // --- Bay Mode Handlers ---

  const handleParkingPointClick = (pointId: string) => {
    if (!activeBayParkingPointId) return;

    const bay = bays.find(b => b.id === activeBayParkingPointId);
    if (!bay) return;

    // Find the point and its segment ID
    let pointSegmentId: string | undefined;

    // Check OHBs
    const ohbSection = ohbSections.find(s => s.ports.some(p => p.id === pointId));
    if (ohbSection) {
      const ohb = ohbSection.ports.find(p => p.id === pointId);
      if (ohb) pointSegmentId = ohb.linkId;
    }

    // Check Ports
    if (!pointSegmentId) {
      const section = sections.find(s => s.ports.some(p => p.id === pointId));
      if (section) {
        // Section ID usually has 'section-' prefix, but Bay segments derived from trackSegments do not.
        // We must normalize it.
        pointSegmentId = section.id.replace('section-', '');
      }
    }

    // Validate
    if (pointSegmentId && !bay.segmentIds.includes(pointSegmentId)) {
      alert(`Cannot add this point.\nIt belongs to segment ${pointSegmentId}, which is not part of ${bay.name}.`);
      return;
    }

    setBays(prev => prev.map(b => {
      if (b.id === activeBayParkingPointId) {
        const currentPoints = b.parkingPoints || [];
        const newPoints = currentPoints.includes(pointId)
          ? currentPoints.filter(id => id !== pointId)
          : [...currentPoints, pointId];
        return { ...b, parkingPoints: newPoints };
      }
      return b;
    }));
  };

  const handleBaySegmentClick = (segmentId: string) => {
    setBaySelectedSegments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(segmentId)) {
        newSet.delete(segmentId);
      } else {
        newSet.add(segmentId);
      }
      return Array.from(newSet);
    });
  };

  const handleAddBay = () => {
    if (!bayIdInput.trim()) {
      alert("Please enter a Bay ID");
      return;
    }
    if (baySelectedSegments.length === 0) {
      alert("Please select at least one segment on the map");
      return;
    }
    if (bays.some(b => b.id === bayIdInput)) {
      alert("Bay ID already exists");
      return;
    }

    const colors = ['#D2FF14', '#F95FFF', '#FF785F', '#5FFFC8', '#FFE65F', '#943DFA'];
    const color = colors[bays.length % colors.length];

    const newBay: Bay = {
      id: bayIdInput,
      name: bayIdInput,
      segmentIds: [...baySelectedSegments],
      color: color,
      parkingPoints: []
    };

    setBays([...bays, newBay]);
    setBayIdInput("");
    setBaySelectedSegments([]);
  };

  const handleDeleteBay = (bayId: string) => {
    if (confirm(`Are you sure you want to delete ${bayId}?`)) {
      setBays(bays.filter(b => b.id !== bayId));
    }
  };



  const handleRemoveOHB = (portId: string) => {
    if (!ohbSelectedSegmentId) return;
    const section = ohbSections.find(s => s.id === ohbSelectedSegmentId);
    if (!section) return;
    const ohb = section.ports.find(p => p.id === portId);
    if (!ohb) return;

    // Validation Logic
    if (ohb.visualState === "green-filled") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('ohb');
      setDeleteModalMessage(
        "This OHB port has been taught and is assigned as a parking point.\nDeleting may affect system operation. Please confirm to continue."
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    if (ohb.visualState === "green-outline") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('ohb');
      setDeleteModalMessage(
        "This OHB port has already been taught.\nDeleting may affect system operation. Please confirm to continue."
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    if (ohb.visualState === "orange-filled") {
      setPendingDeletePortId(portId);
      setPendingDeleteType('ohb');
      setDeleteModalMessage(
        "This OHB port is assigned as a parking point.\nPlease confirm to delete."
      );
      setShowDeleteConfirmModal(true);
      return;
    }

    // Direct delete for others
    deleteOHBDirectly(portId);
  };

  // --- Map Helper Functions & Components (Restored) ---

  const mapScale = zoomLevel;
  const mapPosition = panOffset;
  const isPlacingOHB = false; // Placeholder

  const renderLinks = () => (
    <>
      {trackSegments.map((segment) => (
        <line
          key={segment.id}
          x1={segment.x1}
          y1={segment.y1}
          x2={segment.x2}
          y2={segment.y2}
          stroke="#3b82f6"
          strokeWidth="2"
        />
      ))}
    </>
  );

  const renderNodes = () => (
    <>
      {/* Fallback to rawNodes if scaledData not in scope, but try scaledData first */}
      {typeof scaledData !== 'undefined' ? Array.from(scaledData.nodes.values()).map((node: any) => (
        <circle key={node.id} cx={node.x} cy={node.y} r="2" className="fill-blue-400" />
      )) : rawNodes.map(node => (
        <circle key={node.id} cx={node.x} cy={node.y} r="2" className="fill-blue-400" />
      ))}
    </>
  );

  const renderPorts = () => (
    <>
      {sections.flatMap(s => s.ports).map(port => (
        <circle
          key={port.id}
          cx={port.x}
          cy={port.y}
          r="4"
          stroke={port.visualState && port.visualState.includes('white') ? 'white' : 'orange'}
          strokeWidth="2"
          fill="black"
          onMouseDown={(e) => handlePortMouseDown(e, port)}
        />
      ))}
    </>
  );

  const renderOHBs = () => (
    <>
      {ohbSections.flatMap(s => s.ports).map((ohb: any) => (
        <rect
          key={ohb.id}
          x={(ohb.x || 0) - 5}
          y={(ohb.y || 0) - 5}
          width="10"
          height="10"
          stroke={ohb.visualState && ohb.visualState.includes('white') ? 'white' : 'orange'}
          strokeWidth="2"
          fill="transparent"
          onMouseDown={(e) => handleOHBMouseDown(e as any)}
        />
      ))}
    </>
  );

  const renderOHBPlacementLine = () => null;

  const MapCanvas = ({ activeTab, mapScale, mapPosition, isDragging, dragStart, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, renderMapContent, onZoomIn, onZoomOut, onResetZoom, scaleDisplay }: any) => {
    return (
      <div className="bg-[#0f1525] rounded-lg w-full h-full relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button onClick={onZoomIn} className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={onZoomOut} className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg">
            <ZoomOut className="w-5 h-5" />
          </button>
          <div className="bg-[#1e40af]/80 px-3 py-1 rounded border border-[#3b82f6] text-xs text-center">
            {scaleDisplay}
          </div>
        </div>

        <div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        >
          <svg className="w-full h-full">
            <g transform={`translate(${mapPosition.x}, ${mapPosition.y}) scale(${mapScale})`}>
              {renderMapContent()}
            </g>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[1920px] h-[1080px] bg-[#0a0e1a] text-white flex flex-col relative">
      {/* Top Title Bar - 1920*28 */}
      <header className="bg-[rgb(30,64,175)] px-4 flex items-center justify-between h-[28px] border-b border-gray-800">
        <div className="text-xs font-medium">OHTC</div>
        <div className="flex items-center gap-2">
          <button
            className="hover:bg-gray-700 p-1 rounded transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            className="hover:bg-gray-700 p-1 rounded transition-colors"
            title="Maximize"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            className="hover:bg-red-600 p-1 rounded transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Menu Bar - 1920*48 */}
      <nav className="bg-[rgb(15,21,37)] px-6 flex items-center justify-between h-[48px]">
        <div className="flex gap-6 text-sm">
          <button className="hover:text-blue-200 transition-colors">
            System
          </button>
          <button className="hover:text-blue-200 transition-colors">
            Parameter
          </button>
          <button className="hover:text-blue-200 transition-colors">
            Operation
          </button>
          <button className="hover:text-blue-200 transition-colors">
            Query
          </button>
          <button className="hover:text-blue-200 transition-colors">
            Maintenance
          </button>
          <button className="hover:text-blue-200 transition-colors">
            Help
          </button>
        </div>
        <div className="flex items-center gap-4">
          {/* MIRLE Logo */}
          <svg
            width="95"
            height="29"
            viewBox="0 0 95 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_601_101)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M84.1011 22.666V19.176H90.901L92.263 15.151H84.103V12.112C84.103 12.0306 84.1354 11.9525 84.1929 11.8949C84.2505 11.8373 84.3286 11.805 84.41 11.805H92.4191L94.0061 7.123H79.106C78.9435 7.123 78.7876 7.18759 78.6726 7.30255C78.5576 7.41751 78.493 7.57342 78.493 7.736V26.543C78.4929 26.7042 78.5246 26.8638 78.5862 27.0127C78.6478 27.1616 78.7382 27.2969 78.8521 27.4109C78.9661 27.5249 79.1014 27.6153 79.2503 27.6769C79.3993 27.7385 79.5589 27.7701 79.7200 27.77H92.8631L94.4891 22.97H84.408C84.3677 22.9701 84.3277 22.9623 84.2904 22.9469C84.2531 22.9315 84.2192 22.9089 84.1907 22.8804C84.1621 22.8518 84.1395 22.8179 84.1241 22.7806C84.1087 22.7433 84.1009 22.7034 84.1011 22.663"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M57.858 19.848C58.8413 19.1916 59.6438 18.2986 60.1918 17.2511C60.7397 16.2035 61.0156 15.035 60.994 13.853C60.9593 12.0633 60.2267 10.358 58.9524 9.10089C57.6781 7.84377 55.963 7.13436 54.173 7.124C54.123 7.124 46.755 7.124 44.46 7.124C44.3796 7.12413 44.3001 7.14009 44.2259 7.17097C44.1517 7.20185 44.0843 7.24704 44.0275 7.30396C43.9708 7.36088 43.9258 7.42842 43.8952 7.50272C43.8646 7.57703 43.8489 7.65663 43.849 7.737V27.769H49.461V11.456C49.461 11.3746 49.4933 11.2965 49.5509 11.2389C49.6085 11.1813 49.6866 11.149 49.768 11.149H53.095C53.8738 11.1428 54.6237 11.4437 55.1823 11.9865C55.7408 12.5293 56.063 13.2703 56.079 14.049C56.0987 14.4481 56.0365 14.8471 55.8962 15.2212C55.756 15.5954 55.5406 15.9369 55.2634 16.2248C54.9863 16.5127 54.6531 16.7408 54.2845 16.895C53.9159 17.0493 53.5196 17.1266 53.12 17.122H50.442C50.4045 17.1221 50.3677 17.1321 50.3353 17.151C50.3029 17.1699 50.2761 17.1969 50.2575 17.2295C50.239 17.2621 50.2293 17.299 50.2296 17.3365C50.2298 17.3739 50.24 17.4107 50.259 17.443L56.165 27.767H62.332L57.858 19.848Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M69.1521 22.666V7.123H64.1521C63.9895 7.123 63.8336 7.18759 63.7186 7.30255C63.6036 7.41751 63.5391 7.57342 63.5391 7.736V26.543C63.5389 26.7042 63.5706 26.8638 63.6322 27.0127C63.6938 27.1616 63.7842 27.2969 63.8981 27.4109C64.0121 27.5249 64.1474 27.6153 64.2964 27.6769C64.4453 27.7385 64.6049 27.7701 64.7661 27.77H75.9581L77.5841 22.97H69.4591C69.4187 22.9701 69.3787 22.9623 69.3414 22.9469C69.3041 22.9315 69.2702 22.9089 69.2417 22.8804C69.2132 22.8518 69.1905 22.8179 69.1752 22.7806C69.1598 22.7433 69.1519 22.7034 69.1521 22.663"
                fill="white"
              />
              <path
                d="M30.186 7.738V27.158C30.186 27.3206 30.1214 27.4765 30.0065 27.5915C29.8915 27.7064 29.7356 27.771 29.573 27.771H24.753V19.113C24.7528 19.0839 24.7437 19.0556 24.7268 19.0319C24.71 19.0081 24.6863 18.9902 24.6589 18.9803C24.6316 18.9705 24.6018 18.9694 24.5738 18.977C24.5457 18.9846 24.5206 19.0007 24.502 19.023L17.224 27.771H14.714C14.5514 27.771 14.3955 27.7064 14.2805 27.5915C14.1656 27.4765 14.101 27.3206 14.101 27.158V19.124C14.1008 19.0948 14.0917 19.0663 14.0747 19.0425C14.0577 19.0186 14.0339 19.0006 14.0063 18.9909C13.9787 18.9812 13.9488 18.9802 13.9207 18.9881C13.8925 18.996 13.8675 19.0124 13.849 19.035L6.815 27.771H0L16.639 7.125H18.367C18.5296 7.125 18.6855 7.18958 18.8005 7.30454C18.9154 7.4195 18.98 7.57542 18.98 7.738V16.955L27.639 7.125H29.572C29.7346 7.125 29.8905 7.18958 30.0055 7.30454C30.1204 7.4195 30.185 7.57542 30.185 7.738"
                fill="white"
              />
              <path
                d="M42.727 0.665002C43.785 1.723 43.557 3.665 42.217 5.008C40.877 6.351 38.932 6.577 37.874 5.518C36.816 4.459 37.044 2.518 38.384 1.175C39.724 -0.167998 41.669 -0.393998 42.727 0.665002Z"
                fill="white"
              />
              <path
                d="M38.492 24.662C36.919 23.902 37.254 21.574 37.467 20.379C38.019 17.287 40.735 9.948 41.293 8.32H37.214C36.7379 8.34102 36.2793 8.5057 35.8986 8.79236C35.5179 9.07902 35.2328 9.47424 35.081 9.926C34.369 12.042 33.698 14.183 33.145 16.38C32.6426 18.201 32.2822 20.0582 32.067 21.935C31.899 23.766 31.888 26.126 33.526 27.345C34.3198 27.8862 35.266 28.1592 36.226 28.124C37.6655 28.1399 39.0816 27.7595 40.3192 27.0243C41.5569 26.2892 42.5684 25.2277 43.243 23.956C42.5719 24.4595 41.7855 24.7873 40.9554 24.9096C40.1254 25.0318 39.2779 24.9447 38.49 24.656"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_601_101">
                <rect
                  width="94.483"
                  height="28.126"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium">ADMIN</span>
              <span className="text-[10px] text-blue-200">
                admin@ohtc.com
              </span>
            </div>
            <div className="w-9 h-9 bg-blue-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-900" />
            </div>
          </div>
        </div>
      </nav>

      {/* Title Bar - 1920*100 */}
      <div className="bg-[#0f1525] px-6 flex items-center justify-center border border-[#1639A8] h-[100px] relative">
        <div className="absolute left-6 flex items-center gap-4">
          <div className="text-xl font-medium">OHTC 01</div>
        </div>
        <div className="flex items-center gap-8">
          {/* Status Indicators Group - Independent */}
          <div className="flex items-center gap-5 pr-8 border-r border-gray-600">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400">
                Control
              </span>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400">
                Heat
              </span>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400">
                Alarm
              </span>
              <div className="w-8 h-8 rounded-full bg-red-500"></div>
            </div>
          </div>

          {/* Info Cards Group */}
          <div className="flex gap-2 items-center">
            {/* CST Card */}
            <div className="bg-[#1e40af] rounded overflow-hidden w-[90px] my-[10px] border border-[#2563eb]/50">
              <div className="bg-[#1639A8] px-2 py-0.5 text-center">
                <span className="text-[11px] font-medium text-white">
                  CST
                </span>
              </div>
              <div className="px-2 py-1.5 space-y-0.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-blue-300">
                    Transfer
                  </span>
                  <span className="font-medium text-white">
                    V1
                  </span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-blue-300">Working</span>
                  <span className="font-medium text-white">
                    823
                  </span>
                </div>
              </div>
            </div>

            {/* MCS Queue Card */}
            <div className="bg-[#1e40af] rounded overflow-hidden w-[120px] my-[10px] border border-[#2563eb]/50">
              <div className="bg-[#1639A8] px-2 py-0.5 text-center">
                <span className="text-[11px] font-medium text-white">
                  MCS Queue
                </span>
              </div>
              <div className="px-2 py-1.5 space-y-0.5 bg-[rgba(57,65,85,0)]">
                <div className="flex justify-between text-[10px]">
                  <span className="text-blue-300">
                    Assigned
                  </span>
                  <span className="font-medium text-white">
                    33
                  </span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-blue-300">Waiting</span>
                  <span className="font-medium text-white">
                    50
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="bg-[#1e40af] rounded overflow-hidden my-[10px] border border-[#2563eb]/50">
              <div className="bg-[#1639A8] px-2 py-0.5 text-center">
                <span className="text-[11px] font-medium text-white">
                  Vehicle
                </span>
              </div>
              <div className="px-2 py-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-blue-300">Remote</span>
                  <span className="font-medium text-white">
                    85
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-blue-300">Idle</span>
                  <span className="font-medium text-white">
                    4
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-blue-300">Local</span>
                  <span className="font-medium text-white">
                    0
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-blue-300">Error</span>
                  <span className="font-medium text-white">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - W260*H870 */}
        <aside className="w-[260px] bg-[#0f1525] border-r border-[#1e3a8a]">
          <div className="p-4">
            <h2 className="text-sm font-medium mb-4 text-gray-300">
              Maintenance
            </h2>
            <nav className="space-y-1">
              <button className="w-full text-left px-4 py-2.5 rounded hover:bg-[#1e3a8a]/30 text-sm text-gray-300">
                Vehicle Management
              </button>
              <button className="w-full text-left px-4 py-2.5 rounded hover:bg-[#1e3a8a]/30 text-sm text-gray-300">
                Equipment Constant
              </button>
              <button className="w-full text-left px-4 py-2.5 rounded hover:bg-[#1e3a8a]/30 text-sm text-gray-300">
                Equipment Constant
              </button>

              {/* Point Setting */}
              <button
                className={`w-full text-left px-4 py-2.5 rounded text-sm mb-1 ${activeSidebarItem === 'point-setting' ? 'bg-[#1e40af] text-white' : 'text-gray-300 hover:bg-[#1e3a8a]/30'}`}
                onClick={() => setActiveSidebarItem('point-setting')}
              >
                Point Setting
              </button>

              {/* Parking Mode Setting Group */}
              <div>
                <button
                  className={`w-full text-left px-4 py-2.5 rounded hover:bg-[#1e3a8a]/30 text-sm flex items-center justify-between ${isParkingModeExpanded ? 'text-white' : 'text-gray-300'}`}
                  onClick={() => setIsParkingModeExpanded(!isParkingModeExpanded)}
                >
                  <span>Parking Mode Setting</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isParkingModeExpanded ? 'rotate-90' : ''}`} />
                </button>

                {isParkingModeExpanded && (
                  <div className="pl-4 mt-1 space-y-1">



                    {/* 2. Bay Mode (Single Item) */}
                    <button
                      className={`w-full text-left px-4 py-2.5 rounded text-sm ${activeSidebarItem === 'bay-mode' ? 'bg-[#1e40af] text-white' : 'text-gray-300 hover:bg-[#1e3a8a]/30'}`}
                      onClick={() => setActiveSidebarItem('bay-mode')}
                    >
                      Bay Mode
                    </button>

                    {/* 3. Zone Mode Group */}
                    <button
                      className={`w-full text-left px-4 py-2 rounded text-sm ${activeSidebarItem === 'zone-mode' ? 'bg-[#1e40af] text-white' : 'text-gray-400 hover:text-gray-300 hover:bg-[#1e3a8a]/20'}`}
                      onClick={() => setActiveSidebarItem('zone-mode')}
                    >
                      Zone Mode
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        {/* Main Content */}
        <main className="flex-1 bg-[#0a0e1a] overflow-hidden flex flex-col">
          {activeSidebarItem === 'point-setting' ? (
            <>
              <div className="px-6 pt-6 pb-0 flex items-center justify-between">
                <h1 className="text-2xl font-medium">
                  Point Setting
                </h1>
              </div>

              <div className="px-6 pt-4">
                {/* Tabs */}
                <div className="flex gap-2">
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeTab === 'port' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('port')}
                  >
                    Port Setting
                  </div>
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeTab === 'ohb' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('ohb')}
                  >
                    OHB Setting
                  </div>
                </div>
              </div>


            </>
          ) : activeSidebarItem === 'bay-mode' ? (
            // Bay Mode Content
            <>
              {/* Header */}
              {/* Header - Standardized Layout */}
              <div className="px-6 pt-6 pb-0 flex items-center justify-between">
                <h1 className="text-2xl font-medium">
                  Bay Mode
                </h1>
              </div>

              <div className="px-6 pt-4">
                {/* Tabs */}
                <div className="flex gap-2">
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeBayTab === 'bay-setting' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveBayTab('bay-setting')}
                  >
                    Bay Setting
                  </div>
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeBayTab === 'bay-level-setting' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveBayTab('bay-level-setting')}
                  >
                    Bay Level Setting
                  </div>
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeBayTab === 'bay-parking-point' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveBayTab('bay-parking-point')}
                  >
                    Bay Parking Point
                  </div>
                </div>
              </div>


            </>
          ) : activeSidebarItem === 'zone-mode' ? (
            <>
              <div className="px-6 pt-6 pb-0 flex items-center justify-between">
                <h1 className="text-2xl font-medium">
                  Zone Mode
                </h1>
              </div>

              <div className="px-6 pt-4">
                {/* Tabs */}
                <div className="flex gap-2">
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeZoneTab === 'zone-setting' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveZoneTab('zone-setting')}
                  >
                    ZONE Setting
                  </div>
                  <div
                    className={`px-6 py-2.5 rounded-t text-sm font-medium cursor-pointer transition-colors ${activeZoneTab === 'zone-parking-point' ? 'bg-[#1639A8] text-white' : 'bg-[#1e3a8a]/30 text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveZoneTab('zone-parking-point')}
                  >
                    Zone Parking Point
                  </div>
                </div>
              </div>

              {/* Fallback Content for Zone Mode Tabs */}
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h2 className="text-xl font-medium text-gray-300 mb-2">
                    {activeZoneTab === 'zone-setting' && 'ZONE Setting'}
                    {activeZoneTab === 'zone-parking-point' && 'Zone Parking Point'}
                  </h2>
                  <p className="text-sm">Content coming soon...</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <h2 className="text-xl font-medium text-gray-300 mb-2">
                  Select an item from the sidebar
                </h2>
                <p className="text-sm">Select an item from the sidebar</p>
              </div>
            </div>
          )}


          {/* Bay Mode Map Logic - Sibling to Point Setting Map */}
          {activeSidebarItem === 'bay-mode' && (
            <div className="flex-1 relative overflow-hidden bg-[#0a0e1a]">
              {/* Map & Controls */}
              <div className="flex-1 px-6 pb-6 pt-2 h-full">
                <div className="bg-[#0f1525] rounded-lg w-full h-full relative overflow-hidden">
                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button
                      onClick={handleZoomIn}
                      className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <div className="bg-[#1e40af]/80 px-3 py-1 rounded border border-[#3b82f6] text-xs text-center backdrop-blur-sm">
                      {Math.round(zoomLevel * 100)}%
                    </div>
                  </div>

                  {/* Minimap */}
                  <div className="absolute bottom-4 left-4 z-10 w-48 h-32 bg-[#0a0e1a]/90 border-2 border-[#3b82f6] rounded backdrop-blur-sm shadow-lg">
                    <div className="w-full h-full p-2">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 1200 700"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {trackSegments.map((segment) => (
                          <line
                            key={`mini-bay-${segment.id}`}
                            x1={segment.x1}
                            y1={segment.y1}
                            x2={segment.x2}
                            y2={segment.y2}
                            stroke="#3b82f6"
                            strokeWidth="2"
                          />
                        ))}
                        <rect
                          x={50 - panOffset.x / 10}
                          y={50 - panOffset.y / 10}
                          width={1100 / zoomLevel}
                          height={600 / zoomLevel}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="3"
                          opacity="0.8"
                        />
                      </svg>
                    </div>
                  </div>

                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1200 700"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                      transformOrigin: "center",
                      transition: isDragging ? "none" : "transform 0.2s",
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <defs>
                      <style>
                        {`
                          .route-line { stroke: #3b82f6; stroke-width: 3; fill: none; cursor: pointer; transition: all 0.2s; }
                          .route-line:hover { stroke: #60a5fa; stroke-width: 5; filter: drop-shadow(0 0 8px #3b82f6); }
                          .route-arrow { fill: #3b82f6; pointer-events: none; }
                          .node-default { fill: #ffffff; stroke: #e5e7eb; stroke-width: 2; opacity: 0.5; }
                          .segment-label { fill: #9ca3af; font-size: 12px; pointer-events: none; }
                        `}
                      </style>
                    </defs>

                    {/* Render Track Segments */}
                    {trackSegments.map((segment) => {
                      const isBaySelected = activeBayTab === 'bay-setting' && baySelectedSegments.includes(segment.id);
                      const assignedBay = bays.find(b => b.segmentIds.includes(segment.id));

                      return (
                        <g key={`bay-seg-${segment.id}`}>
                          <line
                            x1={segment.x1}
                            y1={segment.y1}
                            x2={segment.x2}
                            y2={segment.y2}
                            className={isBaySelected ? "route-line-bay-selected" : "route-line"}
                            style={
                              isBaySelected
                                ? { stroke: '#fbbf24', strokeWidth: 5, filter: 'drop-shadow(0 0 8px #fbbf24)' }
                                : assignedBay
                                  ? {
                                    stroke: assignedBay.color,
                                    strokeWidth: 3,
                                    opacity: ((activeBayTab === 'bay-level-setting' && activeBayLevelId && assignedBay.id !== activeBayLevelId) ||
                                      (activeBayTab === 'bay-parking-point' && activeBayParkingPointId && assignedBay.id !== activeBayParkingPointId)) ? 0.2 : 1
                                  }
                                  : {
                                    opacity: ((activeBayTab === 'bay-level-setting' && activeBayLevelId) ||
                                      (activeBayTab === 'bay-parking-point' && activeBayParkingPointId)) ? 0.1 : 1
                                  }
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBaySegmentClick(segment.id);
                            }}
                          />
                        </g>
                      );
                    })}

                    {/* Render Bay Bounding Boxes */}
                    {bays.map(bay => {
                      const segments = trackSegments.filter(s => bay.segmentIds.includes(s.id));
                      if (segments.length === 0) return null;

                      const xs = segments.flatMap(s => [s.x1, s.x2]);
                      const ys = segments.flatMap(s => [s.y1, s.y2]);
                      const minX = Math.min(...xs);
                      const maxX = Math.max(...xs);
                      const minY = Math.min(...ys);
                      const maxY = Math.max(...ys);
                      const padding = 20;

                      const labelX = (minX + maxX) / 2;
                      const labelY = minY - padding - 25; // Shifted up slightly
                      const opacity = ((activeBayTab === 'bay-level-setting' && activeBayLevelId && bay.id !== activeBayLevelId) ||
                        (activeBayTab === 'bay-parking-point' && activeBayParkingPointId && bay.id !== activeBayParkingPointId)) ? 0.2 : 1;

                      return (
                        <g key={bay.id} style={{ opacity }}>
                          <rect
                            x={labelX - 40}
                            y={labelY - 16}
                            width="80"
                            height="32"
                            rx="6"
                            fill={bay.color}
                            opacity="0.8"
                            className="pointer-events-none"
                          />
                          <text
                            x={labelX}
                            y={labelY}
                            fill="black"
                            fontSize="18"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="pointer-events-none"
                            style={{
                              textShadow: 'none',
                            }}
                          >
                            {bay.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Render Directional Arrows */}
                    {trackSegments.map((segment) => {
                      const length = Math.sqrt(Math.pow(segment.x2 - segment.x1, 2) + Math.pow(segment.y2 - segment.y1, 2));
                      if (length < 40) return null;

                      const midX = (segment.x1 + segment.x2) / 2;
                      const midY = (segment.y1 + segment.y2) / 2;
                      const angle = Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) * 180 / Math.PI;

                      let arrowOpacity = 1;
                      if (activeBayTab === 'bay-level-setting') {
                        if (activeBayLevelId) {
                          const assignedBay = bays.find(b => b.segmentIds.includes(segment.id));
                          if (assignedBay && assignedBay.id === activeBayLevelId) {
                            arrowOpacity = 0.5;
                          } else {
                            arrowOpacity = 0.1;
                          }
                        } else {
                          arrowOpacity = 0.5;
                        }
                      } else if (activeBayTab === 'bay-parking-point') {
                        arrowOpacity = 0.2; // Fade 80%
                      }


                      return (
                        <g
                          key={`bay-arrow-${segment.id}`}
                          transform={`translate(${midX}, ${midY}) rotate(${angle})`}
                          style={{ opacity: arrowOpacity }}
                        >
                          <path
                            d="M -2.8 -2.8 L 2.8 0 L -2.8 2.8 z"
                            className="route-arrow"
                          />
                        </g>
                      );
                    })}

                    {/* Dynamic Nodes */}
                    {Array.from(scaledData.nodes.entries()).map(
                      ([nodeId, node]) => (
                        <circle
                          key={`bay-node-${nodeId}`}
                          cx={node.x}
                          cy={node.y}
                          r="2"
                          className="node-default"
                          style={{
                            opacity: activeBayTab === 'bay-parking-point' ? 0.2 : undefined
                          }}
                        />
                      ),
                    )}

                    {/* Render Ports (EQ) for Bay Parking Point */}
                    {activeBayTab === 'bay-parking-point' && sections.flatMap(s => s.ports.map(p => ({ ...p, sectionId: s.id }))).map(port => {
                      const isLinked = activeBayParkingPointId && bays.find(b => b.id === activeBayParkingPointId)?.parkingPoints?.includes(port.id);
                      const isOtherLinked = !isLinked && activeBayParkingPointId && bays.some(b => b.id !== activeBayParkingPointId && b.parkingPoints?.includes(port.id));

                      // Focus Logic
                      let opacity = 1;
                      if (activeBayParkingPointId) {
                        const activeBay = bays.find(b => b.id === activeBayParkingPointId);
                        const segmentId = port.sectionId.replace('section-', '');
                        if (activeBay && !activeBay.segmentIds.includes(segmentId)) {
                          opacity = 0.2;
                        }
                      }

                      return (
                        <g key={`bay-port-${port.id}`} style={{ opacity }}>
                          <circle
                            cx={port.x}
                            cy={port.y}
                            r="4"
                            fill={isLinked ? "#22c55e" : (isOtherLinked ? "#6b7280" : "none")} // Green if set, Gray if other set
                            stroke={isLinked ? "#22c55e" : (isOtherLinked ? "#6b7280" : "#f97316")} // Green, Gray, or Orange
                            strokeWidth="2"
                            className="cursor-pointer transition-all hover:fill-[#f97316]/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleParkingPointClick(port.id);
                            }}
                          />
                          {isOtherLinked && opacity > 0.5 && (
                            <title>Assigned to another Bay</title>
                          )}
                        </g>
                      );
                    })}

                    {/* Render OHBs for Bay Parking Point */}
                    {activeBayTab === 'bay-parking-point' && ohbSections.flatMap(s => s.ports).map(ohb => {
                      const seg = trackSegments.find(s => s.id === ohb.linkId);
                      if (!seg) return null;
                      const pos = calculatePerpendicularPoint(seg.x1, seg.y1, seg.x2, seg.y2, ohb.offset, 12, ohb.side);
                      const isLinked = activeBayParkingPointId && bays.find(b => b.id === activeBayParkingPointId)?.parkingPoints?.includes(ohb.id);
                      const isOtherLinked = !isLinked && activeBayParkingPointId && bays.some(b => b.id !== activeBayParkingPointId && b.parkingPoints?.includes(ohb.id));

                      // Focus Logic
                      let opacity = 1;
                      if (activeBayParkingPointId) {
                        const activeBay = bays.find(b => b.id === activeBayParkingPointId);
                        if (activeBay && !activeBay.segmentIds.includes(ohb.linkId)) {
                          opacity = 0.2;
                        }
                      }

                      return (
                        <g key={`bay-ohb-${ohb.id}`} style={{ opacity }}>
                          <rect
                            x={pos.x - 4}
                            y={pos.y - 4}
                            width="8"
                            height="8"
                            fill={isLinked ? "#22c55e" : (isOtherLinked ? "#6b7280" : "none")} // Green if set, Gray if other set
                            stroke={isLinked ? "#22c55e" : (isOtherLinked ? "#6b7280" : "#f97316")} // Green, Gray, or Orange
                            strokeWidth="2"
                            className="cursor-pointer transition-all hover:fill-[#f97316]/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleParkingPointClick(ohb.id);
                            }}
                          />
                          {isOtherLinked && opacity > 0.5 && (
                            <title>Assigned to another Bay</title>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Map Rendering Logic - Only render if point-setting */}
          {activeSidebarItem === 'point-setting' && (
            <div className="flex-1 relative overflow-hidden bg-[#0a0e1a]">
              {/* ... Map Content ... */}

              {/* Canvas Area - Only show for Port Setting */}
              {activeTab === 'port' && (
                <div className="flex-1 px-6 pb-6">
                  <div className="bg-[#0f1525] rounded-lg w-full h-full relative overflow-hidden">
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      {/* Port Visibility Toggle */}
                      <button
                        onClick={() => setShowPorts(!showPorts)}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm mb-2"
                        title={showPorts ? "Hide Ports" : "Show Ports"}
                      >
                        {showPorts ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={handleZoomIn}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleZoomOut}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <div className="bg-[#1e40af]/80 px-3 py-1 rounded border border-[#3b82f6] text-xs text-center backdrop-blur-sm">
                        {Math.round(zoomLevel * 100)}%
                      </div>
                    </div>

                    {/* Minimap */}
                    <div className="absolute bottom-4 left-4 z-10 w-48 h-32 bg-[#0a0e1a]/90 border-2 border-[#3b82f6] rounded backdrop-blur-sm shadow-lg">
                      <div className="w-full h-full p-2">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 1200 700"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Minimap tracks */}
                          {trackSegments.map((segment) => (
                            <line
                              key={`mini-${segment.id}`}
                              x1={segment.x1}
                              y1={segment.y1}
                              x2={segment.x2}
                              y2={segment.y2}
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                          ))}
                          {/* Viewport indicator - Red border */}
                          <rect
                            x={50 - panOffset.x / 10}
                            y={50 - panOffset.y / 10}
                            width={1100 / zoomLevel}
                            height={600 / zoomLevel}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                    </div>

                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1200 700"
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                        transformOrigin: "center",
                        transition: isDragging
                          ? "none"
                          : "transform 0.2s",
                        cursor: isDragging ? "grabbing" : "grab",
                      }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={(e) => {
                        handleMouseMove(e);
                        handlePortMouseMove(e);
                      }}
                      onMouseUp={() => {
                        handleMouseUp();
                        handlePortMouseUp();
                      }}
                      onMouseLeave={() => {
                        handleMouseUp();
                        handlePortMouseUp();
                      }}
                    >
                      {/* Define styles */}
                      <defs>
                        <style>
                          {`
                        .route-line { stroke: #3b82f6; stroke-width: 3; fill: none; cursor: pointer; transition: all 0.2s; }
                        .route-line:hover { stroke: #60a5fa; stroke-width: 5; filter: drop-shadow(0 0 8px #3b82f6); }
                        .route-line-selected { stroke: #fbbf24; stroke-width: 5; fill: none; cursor: pointer; 
                          filter: drop-shadow(0 0 12px #fbbf24); animation: pulse-glow 2s infinite; }
                        .route-arrow { fill: #3b82f6; pointer-events: none; }
                        .node-default { fill: #ffffff; stroke: #e5e7eb; stroke-width: 2; opacity: 0.5; }
                        .port-clickable { cursor: pointer; transition: all 0.2s; }
                        .port-clickable:hover { opacity: 0.8; filter: drop-shadow(0 0 6px currentColor); }
                        .port-draggable { cursor: move; transition: all 0.2s; }
                        .port-draggable:hover { opacity: 0.8; filter: drop-shadow(0 0 6px currentColor); }
                        .port-dragging { cursor: move; transition: all 0.2s; }
                        .port-dragging:hover { opacity: 0.8; filter: drop-shadow(0 0 6px currentColor); }
                        .port-locked { cursor: not-allowed; transition: all 0.2s; }
                        .port-locked:hover { opacity: 0.8; filter: drop-shadow(0 0 6px currentColor); }
                        .port-label { fill: #fbbf24; font-size: 14px; font-family: monospace; font-weight: bold;
                          text-shadow: 0 0 10px #fbbf24; pointer-events: none; }
                        .segment-label { fill: #60a5fa; font-size: 12px; font-family: monospace; font-weight: bold;
                          text-shadow: 0 0 8px #3b82f6; pointer-events: none; }
                        .segment-label-selected { fill: #fbbf24; font-size: 12px; font-family: monospace; 
                          text-shadow: 0 0 10px #fbbf24; pointer-events: none; font-weight: bold; }
                        @keyframes pulse-glow {
                          0%, 100% { filter: drop-shadow(0 0 12px #fbbf24); }
                          50% { filter: drop-shadow(0 0 20px #fbbf24); }
                        }
                      `}
                        </style>
                        {/* Arrowhead Marker (Removed in favor of manual placement) */}
                      </defs>

                      {/* Render Track Segments with Hover Labels */}
                      {trackSegments.map((segment) => {
                        const labelPos = getLabelPosition(segment);
                        const isSelected =
                          selectedSegmentId === segment.id;
                        const isHovered =
                          hoveredSegmentId === segment.id;

                        // Check if this segment belongs to the selected section
                        const belongsToSelectedSection =
                          selectedSection &&
                          selectedSection.routeCoordinates.some(
                            (route) =>
                              route.x1 === segment.x1 &&
                              route.y1 === segment.y1 &&
                              route.x2 === segment.x2 &&
                              route.y2 === segment.y2,
                          );

                        return (
                          <g key={segment.id}>
                            <line
                              x1={segment.x1}
                              y1={segment.y1}
                              x2={segment.x2}
                              y2={segment.y2}
                              className={
                                belongsToSelectedSection
                                  ? "route-line-selected"
                                  : getSegmentStyle(segment.id)
                              }
                              onClick={() => {
                                handleSegmentClick(segment.id);
                                handleSelectSection(
                                  segment.sectionId.toString(),
                                );
                              }}
                              onMouseEnter={() =>
                                handleSegmentHover(segment.id)
                              }
                              onMouseLeave={() =>
                                handleSegmentHover(null)
                              }
                            />
                            {/* Show label only on hover or when selected */}
                            {(isHovered || isSelected) && (
                              <text
                                x={labelPos.x}
                                y={labelPos.y}
                                className={
                                  isSelected
                                    ? "segment-label-selected"
                                    : "segment-label"
                                }
                                textAnchor="middle"
                              >
                                {segment.sectionId}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Render Directional Arrows (Midpoint, Threshold > 40px) */}
                      {trackSegments.map((segment) => {
                        const length = Math.sqrt(Math.pow(segment.x2 - segment.x1, 2) + Math.pow(segment.y2 - segment.y1, 2));
                        if (length < 40) return null;

                        const midX = (segment.x1 + segment.x2) / 2;
                        const midY = (segment.y1 + segment.y2) / 2;
                        const angle = Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) * 180 / Math.PI;

                        return (
                          <g key={`arrow-${segment.id}`} transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                            {/* Simple Arrowhead Path centered at 0,0 - Scaled down 30% */}
                            <path
                              d="M -2.8 -2.8 L 2.8 0 L -2.8 2.8 z"
                              className="route-arrow"
                            />
                          </g>
                        );
                      })}



                      {/* All Ports from non-selected sections - Small indicators */}
                      {/* All Ports from non-selected sections - Small indicators */}
                      {showPorts && sections
                        .filter(
                          (section) =>
                            section.id !== selectedSectionId,
                        )
                        .flatMap((section) => section.ports)
                        .map((port) => (
                          <circle
                            key={`preview-${port.id}`}
                            cx={port.x}
                            cy={port.y}
                            r="5"
                            {...getPortStyle(port.visualState)}
                            opacity="0.5"
                            style={{ pointerEvents: "none" }}
                          />
                        ))}

                      {/* Dynamic Ports from selected section */}
                      {showPorts && selectedSection?.ports.map((port) => {
                        const isDraggable =
                          port.visualState === "white-outline" ||
                          port.visualState === "orange-outline";
                        const isBeingDragged =
                          draggingPortId === port.id;
                        const isLocked =
                          port.visualState === "orange-filled" ||
                          port.visualState === "green-filled";
                        const isHovered = hoveredPortId === port.id;

                        let portClass = "port-clickable";
                        if (isBeingDragged) {
                          portClass = "port-dragging";
                        } else if (isDraggable) {
                          portClass = "port-draggable";
                        } else if (isLocked) {
                          portClass = "port-locked";
                        }

                        return (
                          <g key={port.id}>
                            <circle
                              cx={port.x}
                              cy={port.y}
                              r="6"
                              className={portClass}
                              {...getPortStyle(port.visualState)}
                              onClick={() =>
                                !isDraggable && handlePortClick(port)
                              }
                              onMouseDown={(e) =>
                                handlePortMouseDown(e, port)
                              }
                              onMouseEnter={() =>
                                setHoveredPortId(port.id)
                              }
                              onMouseLeave={() =>
                                setHoveredPortId(null)
                              }
                            />
                            {/* Show label on hover */}
                            {isHovered && (
                              <text
                                x={port.x}
                                y={port.y - 20}
                                className="port-label"
                                textAnchor="middle"
                              >
                                {port.equipmentId}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Dynamic Nodes from scaled data */}
                      {Array.from(scaledData.nodes.entries()).map(
                        ([nodeId, node]) => (
                          <circle
                            key={nodeId}
                            cx={node.x}
                            cy={node.y}
                            r="2"
                            className="node-default"
                          />
                        ),
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* Canvas Area - Only show for OHB Setting (Cloned & Isolated) */}
              {activeTab === 'ohb' && (
                <div className="flex-1 px-6 pb-6">
                  <div className="bg-[#0f1525] rounded-lg w-full h-full relative overflow-hidden">
                    {/* Zoom Controls (OHB Independent) */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      {/* OHB Visibility Toggle */}
                      <button
                        onClick={() => setShowOHBs(!showOHBs)}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm mb-2"
                        title={showOHBs ? "Hide OHBs" : "Show OHBs"}
                      >
                        {showOHBs ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={handleOHBZoomIn}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleOHBZoomOut}
                        className="bg-[#1e40af]/80 hover:bg-[#1e40af] p-2 rounded border border-[#3b82f6] shadow-lg backdrop-blur-sm"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <div className="bg-[#1e40af]/80 px-3 py-1 rounded border border-[#3b82f6] text-xs text-center backdrop-blur-sm">
                        {Math.round(ohbZoomLevel * 100)}%
                      </div>
                    </div>

                    {/* Minimap (OHB Independent) */}
                    <div className="absolute bottom-4 left-4 z-10 w-48 h-32 bg-[#0a0e1a]/90 border-2 border-[#3b82f6] rounded backdrop-blur-sm shadow-lg">
                      <div className="w-full h-full p-2">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 1200 700"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Minimap tracks - Same as Port */}
                          {trackSegments.map((segment) => (
                            <line
                              key={`mini-ohb-${segment.id}`}
                              x1={segment.x1}
                              y1={segment.y1}
                              x2={segment.x2}
                              y2={segment.y2}
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                          ))}
                          {/* Viewport indicator - Uses OHB Pan/Zoom */}
                          <rect
                            x={50 - ohbPanOffset.x / 10}
                            y={50 - ohbPanOffset.y / 10}
                            width={1100 / ohbZoomLevel}
                            height={600 / ohbZoomLevel}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                        </svg>
                      </div>
                    </div>

                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1200 700"
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        transform: `scale(${ohbZoomLevel}) translate(${ohbPanOffset.x / ohbZoomLevel}px, ${ohbPanOffset.y / ohbZoomLevel}px)`,
                        transformOrigin: "center",
                        transition: ohbIsDragging
                          ? "none"
                          : "transform 0.2s",
                        cursor: ohbIsDragging ? "grabbing" : "grab",
                      }}
                      onMouseDown={handleOHBMouseDown}
                      onMouseMove={handleOHBMouseMove}
                      onMouseUp={handleOHBMouseUp}
                      onMouseLeave={handleOHBMouseUp}
                    >
                      {/* Define styles - Duplicated for isolation */}
                      <defs>
                        <style>
                          {`
                        .route-line { stroke: #3b82f6; stroke-width: 3; fill: none; cursor: pointer; transition: all 0.2s; }
                        .route-line:hover { stroke: #60a5fa; stroke-width: 5; filter: drop-shadow(0 0 8px #3b82f6); }
                        .route-line-selected { stroke: #fbbf24; stroke-width: 5; fill: none; cursor: pointer; 
                          filter: drop-shadow(0 0 12px #fbbf24); animation: pulse-glow 2s infinite; }
                        .route-arrow { fill: #3b82f6; pointer-events: none; }
                        .node-default { fill: #ffffff; stroke: #e5e7eb; stroke-width: 2; opacity: 0.5; }
                        .segment-label { fill: #9ca3af; font-size: 12px; pointer-events: none; }
                        .segment-label-selected { fill: #fbbf24; font-size: 14px; font-weight: bold; pointer-events: none; filter: drop-shadow(0 0 4px #fbbf24); }
                      `}
                        </style>
                      </defs>

                      {/* Render Track Segments - Modified selection logic for OHB */}
                      {trackSegments.map((segment) => {
                        const labelPos = getLabelPosition(segment);
                        const isSelected = ohbSelectedSegmentId === segment.id;
                        const isHovered = ohbHoveredSegmentId === segment.id;

                        return (
                          <g key={`ohb-seg-${segment.id}`}>
                            <line
                              x1={segment.x1}
                              y1={segment.y1}
                              x2={segment.x2}
                              y2={segment.y2}
                              className={
                                isSelected
                                  ? "route-line-selected"
                                  : "route-line"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOHBSegmentClick(segment.id);
                              }}
                              onMouseEnter={() =>
                                setOhbHoveredSegmentId(segment.id)
                              }
                              onMouseLeave={() =>
                                setOhbHoveredSegmentId(null)
                              }
                            />
                            {/* Show label only on hover or when selected */}
                            {(isHovered || isSelected) && (
                              <text
                                x={labelPos.x}
                                y={labelPos.y}
                                className={
                                  isSelected
                                    ? "segment-label-selected"
                                    : "segment-label"
                                }
                                textAnchor="middle"
                              >
                                {segment.sectionId}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Render Directional Arrows (Midpoint, Threshold > 40px) */}
                      {trackSegments.map((segment) => {
                        const length = Math.sqrt(Math.pow(segment.x2 - segment.x1, 2) + Math.pow(segment.y2 - segment.y1, 2));
                        if (length < 40) return null;

                        const midX = (segment.x1 + segment.x2) / 2;
                        const midY = (segment.y1 + segment.y2) / 2;
                        const angle = Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) * 180 / Math.PI;

                        return (
                          <g key={`ohb-arrow-${segment.id}`} transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                            {/* Simple Arrowhead Path centered at 0,0 - Scaled down 30% */}
                            <path
                              d="M -2.8 -2.8 L 2.8 0 L -2.8 2.8 z"
                              className="route-arrow"
                            />
                          </g>
                        );
                      })}

                      {/* Dynamic Nodes from scaled data - Preserved as requested */}
                      {Array.from(scaledData.nodes.entries()).map(
                        ([nodeId, node]) => (
                          <circle
                            key={`ohb-node-${nodeId}`}
                            cx={node.x}
                            cy={node.y}
                            r="2"
                            className="node-default"
                          />
                        ),
                      )}

                      {/* Render ALL OHB Ports from ohbSections */}
                      {showOHBs && ohbSections.flatMap(section => section.ports).map((ohb) => {
                        const seg = trackSegments.find(s => s.id === ohb.linkId);
                        if (!seg) return null;

                        // Calculate position
                        const pos = calculatePerpendicularPoint(
                          seg.x1, seg.y1, seg.x2, seg.y2,
                          ohb.offset,
                          12, // distance from line in pixels (reduced by 40% from 20)
                          ohb.side
                        );

                        // Get dynamic style based on visualState
                        const style = getPortStyle(ohb.visualState);
                        const isHovered = ohbHoveredPortId === ohb.id;

                        return (
                          <g key={ohb.id}>
                            <rect
                              x={pos.x - 3.5}
                              y={pos.y - 3.5}
                              width="7"
                              height="7"
                              fill={style.fill}
                              stroke={style.stroke}
                              strokeWidth={style.strokeWidth}
                              transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                              className="cursor-pointer hover:opacity-80 transition-all"
                              onMouseEnter={() => setOhbHoveredPortId(ohb.id)}
                              onMouseLeave={() => setOhbHoveredPortId(null)}
                            />
                            {/* Label - Only show on hover */}
                            {isHovered && (
                              <text
                                x={pos.x}
                                y={pos.y - 12}
                                textAnchor="middle"
                                fill="#fbbf24"
                                fontSize="10"
                                fontWeight="bold"
                                stroke="black"
                                strokeWidth="0.5"
                                style={{ pointerEvents: 'none' }}
                                transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                              >
                                {ohb.name}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Panel for Bay Mode */}
        {activeSidebarItem === 'bay-mode' && (
          // Bay Setting Panel
          activeBayTab === 'bay-setting' ? (
            <div
              className="flex flex-col border-l border-[#1e3a8a] bg-[#0a0e1a] p-6 text-gray-300 flex-shrink-0"
              style={{ width: '340px', minWidth: '340px', maxWidth: '340px' }}
            >
              <h2 className="text-sm font-medium mb-2">Bay Settings</h2>
              <p className="text-xs text-gray-400 mb-6">Select segments on map then create / edit Bay</p>

              {/* Selected Segments */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-blue-300 font-medium">
                    Selected Segments ({baySelectedSegments.length})
                  </label>
                  {baySelectedSegments.length > 0 && (
                    <button
                      onClick={() => setBaySelectedSegments([])}
                      className="text-[10px] text-red-400 hover:text-red-300"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div
                  className="bg-[#1a2332] border border-[#1e3a8a] rounded p-2 gap-1 content-start"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    width: '100%',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    minHeight: '60px'
                  }}
                >
                  {baySelectedSegments.length === 0 && (
                    <div className="col-span-4 w-full text-xs text-gray-500 italic text-center mt-2">No segments selected</div>
                  )}
                  {baySelectedSegments.map(segId => (
                    <div key={segId} className="bg-[#2563eb] text-white text-[10px] px-1 py-1 rounded flex items-center justify-between min-w-0">
                      <span className="truncate">{segId}</span>
                      <button
                        onClick={() => handleBaySegmentClick(segId)}
                        className="hover:text-red-200 ml-1 flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Bay */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2">Add New Bay</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Bay ID"
                    value={bayIdInput}
                    onChange={(e) => setBayIdInput(e.target.value)}
                    className="bg-[#1a2332] border border-[#1e3a8a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 flex-1"
                  />
                  <button
                    onClick={handleAddBay}
                    className={`px-3 py-2 rounded flex items-center justify-center transition-colors
                            ${baySelectedSegments.length > 0 && bayIdInput.trim()
                        ? 'bg-[#1e40af] hover:bg-[#1e3a8a] text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    title="Add Bay"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter Bay ID and click + to add
                </p>
              </div>

              {/* Existing Bays List */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <label className="text-xs text-gray-400 block mb-2">
                  Existing Bays ({bays.length})
                </label>
                {bays.length === 0 && (
                  <div className="text-xs text-gray-500 italic">No bay configurations yet</div>
                )}
                <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                  {bays.map(bay => (
                    <div key={bay.id} className="bg-[#1a2332] border border-[#1e3a8a] rounded p-2.5 min-w-0 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: bay.color }}></div>
                          <span className="text-sm font-medium text-white truncate">{bay.name}</span>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleDeleteBay(bay.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 mb-1 break-all">
                        Segments: {bay.segmentIds.slice(0, 5).join(', ')}
                        {bay.segmentIds.length > 5 && ` +${bay.segmentIds.length - 5} more`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeBayTab === 'bay-level-setting' ? (
            // Bay Level Setting Panel
            <div
              className="flex flex-col border-l border-[#1e3a8a] bg-[#0a0e1a] flex-shrink-0"
              style={{ width: '340px', minWidth: '340px', maxWidth: '340px' }}
            >
              <div className="flex flex-row h-full">
                {/* Left: Bay List */}
                <div className="w-[100px] border-r border-[#1e3a8a] bg-[#0f1525] flex flex-col overflow-y-auto flex-shrink-0">
                  {bays.map(bay => (
                    <button
                      key={bay.id}
                      onClick={() => setActiveBayLevelId(bay.id)}
                      className={`w-full text-left px-2 py-3 border-b border-[#1e3a8a]/50 text-xs font-medium truncate transition-colors
                                 ${activeBayLevelId === bay.id ? 'bg-[#1e40af] text-white' : 'text-gray-400 hover:bg-[#1e3a8a]/20'}`}
                      title={bay.name}
                    >
                      {bay.name}
                    </button>
                  ))}
                  {bays.length === 0 && (
                    <div className="p-2 text-[10px] text-gray-500 text-center italic mt-4">
                      No Bays
                    </div>
                  )}
                </div>

                {/* Right: Form */}
                <div className="flex-1 flex flex-col bg-[#0a0e1a] overflow-hidden">
                  <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                    <h2 className="text-sm font-medium mb-4 text-white text-center border-b border-[#1e3a8a] pb-2">
                      {activeBayLevelId ? `${bays.find(b => b.id === activeBayLevelId)?.name} Settings` : 'Select a Bay'}
                    </h2>

                    {activeBayLevelId && (() => {
                      const activeBay = bays.find(b => b.id === activeBayLevelId);
                      if (!activeBay) return null;

                      const handleUpdateBay = (field: keyof Bay, value: any) => {
                        setBays(prev => prev.map(b => b.id === activeBayLevelId ? { ...b, [field]: value } : b));
                      };

                      const handleAddToList = (field: 'pushOuts' | 'pullIns', targetId: string) => {
                        if (!targetId) return;
                        const list = activeBay[field] || [];
                        if (!list.includes(targetId)) {
                          handleUpdateBay(field, [...list, targetId]);
                        }
                      };

                      const handleRemoveFromList = (field: 'pushOuts' | 'pullIns', targetId: string) => {
                        const list = activeBay[field] || [];
                        handleUpdateBay(field, list.filter(id => id !== targetId));
                      };

                      const existingPush = activeBay.pushOuts || [];
                      const existingPull = activeBay.pullIns || [];

                      const availableForPush = bays.filter(b => b.id !== activeBay.id && !existingPush.includes(b.id) && !existingPull.includes(b.id));
                      const availableForPull = bays.filter(b => b.id !== activeBay.id && !existingPull.includes(b.id) && !existingPush.includes(b.id));

                      return (
                        <div className="space-y-6">
                          {/* Water Level */}
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">High Water Level</label>
                              <input
                                type="number"
                                className="w-full bg-[#1a2332] border border-[#1e3a8a] rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 outline-none"
                                value={activeBay.highWaterLevel || ''}
                                onChange={(e) => handleUpdateBay('highWaterLevel', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">Low Water Level</label>
                              <input
                                type="number"
                                className="w-full bg-[#1a2332] border border-[#1e3a8a] rounded px-2 py-1.5 text-xs text-white focus:border-blue-500 outline-none"
                                value={activeBay.lowWaterLevel || ''}
                                onChange={(e) => handleUpdateBay('lowWaterLevel', e.target.value)}
                              />
                            </div>
                          </div>

                          <hr className="border-[#1e3a8a]/50" />

                          {/* Push Out */}
                          <div>
                            <label className="text-xs text-gray-400 block mb-2">Push-Out</label>
                            <div className="space-y-2 mb-2">
                              {existingPush.map(id => (
                                <div key={id} className="flex justify-between items-center bg-[#1e3a8a]/20 px-2 py-1 rounded border border-[#1e3a8a]/50">
                                  <span className="text-xs text-blue-200">{bays.find(b => b.id === id)?.name || id}</span>
                                  <button onClick={() => handleRemoveFromList('pushOuts', id)} className="text-gray-500 hover:text-red-400">×</button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <select
                                className="flex-1 bg-[#1a2332] border border-[#1e3a8a] rounded px-2 py-1 text-xs text-gray-300 outline-none"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleAddToList('pushOuts', e.target.value);
                                    e.target.value = "";
                                  }
                                }}
                              >
                                <option value="">+ Add Bay...</option>
                                {availableForPush.map(b => (
                                  <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Pull In */}
                          <div>
                            <label className="text-xs text-gray-400 block mb-2">Pull-In</label>
                            <div className="space-y-2 mb-2">
                              {existingPull.map(id => (
                                <div key={id} className="flex justify-between items-center bg-[#1e3a8a]/20 px-2 py-1 rounded border border-[#1e3a8a]/50">
                                  <span className="text-xs text-blue-200">{bays.find(b => b.id === id)?.name || id}</span>
                                  <button onClick={() => handleRemoveFromList('pullIns', id)} className="text-gray-500 hover:text-red-400">×</button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <select
                                className="flex-1 bg-[#1a2332] border border-[#1e3a8a] rounded px-2 py-1 text-xs text-gray-300 outline-none"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleAddToList('pullIns', e.target.value);
                                    e.target.value = "";
                                  }
                                }}
                              >
                                <option value="">+ Add Bay...</option>
                                {availableForPull.map(b => (
                                  <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                        </div>
                      );
                    })()}

                    {!activeBayLevelId && (
                      <div className="flex-1 flex items-center justify-center text-xs text-gray-500 italic">
                        Select a Bay from the list
                      </div>
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div className="p-4 border-t border-[#1e3a8a] bg-[#0f1525] flex flex-col gap-2 flex-shrink-0">
                    <button
                      className="w-full py-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white rounded text-xs font-medium transition-colors"
                      onClick={() => alert("Settings saved to UI state.")}
                    >
                      Save UI
                    </button>
                    <button
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                      onClick={() => {
                        console.log('Applying Bay Settings to DB:', bays);
                        alert("Settings applied to Database (Mock)");
                      }}
                    >
                      Apply Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeBayTab === 'bay-parking-point' ? (
            // Bay Parking Point Panel
            <div
              className="flex flex-col border-l border-[#1e3a8a] bg-[#0a0e1a] flex-shrink-0"
              style={{ width: '340px', minWidth: '340px', maxWidth: '340px' }}
            >
              {/* Split View Container */}
              <div className="flex flex-row h-full overflow-hidden">
                {/* Left: Bay List */}
                <div className="w-[100px] border-r border-[#1e3a8a] bg-[#0f1525] flex flex-col overflow-y-auto flex-shrink-0">
                  {bays.map(bay => (
                    <button
                      key={bay.id}
                      onClick={() => setActiveBayParkingPointId(bay.id)}
                      className={`w-full text-left px-2 py-3 border-b border-[#1e3a8a]/50 text-xs font-medium truncate transition-colors
                                 ${activeBayParkingPointId === bay.id ? 'bg-[#1e40af] text-white' : 'text-gray-400 hover:bg-[#1e3a8a]/20'}`}
                      title={bay.name}
                    >
                      {bay.name}
                    </button>
                  ))}
                  {bays.length === 0 && (
                    <div className="p-2 text-[10px] text-gray-500 text-center italic mt-4">
                      No Bays
                    </div>
                  )}
                </div>

                {/* Right: Form */}
                <div className="flex-1 flex flex-col bg-[#0a0e1a] overflow-hidden">
                  <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                    <h2 className="text-sm font-medium mb-4 text-white text-center border-b border-[#1e3a8a] pb-2">
                      {activeBayParkingPointId ? `${bays.find(b => b.id === activeBayParkingPointId)?.name} Parking Point Setting` : 'Select a Bay'}
                    </h2>

                    {activeBayParkingPointId && (() => {
                      const activeBay = bays.find(b => b.id === activeBayParkingPointId);
                      if (!activeBay) return null;

                      // Combine Ports and OHBs into a single list
                      const allPoints = [
                        ...sections.flatMap(s => s.ports),
                        ...ohbSections.flatMap(s => s.ports)
                      ];

                      return (
                        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                          {(!activeBay.parkingPoints || activeBay.parkingPoints.length === 0) && (
                            <div className="text-xs text-gray-500 text-center py-4 italic">
                              No parking points configured. <br /> Click points on map to add.
                            </div>
                          )}
                          {activeBay.parkingPoints?.map(pointId => {
                            const point = allPoints.find(p => p.id === pointId);
                            // TS Safe check: Check if 'equipmentId' exists in point (Type Guard)
                            const displayName = point && 'equipmentId' in point ? (point as any).equipmentId : pointId;

                            return (
                              <div key={pointId} className="flex justify-between items-center bg-[#1e3a8a]/20 px-3 py-2 rounded border border-[#1e3a8a]/50">
                                <span className="text-sm text-gray-200">{displayName}</span>
                                <button
                                  onClick={() => handleParkingPointClick(pointId)}
                                  className="text-gray-500 hover:text-red-400 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {!activeBayParkingPointId && (
                      <div className="flex-1 flex items-center justify-center text-xs text-gray-500 italic">
                        Select a Bay from the list
                      </div>
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div className="p-4 border-t border-[#1e3a8a] bg-[#0f1525] flex flex-col gap-2 flex-shrink-0">
                    <button
                      className="w-full py-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      onClick={() => alert("Please click on Ports (Squares/Dots) in the map to add them to this Bay.")}
                    >
                      + Add Parking Point
                    </button>
                    <button
                      className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
                      onClick={() => setActiveBayParkingPointId(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )
        }


        {/* Right Panel */}
        {
          activeSidebarItem === 'point-setting' && (
            <div className="w-[340px] min-w-[340px] max-w-[340px] flex-shrink-0 flex flex-col border-l border-[#1e3a8a] bg-[#0a0e1a] p-6">
              {activeTab === 'port' ? (
                // PORT Setting Sidebar Content
                <>
                  <h2 className="text-sm font-medium mb-2">
                    Port Setting
                  </h2>
                  <p className="text-xs text-gray-400 mb-6">
                    Select a section to configure Port.
                  </p>

                  <div className="mb-6">
                    <label className="text-xs text-gray-400 block mb-2">
                      Add Port to Section
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="1"
                        value={addPortCount}
                        onChange={(e) =>
                          setAddPortCount(e.target.value)
                        }
                        className="flex-1 bg-[#1a2332] border border-[#2563eb]/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3b82f6]"
                      />
                      <button
                        onClick={handleAddPorts}
                        className="bg-[#1e40af] hover:bg-[#1e3a8a] px-3 py-2 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enter the number of ports to add to this section
                    </p>
                  </div>

                  <div className="mb-6 flex-1 overflow-hidden flex flex-col">
                    <label className="text-xs text-gray-400 block mb-3">
                      Section: {selectedSection?.name || "None"}
                      {selectedSection &&
                        ` (${String(selectedSection.ports.length).padStart(2, "0")})`}
                    </label>
                    <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                      {selectedSection?.ports.length === 0 && (
                        <div className="text-xs text-gray-500 text-center py-4">
                          No ports in this section
                        </div>
                      )}
                      {selectedSection?.ports.map((port) => (
                        <div
                          key={port.id}
                          className="bg-[#1a2332] border border-[#2563eb]/50 rounded px-3 py-2.5 flex items-center justify-between gap-2"
                        >
                          {/* ... (PORT LIST ITEM CONTENT REMAINED SAME) ... */}
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div
                              className={`w-3 h-3 rounded-full flex-shrink-0 ${getPortStatusInfo(port.visualState).dotStyle}`}
                            ></div>
                            <div className="flex flex-col flex-1 min-w-0 gap-1">
                              {editingPortId === port.id ? (
                                <input
                                  type="text"
                                  value={editingPortValue}
                                  onChange={(e) =>
                                    setEditingPortValue(
                                      e.target.value,
                                    )
                                  }
                                  onBlur={() => saveEditPort(port.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      saveEditPort(port.id);
                                    } else if (e.key === "Escape") {
                                      cancelEditPort();
                                    }
                                  }}
                                  className="flex-1 bg-[#0a0e1a] border border-[#3b82f6] rounded px-2 py-1 text-xs focus:outline-none"
                                  autoFocus
                                />
                              ) : (
                                <>
                                  <span
                                    className="text-sm truncate cursor-text hover:text-blue-300 font-medium"
                                    onDoubleClick={() =>
                                      handlePortClick(port)
                                    }
                                  >
                                    {port.equipmentId}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`text-[10px] px-1.5 py-0.5 rounded ${getPortStatusInfo(port.visualState).labelColor}`}
                                    >
                                      {
                                        getPortStatusInfo(
                                          port.visualState,
                                        ).label
                                      }
                                    </span>
                                    {getPortStatusInfo(
                                      port.visualState,
                                    ).taught && (
                                        <span className="text-[10px] text-green-400">
                                          ✓ Teaching
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() =>
                                handleRemovePort(port.id)
                              }
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // OHB Setting Sidebar Content
                <>
                  <h2 className="text-sm font-medium mb-2">
                    OHB Setting
                  </h2>
                  <p className="text-xs text-gray-400 mb-6">
                    Select a segment to add OHB.
                  </p>

                  <div className="mb-6">
                    {/* OHB Specific Controls */}
                    <div className="flex flex-col gap-4">
                      {/* 1. Bay ID Input */}
                      <div>
                        <label className="text-sm text-gray-200 block mb-1">
                          輸入Bay ID
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={addOHBStartId}
                          onChange={(e) => setAddOHBStartId(e.target.value)}
                          className="w-full bg-[#1a2332] border border-[#2563eb]/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3b82f6] text-gray-200"
                        />
                      </div>

                      {/* 2. Side Selection */}
                      <div>
                        <label className="text-sm text-gray-200 block mb-1">
                          掛載方向
                        </label>
                        <div className="flex gap-2">
                          <button
                            className={`flex-1 py-2 rounded text-sm transition-colors ${addOHBSide === 'left' ? 'bg-[#1e40af] text-white' : 'bg-[#1a2332] text-gray-400 border border-[#2563eb]/50 hover:bg-[#1e3a8a]/30'}`}
                            onClick={() => setAddOHBSide('left')}
                          >
                            左側(1)
                          </button>
                          <button
                            className={`flex-1 py-2 rounded text-sm transition-colors ${addOHBSide === 'right' ? 'bg-[#1e40af] text-white' : 'bg-[#1a2332] text-gray-400 border border-[#2563eb]/50 hover:bg-[#1e3a8a]/30'}`}
                            onClick={() => setAddOHBSide('right')}
                          >
                            右側(2)
                          </button>
                        </div>
                      </div>

                      {/* 3. Quantity */}
                      <div>
                        <label className="text-sm text-gray-200 block mb-1">
                          掛載數量
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min="1"
                            value={addOHBQty}
                            onChange={(e) =>
                              setAddOHBQty(parseInt(e.target.value) || 1)
                            }
                            className="flex-1 bg-[#1a2332] border border-[#2563eb]/50 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#3b82f6] text-gray-200"
                          />
                          <button
                            onClick={handleAddOHBs}
                            className="bg-[#1e40af] hover:bg-[#1e3a8a] px-3 py-2 rounded text-white shadow-lg flex items-center justify-center min-w-[40px]"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex-1 overflow-hidden flex flex-col">
                    <label className="text-xs text-gray-400 block mb-3">
                      Segment: {ohbSelectedSegmentId || "None"}
                    </label>
                    <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                      {/* List existing OHBs for selected segment */}
                      {ohbSections.find(s => s.id === ohbSelectedSegmentId)?.ports.map(ohb => {
                        const statusInfo = getPortStatusInfo(ohb.visualState);
                        return (
                          <div
                            key={ohb.id}
                            className="bg-[#1a2332] border border-[#2563eb]/50 rounded-lg p-3 flex items-center justify-between gap-3 shadow-sm"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {/* Square Icon */}
                              <div
                                className={`w-3 h-3 flex-shrink-0 ${statusInfo.dotStyle.replace('rounded-full', 'rounded-[1px]')}`} // Using similar styles but overriding rounded-full if present, actually standard dotStyle likely has rounded-full or not. 
                                // Let's hardcode square style based on visualState to be sure or just use 'rounded-sm'
                                style={{ borderRadius: '2px' }}
                              ></div>

                              <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-200 font-medium">{ohb.name}</span>
                                <div className="flex items-center gap-2">
                                  {/* Parking Tag */}
                                  {statusInfo.parking && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${ohb.visualState.includes('green') ? 'bg-green-900 text-green-400' : 'bg-orange-900 text-orange-400'}`}>
                                      Parking
                                    </span>
                                  )}
                                  {/* Teaching or Not Taught Tag */}
                                  {statusInfo.taught ? (
                                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                                      ✓ Teaching
                                    </span>
                                  ) : (
                                    !statusInfo.parking && statusInfo.label === "Not Taught" && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-950 text-orange-400">
                                        Not Taught
                                      </span>
                                    )
                                  )}
                                  {/* New Tag */}
                                  {statusInfo.label === "New" && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700 text-gray-400">
                                      New
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveOHB(ohb.id)} // Assuming handleRemovePort or similar exists? Actually it was handleRemovePort in previous context for Ports. For OHB I need to check if there is a remove function. 
                              // Wait, previous code just showed <div ...> without delete button? 
                              // Step 634 view showed:
                              // <div ...> <span ...>{ohb.name}</span> <span ...>{ohb.side}</span> </div>
                              // It didn't have a delete button in the simple list I viewed in Step 634!
                              // But user wants "Right side should looking like this" (ref image has X).
                              // I need to implement delete logic if not present. 
                              // I should use handleRemovePort if it works for OHB (it might likely not).
                              // Let's postpone delete button functional implementation and just put the UI first or check if handleRemovePort works. 
                              // Actuall handleRemovePort is for Section.ports. OHB ports are in ohbSections.
                              // I'll define a quick handleRemoveOHB inline or if it doesn't exist I'll hide it for now or use console.log.
                              // User "Delete" logic is in "Phase 3: OHB Sidebar Logic" which I haven't fully implemented (delete).
                              // I'll add the button UI.
                              className="text-gray-500 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                      {(!ohbSelectedSegmentId || !ohbSections.find(s => s.id === ohbSelectedSegmentId)?.ports.length) && (
                        <div className="text-xs text-gray-500 text-center py-4">
                          No OHBs on this segment
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleSaveConfiguration}
                className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] py-3 rounded font-medium text-sm mt-auto"
              >
                Saved Configuration
              </button>
            </div>
          )
        }


      </div >

      {/* Footer - 1920*34 */}
      < footer className="bg-[#0f1525] border-t border-[#1e3a8a] px-6 text-xs text-gray-400 flex justify-between items-center h-[34px]" >
        <span>Today Process: 0</span>
        <span>Running Time: 000 00H 8M</span>
        <span>Build Date: 2022-12-08 13:29:35</span>
        <span>Version: 1.0.0.0</span>
      </footer >

      {/* Confirmation Modal */}
      {
        showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a2332] border border-[#2563eb] rounded-lg p-6 w-96">
              <h3 className="text-lg font-medium mb-4">
                Confirm Edit
              </h3>
              <p className="text-sm text-gray-300 mb-6 whitespace-pre-line">
                {modalMessage}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setPendingEditPort(null);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEdit}
                  className="px-4 py-2 bg-[#1e40af] hover:bg-[#1e3a8a] rounded text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Warning Modal */}
      {
        showWarningModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-[#1a2332] border border-[#f97316] rounded-lg p-6 w-96">
              <h3 className="text-lg font-medium mb-4 text-orange-400">
                Notice
              </h3>
              <p className="text-sm text-gray-300 mb-6 whitespace-pre-line">
                {modalMessage}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowWarningModal(false)}
                  className="px-4 py-2 bg-[#1e40af] hover:bg-[#1e3a8a] rounded text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Delete Confirmation Modal */}
      {
        showDeleteConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-[#1a2332] border border-[#ef4444] rounded-lg p-6 w-96">
              <h3 className="text-lg font-medium mb-4 text-red-400">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-300 mb-6 whitespace-pre-line">
                {deleteModalMessage}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

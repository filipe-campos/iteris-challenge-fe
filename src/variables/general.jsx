import React from "react";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const API_HOST = 'http://127.0.0.1';
const API_PORT = '5000';

const Constants = {

  PATH_IMAGE_PROFILE: API_HOST + ":" + API_PORT + "/public/img/",

  ROUTE_USER_INSERT: API_HOST + ':' + API_PORT + "/api/users",
  ROUTE_LOGIN: API_HOST + ':' + API_PORT + "/api/users/login",
  ROUTE_INVOICE_INSERT: API_HOST + ':' + API_PORT + "/api/invoices",
  ROUTE_INVOICE_LIST: API_HOST + ':' + API_PORT + "/api/invoices",
  ROUTE_INVOICE_UPDATE: API_HOST + ':' + API_PORT + "/api/invoices/",

  CODE_SUCCESS: 200,
  CODE_BAD_REQUEST: 400,
  CODE_INVALID_TOKEN: 401,
  CODE_EXPIRED_TOKEN: 402,
  CODE_FORBIDEN: 403,
  CODE_WRONG_LOGIN: 422,
  CODE_ERROR_DATABASE: 406,
  CODE_UNKNOW_ERROR: 500,
  CODE_UNAVALIABLE_SERVICE: 503,
  CODE_EMAIL_EXISTS: 408,
  CODE_USER_EXISTS: 422,

  LOADING_TEXT: "Carregando...",
  LOADING_TXT_COLOR: "#FFFFFF",
  LOADING_SPN_COLOR: "#FFFFFF",
  LOADING_BG_COLOR: "rgba(0,0,0,0.5)"
}

const SELECT_USER_TYPE = [
  { value: "1", label: "Analista" },
  { value: "2", label: "Gestor" }
];

const INVOICE_STATUS = ["Emitida com sucesso", "Aguardando aprovação adiantamento", "Adiantamento Aceito", "Adiantamento Recusado"]

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["Name", "Country", "City", "Salary"];
const tbody = [
  {
    className: "table-success",
    data: ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"]
  },
  {
    className: "",
    data: ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"]
  },
  {
    className: "table-info",
    data: ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"]
  },
  {
    className: "",
    data: ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"]
  },
  {
    className: "table-danger",
    data: ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"]
  },
  { className: "", data: ["Mason Porter", "Chile", "Gloucester", "$78,615"] },
  {
    className: "table-warning",
    data: ["Jon Porter", "Portugal", "Gloucester", "$98,615"]
  }
];

// ##############################
// // // stories for Timeline view
// #############################

const stories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: "now-ui-icons business_briefcase-24",
    title: "Some Title",
    titleColor: "danger",
    body: (
      <p>
        Wifey made the best Father's Day meal ever. So thankful so happy so
        blessed. Thank you for making my family We just had fun with the
        “future” theme !!! It was a fun night all together ... The always rude
        Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in
        downtown.
      </p>
    ),
    footerTitle: "11 hours ago via Twitter"
  },
  {
    // Second story
    badgeColor: "success",
    badgeIcon: "now-ui-icons design-2_ruler-pencil",
    title: "Another One",
    titleColor: "success",
    body: (
      <p>
        Thank God for the support of my wife and real friends. I also wanted to
        point out that it’s the first album to go number 1 off of streaming!!! I
        love you Ellen and also my number one design rule of anything I do from
        shoes to music to homes is that Kim has to like it....
      </p>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: "now-ui-icons gestures_tap-01",
    title: "Another Title",
    titleColor: "info",
    body: (
      <div>
        <p>
          Called I Miss the Old Kanye That’s all it was Kanye And I love you
          like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
          LA 11:10PM
        </p>
        <p>
          What if Kanye made a song about Kanye Royère doesn't make a Polar bear
          bed but the Polar bear couch is my favorite piece of furniture we own
          It wasn’t any Kanyes Set on his goals Kanye
        </p>
        <hr />
      </div>
    ),
    footer: (
      <UncontrolledButtonDropdown group={false}>
        <DropdownToggle caret className="btn-round" color="info">
          <i className="now-ui-icons design_bullet-list-67" />{" "}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )
  },
  {
    // Fourth story
    badgeColor: "warning",
    badgeIcon: "now-ui-icons ui-1_send",
    title: "Another One",
    titleColor: "warning",
    body: (
      <p>
        Tune into Big Boy's 92.3 I'm about to play the first single from Cruel
        Winter also to Kim’s hair and makeup Lorraine jewelry and the whole
        style squad at Balmain and the Yeezy team. Thank you Anna for the invite
        thank you to the whole Vogue team
      </p>
    )
  }
];

// ##############################
// // // stories for Widgets view
// #############################

const widgetStories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: "now-ui-icons business_briefcase-24",
    title: "Some Title",
    titleColor: "danger",
    body: (
      <p>
        Wifey made the best Father's Day meal ever. So thankful so happy so
        blessed. Thank you for making my family We just had fun with the
        “future” theme !!! It was a fun night all together ... The always rude
        Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in
        downtown.
      </p>
    ),
    footerTitle: "11 hours ago via Twitter"
  },
  {
    // Second story
    inverted: true,
    badgeColor: "success",
    badgeIcon: "now-ui-icons design-2_ruler-pencil",
    title: "Another One",
    titleColor: "success",
    body: (
      <p>
        Thank God for the support of my wife and real friends. I also wanted to
        point out that it’s the first album to go number 1 off of streaming!!! I
        love you Ellen and also my number one design rule of anything I do from
        shoes to music to homes is that Kim has to like it....
      </p>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: "now-ui-icons gestures_tap-01",
    title: "Another Title",
    titleColor: "info",
    body: (
      <div>
        <p>
          Called I Miss the Old Kanye That’s all it was Kanye And I love you
          like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown
          LA 11:10PM
        </p>
        <p>
          What if Kanye made a song about Kanye Royère doesn't make a Polar bear
          bed but the Polar bear couch is my favorite piece of furniture we own
          It wasn’t any Kanyes Set on his goals Kanye
        </p>
        <hr />
      </div>
    ),
    footer: (
      <UncontrolledButtonDropdown group={false}>
        <DropdownToggle caret className="btn-round" color="info">
          <i className="now-ui-icons design_bullet-list-67" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )
  }
];

// ##############################
// // // stories for RTL view
// #############################

const widgetStoriesRTL = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: "now-ui-icons business_briefcase-24",
    title: "بعض العنوان",
    titleColor: "danger",
    body: (
      <p>
        قدم أفضل وجبة يوم الأب على الإطلاق. ممتن جدا سعيد جدا حتى المباركة.
        شكراً لك على صنع عائلتي لقد استمتعنا بالموضوع "المستقبلي" !!! كانت ليلة
        ممتعة كل ذلك معا ... عرض كاني فظ دائما في الساعة 2 صباحا بيعت من مشاهير
        مشاهدة
      </p>
    ),
    footerTitle: "قبل 11 ساعة عبر تويتر"
  },
  {
    // Second story
    inverted: true,
    badgeColor: "success",
    badgeIcon: "now-ui-icons design-2_ruler-pencil",
    title: "واحدة أخرى",
    titleColor: "success",
    body: (
      <p>
        أيضًا الإشارة إلى أنه أول ألبوم ينتقل إلى رقم 1 من البث المباشر !!! أنا
        أحبك إلين وأيضا قاعدة بلدي رقم واحد تصميم أي شيء أفعله من الأحذية إلى
        الموسيقى إلى المنازل هو أن كيم يجب أن ترغب في ذلك
      </p>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: "now-ui-icons gestures_tap-01",
    title: "عنوان آخر",
    titleColor: "info",
    body: (
      <div>
        <p>
          يسمى أنا أفتقد كاني القديم هذا كل ما كان كاني وأنا أحبك مثل كاني يحب
          كاني مشاهدة مشاهير @ Figueroa و 12 في وسط المدينة LA 11:10 PM
        </p>
        <p>
          ماذا لو قدمت كاني أغنية عن كاني رويير لا تصنع سرير الدب القطبي ولكن
          الأريكة الدببة القطبية هي قطعة الأثاث المفضلة لدينا التي نملكها. لم
          يكن أي مجموعة من Kanyes على أهدافه كاني
        </p>
        <hr />
      </div>
    ),
    footer: (
      <UncontrolledButtonDropdown group={false}>
        <DropdownToggle caret className="btn-round" color="info">
          <i className="now-ui-icons design_bullet-list-67" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>عمل</DropdownItem>
          <DropdownItem>إجراء آخر</DropdownItem>
          <DropdownItem>شيء آخر هنا</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )
  }
];

// ##############################
// // // data for datatables.net in DataTables view
// #############################

const dataTable = {
  headerRow: ["Name", "Position", "Office", "Age", "Actions"],
  footerRow: ["Name", "Position", "Office", "Age", "Actions"],
  dataRows: [
    ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
    ["Garrett Winters", "Accountant", "Tokyo", "63"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
    ["Airi Satou", "Accountant", "Tokyo", "33"],
    ["Brielle Williamson", "Integration Specialist", "New York", "61"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
    ["Jena Gaines", "Office Manager", "London", "30"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
    ["Charde Marshall", "Regional Director", "San Francisco", "36"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
    ["Michael Silva", "Marketing Designer", "London", "66"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
    ["Gloria Little", "Systems Administrator", "New York", "59"],
    ["Bradley Greer", "Software Engineer", "London", "41"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
    ["Jenette Caldwell", "Development Lead", "New York", "30"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
    ["Gavin Joyce", "Developer", "Edinburgh", "42"],
    ["Jennifer Chang", "Regional Director", "Singapore", "28"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
    ["Michelle House", "Integration Specialist", "Sidney", "37"],
    ["Suki Burks", "Developer", "London", "53"],
    ["Prescott Bartlett", "Technical Author", "London", "27"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
    ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
    ["Hope Fuentes", "Secretary", "San Francisco", "41"],
    ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
    ["Timothy Mooney", "Office Manager", "London", "37"],
    ["Jackson Bradshaw", "Director", "New York", "65"],
    ["Olivia Liang", "Support Engineer", "Singapore", "64"]
  ]
};

// ##############################
// // // data for populating the calendar in Calendar view
// #############################

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "All Day Event",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
    color: "default"
  },
  {
    title: "Meeting",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "green"
  },
  {
    title: "Lunch",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "Nud-pro Launch",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure"
  },
  {
    title: "Birthday Party",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "azure"
  },
  {
    title: "Click for Creative Tim",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  },
  {
    title: "Click for Google",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  }
];


export {
  thead,
  tbody,
  stories,
  widgetStories,
  widgetStoriesRTL,
  dataTable,
  events,
  SELECT_USER_TYPE,
  Constants,
  INVOICE_STATUS
};

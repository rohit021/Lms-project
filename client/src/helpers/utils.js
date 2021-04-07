// import { AssignmentOutlined, TrendingUp, ThumbUpAlt } from '@material-ui/icons';
import {
    Home as HomeIcon,
    AssignmentOutlined as AssignmentIcon,
    FiberManualRecord as DotIcon,
    Stars as StarsIcon
    // FormatSize as TypographyIcon,
    // FilterNone as UIElementsIcon,
    // BorderAll as TableIcon,
    // QuestionAnswer as SupportIcon,
    // LibraryBooks as LibraryIcon,
    // HelpOutline as FAQIcon,
    // ArrowBack as ArrowBackIcon,
  } from "@material-ui/icons";

export const Steps = ['User Information', 'Organization Information', 'Lead  Information'];  
  
export const mainListItems = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Lead Menu", link: "/app/leads", icon: <AssignmentIcon /> ,children: [
    { label: "Radix Leads", link: "/app/leads/radixLeads", icon: <DotIcon fontSize = "small" /> },
    { label: "Anardana Leads", link: "/app/leads/anardanaLeads" , icon: <DotIcon fontSize="small"/> },
    { label: "Woodapple Leads", link: "/app/leads/woodappleLeads" , icon: <DotIcon fontSize="small"/> },
    { label: "Relp Leads", link: "/app/leads/relpLeads" , icon: <DotIcon fontSize="small" /> },
    ],   
  },
  { id: 2, label: "Review Menu", link: "/app/reviews", icon: <StarsIcon /> ,children: [
    { label: "Radix Review", link: "/app/reviews/radixReviews", icon: <DotIcon fontSize = "small" /> },
    { label: "Anardana Review", link: "/app/reviews/anardanaReviews" , icon: <DotIcon fontSize="small"/> },
    { label: "Woodapple Review", link: "/app/reviews/woodappleReviews" , icon: <DotIcon fontSize="small"/> },
    { label: "Relp Review", link: "/app/reviews/relpReviews" , icon: <DotIcon fontSize="small" /> },
  ],   
}   
    // {'text': 'Lead Menu', 'link': '/viewleads', 'page': 'Leads', 'icon': <AssignmentOutlined />},
    // {'text': 'DateWise Status', 'link': '/datewiseStatus', 'page': 'datewiseStatus', 'icon': <TrendingUp />},
    // {'text': 'Reviews', 'link': '/reviews', 'page': 'review', 'icon': <ThumbUpAlt />},
    // {'text': 'Physical Review', 'link': '/physical-reviews', 'page': 'physicalreview', 'icon': <ThumbUpAlt />},
]
export const OrganizationOptions = [
    { "key": 'radix', "text": 'Radix Healthcare', "value": 'radix' },
    { "key": 'anardana', "text": 'Anardana', "value": 'anardana' },
    { "key": 'relp', "text": 'RELP', "value": 'relp' },
]
export const SourceOptions = [
    { "key": 'friends', "text": 'Friends', "value": 'friends' },
    { "key": 'google', "text": 'Google', "value": 'google' },
    { "key": 'social', "text": 'Social Media', "value": 'social' },
    { "key": 'email', "text": 'Email Marketing', "value": 'email' },
    { "key": 'radix practo', "text": 'Radix Practo', "value": 'radix practo' },
    { "key": 'dental practo', "text": 'Dental Practo', "value": 'dental practo' },
    { "key": 'housing', "text": 'Housing', "value": 'housing' },
    { "key": '99 acres', "text": '99 acres', "value": '99 acres' },
]
export const DateFilterOptions = [
    { key: 'week', text: 'WEEKLY', value: 'week' },
    { key: 'month', text: 'MONTHLY', value: 'month' },
    { key: 'year', text: 'YEARLY', value: 'year' },
  ]
//did
export const CommonLeadHeadCells = [
    { id: 'date', disablePadding: false, label: 'Date' },
    { id: 'name', disablePadding: true, label: 'Name' },    
    { id: 'phone', disablePadding: false, label: 'Phone' },
    { id: 'source', disablePadding: false, label: 'Source' },
    // { id: 'status', disablePadding: false, label: 'Status' },
  ];
  export const ReviewHeadCells = [
    { id: 'date', disablePadding: false, label: 'Date' },
    { id: 'rating', disablePadding: true, label: 'Rating' },    
    
  ];
  export const CenterOptions = [
    { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
    { "key": 'preet vihar', "text": 'Preet Vihar', "value": 'preet vihar' },
    { "key": 'janakpuri', "text": 'Janakpuri', "value": 'janakpuri' },
    { "key": 'vikasmarg', "text": 'Vikas Marg', "value": 'vikasmarg' },
    { "key": 'chandigarh', "text": 'Chandigarh', "value": 'chandigarh' },
    
]

export const PropertyNameOptions = [
  { "key": '1704', "text": 'Amrapali B-1704', "value": 'amrapali_B-1704' },
  { "key": '1204', "text": 'Amrapali G-1204', "value": 'amrapali_G-1204' },
  { "key": '201', "text": 'Amrapali G-201', "value": 'amrapali_G-201' },
  { "key": 'grand_omaxe', "text": 'Grand Omaxe', "value": 'grand_omaxe' },
  { "key": 'palla-plot', "text": 'Palla Plot', "value": 'palla_plot' },
  { "key": 'ramprastha', "text": 'Ramprastha Plot', "value": 'ramprastha_plot' },
  

]
export const CategoryOptions= [
  { "key": 'banquet', "text": 'Banquet ', "value": 'banquet' },
  { "key": 'room', "text": 'Room ', "value": 'room' },

]
export const DepartmentOptions = [
  { "key": 'medicine', "text": 'Medicine', "value": 'Medicine' },
  { "key": 'orthopaedics', "text": 'Orthopaedics', "value": 'Orthopaedics' },
  { "key": 'pulmonology', "text": 'Pulmonology', "value": 'Pulmonology' },
  { "key": 'IVF', "text": 'IVF', "value": 'IVF' },
  { "key": 'dermatology', "text": 'Dermatology', "value": 'Dermatology' },
  { "key": 'diagnostics', "text": 'Diagnostics', "value": 'Diagnostics' },
  { "key": 'physiotherapy', "text": 'Physiotherapy', "value": 'Physiotherapy' },
  { "key": 'psychiatry', "text": 'Psychiatry', "value": 'Psychiatry' },
  { "key": 'neurosciences', "text": 'Neurosciences', "value": 'Neurosciences' },
  { "key": 'plasticsurgery', "text": 'Plastic Surgery', "value": 'Plastic Surgery' },
  { "key": 'radiology', "text": 'Radiology', "value": 'Radiology' },
  { "key": 'diabetes', "text": 'Diabetes', "value": 'Diabetes' },
  { "key": 'gastroenterology', "text": 'Gastroenterology', "value": 'Gastroenterology' },
  { "key": 'urology', "text": 'Urology', "value": 'Urology' },
  { "key": 'opthalmology', "text": 'Opthalmology', "value": 'Opthalmology' },
  { "key": 'cardiology', "text": 'Cardiology', "value": 'Cardiology' },
  { "key": 'bariatricsurgery', "text": 'Bariatric Surgery', "value": 'Bariatric Surgery' },
  { "key": 'dietician', "text": 'Dietician', "value": 'Dietician' },
  { "key": 'gynaecology', "text": 'Gynaecology', "value": 'Gynaecology' },
  { "key": 'cosmodental', "text": 'Cosmo Dental', "value": 'Cosmo Dental' },
  { "key": 'dental', "text": 'Dental', "value": 'Dental' },
  { "key": 'paediatric', "text": 'Paediatric', "value": 'Paediatric' },
  { "key": 'others', "text": 'Others', "value": 'Others' },
]
export const DoctorOptions = [
{ "key": 'ravimalik', "text": 'Dr.Ravi Malik', "value": 'Dr.Ravi Malik', "dept":"Paediatric" },
{ "key": 'renumalik', "text": 'Dr.Renu Malik', "value": 'Dr.Renu Malik',"dept":"Gynaecology" },
{ "key": 'shrutimalik', "text": 'Dr.Shruti Malik', "value": 'Dr.Shruti Malik',"dept":"Dental" },
{ "key": 'vaishali', "text": 'Dr.Vaishali Saini', "value": 'Dr.Vaishali Saini',"dept":"Gynaecology" },
{ "key": 'meenu', "text": 'Dr.Meenu Aggarwal', "value": 'Dr.Meenu Aggarwal',"dept":"Gynaecology" },
{ "key": 'rajni', "text": 'Dr.Rajni', "value": 'Dr.Rajni',"dept":"Gynaecology" },
{ "key": 'rupam', "text": 'Dr.Rupam Arora', "value": 'Dr.Rupam Arora',"dept":"Gynaecology" },
{ "key": 'kksinha', "text": 'Dr.K.K Sinha', "value": 'Dr.K.K Sinha',"dept":"Radiology" },
{ "key": 'tkvohra', "text": 'Dr.T.K Vohra', "value": 'Dr.T.K Vohra',"dept":"Radiology" },
{ "key": 'kirtidwivedi', "text": 'Dr.Kirti Dwivedi', "value": 'Dr.Kirti Dwivedi',"dept":"Physiotherapy" },
{ "key": 'ravikumar', "text": 'Dr.Ravi Kumar', "value": 'Dr.Ravi Kumar',"dept":"Physiotherapy" },
{ "key": 'amitbatra', "text": 'Dr.Amit Batra', "value": 'Dr.Amit Batra',"dept":"Neurosciences" },
{ "key": 'rahulgupta', "text": 'Dr.Rahul Gupta', "value": 'Dr.Rahul Gupta',"dept":"Neurosciences" },
{ "key": 'sandeepgovil', "text": 'Dr.Sandeep Govil', "value": 'Dr.Sandeep Govil',"dept":"Psychiatry" },
{ "key": 'mohitsharma', "text": 'Dr.Mohit Sharma', "value": 'Dr.Mohit Sharma',"dept":"Psychiatry" },

]

export const PriorityOptions = [
    { "key": 'hot', "text": 'Hot', "value": 'hot' },
    { "key": 'neutral', "text": 'Neutral', "value": 'neutral' },
    { "key": 'cold', "text": 'Cold', "value": 'cold' },    
]

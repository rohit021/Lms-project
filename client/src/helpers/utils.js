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
    { "key": 'other', "text": 'Other', "value": 'other' },
]
export const DateFilterOptions = [
    { key: 'week', text: 'WEEKLY', value: 'week' },
    { key: 'month', text: 'MONTHLY', value: 'month' },
    { key: 'year', text: 'YEARLY', value: 'year' },
  ]

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
 
    { "key": 'chandigarh', "text": 'Chandigarh', "value": 'chandigarh' },
    { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
    
]

export const LocationOptions = [
  { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
  { "key": 'other', "text": 'Other', "value": 'other' },
]
export const PropertyNameOptions = [
  { "key": '1', "text": 'PropertyName 1', "value": '1' },
  { "key": '2', "text": 'PropertyName 2', "value": '2' },
  { "key": '3', "text": 'PropertyName 3', "value": '3' },
]
export const CategoryOptions= [
  { "key": 'banquet', "text": 'banquet ', "value": 'banquet' },
  { "key": 'room', "text": 'room ', "value": 'room' },

]
export const DepartmentOptions = [
    { "key": 'medicine', "text": 'Medicine', "value": 'medicine' },
    { "key": 'orthopaedics', "text": 'Orthopaedics', "value": 'orthopaedics' },
    { "key": 'pulmonology', "text": 'Pulmonology', "value": 'pulmonology' },
    { "key": 'IVF', "text": 'IVF', "value": 'IVF' },
    { "key": 'dermatology', "text": 'Dermatology', "value": 'dermatology' },
    { "key": 'diagnostics', "text": 'Diagnostics', "value": 'diagnostics' },
    { "key": 'physiotherapy', "text": 'Physiotherapy', "value": 'physiotherapy' },
    { "key": 'psychiatry', "text": 'Psychiatry', "value": 'psychiatry' },
    { "key": 'neurosciences', "text": 'Neurosciences', "value": 'neurosciences' },
    { "key": 'plasticsurgery', "text": 'Plastic Surgery', "value": 'plasticsurgery' },
    { "key": 'radiology', "text": 'Radiology', "value": 'radiology' },
    { "key": 'diabetes', "text": 'Diabetes', "value": 'diabetes' },
    { "key": 'gastroenterology', "text": 'Gastroenterology', "value": 'gastroenterology' },
    { "key": 'urology', "text": 'Urology', "value": 'urology' },
    { "key": 'opthalmology', "text": 'Opthalmology', "value": 'opthalmology' },
    { "key": 'cardiology', "text": 'Cardiology', "value": 'cardiology' },
    { "key": 'bariatricsurgery', "text": 'Bariatric Surgery', "value": 'bariatricsurgery' },
    { "key": 'dietician', "text": 'Dietician', "value": 'dietician' },
    { "key": 'gynaecology', "text": 'Gynaecology', "value": 'gynaecology' },
    { "key": 'cosmodental', "text": 'Cosmo Dental', "value": 'cosmodental' },
    { "key": 'dental', "text": 'Dental', "value": 'dental' },
    { "key": 'paediatric', "text": 'Paediatric', "value": 'paediatric' },
    { "key": 'others', "text": 'Others', "value": 'others' },
]
export const DoctorOptions = [
  { "key": 'ravimalik', "text": 'Dr.Ravi Malik', "value": 'ravimalik', "dept":"paediatric" },
  { "key": 'renumalik', "text": 'Dr.Renu Malik', "value": 'renumalik',"dept":"gynaecology" },
  { "key": 'shrutimalik', "text": 'Dr.Shruti Malik', "value": 'shrutimalik',"dept":"dental" },
  { "key": 'vaishali', "text": 'Dr.Vaishali Saini', "value": 'vaishali',"dept":"gynaecology" },
  { "key": 'meenu', "text": 'Dr.Meenu Aggarwal', "value": 'meenu',"dept":"gynaecology" },
  { "key": 'rajni', "text": 'Dr.Rajni', "value": 'rajni',"dept":"gynaecology" },
  { "key": 'rupam', "text": 'Dr.Rupam Arora', "value": 'rupam',"dept":"gynaecology" },
  { "key": 'kksinha', "text": 'Dr.K.K Sinha', "value": 'kksinha',"dept":"radiology" },
  { "key": 'tkvohra', "text": 'Dr.T.K Vohra', "value": 'tkvohra',"dept":"radiology" },
  { "key": 'kirtidwivedi', "text": 'Dr.Kirti Dwivedi', "value": 'kirtidwivedi',"dept":"physiotherapy" },
  { "key": 'ravikumar', "text": 'Dr.Ravi Kumar', "value": 'ravikumar',"dept":"physiotherapy" },
  { "key": 'amitbatra', "text": 'Dr.Amit Batra', "value": 'amitbatra',"dept":"neurosciences" },
  { "key": 'rahulgupta', "text": 'Dr.Rahul Gupta', "value": 'rahulgupta',"dept":"neurosciences" },
  { "key": 'sandeepgovil', "text": 'Dr.Sandeep Govil', "value": 'sandeepgovil',"dept":"psychiatry" },
  { "key": 'mohitsharma', "text": 'Dr.Mohit Sharma', "value": 'mohitsharma',"dept":"psychiatry" },


 
]
export const PriorityOptions = [
    { "key": 'hot', "text": 'Hot', "value": 'hot' },
    { "key": 'cold', "text": 'Cold', "value": 'cold' },
    { "key": 'neutral', "text": 'Neutral', "value": 'neutral' },
]

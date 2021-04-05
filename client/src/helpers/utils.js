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
    { "key": 'delhi', "text": 'Delhi', "value": 'delhi' },
    { "key": 'chandigarh', "text": 'Chandigarh', "value": 'chandigarh' },
    { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
    { "key": 'other', "text": 'Other', "value": 'other' },
]

export const LocationOptions = [
  { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
  { "key": 'other', "text": 'Other', "value": 'other' },
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
    { "key": 'neutral', "text": 'Neutral', "value": 'neutral' },
    { "key": 'cold', "text": 'Cold', "value": 'cold' },    
]

            // <option value="Dermatology">Dermatology</option>
            // <option value="Diagnostics">Diagnostics</option>
            // <option value="Anaesthesia">Anaesthesia</option>
            // <option value="Physiotherapy">Physiotherapy</option>
            // <option value="Psychiatry">Psychiatry</option>
            // <option value="Neurosciences">Neurosciences</option>
            // <option value="Plastic Surgery">Plastic Surgery</option>
            // <option value="Radiology">Radiology</option>
            // <option value="Diabetes">Diabetes</option>
            // <option value="Gastroenterology">Gastroenterology</option>
            // <option value="Urology">Urology</option>
            // <option value="Opthalmology">Opthalmology</option>
            // <option value="Cardiology">Cardiology</option>
            // <option value="Bariatric Surgery">Bariatric Surgery</option>
            // <option value="Dietician">Dietician</option>
            // <option value="Gynaecology">Gynaecology</option>
            // <option value="Cosmo Dental">Cosmo Dental</option>
            // <option value="Dental"> Dental</option>
            // <option value="Paediatric">Paediatric</option>
            // <option value="Others">Other</option>

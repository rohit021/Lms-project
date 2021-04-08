// import { AssignmentOutlined, TrendingUp, ThumbUpAlt } from '@material-ui/icons';
import {
    Home as HomeIcon,
    AssignmentOutlined as AssignmentIcon,
    FiberManualRecord as DotIcon,
    Stars as StarsIcon,
    Receipt as ReceiptIcon 
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
    { label: "Radix Leads", link: "/app/leads/radix-leads", icon: <DotIcon fontSize = "small" /> },
    { label: "Anardana Leads", link: "/app/leads/anardana-leads" , icon: <DotIcon fontSize="small"/> },
    { label: "Woodapple Leads", link: "/app/leads/woodapple-leads" , icon: <DotIcon fontSize="small"/> },
    { label: "Relp Leads", link: "/app/leads/relp-leads" , icon: <DotIcon fontSize="small" /> },
    ],   
  },
  { id: 2, label: "Review Menu", link: "/app/reviews", icon: <StarsIcon /> ,children: [
    { label: "Radix Review", link: "/app/reviews/radix-reviews", icon: <DotIcon fontSize = "small" /> },
    { label: "Anardana Review", link: "/app/reviews/anardana-reviews" , icon: <DotIcon fontSize="small"/> },
    ],
  },
  { id: 3, label: "Physical Review Menu", link: "/app/physicalreviews", icon: <ReceiptIcon /> ,children: [    
    { label: "Anardana Physical", link: "/app/reviews/anardana-physical-reviews" , icon: <DotIcon fontSize="small"/> },    
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
    { "key": 'friends', "text": 'Friends', "value": 'Friends' },
    { "key": 'google', "text": 'Google', "value": 'Google' },
    { "key": 'social', "text": 'Social Media', "value": 'Social Media' },
    { "key": 'email', "text": 'Email Marketing', "value": 'Email Marketing' },
    { "key": 'radix practo', "text": 'Radix Practo', "value": 'Radix Practo' },
    { "key": 'dental practo', "text": 'Dental Practo', "value": 'Dental Practo' },
    { "key": 'housing', "text": 'Housing', "value": 'Housing' },
    { "key": '99 acres', "text": '99 acres', "value": '99 acres' },
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
    { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'Nirman Vihar' },
    { "key": 'preet vihar', "text": 'Preet Vihar', "value": 'Preet Vihar' },
    { "key": 'janakpuri', "text": 'Janakpuri', "value": 'Janakpuri' },
    { "key": 'vikasmarg', "text": 'Vikas Marg', "value": 'Vikas Marg' },
    { "key": 'chandigarh', "text": 'Chandigarh', "value": 'Chandigarh' },
    
]

export const PropertyNameOptions = [
  { "key": '1704', "text": 'Amrapali B-1704', "value": 'Amrapali B-1704' },
  { "key": '1204', "text": 'Amrapali G-1204', "value": 'Amrapali G-1204' },
  { "key": '201', "text": 'Amrapali G-201', "value": 'Amrapali G-201' },
  { "key": 'grand_omaxe', "text": 'Grand Omaxe', "value": 'Grand Omaxe' },
  { "key": 'palla-plot', "text": 'Palla Plot', "value": 'Palla Plot' },
  { "key": 'ramprastha', "text": 'Ramprastha Plot', "value": 'Ramprastha Plot' },
  

]
export const CategoryOptions= [
  { "key": 'banquet', "text": 'Banquet ', "value": 'Banquet' },
  { "key": 'room', "text": 'Room ', "value": 'Room' },

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
    { "key": 'hot', "text": 'Hot', "value": 'Hot' },
    { "key": 'neutral', "text": 'Neutral', "value": 'Neutral' },
    { "key": 'cold', "text": 'Cold', "value": 'Cold' },    
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

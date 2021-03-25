// import { AssignmentOutlined, TrendingUp, ThumbUpAlt } from '@material-ui/icons';
import {
    Home as HomeIcon,
    AssignmentOutlined as AssignmentIcon,
    FiberManualRecord as DotIcon
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
          { label: "Harvin Leads", link: "/app/leads/harvinLeads" , icon: <DotIcon fontSize="small"/> },
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

export const LeadHeadCells = [
    { id: 'date', disablePadding: false, label: 'Date' },
    { id: 'name', disablePadding: true, label: 'Name' },    
    { id: 'email', disablePadding: false, label: 'Email' },
    { id: 'phone', disablePadding: false, label: 'Phone' },
    { id: 'center', disablePadding: false, label: 'Center' },
    { id: 'status', disablePadding: false, label: 'Status' },
    { id: 'source', disablePadding: false, label: 'Source' },
    // { id: 'actions', disablePadding: false, label: 'Actions' },
  ];
  export const CenterOptions = [
    { "key": 'delhi', "text": 'Delhi', "value": 'delhi' },
    { "key": 'chandigarh', "text": 'Chandigarh', "value": 'chandigarh' },
    { "key": 'nirman Vihar', "text": 'Nirman Vihar', "value": 'nirman vihar' },
    { "key": 'other', "text": 'Other', "value": 'other' },
]
export const DepartmentOptions = [
    { "key": 'corona', "text": 'Corona', "value": 'corona' },
    { "key": 'cardio', "text": 'Cardio', "value": 'cardio' },
    { "key": 'skin', "text": 'Skin', "value": 'skin' },
    { "key": 'other', "text": 'Other', "value": 'other' },
]
export const PriorityOptions = [
    { "key": 'hot', "text": 'Hot', "value": 'hot' },
    { "key": 'cold', "text": 'Cold', "value": 'cold' },
    { "key": 'neutral', "text": 'Neutral', "value": 'neutral' },
 
]

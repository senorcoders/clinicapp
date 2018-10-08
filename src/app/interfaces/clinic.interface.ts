
export interface PatientList {
    id:       string;
    name:     string;
    birthday: string;
    email:    string;
    phone:    string;
    notes:    string;
    imageURL: string;  
}

export interface Patient {
    id:        string;
    name:      string;
    birthday:  string;
    email:     string;
    phone:     string;
    notes:     string;
    avatarURL: string;  
}

export interface profileInfo {
    info:      any;
    contact:   any;
    services:  any;
    schooling: any;
}

export interface Appointment {
    id:           string;
    datetime:     string;
    weight:       string;
    height:       string;
    reason:       string;
    notes:        string;    
    patient:      any;
    doctor:       any;
    checkups:     any;
    prescription: any;
}

export interface Prescription {
    id:          string;
    name:        string;
    duration:    string;
    timing:      string;
    whatIsFor:   string;
    appointment: any[]
}

export interface Schooling {
    id:       string;
    name:     string;
    school:   string;
    year:     number;
    imageURL: string;
}

export interface Checkup {
    id:           string;
    reason:       string;
    notes:        string;
    imageURL:     string;
    galleryIndex: number;
}

export interface Email {
    toEmail:    string;
    subject:    string;
    body:       string;
}
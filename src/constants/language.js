export const Lang = {
  // Profile
  YourProfile: {
    english: "Settings",
    thai: "การตั้งค่า", //*
  },
  ChangeLanguage: {
    english: "Change Language to Thai",
    thai: "เปลี่ยนเป็นภาษาอังกฤษ", //*
  },
  Logout: {
    english: "Logout",
    thai: "ออกจากระบบ",
  },
  // AdminResources
  languageChange: {
    english: "Language changed to English",
    thai: "เปลี่ยนเป็นภาษาไทย", //*
  },
  AdminResources: {
    english: "Admin Resources",
    thai: "Admin Resources THAI", //*
  },
  AddNewResource: {
    english: "Add New Resource",
    thai: "Add New Resource THAI", //*
  },
  TypeHere: {
    english: "Type Here...",
    thai: "Type Here THAI...", //*
  },
  // AdminCheckIn
  CheckIns: {
    english: "Check Ins",
    thai: "Check Ins THAI",
  },
  // CheckIn
  UpdateStatus: {
    english: "Update Status",
    thai: "อัพเดทสถานะ",
  },
  TotalCheckIns: {
    english: "Total Check Ins",
    thai: "จำนวนครั้งที่เช็คอิน",
  },
  ConsecutiveDays: {
    english: "Consecutive Days",
    thai: "จำนวนวันที่เช็คอินติดต่อกัน",
  },
  AverageFeeling: {
    english: "Average Feeling",
    thai: "ความรู้สึกส่วนใหญ่",
  },
  ShareLocation: {
    english: "Share Location",
    thai: "แชร์สถานที่ของฉัน",
  },
  CheckIn: {
    english: "Check In",
    thai: "เช็คอิน",
  },
  None: {
    english: "None",
    thai: "ไม่มี",
  },
  Happy: {
    english: "🙂 Happy",
    thai: "🙂 มีความสุข",
  },
  Hopeful: {
    english: "🌷 Hopeful",
    thai: "🌷 มีความหวัง",
  },
  Awesome: {
    english: "😁 Awesome",
    thai: "😁 สุดยอดไปเลย",
  },
  Relaxed: {
    english: "😌 Relaxed",
    thai: "😌 ผ่อนคลาย",
  },
  Sad: {
    english: "😢 Sad",
    thai: "😢 เศร้า",
  },
  Concerned: {
    english: "😟 Concerned",
    thai: "😟 กังวล",
  },
  Sick: {
    english: "😷 Sick",
    thai: "😷 ไม่สบาย",
  },
  NeedHelp: {
    english: "🆘 Need Help",
    thai: "🆘 ต้องการความช่วยเหลือ",
  },

};

export function getText(language, text) {
  if (language === "English") {
    return text.english;
  } else {
    return text.thai;
  }
}

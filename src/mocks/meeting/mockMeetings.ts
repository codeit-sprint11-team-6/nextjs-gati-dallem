import { MeetingListItem } from "@/components/meeting/list/ListGrid";

// 데모 데이터 (실제 서비스에서는 React Query + API 연동)
export const MOCK_MEETINGS: MeetingListItem[] = [
  {
    id: 1,
    name: "달램핏 오피스 스트레칭",
    type: "OFFICE_STRETCHING",
    location: "건대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 4,
    capacity: 20,
    image: "/img/sample/room-1.jpg",
    host: "달램핏",
  },
  {
    id: 2,
    name: "노구뇨 오후 스트레칭",
    type: "OFFICE_STRETCHING",
    location: "홍대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 10,
    capacity: 20,
    image: "/img/sample/cafe-1.jpg",
    host: "달램핏",
  },
  {
    id: 3,
    name: "나를 돌아보는 30분",
    type: "MINDFULNESS",
    location: "신림",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 20,
    capacity: 20,
    image: "/img/sample/room-2.jpg",
    host: "달램핏",
  },
  {
    id: 4,
    name: "힐링 마인드 클래스",
    type: "MINDFULNESS",
    location: "건대입구",
    dateTime: "2025-01-07T17:30:00Z",
    participantCount: 4,
    capacity: 20,
    image: "/img/sample/room-1.jpg",
    host: "달램핏",
  },
];

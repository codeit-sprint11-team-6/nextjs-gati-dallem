import { Gathering } from "@/types";

export const mockFavorites = {
  "1": { ids: [1, 2, 3], count: 3, updatedAt: "2025-11-02T16:46:49.233Z" },
};

export const mockFavoriteGatherings: Gathering[] = [
  {
    teamId: "11-6",
    id: 1,
    type: "OFFICE_STRETCHING",
    name: "치이카와 게임 만들기 웹 프로젝트",
    dateTime: "2025-10-16T00:00:00.000Z",
    registrationEnd: "2025-10-15T23:59:59.000Z",
    location: "홍대입구",
    participantCount: 2,
    capacity: 5,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760526939860_%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%AA.jpeg",
    createdBy: 2227,
    canceledAt: null,
  },
  {
    teamId: "11-6",
    id: 2,
    type: "OFFICE_STRETCHING",
    name: "치이카와 게임 만들기 Android 프로젝트",
    dateTime: "2025-10-15T11:30:00.000Z",
    registrationEnd: "2025-10-15T11:29:59.000Z",
    location: "홍대입구",
    participantCount: 2,
    capacity: 5,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760527545376_%C3%A1%C2%84%C2%86%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%A8%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%B1%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A6%C3%A1%C2%86%C2%BA2.jpg",
    createdBy: 2227,
    canceledAt: null,
  },
];

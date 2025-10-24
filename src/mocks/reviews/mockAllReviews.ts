export const mockAllReviews = [
  {
    teamId: "11-6",
    id: 1,
    score: 5,
    comment: "강사분도 친절하시고 ~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요 ~ ^^",
    createdAt: "2024-01-25T00:00:00.000Z",
    Gathering: {
      teamId: "11-6",
      id: 1,
      type: "OFFICE_STRETCHING" as const,
      name: "오피스 스트레칭 이용",
      dateTime: "2024-01-25T00:00:00.000Z",
      location: "을지로 3가",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760431482840_68747470733a2f2f7365637572652e6d65657475707374617469632e636f6d2f70686f746f732f6576656e742f322f622f392f632f686967687265735f3531383239313136342e6a706567.avif",
    },
    User: {
      teamId: "11-6",
      id: 1,
      name: "럽윈즈올",
      image: "/image/avatars/female.svg",
    },
  },
  {
    teamId: "11-6",
    id: 2,
    score: 5,
    comment: "차분하고 포근한 느낌 덕분에 처음인데도 금방 편해졌어요 !",
    createdAt: "2024-01-25T00:00:00.000Z",
    Gathering: {
      teamId: "11-6",
      id: 2,
      type: "MINDFULNESS" as const,
      name: "마인드 풀니스 이용",
      dateTime: "2024-01-25T00:00:00.000Z",
      location: "을지로 3가",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760431482840_68747470733a2f2f7365637572652e6d65657475707374617469632e636f6d2f70686f746f732f6576656e742f322f622f392f632f686967687265735f3531383239313136342e6a706567.avif",
    },
    User: {
      teamId: "11-6",
      id: 2,
      name: "럽윈즈올",
      image: "/image/avatars/female.svg",
    },
  },
  {
    teamId: "11-6",
    id: 3,
    score: 4,
    comment:
      "따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 같이달램 생기니까 너무 좋아요! 프로그램이 더 늘어났으면 좋겠어요.",
    createdAt: "2024-01-25T00:00:00.000Z",
    Gathering: {
      teamId: "11-6",
      id: 3,
      type: "OFFICE_STRETCHING" as const,
      name: "오피스 스트레칭 이용",
      dateTime: "2024-01-25T00:00:00.000Z",
      location: "을지로 3가",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760431482840_68747470733a2f2f7365637572652e6d65657475707374617469632e636f6d2f70686f746f732f6576656e742f322f622f392f632f686967687265735f3531383239313136342e6a706567.avif",
    },
    User: {
      teamId: "11-6",
      id: 3,
      name: "당근조아",
      image: "/image/avatars/male.svg",
    },
  },
  {
    teamId: "11-6",
    id: 4,
    score: 4,
    comment:
      "따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 같이달램 생기니까 너무 좋아요! 프로그램이 더 늘어났으면 좋겠어요.",
    createdAt: "2024-01-25T00:00:00.000Z",
    Gathering: {
      teamId: "11-6",
      id: 4,
      type: "OFFICE_STRETCHING" as const,
      name: "오피스 스트레칭 이용",
      dateTime: "2024-01-25T00:00:00.000Z",
      location: "을지로 3가",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1760431482840_68747470733a2f2f7365637572652e6d65657475707374617469632e636f6d2f70686f746f732f6576656e742f322f622f392f632f686967687265735f3531383239313136342e6a706567.avif",
    },
    User: {
      teamId: "11-6",
      id: 4,
      name: "당근조아",
      image: "/image/avatars/male.svg",
    },
  },
];

export const mockRatingSummary = {
  averageScore: 4.0,
  totalReviews: 32,
  scoreBreakdown: [
    { score: 5, count: 27 },
    { score: 4, count: 4 },
    { score: 3, count: 1 },
    { score: 2, count: 0 },
    { score: 1, count: 0 },
  ],
};

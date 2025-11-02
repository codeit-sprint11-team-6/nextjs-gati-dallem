// import FavoriteCardItem from "@/components/favorites/FavoriteCardItem";
// import { mockFavoriteGatherings } from "@/mocks/favorites/mockFavorites";
// import { overlaySpy, resetOverlaySpy } from "@/test/__mocks__/overlay";
// import { fireEvent, render, screen } from "@testing-library/react";
// import React from "react";

// // MessageModal: overlay 호출 시 넘겨받는 엘리먼트 구조만 확인할 수 있게 단순화
// jest.mock("../common/MessageModal", () => ({
//   __esModule: true,
//   default: ({ message }: { message: string }) => <div data-testid="message-modal">{message}</div>,
// }));

// const joinMutateMock = jest.fn();
// jest.mock("@/apis/gatherings/gatherings.query", () => ({
//   useJoinGathering: () => ({
//     mutate: joinMutateMock,
//   }),
// }));

// const mockData = mockFavoriteGatherings[0];

// // 날짜 고정 (등록 마감 판단용)
// const fixedNow = new Date("2099-01-01T00:00:00Z");

// describe("<FavoriteCardItem />", () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//     jest.setSystemTime(fixedNow);
//     joinMutateMock.mockReset();
//     resetOverlaySpy();
//   });

//   afterEach(() => {
//     jest.useRealTimers();
//   });

//   test("모집 가능 상태: '참여하기' 버튼이 보이고 클릭 시 joinMutate 호출 & onSuccess에서 overlay 호출", () => {
//     const favoriteGathering = {
//       ...mockData,
//       capacity: 5,
//       participantCount: 2,
//       registrationEnd: "2099-02-01T00:00:00Z", // 미래 → 마감 아님
//     };

//     render(<FavoriteCardItem {...favoriteGathering} />);

//     const joinBtn = screen.getByRole("button", { name: "참여하기" });
//     expect(joinBtn).toBeEnabled();

//     // 클릭
//     fireEvent.click(joinBtn);

//     // mutate 호출 확인: (id, options)
//     expect(joinMutateMock).toHaveBeenCalledTimes(1);
//     const [calledId, options] = joinMutateMock.mock.calls[0];
//     expect(calledId).toBe(favoriteGathering.id);
//     expect(typeof options?.onSuccess).toBe("function");

//     // onSuccess 수동 호출 → overlay 호출 확인
//     const fakeResponse = { message: "신청 완료!" };
//     options.onSuccess(fakeResponse);
//     expect(overlaySpy).toHaveBeenCalledTimes(1);

//     // overlay가 MessageModal 요소를 받았는지(정확한 트리 검증 대신 간단 체크)
//     const [[overlayArg]] = overlaySpy.mock.calls;
//     expect(React.isValidElement(overlayArg)).toBe(true);
//     // MessageModal props까지 확인
//     expect(overlayArg.props.message).toBe("신청 완료!");
//   });

//   test("등록 마감 상태: '모임 참여 마감' 버튼이 disabled로 보인다", () => {
//     const favoriteGathering = {
//       ...mockData,
//       registrationEnd: "2098-12-31T23:59:59Z",
//     };

//     render(<FavoriteCardItem {...favoriteGathering} />);

//     const closedBtn = screen.getByRole("button", { name: "모임 참여 마감" });
//     expect(closedBtn).toBeDisabled();
//   });

//   test("정원 초과 상태: '모집 완료' 버튼이 disabled로 보인다", () => {
//     const favoriteGathering = {
//       ...mockData,
//       capacity: 5,
//       participantCount: 5,
//     };

//     render(<FavoriteCardItem {...favoriteGathering} />);

//     const fullBtn = screen.getByRole("button", { name: "모집 완료" });
//     expect(fullBtn).toBeDisabled();
//   });

//   test("모임 기본 정보가 Card.Title과 위치에 반영된다", () => {
//     const favoriteGathering = { ...mockData, name: "타입스크립트 북클럽", location: "을지로" };

//     render(<FavoriteCardItem {...favoriteGathering} />);

//     expect(screen.getByTestId("card-title")).toHaveTextContent("타입스크립트 북클럽");
//     expect(screen.getByText("위치")).toBeInTheDocument();
//     expect(screen.getByText("을지로")).toBeInTheDocument();
//   });
// });

test("hi", () => {});

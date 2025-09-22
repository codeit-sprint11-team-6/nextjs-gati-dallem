export default function Home() {
  return (
    <div className="bg-gradient-green min-h-screen p-8">
      <div className="container-custom">
        {/* 메인 헤더 */}
        <div className="mb-12 text-center">
          <h1 className="heading-1 text-gradient-purple-pink mb-4">11기 6조 디자인 시스템</h1>
          <p className="body-large text-gray-600">
            Tailwind CSS v4 + OKLCH 컬러 + 완전한 컴포넌트 시스템
          </p>
        </div>

        {/* 타이포그래피 시스템 테스트 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">타이포그래피 시스템</h2>

          <div className="space-y-6">
            <div>
              <h1 className="heading-1 mb-2">Heading 1 - 가장 큰 제목</h1>
              <p className="caption">heading-1 클래스 사용</p>
            </div>

            <div>
              <h2 className="heading-2 mb-2">Heading 2 - 섹션 제목</h2>
              <p className="caption">heading-2 클래스 사용</p>
            </div>

            <div>
              <h3 className="heading-3 mb-2">Heading 3 - 서브 섹션</h3>
              <p className="caption">heading-3 클래스 사용</p>
            </div>

            <div>
              <h4 className="heading-4 mb-2">Heading 4 - 작은 제목</h4>
              <p className="caption">heading-4 클래스 사용</p>
            </div>

            <div>
              <p className="body-large mb-2">
                Body Large - 큰 본문 텍스트입니다. 중요한 내용을 강조할 때 사용합니다.
              </p>
              <p className="caption">body-large 클래스 사용</p>
            </div>

            <div>
              <p className="body-regular mb-2">
                Body Regular - 일반적인 본문 텍스트입니다. 대부분의 내용에 사용하는 기본
                텍스트입니다.
              </p>
              <p className="caption">body-regular 클래스 사용</p>
            </div>

            <div>
              <p className="body-small mb-2">
                Body Small - 작은 본문 텍스트입니다. 부가 정보나 설명에 사용합니다.
              </p>
              <p className="caption">body-small 클래스 사용</p>
            </div>

            <div>
              <p className="caption">
                Caption - 캡션 텍스트입니다. 이미지 설명이나 작은 라벨에 사용합니다.
              </p>
              <p className="caption">caption 클래스 사용</p>
            </div>
          </div>
        </div>

        {/* 버튼 시스템 테스트 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">버튼 시스템</h2>

          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-4">기본 버튼들</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-gradient">Gradient Button</button>
                <button className="btn-outline">Outline Button</button>
              </div>
            </div>

            <div>
              <h3 className="heading-3 mb-4">버튼 크기 변형</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-primary px-3 py-1.5 text-sm">Small</button>
                <button className="btn-primary">Medium</button>
                <button className="btn-primary px-6 py-3 text-lg">Large</button>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 시스템 테스트 */}
        <div className="mb-8">
          <h2 className="heading-2 mb-6">카드 시스템</h2>

          <div className="grid-auto-fit grid gap-6">
            <div className="card p-6">
              <h3 className="heading-3 mb-3">기본 카드</h3>
              <p className="body-regular mb-4">
                기본 카드 컴포넌트입니다. 깔끔한 그림자와 테두리가 적용되어 있습니다.
              </p>
              <div className="flex-end">
                <button className="btn-primary">액션</button>
              </div>
            </div>

            <div className="card-hover p-6">
              <h3 className="heading-3 mb-3">호버 카드</h3>
              <p className="body-regular mb-4">
                마우스를 올리면 부드러운 애니메이션이 적용됩니다. 위로 살짝 떠오르는 효과를
                확인해보세요.
              </p>
              <div className="flex-end">
                <button className="btn-secondary">액션</button>
              </div>
            </div>

            <div className="card-gradient p-6">
              <h3 className="heading-3 mb-3">그라데이션 카드</h3>
              <p className="body-regular mb-4">
                브랜드 그라데이션이 적용된 카드입니다. 호버 시 더욱 역동적인 효과를 보여줍니다.
              </p>
              <div className="flex-end">
                <button className="btn-outline">액션</button>
              </div>
            </div>
          </div>
        </div>

        {/* OKLCH vs HEX 비교 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">OKLCH vs HEX 컬러 비교</h2>

          <div className="mb-8">
            <h3 className="heading-3 mb-4">컬러 시스템 비교</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <h4 className="mb-3 font-semibold text-gray-800">HEX 컬러 (현재 사용)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-100"></div>
                    <code className="text-gray-600">#DDDDDD</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-300"></div>
                    <code className="text-gray-600">#BBBBBB</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-500"></div>
                    <code className="text-gray-600">#737373</code>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  ✅ 직관적, 호환성 좋음
                  <br />❌ 인지적 불균일
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-6">
                <h4 className="mb-3 font-semibold text-gray-800">OKLCH 컬러 (이론적)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-100"></div>
                    <code className="text-gray-600">oklch(0.967 0.003 264.542)</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-300"></div>
                    <code className="text-gray-600">oklch(0.872 0.01 258.338)</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded border bg-gray-500"></div>
                    <code className="text-gray-600">oklch(0.551 0.027 264.364)</code>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  ✅ 인지적 균일, 미래 지향적
                  <br />❌ 복잡함, 호환성 이슈
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 컬러 팔레트 테스트 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">Figma 기준 HEX 컬러 팔레트</h2>

          {/* 메인 브랜드 컬러 - Green (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-green-700">Green (메인 브랜드 - Figma 기준)</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-green-900">50</div>
                <div className="caption text-xs text-green-600">#DFFAEB</div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-100 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-green-900">100</div>
                <div className="caption text-xs text-green-600">#C5F1D9</div>
              </div>
              <div className="rounded-lg border border-green-400 bg-green-300 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-green-900">300</div>
                <div className="caption text-xs text-green-600">#8D96F6</div>
              </div>
              <div className="rounded-lg bg-green-500 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">500</div>
                <div className="caption text-xs opacity-80">#00BB86</div>
              </div>
              <div className="rounded-lg bg-green-700 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">700</div>
                <div className="caption text-xs opacity-80">#0C7665</div>
              </div>
            </div>
          </div>

          {/* 보조 브랜드 컬러 - Blue (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-blue-700">Blue (보조 브랜드 - Figma 기준)</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-blue-900">50</div>
                <div className="caption text-xs text-blue-600">#D6F9FF</div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-100 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-blue-900">100</div>
                <div className="caption text-xs text-blue-600">#D6F9FF</div>
              </div>
              <div className="rounded-lg border border-blue-400 bg-blue-300 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-blue-900">300</div>
                <div className="caption text-xs text-blue-600">#D6F9FF</div>
              </div>
              <div className="rounded-lg bg-blue-500 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">500</div>
                <div className="caption text-xs opacity-80">#2099FD</div>
              </div>
              <div className="rounded-lg bg-blue-700 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">700</div>
                <div className="caption text-xs opacity-80">#337AFF</div>
              </div>
            </div>
          </div>

          {/* 특별 컬러 - Purple (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-purple-700">Purple (특별 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-purple-900">50</div>
                <div className="caption text-xs text-purple-600">#C3C8FA</div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-100 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-purple-900">100</div>
                <div className="caption text-xs text-purple-600">#A8AFF8</div>
              </div>
              <div className="rounded-lg border border-purple-400 bg-purple-300 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-purple-900">300</div>
                <div className="caption text-xs text-purple-600">#8D96F6</div>
              </div>
              <div className="rounded-lg bg-purple-500 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">500</div>
                <div className="caption text-xs opacity-80">#5865F2</div>
              </div>
              <div className="rounded-lg bg-purple-700 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">700</div>
                <div className="caption text-xs opacity-80">#38419B</div>
              </div>
            </div>
          </div>

          {/* 특별 컬러 - Pink (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-pink-700">Pink (특별 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <div className="rounded-lg border border-pink-100 bg-pink-50 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-pink-900">50</div>
                <div className="caption text-xs text-pink-600">#FFBFEF</div>
              </div>
              <div className="rounded-lg border border-pink-200 bg-pink-100 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-pink-900">100</div>
                <div className="caption text-xs text-pink-600">#FFBFEF</div>
              </div>
              <div className="rounded-lg border border-pink-400 bg-pink-300 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-pink-900">300</div>
                <div className="caption text-xs text-pink-600">#FF4CD2</div>
              </div>
              <div className="rounded-lg bg-pink-500 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">500</div>
                <div className="caption text-xs opacity-80">#FF4CD2</div>
              </div>
              <div className="rounded-lg bg-pink-700 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">700</div>
                <div className="caption text-xs opacity-80">#E043B9</div>
              </div>
            </div>
          </div>

          {/* 그레이 스케일 (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-gray-700">Gray (중성 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-gray-900">50</div>
                <div className="caption text-xs text-gray-600">#EEEEEE</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-100 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-gray-900">100</div>
                <div className="caption text-xs text-gray-600">#DDDDDD</div>
              </div>
              <div className="rounded-lg border border-gray-400 bg-gray-300 p-3 text-center">
                <div className="mb-1 text-sm font-bold text-gray-900">300</div>
                <div className="caption text-xs text-gray-600">#BBBBBB</div>
              </div>
              <div className="rounded-lg bg-gray-500 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">500</div>
                <div className="caption text-xs opacity-80">#737373</div>
              </div>
              <div className="rounded-lg bg-gray-700 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">700</div>
                <div className="caption text-xs opacity-80">#333333</div>
              </div>
              <div className="rounded-lg bg-gray-900 p-3 text-center text-white">
                <div className="mb-1 text-sm font-bold">900</div>
                <div className="caption text-xs opacity-80">#191919</div>
              </div>
            </div>
          </div>

          {/* 컬러 조합 예시 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">컬러 조합 예시</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-green-400 to-blue-500 p-6 text-white">
                <h4 className="mb-2 font-bold">Green → Blue</h4>
                <p className="caption opacity-90">자연스러운 전환</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white">
                <h4 className="mb-2 font-bold">Purple → Pink</h4>
                <p className="caption opacity-90">브랜드 그라데이션</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 p-6 text-white">
                <h4 className="mb-2 font-bold">Blue → Purple</h4>
                <p className="caption opacity-90">차분한 조화</p>
              </div>
            </div>
          </div>

          {/* 컬러 사용 가이드 */}
          <div className="rounded-xl bg-gray-50 p-6">
            <h3 className="heading-3 mb-4">컬러 사용 가이드</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-gray-800">브랜드 컬러</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <span className="font-medium text-green-600">Green 500</span>: 메인 액션, CTA
                    버튼
                  </li>
                  <li>
                    • <span className="font-medium text-blue-600">Blue 500</span>: 보조 액션, 링크
                  </li>
                  <li>
                    • <span className="font-medium text-purple-600">Purple 500</span>: 특별 기능,
                    강조
                  </li>
                  <li>
                    • <span className="font-medium text-pink-600">Pink 500</span>: 특별 기능, 강조
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-800">상태 컬러</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <span className="font-medium text-gray-600">Gray 100-300</span>: 배경, 테두리
                  </li>
                  <li>
                    • <span className="font-medium text-gray-600">Gray 500-700</span>: 텍스트,
                    아이콘
                  </li>
                  <li>
                    • <span className="font-medium text-gray-600">Gray 900</span>: 제목, 강조 텍스트
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Figma 그라데이션 시스템 테스트 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">Figma 그라데이션 시스템</h2>

          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-4">Figma 기준 그라디언트</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gradient-purple-pink-100 rounded-xl p-6 text-center">
                  <h4 className="mb-2 font-bold text-gray-800">Purple-Pink 100</h4>
                  <p className="caption text-gray-600">#DEE0FC → #FFDBF6</p>
                </div>
                <div className="bg-gradient-purple-pink-500 rounded-xl p-6 text-center">
                  <h4 className="mb-2 font-bold text-gray-800">Purple-Pink 500</h4>
                  <p className="caption text-gray-600">#8D96F6 → #FF85E0</p>
                </div>
                <div className="bg-gradient-purple-pink-600 rounded-xl p-6 text-center text-white">
                  <h4 className="mb-2 font-bold">Purple-Pink 600</h4>
                  <p className="caption opacity-90">#5865F2 → #FF4CD2</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="heading-3 mb-4">기존 그라디언트</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-gradient-green rounded-xl p-6 text-center">
                  <h4 className="mb-2 font-bold text-gray-800">Green Gradient</h4>
                  <p className="caption text-gray-600">#E3F8ED → #E5F9F8</p>
                </div>
                <div className="bg-gradient-blue rounded-xl p-6 text-center">
                  <h4 className="mb-2 font-bold text-gray-800">Blue Gradient</h4>
                  <p className="caption text-gray-600">#D6F9FF → #E3F8ED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 특수 효과 테스트 */}
        <div className="card-gradient mb-8 p-8 text-center">
          <h3 className="heading-2 mb-4">특수 효과 & 애니메이션</h3>
          <p className="body-large mb-6">
            브랜드 그라데이션과 다양한 시각적 효과들을 테스트해보세요!
          </p>

          <div className="flex-center flex-wrap gap-6">
            <div className="glass rounded-lg p-4">
              <span className="font-semibold">글래스모피즘</span>
            </div>
            <div className="animate-glow rounded-lg bg-white/20 p-4">
              <span className="font-semibold">글로우 효과</span>
            </div>
            <div className="bg-gradient-radial rounded-lg p-4 text-white">
              <span className="font-semibold">방사형 그라데이션</span>
            </div>
            <div className="animate-bounce-slow rounded-lg bg-white/20 p-4">
              <span className="font-semibold">슬로우 바운스</span>
            </div>
          </div>
        </div>

        {/* 폼 요소 테스트 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">폼 요소</h2>

          <div className="max-w-md space-y-4">
            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">이메일 주소</label>
              <input type="email" className="input" placeholder="example@email.com" />
            </div>

            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">비밀번호</label>
              <input type="password" className="input" placeholder="비밀번호를 입력하세요" />
            </div>

            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">메시지</label>
              <textarea
                className="input min-h-[100px] resize-none"
                placeholder="메시지를 입력하세요..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button className="btn-primary">제출</button>
              <button className="btn-outline">취소</button>
            </div>
          </div>
        </div>

        {/* 레이아웃 시스템 테스트 */}
        <div className="card p-8">
          <h2 className="heading-2 mb-6">레이아웃 시스템</h2>

          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-3">플렉스 유틸리티</h3>
              <div className="space-y-3">
                <div className="flex-center rounded bg-gray-100 p-4">
                  <span className="body-small">flex-center</span>
                </div>
                <div className="flex-between rounded bg-gray-100 p-4">
                  <span className="body-small">왼쪽</span>
                  <span className="body-small">오른쪽</span>
                </div>
                <div className="flex-start rounded bg-gray-100 p-4">
                  <span className="body-small">flex-start</span>
                </div>
                <div className="flex-end rounded bg-gray-100 p-4">
                  <span className="body-small">flex-end</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="heading-3 mb-3">컨테이너 시스템</h3>
              <div className="space-y-2">
                <div className="container-narrow rounded bg-blue-50 p-4">
                  <span className="body-small">container-narrow (max-width: 56rem)</span>
                </div>
                <div className="container-custom rounded bg-green-50 p-4">
                  <span className="body-small">container-custom (max-width: 80rem)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

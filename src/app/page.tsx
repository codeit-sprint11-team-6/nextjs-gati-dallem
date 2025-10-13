export default function Home() {
  return (
    <div className="bg-gradient-green min-h-screen p-8">
      <div className="container-custom">
        {/* Main Header */}
        <div className="mb-12 text-center">
          <h1 className="heading-1 text-gradient-purple-pink mb-4">Design System</h1>
          <p className="body-large text-gray-600">
            Tailwind CSS v4 + OKLCH Colors + Complete Component System
          </p>
        </div>

        {/* 타이포그래피 시스템 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">타이포그래피 시스템</h2>
          <p className="body-regular mb-8 text-gray-600">
            Figma 디자인 시스템과 정확히 일치하는 타이포그래피 스펙
          </p>

          <div className="space-y-8">
            {/* Pretendard 폰트 시스템 */}
            <div>
              <h3 className="heading-3 mb-4 text-purple-700">Pretendard 폰트 시스템</h3>
              <div className="space-y-6">
                <div>
                  <h1 className="heading-1 mb-2">Heading 1 - Main Title</h1>
                  <p className="caption">heading-1 class • 30px / 36px • font-extrabold</p>
                </div>

                <div>
                  <h2 className="heading-2 mb-2">Heading 2 - Section Title</h2>
                  <p className="caption">heading-2 class • 24px / 32px • font-bold</p>
                </div>

                <div>
                  <h3 className="heading-3 mb-2">Heading 3 - Subsection</h3>
                  <p className="caption">heading-3 class • 20px / 28px • font-semibold</p>
                </div>

                <div>
                  <h4 className="heading-4 mb-2">Heading 4 - Card Title</h4>
                  <p className="caption">heading-4 class • 18px / 28px • font-semibold</p>
                </div>

                <div>
                  <p className="body-large mb-2">
                    Body Large - Important content with medium weight
                  </p>
                  <p className="caption">body-large class • 18px / 28px • font-medium</p>
                </div>

                <div>
                  <p className="body-regular mb-2">
                    Body Regular - Standard paragraph text with normal weight
                  </p>
                  <p className="caption">body-regular class • 16px / 24px • font-normal</p>
                </div>

                <div>
                  <p className="body-small mb-2">Body Small - Secondary information</p>
                  <p className="caption">body-small class • 14px / 20px • font-normal</p>
                </div>

                <div>
                  <p className="caption">Caption - Small helper text</p>
                  <p className="caption">caption class • 12px / 16px • font-normal</p>
                </div>
              </div>
            </div>

            {/* Tenada 폰트 시스템 */}
            <div>
              <h3 className="heading-3 mb-4 text-pink-700">Tenada 폰트 시스템</h3>
              <div className="space-y-6">
                <div>
                  <p className="tenada mb-2">Tenada</p>
                  <p className="caption">
                    tenada class • 24px / 30px • font-extrabold • letter-spacing: -1.44px
                  </p>
                </div>
              </div>
            </div>

            {/* 폰트 비교 */}
            <div>
              <h3 className="heading-3 mb-4 text-green-700">폰트 비교</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="heading-2 mb-2">Pretendard Heading 2</p>
                  <p className="tenada mb-2">Tenada</p>
                  <p className="caption">비슷한 크기 (24px vs 24px), 다른 폰트 패밀리와 스타일</p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="heading-4 mb-2">Pretendard Heading 4</p>
                  <p className="tenada mb-2">Tenada</p>
                  <p className="caption">다른 크기 (18px vs 24px), 다른 폰트 패밀리와 웨이트</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 시스템 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">버튼 시스템</h2>

          <div className="space-y-8">
            {/* 기본 버튼들 */}
            <div>
              <h3 className="heading-3 mb-4">기본 버튼 스타일</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary</button>
                <button className="btn-secondary">Secondary</button>
                <button className="btn-gradient">Gradient</button>
                <button className="btn-outline">Outline</button>
              </div>
            </div>

            {/* 버튼 크기 */}
            <div>
              <h3 className="heading-3 mb-4">버튼 크기</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-primary px-2 py-1 text-xs">XS</button>
                <button className="btn-primary px-3 py-1.5 text-sm">Small</button>
                <button className="btn-primary">Medium</button>
                <button className="btn-primary px-6 py-3 text-lg">Large</button>
                <button className="btn-primary px-8 py-4 text-xl">XL</button>
              </div>
            </div>

            {/* 컬러 변형 */}
            <div>
              <h3 className="heading-3 mb-4">컬러 변형</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <button className="btn bg-purple-500 text-white hover:bg-purple-600">Purple</button>
                <button className="btn bg-pink-500 text-white hover:bg-pink-600">Pink</button>
                <button className="btn bg-green-500 text-white hover:bg-green-600">Green</button>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600">Blue</button>
              </div>
            </div>

            {/* 상태별 버튼 */}
            <div>
              <h3 className="heading-3 mb-4">상태별 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Normal</button>
                <button className="btn-primary transition-transform hover:scale-105">Hover</button>
                <button className="btn-primary cursor-not-allowed opacity-50" disabled>
                  Disabled
                </button>
                <button className="btn-primary animate-pulse">Loading</button>
              </div>
            </div>

            {/* 아이콘 버튼 */}
            <div>
              <h3 className="heading-3 mb-4">아이콘 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <span>+</span> Add Item
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <span>→</span> Continue
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <span>×</span> Cancel
                </button>
                <button className="btn-gradient flex items-center gap-2">
                  <span>★</span> Favorite
                </button>
              </div>
            </div>

            {/* 그라데이션 버튼 */}
            <div>
              <h3 className="heading-3 mb-4">그라데이션 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                  Purple-Pink
                </button>
                <button className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600">
                  Green-Blue
                </button>
                <button className="btn bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600">
                  Blue-Purple
                </button>
                <button className="btn bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600">
                  Pink-Purple
                </button>
              </div>
            </div>

            {/* 특수 효과 버튼 */}
            <div>
              <h3 className="heading-3 mb-4">특수 효과 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary shadow-lg transition-shadow hover:shadow-xl">
                  Shadow
                </button>
                <button className="btn-secondary border-2 border-transparent transition-colors hover:border-pink-300">
                  Border
                </button>
                <button className="btn-outline transition-colors hover:bg-gray-50">Smooth</button>
                <button className="btn-gradient shadow-glow transition-transform hover:scale-105">
                  Glow
                </button>
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div>
              <h3 className="heading-3 mb-4">버튼 그룹</h3>
              <div className="flex gap-0">
                <button className="btn-outline rounded-l-lg rounded-r-none border-r-0">Left</button>
                <button className="btn-outline rounded-none border-r-0">Middle</button>
                <button className="btn-outline rounded-l-none rounded-r-lg">Right</button>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 시스템 */}
        <div className="mb-8">
          <h2 className="heading-2 mb-6">카드 시스템</h2>

          <div className="grid-auto-fit grid gap-6">
            <div className="card p-6">
              <h3 className="heading-3 mb-3">Basic Card</h3>
              <p className="body-regular mb-4">
                Basic card component with clean shadow and border styling.
              </p>
              <div className="flex-end">
                <button className="btn-primary">Action</button>
              </div>
            </div>

            <div className="card-hover p-6">
              <h3 className="heading-3 mb-3">Hover Card</h3>
              <p className="body-regular mb-4">Card with smooth hover animation and lift effect.</p>
              <div className="flex-end">
                <button className="btn-secondary">Action</button>
              </div>
            </div>

            <div className="card-gradient p-6">
              <h3 className="heading-3 mb-3">Gradient Card</h3>
              <p className="body-regular mb-4">
                Card with brand gradient background and dynamic hover effects.
              </p>
              <div className="flex-end">
                <button className="btn-outline">Action</button>
              </div>
            </div>
          </div>
        </div>

        {/* 컬러 시스템 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">컬러 시스템</h2>
          <p className="body-regular mb-8 text-gray-600">
            OKLCH color system for perceptual uniformity and modern design.
          </p>

          {/* 메인 컬러 팔레트 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">메인 컬러 팔레트</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-purple-500 p-4 text-center text-white">
                <div className="font-semibold">Purple</div>
                <div className="text-xs opacity-80">Primary</div>
              </div>
              <div className="rounded-lg bg-pink-500 p-4 text-center text-white">
                <div className="font-semibold">Pink</div>
                <div className="text-xs opacity-80">Primary</div>
              </div>
              <div className="rounded-lg bg-green-500 p-4 text-center text-white">
                <div className="font-semibold">Green</div>
                <div className="text-xs opacity-80">Secondary</div>
              </div>
              <div className="rounded-lg bg-blue-500 p-4 text-center text-white">
                <div className="font-semibold">Blue</div>
                <div className="text-xs opacity-80">Secondary</div>
              </div>
            </div>
          </div>

          {/* 메인 컬러 팔레트 스케일 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">메인 컬러 팔레트 스케일</h3>
            <div className="space-y-6">
              {/* Purple 스케일 */}
              <div>
                <h4 className="heading-4 mb-3 text-purple-700">Purple 스케일</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                  <div className="rounded bg-purple-100 p-3 text-center">
                    <div className="text-xs font-medium text-purple-800">100</div>
                    <div className="text-xs text-purple-600">Light</div>
                  </div>
                  <div className="rounded bg-purple-200 p-3 text-center">
                    <div className="text-xs font-medium text-purple-800">200</div>
                    <div className="text-xs text-purple-600">Lighter</div>
                  </div>
                  <div className="rounded bg-purple-300 p-3 text-center">
                    <div className="text-xs font-medium text-purple-800">300</div>
                    <div className="text-xs text-purple-600">Light</div>
                  </div>
                  <div className="rounded bg-purple-500 p-3 text-center text-white">
                    <div className="text-xs font-medium">500</div>
                    <div className="text-xs opacity-80">Base</div>
                  </div>
                  <div className="rounded bg-purple-600 p-3 text-center text-white">
                    <div className="text-xs font-medium">600</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-purple-800 p-3 text-center text-white">
                    <div className="text-xs font-medium">800</div>
                    <div className="text-xs opacity-80">Darker</div>
                  </div>
                </div>
              </div>

              {/* Pink 스케일 */}
              <div>
                <h4 className="heading-4 mb-3 text-pink-700">Pink 스케일</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                  <div className="rounded bg-pink-100 p-3 text-center">
                    <div className="text-xs font-medium text-pink-800">100</div>
                    <div className="text-xs text-pink-600">Light</div>
                  </div>
                  <div className="rounded bg-pink-500 p-3 text-center text-white">
                    <div className="text-xs font-medium">500</div>
                    <div className="text-xs opacity-80">Base</div>
                  </div>
                  <div className="rounded bg-pink-600 p-3 text-center text-white">
                    <div className="text-xs font-medium">600</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                </div>
              </div>

              {/* Green 스케일 */}
              <div>
                <h4 className="heading-4 mb-3 text-green-700">Green 스케일</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                  <div className="rounded bg-green-50 p-3 text-center">
                    <div className="text-xs font-medium text-green-800">50</div>
                    <div className="text-xs text-green-600">Lightest</div>
                  </div>
                  <div className="rounded bg-green-100 p-3 text-center">
                    <div className="text-xs font-medium text-green-800">100</div>
                    <div className="text-xs text-green-600">Light</div>
                  </div>
                  <div className="rounded bg-green-200 p-3 text-center">
                    <div className="text-xs font-medium text-green-800">200</div>
                    <div className="text-xs text-green-600">Lighter</div>
                  </div>
                  <div className="rounded bg-green-300 p-3 text-center">
                    <div className="text-xs font-medium text-green-800">300</div>
                    <div className="text-xs text-green-600">Light</div>
                  </div>
                  <div className="rounded bg-green-400 p-3 text-center">
                    <div className="text-xs font-medium text-green-800">400</div>
                    <div className="text-xs text-green-600">Medium</div>
                  </div>
                  <div className="rounded bg-green-500 p-3 text-center text-white">
                    <div className="text-xs font-medium">500</div>
                    <div className="text-xs opacity-80">Base</div>
                  </div>
                  <div className="rounded bg-green-600 p-3 text-center text-white">
                    <div className="text-xs font-medium">600</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-green-700 p-3 text-center text-white">
                    <div className="text-xs font-medium">700</div>
                    <div className="text-xs opacity-80">Darker</div>
                  </div>
                  <div className="rounded bg-green-800 p-3 text-center text-white">
                    <div className="text-xs font-medium">800</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-green-900 p-3 text-center text-white">
                    <div className="text-xs font-medium">900</div>
                    <div className="text-xs opacity-80">Darkest</div>
                  </div>
                  <div className="rounded bg-green-950 p-3 text-center text-white">
                    <div className="text-xs font-medium">950</div>
                    <div className="text-xs opacity-80">Darkest</div>
                  </div>
                </div>
              </div>

              {/* Blue 스케일 */}
              <div>
                <h4 className="heading-4 mb-3 text-blue-700">Blue 스케일</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                  <div className="rounded bg-blue-50 p-3 text-center">
                    <div className="text-xs font-medium text-blue-800">50</div>
                    <div className="text-xs text-blue-600">Lightest</div>
                  </div>
                  <div className="rounded bg-blue-100 p-3 text-center">
                    <div className="text-xs font-medium text-blue-800">100</div>
                    <div className="text-xs text-blue-600">Light</div>
                  </div>
                  <div className="rounded bg-blue-200 p-3 text-center">
                    <div className="text-xs font-medium text-blue-800">200</div>
                    <div className="text-xs text-blue-600">Lighter</div>
                  </div>
                  <div className="rounded bg-blue-300 p-3 text-center">
                    <div className="text-xs font-medium text-blue-800">300</div>
                    <div className="text-xs text-blue-600">Light</div>
                  </div>
                  <div className="rounded bg-blue-400 p-3 text-center">
                    <div className="text-xs font-medium text-blue-800">400</div>
                    <div className="text-xs text-blue-600">Medium</div>
                  </div>
                  <div className="rounded bg-blue-500 p-3 text-center text-white">
                    <div className="text-xs font-medium">500</div>
                    <div className="text-xs opacity-80">Base</div>
                  </div>
                  <div className="rounded bg-blue-600 p-3 text-center text-white">
                    <div className="text-xs font-medium">600</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-blue-700 p-3 text-center text-white">
                    <div className="text-xs font-medium">700</div>
                    <div className="text-xs opacity-80">Darker</div>
                  </div>
                  <div className="rounded bg-blue-800 p-3 text-center text-white">
                    <div className="text-xs font-medium">800</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-blue-900 p-3 text-center text-white">
                    <div className="text-xs font-medium">900</div>
                    <div className="text-xs opacity-80">Darkest</div>
                  </div>
                  <div className="rounded bg-blue-950 p-3 text-center text-white">
                    <div className="text-xs font-medium">950</div>
                    <div className="text-xs opacity-80">Darkest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grayscale 컬러 스케일 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">Grayscale 컬러 스케일</h3>
            <div className="space-y-4">
              <div>
                <h4 className="heading-4 mb-3 text-gray-700">Gray 스케일</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
                  <div className="rounded bg-gray-50 p-3 text-center">
                    <div className="text-xs font-medium text-gray-800">50</div>
                    <div className="text-xs text-gray-600">Lightest</div>
                  </div>
                  <div className="rounded bg-gray-100 p-3 text-center">
                    <div className="text-xs font-medium text-gray-800">100</div>
                    <div className="text-xs text-gray-600">Light</div>
                  </div>
                  <div className="rounded bg-gray-200 p-3 text-center">
                    <div className="text-xs font-medium text-gray-800">200</div>
                    <div className="text-xs text-gray-600">Lighter</div>
                  </div>
                  <div className="rounded bg-gray-300 p-3 text-center">
                    <div className="text-xs font-medium text-gray-800">300</div>
                    <div className="text-xs text-gray-600">Light</div>
                  </div>
                  <div className="rounded bg-gray-500 p-3 text-center text-white">
                    <div className="text-xs font-medium">500</div>
                    <div className="text-xs opacity-80">Base</div>
                  </div>
                  <div className="rounded bg-gray-600 p-3 text-center text-white">
                    <div className="text-xs font-medium">600</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                  <div className="rounded bg-gray-700 p-3 text-center text-white">
                    <div className="text-xs font-medium">700</div>
                    <div className="text-xs opacity-80">Darker</div>
                  </div>
                  <div className="rounded bg-gray-800 p-3 text-center text-white">
                    <div className="text-xs font-medium">800</div>
                    <div className="text-xs opacity-80">Dark</div>
                  </div>
                </div>
              </div>

              {/* Gray 사용 예시 */}
              <div>
                <h4 className="heading-4 mb-3 text-gray-700">Gray 사용 예시</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="rounded border bg-gray-50 p-3">
                      <p className="font-medium text-gray-800">Background 50</p>
                      <p className="text-sm text-gray-600">가장 밝은 배경</p>
                    </div>
                    <div className="rounded border bg-gray-100 p-3">
                      <p className="font-medium text-gray-800">Background 100</p>
                      <p className="text-sm text-gray-600">밝은 배경</p>
                    </div>
                    <div className="rounded border bg-gray-200 p-3">
                      <p className="font-medium text-gray-800">Background 200</p>
                      <p className="text-sm text-gray-600">경계선 배경</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded border border-gray-300 bg-white p-3">
                      <p className="font-medium text-gray-800">Text 800</p>
                      <p className="text-sm text-gray-600">기본 텍스트</p>
                    </div>
                    <div className="rounded border border-gray-300 bg-white p-3">
                      <p className="font-medium text-gray-600">Text 600</p>
                      <p className="text-sm text-gray-500">보조 텍스트</p>
                    </div>
                    <div className="rounded border border-gray-300 bg-white p-3">
                      <p className="font-medium text-gray-500">Text 500</p>
                      <p className="text-sm text-gray-400">비활성 텍스트</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 컬러 사용 예시 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">컬러 사용 예시</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="heading-4">텍스트 컬러</h4>
                <div className="space-y-2">
                  <p className="text-purple-500">Purple 텍스트</p>
                  <p className="text-pink-500">Pink 텍스트</p>
                  <p className="text-green-500">Green 텍스트</p>
                  <p className="text-blue-500">Blue 텍스트</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="heading-4">배경 컬러</h4>
                <div className="space-y-2">
                  <div className="rounded bg-purple-100 p-2 text-purple-800">Purple 배경</div>
                  <div className="rounded bg-pink-100 p-2 text-pink-800">Pink 배경</div>
                  <div className="rounded bg-green-100 p-2 text-green-800">Green 배경</div>
                  <div className="rounded bg-blue-100 p-2 text-blue-800">Blue 배경</div>
                </div>
              </div>
            </div>
          </div>

          {/* 컬러 조합 */}
          <div>
            <h3 className="heading-3 mb-4">컬러 조합</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-purple-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Purple + White</h4>
                <p className="text-sm opacity-90">고대비 조합</p>
              </div>
              <div className="rounded-lg bg-pink-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Pink + White</h4>
                <p className="text-sm opacity-90">따뜻한 조합</p>
              </div>
              <div className="rounded-lg bg-green-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Green + White</h4>
                <p className="text-sm opacity-90">자연스러운 조합</p>
              </div>
              <div className="rounded-lg bg-blue-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Blue + White</h4>
                <p className="text-sm opacity-90">신뢰감 있는 조합</p>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Purple-Pink</h4>
                <p className="text-sm opacity-90">그라데이션 조합</p>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white">
                <h4 className="mb-2 font-semibold">Green-Blue</h4>
                <p className="text-sm opacity-90">자연스러운 그라데이션</p>
              </div>
            </div>
          </div>
        </div>

        {/* 그라데이션 시스템 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">그라데이션 시스템</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gradient-purple-pink-100 rounded-xl p-6 text-center">
              <h4 className="mb-2 font-bold text-gray-800">Purple-Pink 100</h4>
              <p className="caption text-gray-600">Light gradient</p>
            </div>
            <div className="bg-gradient-purple-pink-500 rounded-xl p-6 text-center">
              <h4 className="mb-2 font-bold text-gray-800">Purple-Pink 500</h4>
              <p className="caption text-gray-600">Medium gradient</p>
            </div>
            <div className="bg-gradient-purple-pink-600 rounded-xl p-6 text-center text-white">
              <h4 className="mb-2 font-bold">Purple-Pink 600</h4>
              <p className="caption opacity-90">Strong gradient</p>
            </div>
          </div>
        </div>

        {/* Special Effects */}
        <div className="card-gradient mb-8 p-8 text-center">
          <h3 className="heading-2 mb-4">Special Effects & Animations</h3>
          <p className="body-large mb-6">
            Brand gradients and various visual effects for modern UI.
          </p>

          <div className="flex-center flex-wrap gap-6">
            <div className="glass rounded-lg p-4">
              <span className="font-semibold">Glassmorphism</span>
            </div>
            <div className="animate-glow rounded-lg bg-white/20 p-4">
              <span className="font-semibold">Glow Effect</span>
            </div>
            <div className="bg-gradient-radial rounded-lg p-4 text-white">
              <span className="font-semibold">Radial Gradient</span>
            </div>
            <div className="animate-bounce-slow rounded-lg bg-white/20 p-4">
              <span className="font-semibold">Slow Bounce</span>
            </div>
          </div>
        </div>

        {/* 폼 요소 */}
        <div className="card mb-8 p-8">
          <h2 className="heading-2 mb-6">폼 요소</h2>

          <div className="max-w-md space-y-4">
            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">
                Email Address
              </label>
              <input type="email" className="input" placeholder="example@email.com" />
            </div>

            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">Password</label>
              <input type="password" className="input" placeholder="Enter your password" />
            </div>

            <div>
              <label className="body-small mb-2 block font-medium text-gray-700">Message</label>
              <textarea
                className="input min-h-[100px] resize-none"
                placeholder="Enter your message..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button className="btn-primary">Submit</button>
              <button className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>

        {/* 레이아웃 시스템 */}
        <div className="card p-8">
          <h2 className="heading-2 mb-6">레이아웃 시스템</h2>

          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-3">Flex Utilities</h3>
              <div className="space-y-3">
                <div className="flex-center rounded bg-gray-100 p-4">
                  <span className="body-small">flex-center</span>
                </div>
                <div className="flex-between rounded bg-gray-100 p-4">
                  <span className="body-small">Left</span>
                  <span className="body-small">Right</span>
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
              <h3 className="heading-3 mb-3">Container System</h3>
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

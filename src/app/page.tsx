export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-green p-8">
      <div className="container-custom">
        {/* 메인 헤더 */}
        <div className="text-center mb-12">
          <h1 className="heading-1 text-gradient-purple-pink mb-4">
            11기 6조 디자인 시스템
          </h1>
          <p className="body-large text-gray-600">
            Tailwind CSS v4 + OKLCH 컬러 + 완전한 컴포넌트 시스템
          </p>
        </div>

        {/* 타이포그래피 시스템 테스트 */}
        <div className="card p-8 mb-8">
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
                Body Regular - 일반적인 본문 텍스트입니다. 대부분의 내용에 사용하는 기본 텍스트입니다.
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
        <div className="card p-8 mb-8">
          <h2 className="heading-2 mb-6">버튼 시스템</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-4">기본 버튼들</h3>
              <div className="flex gap-4 flex-wrap">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-gradient">Gradient Button</button>
                <button className="btn-outline">Outline Button</button>
              </div>
            </div>
            
            <div>
              <h3 className="heading-3 mb-4">버튼 크기 변형</h3>
              <div className="flex gap-4 items-center flex-wrap">
                <button className="btn-primary text-sm px-3 py-1.5">Small</button>
                <button className="btn-primary">Medium</button>
                <button className="btn-primary text-lg px-6 py-3">Large</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 카드 시스템 테스트 */}
        <div className="mb-8">
          <h2 className="heading-2 mb-6">카드 시스템</h2>
          
          <div className="grid grid-auto-fit gap-6">
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
                마우스를 올리면 부드러운 애니메이션이 적용됩니다. 위로 살짝 떠오르는 효과를 확인해보세요.
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
        <div className="card p-8 mb-8">
          <h2 className="heading-2 mb-6">OKLCH vs HEX 컬러 비교</h2>
          
          <div className="mb-8">
            <h3 className="heading-3 mb-4">컬러 시스템 비교</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">HEX 컬러 (현재 사용)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded border"></div>
                    <code className="text-gray-600">#DDDDDD</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded border"></div>
                    <code className="text-gray-600">#BBBBBB</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded border"></div>
                    <code className="text-gray-600">#737373</code>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ✅ 직관적, 호환성 좋음<br/>
                  ❌ 인지적 불균일
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">OKLCH 컬러 (이론적)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded border"></div>
                    <code className="text-gray-600">oklch(0.967 0.003 264.542)</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded border"></div>
                    <code className="text-gray-600">oklch(0.872 0.01 258.338)</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded border"></div>
                    <code className="text-gray-600">oklch(0.551 0.027 264.364)</code>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ✅ 인지적 균일, 미래 지향적<br/>
                  ❌ 복잡함, 호환성 이슈
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 컬러 팔레트 테스트 */}
        <div className="card p-8 mb-8">
          <h2 className="heading-2 mb-6">Figma 기준 HEX 컬러 팔레트</h2>
          
          {/* 메인 브랜드 컬러 - Green (Figma 기준) */}
        <div className="mb-8">
            <h3 className="heading-3 mb-4 text-green-700">Green (메인 브랜드 - Figma 기준)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                <div className="text-green-900 font-bold text-sm mb-1">50</div>
                <div className="text-green-600 caption text-xs">#DFFAEB</div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg text-center border border-green-200">
                <div className="text-green-900 font-bold text-sm mb-1">100</div>
                <div className="text-green-600 caption text-xs">#C5F1D9</div>
              </div>
              <div className="bg-green-300 p-3 rounded-lg text-center border border-green-400">
                <div className="text-green-900 font-bold text-sm mb-1">300</div>
                <div className="text-green-600 caption text-xs">#8D96F6</div>
              </div>
              <div className="bg-green-500 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">500</div>
                <div className="caption opacity-80 text-xs">#00BB86</div>
              </div>
              <div className="bg-green-700 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">700</div>
                <div className="caption opacity-80 text-xs">#0C7665</div>
          </div>
        </div>
      </div>
      
          {/* 보조 브랜드 컬러 - Blue (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-blue-700">Blue (보조 브랜드 - Figma 기준)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                <div className="text-blue-900 font-bold text-sm mb-1">50</div>
                <div className="text-blue-600 caption text-xs">#D6F9FF</div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg text-center border border-blue-200">
                <div className="text-blue-900 font-bold text-sm mb-1">100</div>
                <div className="text-blue-600 caption text-xs">#D6F9FF</div>
              </div>
              <div className="bg-blue-300 p-3 rounded-lg text-center border border-blue-400">
                <div className="text-blue-900 font-bold text-sm mb-1">300</div>
                <div className="text-blue-600 caption text-xs">#D6F9FF</div>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">500</div>
                <div className="caption opacity-80 text-xs">#2099FD</div>
              </div>
              <div className="bg-blue-700 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">700</div>
                <div className="caption opacity-80 text-xs">#337AFF</div>
              </div>
            </div>
          </div>

          {/* 특별 컬러 - Purple (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-purple-700">Purple (특별 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-100">
                <div className="text-purple-900 font-bold text-sm mb-1">50</div>
                <div className="text-purple-600 caption text-xs">#C3C8FA</div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg text-center border border-purple-200">
                <div className="text-purple-900 font-bold text-sm mb-1">100</div>
                <div className="text-purple-600 caption text-xs">#A8AFF8</div>
              </div>
              <div className="bg-purple-300 p-3 rounded-lg text-center border border-purple-400">
                <div className="text-purple-900 font-bold text-sm mb-1">300</div>
                <div className="text-purple-600 caption text-xs">#8D96F6</div>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">500</div>
                <div className="caption opacity-80 text-xs">#5865F2</div>
              </div>
              <div className="bg-purple-700 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">700</div>
                <div className="caption opacity-80 text-xs">#38419B</div>
              </div>
            </div>
          </div>

          {/* 특별 컬러 - Pink (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-pink-700">Pink (특별 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-pink-50 p-3 rounded-lg text-center border border-pink-100">
                <div className="text-pink-900 font-bold text-sm mb-1">50</div>
                <div className="text-pink-600 caption text-xs">#FFBFEF</div>
              </div>
              <div className="bg-pink-100 p-3 rounded-lg text-center border border-pink-200">
                <div className="text-pink-900 font-bold text-sm mb-1">100</div>
                <div className="text-pink-600 caption text-xs">#FFBFEF</div>
              </div>
              <div className="bg-pink-300 p-3 rounded-lg text-center border border-pink-400">
                <div className="text-pink-900 font-bold text-sm mb-1">300</div>
                <div className="text-pink-600 caption text-xs">#FF4CD2</div>
              </div>
              <div className="bg-pink-500 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">500</div>
                <div className="caption opacity-80 text-xs">#FF4CD2</div>
              </div>
              <div className="bg-pink-700 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">700</div>
                <div className="caption opacity-80 text-xs">#E043B9</div>
          </div>
        </div>
      </div>
      
          {/* 그레이 스케일 (Figma 기준) */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4 text-gray-700">Gray (중성 컬러 - Figma 기준)</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
                <div className="text-gray-900 font-bold text-sm mb-1">50</div>
                <div className="text-gray-600 caption text-xs">#EEEEEE</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg text-center border border-gray-200">
                <div className="text-gray-900 font-bold text-sm mb-1">100</div>
                <div className="text-gray-600 caption text-xs">#DDDDDD</div>
              </div>
              <div className="bg-gray-300 p-3 rounded-lg text-center border border-gray-400">
                <div className="text-gray-900 font-bold text-sm mb-1">300</div>
                <div className="text-gray-600 caption text-xs">#BBBBBB</div>
              </div>
              <div className="bg-gray-500 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">500</div>
                <div className="caption opacity-80 text-xs">#737373</div>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">700</div>
                <div className="caption opacity-80 text-xs">#333333</div>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg text-center text-white">
                <div className="font-bold text-sm mb-1">900</div>
                <div className="caption opacity-80 text-xs">#191919</div>
              </div>
        </div>
      </div>
      
          {/* 컬러 조합 예시 */}
          <div className="mb-8">
            <h3 className="heading-3 mb-4">컬러 조합 예시</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-xl text-white">
                <h4 className="font-bold mb-2">Green → Blue</h4>
                <p className="caption opacity-90">자연스러운 전환</p>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-6 rounded-xl text-white">
                <h4 className="font-bold mb-2">Purple → Pink</h4>
                <p className="caption opacity-90">브랜드 그라데이션</p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-xl text-white">
                <h4 className="font-bold mb-2">Blue → Purple</h4>
                <p className="caption opacity-90">차분한 조화</p>
              </div>
        </div>
      </div>
      
          {/* 컬러 사용 가이드 */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="heading-3 mb-4">컬러 사용 가이드</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">브랜드 컬러</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <span className="text-green-600 font-medium">Green 500</span>: 메인 액션, CTA 버튼</li>
                  <li>• <span className="text-blue-600 font-medium">Blue 500</span>: 보조 액션, 링크</li>
                  <li>• <span className="text-purple-600 font-medium">Purple 500</span>: 특별 기능, 강조</li>
                  <li>• <span className="text-pink-600 font-medium">Pink 500</span>: 특별 기능, 강조</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">상태 컬러</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <span className="text-gray-600 font-medium">Gray 100-300</span>: 배경, 테두리</li>
                  <li>• <span className="text-gray-600 font-medium">Gray 500-700</span>: 텍스트, 아이콘</li>
                  <li>• <span className="text-gray-600 font-medium">Gray 900</span>: 제목, 강조 텍스트</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Figma 그라데이션 시스템 테스트 */}
        <div className="card p-8 mb-8">
          <h2 className="heading-2 mb-6">Figma 그라데이션 시스템</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="heading-3 mb-4">Figma 기준 그라디언트</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-purple-pink-100 p-6 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">Purple-Pink 100</h4>
                  <p className="caption text-gray-600">#DEE0FC → #FFDBF6</p>
                </div>
                <div className="bg-gradient-purple-pink-500 p-6 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">Purple-Pink 500</h4>
                  <p className="caption text-gray-600">#8D96F6 → #FF85E0</p>
                </div>
                <div className="bg-gradient-purple-pink-600 p-6 rounded-xl text-center text-white">
                  <h4 className="font-bold mb-2">Purple-Pink 600</h4>
                  <p className="caption opacity-90">#5865F2 → #FF4CD2</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="heading-3 mb-4">기존 그라디언트</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-green p-6 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">Green Gradient</h4>
                  <p className="caption text-gray-600">#E3F8ED → #E5F9F8</p>
                </div>
                <div className="bg-gradient-blue p-6 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">Blue Gradient</h4>
                  <p className="caption text-gray-600">#D6F9FF → #E3F8ED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 특수 효과 테스트 */}
        <div className="card-gradient p-8 text-center mb-8">
          <h3 className="heading-2 mb-4">특수 효과 & 애니메이션</h3>
          <p className="body-large mb-6">
            브랜드 그라데이션과 다양한 시각적 효과들을 테스트해보세요!
          </p>
          
          <div className="flex-center gap-6 flex-wrap">
            <div className="glass p-4 rounded-lg">
              <span className="font-semibold">글래스모피즘</span>
            </div>
            <div className="animate-glow p-4 rounded-lg bg-white/20">
              <span className="font-semibold">글로우 효과</span>
            </div>
            <div className="bg-gradient-radial p-4 rounded-lg text-white">
              <span className="font-semibold">방사형 그라데이션</span>
            </div>
            <div className="animate-bounce-slow p-4 rounded-lg bg-white/20">
              <span className="font-semibold">슬로우 바운스</span>
            </div>
          </div>
        </div>

        {/* 폼 요소 테스트 */}
        <div className="card p-8 mb-8">
          <h2 className="heading-2 mb-6">폼 요소</h2>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="body-small font-medium text-gray-700 mb-2 block">
                이메일 주소
              </label>
              <input 
                type="email" 
                className="input" 
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label className="body-small font-medium text-gray-700 mb-2 block">
                비밀번호
              </label>
              <input 
                type="password" 
                className="input" 
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            
            <div>
              <label className="body-small font-medium text-gray-700 mb-2 block">
                메시지
              </label>
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
                <div className="flex-center bg-gray-100 p-4 rounded">
                  <span className="body-small">flex-center</span>
                </div>
                <div className="flex-between bg-gray-100 p-4 rounded">
                  <span className="body-small">왼쪽</span>
                  <span className="body-small">오른쪽</span>
                </div>
                <div className="flex-start bg-gray-100 p-4 rounded">
                  <span className="body-small">flex-start</span>
                </div>
                <div className="flex-end bg-gray-100 p-4 rounded">
                  <span className="body-small">flex-end</span>
          </div>
        </div>
      </div>
      
            <div>
              <h3 className="heading-3 mb-3">컨테이너 시스템</h3>
              <div className="space-y-2">
                <div className="container-narrow bg-blue-50 p-4 rounded">
                  <span className="body-small">container-narrow (max-width: 56rem)</span>
                </div>
                <div className="container-custom bg-green-50 p-4 rounded">
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
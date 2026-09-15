import { insightsMeta } from '../data/insights.js'
import { extras, productGroups, terms } from '../data/pricing.js'
import {
  homePhotos,
  inquiryChecklist,
  pricingBasis,
  processSteps,
  productionLeadTime,
  profile,
  targets,
} from '../data/profile.js'

// 한국어 사이트 문구 (기존 화면과 동일)
export function createKoCopy({ i, f, account }) {
  const [y, m, d] = insightsMeta.collectedAt.split('-')

  return {
    htmlLang: 'ko',
    languageName: '한국어',
    nav: {
      label: '주요 메뉴',
      items: [
        { href: '#about', label: '타깃' },
        { href: '#metrics', label: '지표' },
        { href: '#rates', label: '단가' },
        { href: '#calculator', label: '계산기' },
        { href: '#process', label: '진행 절차' },
        { href: '#contact', label: '문의' },
      ],
      languageLabel: '언어 선택',
    },
    hero: {
      introLines: profile.introLines,
      introSub: profile.introSub,
      photos: homePhotos,
      photoCaption: 'WOOD · HOME CAFÉ · NEWLYWED',
      cardLabel: '계정 기본 정보',
      stats: [
        { label: '팔로워', value: f.num(i.followers), unit: '명' },
        { label: '비팔로워 조회', value: f.pct(i.nonFollowerViewShare, 0), unit: '' },
        { label: '릴스 평균 도달', value: f.approx(i.reachMean), unit: '명' },
        { label: '릴스 중앙 도달', value: f.approx(i.reachMedian), unit: '명' },
      ],
      meta: ({ days, months }) =>
        `${account.y}.${account.m}.${account.d} 개설 · 운영 ${days}일째(약 ${months}개월) · 게시물 ${profile.posts}개 · ${profile.postingFrequency}`,
      actions: { calculator: '광고비 계산하기', contact: '캠페인 문의' },
      slider: {
        prev: '이전 사진',
        next: '다음 사진',
        bullet: '{{index}}번째 사진 보기',
      },
    },
    audience: {
      eyebrow: 'Audience',
      title: '이런 분들이 보고 있어요',
      desc: '웨딩 준비부터 신혼 집 꾸미기까지, 생활 공간에 관심이 많은 2030 타깃에게 닿습니다.',
      targets,
      info: [
        { label: '주요 카테고리', value: profile.categories.join(' · ') },
        { label: '주요 팔로워', value: profile.audience },
        {
          label: '평균 게시 빈도',
          value: `${profile.postingFrequency} (${profile.postingFormats})`,
        },
      ],
    },
    metrics: {
      eyebrow: 'Performance',
      title: '핵심 계정 지표',
      desc: `Instagram 인사이트 기준 · ${y}.${m}.${d} 수집`,
      summary: (
        <>
          최근 {i.reelCount}개 릴스 기준 평균 도달 약 {f.approx(i.reachMean)}명, 중앙 도달 약{' '}
          {f.approx(i.reachMedian)}명을 기록했습니다. 최근 90일 계정 전체 조회수의{' '}
          <strong>{f.pct(i.nonFollowerViewShare, 0)}가 비팔로워</strong>에게서 발생해 신규 잠재고객 도달력이
          확인됩니다.
        </>
      ),
      reelsLabel: insightsMeta.reelsLabel,
      reelsNote: i.promoCount > 0 ? `홍보 콘텐츠 ${i.promoCount}개 포함` : '',
      accountLabel: insightsMeta.accountLabel,
      reelCards: [
        {
          label: '평균 도달',
          value: `약 ${f.approx(i.reachMean)}`,
          unit: '명',
          sub: `팔로워 수의 약 ${i.reachMeanMultiple.toFixed(1)}배`,
          tone: 'strong',
        },
        {
          label: '중앙 도달',
          value: `약 ${f.approx(i.reachMedian)}`,
          unit: '명',
          sub: `팔로워 수의 약 ${i.reachMedianMultiple.toFixed(1)}배 · 보수적 기대치`,
          tone: 'strong',
        },
        {
          label: '평균 조회수',
          value: f.num(i.viewsMean),
          unit: '회',
          sub: `중앙 ${f.num(i.viewsMedian)}회 · 최고 ${f.num(i.viewsMax)}회`,
        },
        {
          label: '평균 참여율',
          value: f.pct(i.engagementRate),
          sub: `도달 대비 좋아요 · 댓글 · 저장 · 공유 ${f.num(i.interactions)}건`,
        },
        { label: '공유율', value: f.pct(i.shareRate), sub: `최고 ${f.pct(i.shareRateMax)}` },
        { label: '저장률', value: f.pct(i.saveRate), sub: `최고 ${f.pct(i.saveRateMax)}` },
      ],
      accountCards: [
        { label: '팔로워', value: f.num(i.followers), unit: '명' },
        {
          label: '비팔로워 조회 비중',
          value: f.pct(i.nonFollowerViewShare, 0),
          sub: `전체 조회수 ${f.compact(i.accountViews)}회`,
          tone: 'strong',
        },
        {
          label: '비팔로워 반응 비중',
          value: f.pct(i.nonFollowerInteractionShare, 1),
          sub: `전체 반응 ${f.compact(i.accountInteractions)}건`,
        },
        {
          label: '프로필 방문률',
          value: f.pct(i.profileVisitRate),
          sub: `도달 ${f.compact(i.reachedAccounts)}명 중 ${f.num(i.profileVisits)}회 방문`,
        },
        {
          label: '링크 클릭률',
          value: f.pct(i.linkPerVisitRate),
          sub: `프로필 방문 대비 · ${f.num(i.linkTaps)}회 클릭`,
        },
      ],
      promo: {
        eyebrow: 'Sponsored Content',
        title: '광고 표기 콘텐츠에서도 비슷한 반응이 유지돼요',
        body: (
          <>
            최근 홍보 콘텐츠 {i.promoContentCount}건의 평균 참여율은 <strong>{f.pct(i.promoRate)}</strong>로,
            일반 콘텐츠 평균 {f.pct(i.organicSimpleRate)}와 유사한 수준을 유지하고 있습니다. 콘텐츠별 참여율은{' '}
            {f.pct(i.promoRateMin, 1)}~{f.pct(i.promoRateMax, 1)} 범위로 나타났으며, 정보성과 제품 활용도가
            높은 콘텐츠에서 저장 · 댓글 반응이 상대적으로 높았습니다.
          </>
        ),
        compare: [
          { label: `홍보 콘텐츠 ${i.promoContentCount}건 평균`, value: f.pct(i.promoRate) },
          { label: `일반 콘텐츠 ${i.organicCount}건 평균`, value: f.pct(i.organicSimpleRate) },
        ],
        stats: [
          { label: '평균 조회수', value: `${f.num(i.promoAverages.views)}회` },
          { label: '평균 조회한 사람', value: `${f.num(i.promoAverages.reach)}명` },
          { label: '좋아요율', value: f.pct(i.promoAverages.likeRate) },
          { label: '댓글률', value: f.pct(i.promoAverages.commentRate) },
          { label: '저장률', value: f.pct(i.promoAverages.saveRate) },
          { label: '공유율', value: f.pct(i.promoAverages.shareRate) },
          { label: '평균 시청시간', value: `${i.promoAverages.watchSeconds}초` },
        ],
      },
      footnotes: [
        `평균 도달에는 ${f.num(i.reachMax)}명에게 도달한 바이럴 콘텐츠가 포함되어 있어, 일반적인 기대치는 중앙값을 기준으로 보수적으로 산정합니다.`,
        `참여율 · 저장률 · 공유율은 최근 ${i.reelCount}개 릴스의 전체 반응을 전체 도달로 나눈 값입니다.`,
        '콘텐츠별 링크 클릭 데이터는 제공되지 않아 링크 클릭률은 계정 전체 기준입니다.',
        `홍보 콘텐츠 지표는 ${i.promoContentCount}건 각 비율의 단순 평균이며, 일반 콘텐츠 평균도 최근 릴스 중 홍보 콘텐츠를 제외한 ${i.organicCount}건의 단순 평균으로 같은 방식으로 비교했습니다.`,
      ],
    },
    strengths: {
      eyebrow: 'Strengths',
      title: '콘텐츠 강점',
      quote: (
        <>
          새로운 잠재고객에게 닿고, 광고 표기 후에도 저장 · 댓글 반응이 이어지는 콘텐츠를 만듭니다.
          <br />
          인테리어 · 생활용품 제품을 실제 생활 공간에서 소개하는 캠페인에 적합합니다.
        </>
      ),
      items: [
        {
          title: '팔로워 밖으로 넓어지는 도달',
          stat: `${i.reelsAboveTwiceFollowers} / ${i.reelCount}`,
          desc: `최근 ${i.reelCount}개 릴스 중 ${i.reelsAboveTwiceFollowers}개가 팔로워 수의 2배 이상 도달했습니다.`,
        },
        {
          title: '광고 표기 후에도 유지되는 반응',
          stat: f.pct(i.promoRate),
          desc: `홍보 콘텐츠 ${i.promoContentCount}건 평균 참여율로, 일반 콘텐츠와 비슷한 반응을 유지합니다.`,
        },
        {
          title: '구매 고려로 이어지는 저장',
          stat: f.pct(i.promoAverages.saveRate),
          desc: '홍보 콘텐츠 평균 저장률이며, 정보성이 높은 콘텐츠에서 상대적으로 높은 저장 반응이 나타났습니다.',
        },
        {
          title: '생활 공간 속 자연스러운 노출',
          stat: 'Real Home',
          desc: '실제 사용 장면을 담아 광고보다 일상에 가까운 톤으로 제품을 보여줍니다.',
        },
      ],
    },
    rateCard: {
      eyebrow: 'Rate Card',
      title: '광고 상품 및 단가',
      desc: '모든 단가는 부가세 포함 금액입니다.',
      groups: productGroups,
      badge: '추천',
      termsTitle: '진행 조건',
      terms,
      extrasTitle: '추가 비용 및 2차 활용',
      extrasHead: { request: '추가 요청', price: '추가 비용' },
      extras,
      extrasNote: '메타 광고 집행, 상세페이지 사용, 원본 제공은 별도 권리로 기본 단가에 포함되지 않습니다.',
    },
    rationale: {
      eyebrow: 'Pricing Basis',
      title: '단가 산정 근거',
      text: pricingBasis,
      reasons: [
        `중앙 도달이 팔로워 수의 약 ${i.reachMedianMultiple.toFixed(1)}배입니다.`,
        `최근 ${i.reelCount}개 릴스 중 ${i.reelsAboveTwiceFollowers}개가 팔로워 수의 2배 이상 도달했습니다.`,
        `최근 90일 조회수의 ${f.pct(i.nonFollowerViewShare, 0)}가 비팔로워에게서 발생했습니다.`,
        `홍보 콘텐츠 ${i.promoContentCount}건 평균 참여율 ${f.pct(i.promoRate)}로, 일반 콘텐츠(${f.pct(i.organicSimpleRate)})와 비슷한 반응을 유지합니다.`,
        '성과만으로 단가를 일괄 인상하지 않고, 촬영 · 편집 범위와 제작 난이도에 따라 차등 적용합니다.',
        '계정 주제와 인테리어 · 생활용품 광고의 적합도가 높습니다.',
      ],
    },
    calculator: {
      eyebrow: 'Estimate',
      title: '광고비 계산기',
      desc: '원하는 상품과 옵션을 선택하면 예상 집행 광고비가 바로 계산됩니다.',
      steps: {
        products: '광고 상품 선택',
        productsHint: '여러 상품을 함께 선택하거나 수량을 조절할 수 있어요.',
        retention: '콘텐츠 유지 기간',
        extras: '추가 옵션',
      },
      videoOnly: '릴스 또는 피드 + 릴스 패키지 선택 시 가능',
      quantity: (name) => `${name} 수량`,
      decrease: (name) => `${name} 수량 줄이기`,
      increase: (name) => `${name} 수량 늘리기`,
      summary: {
        title: '예상 견적',
        reset: '초기화',
        negotiable: '별도 협의',
        totalLabel: '예상 광고비 · 부가세 포함',
        negotiableNote: (count) => `별도 협의 항목 ${count}건의 비용은 제외된 금액입니다.`,
        rangeNote: '범위 단가는 촬영 난이도와 요청 범위에 따라 협의 후 확정됩니다.',
        mail: '이 견적으로 이메일 문의',
        copy: '견적 내용 복사 (DM용)',
        copied: '복사했어요 ✓',
        copyFallback: '아래 견적 내용을 복사해주세요.',
        emptyLines: ['광고 상품을 선택하면', '예상 광고비가 여기에 표시됩니다.'],
        disclaimer:
          '계산 결과는 참고용 예상 금액이며, 캠페인 범위와 일정에 따라 최종 견적이 달라질 수 있습니다.',
      },
      bar: { label: '예상 광고비', open: '견적 보기' },
    },
    process: {
      eyebrow: 'Process',
      title: '진행 절차',
      desc: '일반적으로 제품 수령 후 아래 기간의 제작 기간이 필요합니다.',
      leadTimes: productionLeadTime,
      stepLabel: (index) => `STEP ${index}`,
      steps: processSteps,
    },
    contact: {
      eyebrow: 'Contact',
      title: '캠페인 문의',
      desc: '아래 내용을 포함해 인스타그램 DM 또는 이메일로 문의 부탁드립니다.',
      dm: `Instagram DM @${profile.handle}`,
      checklist: inquiryChecklist,
    },
    quote: {
      heading: `[@${profile.handle} 광고 견적 문의]`,
      selected: '■ 선택 항목',
      negotiableHeading: '■ 별도 협의 항목',
      total: (range) => `■ 예상 광고비 (부가세 포함): ${range}`,
      negotiableNote: '  ※ 별도 협의 항목 비용은 제외된 금액입니다.',
      rangeNote: '  ※ 범위 단가는 촬영 난이도와 요청 범위에 따라 협의 후 확정됩니다.',
      campaignHeading: '■ 캠페인 정보',
      campaignFields: [
        '- 브랜드명 / 담당자명: ',
        '- 제품명 / 제품 링크: ',
        '- 희망 업로드 일정: ',
        '- 캠페인 주요 내용 및 필수 요청사항: ',
        '- 제품 제공 및 배송 조건: ',
      ],
      retentionLabel: (label) => `콘텐츠 유지 기간 ${label}`,
      mailSubject: `[광고 문의] @${profile.handle} 캠페인 견적`,
    },
  }
}
